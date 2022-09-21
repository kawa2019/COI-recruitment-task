import {useQuery} from "react-query";
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useCallback, useContext} from "react";
import {AppContext} from "../../Context/Context";
import {HistoricalConvertsStyled} from "./HistoricalConverts.styles";
import {HistoricalConvertsTypes} from "../../Context/HistoricalConvertsReducer";

const HistoricalConverts: React.FC = () => {
    const {dispatch, state} = useContext(AppContext);
    const {historicalConverts} = state;

    const clearHistoricalConverts = useCallback(() => {
        dispatch({
            type: HistoricalConvertsTypes.SET_HISTORICAL_CONVERTS,
            payload: {data: []}
        });
    }, [])

    return (
        <HistoricalConvertsStyled>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>data konwersji</TableCell>
                            <TableCell>rodzaj transakcji</TableCell>
                            <TableCell>po kursie</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historicalConverts.data.map((item) => (
                            <TableRow>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>Wymiana {item.query.amount} {item.query.from} na {item.query.to}</TableCell>
                                <TableCell>{item.result.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant={'contained'} color={'error'} onClick={clearHistoricalConverts}>Wyczyść historie</Button>
        </HistoricalConvertsStyled>
    )
}

export default HistoricalConverts