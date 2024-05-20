import axios from 'axios';

export default class FileStorage {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  async upload(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file, file.name);

    const response = await axios.post(`${this.host}/upload.php`, form);

    if (response.status !== 200) {
      throw new Error(`File upload failed with status ${response.status}.`);
    }

    return this.getUrl(file.name);
  }

  async getUrl(filename: string): Promise<string> {
    const response = await axios.get(`${this.host}/geturl.php?filename=${filename}`);

    if (response.status !== 200) {
      throw new Error(`Failed to get URL with status ${response.status}.`);
    }

    return response.data;
  }
}
