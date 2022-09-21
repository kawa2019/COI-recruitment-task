import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useCallback, useContext} from "react";
import {AppContext} from "../../Context/Context";
import {CurrencyExchangeHistoryStyled} from "./CurrencyExchangeHistory.styles";
import {CurrencyExchangeHistoryTypes} from "../../Context/CurrencyExchangeHistoryReducer";

const CurrencyExchangeHistory: React.FC = () => {
    const {dispatch, state} = useContext(AppContext);
    const {currencyExchangeHistory} = state;

    const clearCurrencyExchangeHistory = useCallback(() => {
        dispatch({
            type: CurrencyExchangeHistoryTypes.SET_CURRENCY_EXCHANGE_HISTORY,
            payload: {data: []}
        });
    }, [])


    return (
        <CurrencyExchangeHistoryStyled>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>data konwersji</TableCell>
                            <TableCell>rodzaj transakcji</TableCell>
                            <TableCell>po kursie</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currencyExchangeHistory.data.map((item) => (
                            <TableRow hover>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>Wymiana {item.query.amount} {item.query.from} na {item.query.to}</TableCell>
                                <TableCell>{item.result.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Button disabled={!currencyExchangeHistory.data.length} variant={'contained'} color={'error'}
                        onClick={clearCurrencyExchangeHistory}
                className={'clearHistoryBtn'}
                >Wyczyść historie</Button>
            </TableContainer>
        </CurrencyExchangeHistoryStyled>
    )
}

export default CurrencyExchangeHistory