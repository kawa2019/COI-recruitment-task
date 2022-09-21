import axios, {AxiosInstance} from "axios";

export const getAxiosWithConfig = (): AxiosInstance => {
    //originalKey:4dnMwNmar0abLMR0qS7ghBzUcN3rBqMl
    const apiKey = '7AIFMLM9MQVzq7F6XnR03kIz60VFL5HN';
    const baseUrl = 'https://api.apilayer.com';

    return axios.create({
        baseURL: baseUrl,
        timeout: 30000,
        headers: {
            apiKey: apiKey,
        },
    });
};