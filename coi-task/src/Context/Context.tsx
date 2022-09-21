import {createContext, Dispatch, useReducer} from "react";
import {HistoricalConvertsAction, HistoricalConvertsReducer} from "./HistoricalConvertsReducer";
import {HistoricalConvertApi} from "../types/HistoricalConvertApi";

export interface InitialState {
    historicalConverts: { data: HistoricalConvertApi[] }
}

export interface AppProviderProps {
    children: JSX.Element;
}

const localStorageHistoricalConverts = localStorage.getItem('historicalConverts');
const localStorageHistoricalConvertsObj = localStorageHistoricalConverts && JSON.parse(localStorageHistoricalConverts)

const initialState: InitialState = {
    historicalConverts: localStorageHistoricalConvertsObj || {data: []}
};
export type AnyStateAction = HistoricalConvertsAction

export const MainReducer = (
    {historicalConverts}: InitialState,
    action: any,
) => ({
    historicalConverts: HistoricalConvertsReducer(historicalConverts, action)
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