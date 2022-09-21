import {getAxiosWithConfig} from "./config";
import {CurrenciesApi, CurrencyExchangeApi} from "./interfaces";
import {ConvertForm} from "../../Views/Home/interfaces";

export const getCurrenciesApi = async (): Promise<CurrenciesApi> => {
    try {
        const endpoint = 'exchangerates_data/symbols';
        const instance = getAxiosWithConfig();

        const {data} = await instance.get(endpoint);
        return data;
    } catch (e: any) {
        throw new Error(e);
    }
}

export const convertAmount = async (params: ConvertForm): Promise<CurrencyExchangeApi> => {
    const {fromCurrency, toCurrency, amount} = params;

    try {
        const endpoint = `exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`;
        const instance = getAxiosWithConfig();

        const {data} = await instance.get(endpoint);
        return data;
    } catch (e: any) {
        throw new Error(e);
    }
}