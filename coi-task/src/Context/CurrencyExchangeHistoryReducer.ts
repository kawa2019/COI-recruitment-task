import {CurrencyExchangeApi} from "../Services/api/interfaces";

export enum CurrencyExchangeHistoryTypes {
    SET_CURRENCY_EXCHANGE_HISTORY = 'SET_CURRENCY_EXCHANGE_HISTORY',
}

export interface CurrencyExchangeHistoryAction {
    type: CurrencyExchangeHistoryTypes.SET_CURRENCY_EXCHANGE_HISTORY;
    payload: CurrencyExchangeHistoryState;
}

export type CurrencyExchangeHistoryState = { data: CurrencyExchangeApi[] }

export const CurrencyExchangeHistoryReducer = (
    state: CurrencyExchangeHistoryState,
    action: CurrencyExchangeHistoryAction,
) => {
    switch (action.type) {
        case CurrencyExchangeHistoryTypes.SET_CURRENCY_EXCHANGE_HISTORY:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};