import {getAxiosWithConfig} from "./config";

//4dnMwNmar0abLMR0qS7ghBzUcN3rBqMl
export const getCurrencyConvertData = async (): Promise<any> => {
    try {
        const endpoint = 'symbols';
        const instance = getAxiosWithConfig();

        const {data} = await instance.get(endpoint);
        return data;
    } catch (e: any) {
        throw new Error(e);
    }
}