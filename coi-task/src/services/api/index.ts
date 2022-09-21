import {getAxiosWithConfig} from "./config";

//4dnMwNmar0abLMR0qS7ghBzUcN3rBqMl

export const getCurrenciesApi = async (): Promise<any> => {
    try {
        const endpoint = 'exchangerates_data/symbols';
        const instance = getAxiosWithConfig();

        const {data} = await instance.get(endpoint);
        return data;
    } catch (e: any) {
        throw new Error(e);
    }
}

export const convertAmount = async (params: any): Promise<any> => {
    const {startCurrency, endCurrency, amount} = params;

    try {
        const endpoint = `exchangerates_data/convert?to=${endCurrency}&from=${startCurrency}&amount=${amount}`;
        const instance = getAxiosWithConfig();

        const {data} = await instance.get(endpoint);
        return data;
    } catch (e: any) {
        throw new Error(e);
    }
}