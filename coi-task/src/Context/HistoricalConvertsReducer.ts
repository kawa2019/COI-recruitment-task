import {HistoricalConvertApi} from "../types/HistoricalConvertApi";

export enum HistoricalConvertsTypes {
    SET_HISTORICAL_CONVERTS = 'SET_HISTORICAL_CONVERTS',
}

export interface HistoricalConvertsAction {
    type: HistoricalConvertsTypes.SET_HISTORICAL_CONVERTS;
    payload: HistoricalConvertsState;
}

export type HistoricalConvertsState = { data: HistoricalConvertApi[] }

export const HistoricalConvertsReducer = (
    state: HistoricalConvertsState,
    action: HistoricalConvertsAction,
) => {
    switch (action.type) {
        case HistoricalConvertsTypes.SET_HISTORICAL_CONVERTS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};