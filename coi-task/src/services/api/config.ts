import axios, {AxiosInstance} from "axios";

export const getAxiosWithConfig = (): AxiosInstance => {
    const apiKey = '4dnMwNmar0abLMR0qS7ghBzUcN3rBqMl';
    const baseUrl = 'https://api.apilayer.com/fixer';

    return axios.create({
        baseURL: baseUrl,
        timeout: 30000,
        headers: {
            apiKey: apiKey,
        },
    });
};