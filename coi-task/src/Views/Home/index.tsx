import {useMutation, useQuery} from "react-query";
import {convertAmount, getCurrenciesApi} from "../../services/api";
import {useNavigate} from 'react-router-dom';
import {FormProvider, useForm} from "react-hook-form";
import {Button, MenuItem} from "@mui/material";
import COISelect from "../../components/Form/Select";
import COITextField from "../../components/Form/Textfield";
import {HomeStyled} from "./Home.styles";
import {ConvertForm} from "./interfaces";
import {useCallback, useContext, useEffect} from "react";
import {AppContext} from "../../Context/Context";
import {HistoricalConvertsTypes} from "../../Context/HistoricalConvertsReducer";

const Home: React.FC = () => {
    const {dispatch, state} = useContext(AppContext);
    const navigate = useNavigate();

    const currenciesApi = useQuery('getCurrenciesApi', getCurrenciesApi);
    const {mutate, data, isSuccess} = useMutation((data: ConvertForm) => convertAmount(data));

    const methods = useForm<ConvertForm>({
        defaultValues: {
            startCurrency: '',
            endCurrency: '',
            amount: 0,
        },
    });

    const {control, getValues, handleSubmit} = methods;

    useEffect(() => {
        if (data) {
            const newHistoricalConverts = {data: [...state.historicalConverts.data, data]};

            dispatch({
                type: HistoricalConvertsTypes.SET_HISTORICAL_CONVERTS,
                payload: {data: [...state.historicalConverts.data, data]}
            });
            localStorage.setItem('historicalConverts', JSON.stringify(newHistoricalConverts));
            navigate('/historicalConverts')
        }
    }, [isSuccess])

    const onSubmit = (data: ConvertForm) => {
        mutate(data)
    };

    const getCurrenciesArr = useCallback(() => {
        const {symbols} = currenciesApi.data;
        return Object.keys(symbols)
    }, [currenciesApi])

    return (
        <HomeStyled>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <COISelect label={'początkowa waluta'} name={'startCurrency'} control={control}>
                        {!currenciesApi.data?.success && <MenuItem
                            value={''}>
                            no options
                        </MenuItem>}
                        {currenciesApi.data?.success && getCurrenciesArr().map((currency: any) => (
                            <MenuItem
                                key={currency}
                                value={currency}
                                selected={currency === getValues('startCurrency')}>
                                {currency}
                            </MenuItem>
                        ))}
                    </COISelect>
                    <COISelect label={'końcowa waluta'} name={'endCurrency'} control={control}>
                        {!currenciesApi.data?.success && <MenuItem
                            value={''}>
                            no options
                        </MenuItem>}
                        {currenciesApi.data?.success && getCurrenciesArr().map((currency: any) => (
                            <MenuItem
                                key={currency}
                                value={currency}
                                selected={currency === getValues('endCurrency')}>
                                {currency}
                            </MenuItem>
                        ))}
                    </COISelect>
                    <COITextField label={'ilość'} name={'amount'} control={control} type={'number'}/>

                    <Button type={'submit'} variant={'contained'}>Konwertuj</Button>
                </form>
            </FormProvider>
        </HomeStyled>
    )
}

export default Home