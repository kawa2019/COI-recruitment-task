export interface HistoricalConvertApi {
    date: string,
    historical: string,
    info: {
        rate: number,
        timestamp: number
    },
    query: {
        amount: number,
        from: string,
        to: string
    },
    result: number,
    success: boolean
}
