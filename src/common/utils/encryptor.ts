import CryptoJS from 'crypto-js';

class Encryptor {
    encrypt(value: string, key: string): string {
        const encrypted = CryptoJS.AES.encrypt(value, key);
        return encrypted.toString();
    }

    decrypt(encryptedValue: string, key: string): string {
        try{
            const decrypted = CryptoJS.AES.decrypt(encryptedValue, key);
            return decrypted.toString(CryptoJS.enc.Utf8);
        }  
        catch(ex){
            return encryptedValue;
        }
    }
}

export default Encryptor;
