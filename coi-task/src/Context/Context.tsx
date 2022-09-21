import {createContext, Dispatch, useReducer} from "react";
import {
    CurrencyExchangeHistoryAction,
    CurrencyExchangeHistoryReducer,
    CurrencyExchangeHistoryTypes
} from "./CurrencyExchangeHistoryReducer";
import {CurrencyExchangeApi} from "../Services/api/interfaces";

export interface InitialState {
    currencyExchangeHistory: { data: CurrencyExchangeApi[] }
}

export interface AppProviderProps {
    children: JSX.Element;
}

const localStorageCurrencyExchangeHistory = localStorage.getItem('CurrencyExchangeHistory');
const localStorageCurrencyExchangeHistoryObj = localStorageCurrencyExchangeHistory && JSON.parse(localStorageCurrencyExchangeHistory)

const initialState: InitialState = {
    currencyExchangeHistory: localStorageCurrencyExchangeHistoryObj || {data: []}
};
export type AnyStateAction = CurrencyExchangeHistoryAction

export const MainReducer = (
    {currencyExchangeHistory}: InitialState,
    action: any,
) => ({
    currencyExchangeHistory: CurrencyExchangeHistoryReducer(currencyExchangeHistory, action)
});

export const AppContext = createContext<{
    state: InitialState;
    dispatch: Dispatch<AnyStateAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const AppProvider = ({children}: AppProviderProps) => {
    const [state, dispatch] = useReducer(MainReducer, initialState);

    return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>;
};