import Cookies from "js-cookie";



export abstract class LocalStorage{

    abstract store(key: string, value: string): Promise<void>;

    abstract get(key: string): Promise<string>;

}



export class CookieLocalStorage extends LocalStorage{
    
    async store(key: string, value: string): Promise<void> {
        Cookies.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        return Cookies.get(key) ?? null;
    }



}