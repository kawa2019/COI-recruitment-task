import {useMutation, useQuery} from "react-query";
import {convertAmount, getCurrenciesApi} from "../../Services/api";
import {useNavigate} from 'react-router-dom';
import {FormProvider, useForm} from "react-hook-form";
import {Alert, Box, Button, CircularProgress, MenuItem} from "@mui/material";
import COISelect from "../../Components/Form/Select";
import COITextField from "../../Components/Form/Textfield";
import {HomeStyled} from "./Home.styles";
import {ConvertForm} from "./interfaces";
import {useCallback, useContext, useEffect} from "react";
import {AppContext} from "../../Context/Context";
import {CurrencyExchangeHistoryTypes} from "../../Context/CurrencyExchangeHistoryReducer";
import {yupResolver} from "@hookform/resolvers/yup";
import ConvertFormSchema from "../../Schema/ConvertFormSchema";
import {CurrenciesApi, CurrencyExchangeApi} from "../../Services/api/interfaces";

const Home: React.FC = () => {
    const {dispatch, state} = useContext(AppContext);
    const navigate = useNavigate();

    const currenciesApi = useQuery<CurrenciesApi, Error>('getCurrenciesApi', getCurrenciesApi);
    const convertAmountApi = useMutation<CurrencyExchangeApi, Error, ConvertForm>((data: ConvertForm) => convertAmount(data));

    const methods = useForm<ConvertForm>({
        defaultValues: {
            fromCurrency: '',
            toCurrency: '',
            amount: 0,
        },
        resolver: yupResolver(ConvertFormSchema),
    });

    const {control, getValues, handleSubmit} = methods;

    useEffect(() => {
        if (convertAmountApi.data) {
            const newCurrencyExchangeHistory = {data: [...state.currencyExchangeHistory.data, convertAmountApi.data]};

            dispatch({
                type: CurrencyExchangeHistoryTypes.SET_CURRENCY_EXCHANGE_HISTORY,
                payload: {data: [...state.currencyExchangeHistory.data, convertAmountApi.data]}
            });
            localStorage.setItem('CurrencyExchangeHistory', JSON.stringify(newCurrencyExchangeHistory));
            navigate('/history')
        }
    }, [convertAmountApi.isSuccess])

    const onSubmit = (data: ConvertForm) => {
        convertAmountApi.mutate(data)
    };

    const getCurrenciesArr = useCallback(() => {
        if (currenciesApi.data) {
            const {symbols} = currenciesApi.data;
            return Object.keys(symbols)
        } else return []
    }, [currenciesApi])

    if (currenciesApi.isLoading) {
        return (
            <HomeStyled>
                <CircularProgress/>
            </HomeStyled>
        )
    }


    if (currenciesApi.isError) {
        return (
            <HomeStyled>
                <Alert severity="error">
                    Błąd z serwera:
                    {currenciesApi.error && currenciesApi.error.message}
                </Alert>
            </HomeStyled>
        )
    }

    return (
        <HomeStyled>
            <Box className={'wrapperContent'}>
                {convertAmountApi.isError && <Alert severity="error">
                    Błąd z serwera:
                    {convertAmountApi.error && convertAmountApi.error.message}
                </Alert>}
                {convertAmountApi.isLoading && <Alert severity="info">
                    wysyłanie...
                </Alert>
                }
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <COISelect label={'początkowa waluta'} name={'fromCurrency'} control={control}>
                            {!currenciesApi.data?.success && <MenuItem
                                value={''}>
                                no options
                            </MenuItem>}
                            {currenciesApi.data?.success && getCurrenciesArr().map((currency: string) => (
                                <MenuItem
                                    key={currency}
                                    value={currency}
                                    selected={currency === getValues('toCurrency')}>
                                    {currency}
                                </MenuItem>
                            ))}
                        </COISelect>
                        <COISelect label={'końcowa waluta'} name={'toCurrency'} control={control}>
                            {!currenciesApi.data?.success && <MenuItem
                                value={''}>
                                no options
                            </MenuItem>}
                            {currenciesApi.data?.success && getCurrenciesArr().map((currency: string) => (
                                <MenuItem
                                    key={currency}
                                    value={currency}
                                    selected={currency === getValues('toCurrency')}>
                                    {currency}
                                </MenuItem>
                            ))}
                        </COISelect>
                        <COITextField label={'ilość'} name={'amount'} control={control} type={'number'}/>

                        <Button type={'submit'} variant={'contained'}>Konwertuj</Button>
                    </form>
                </FormProvider>
            </Box>
        </HomeStyled>
    )
}

export default Home