import {useQuery, useQueryClient} from "react-query";
import {getCurrencyConvertData} from "../../services/api";
import {FormProvider, useForm} from "react-hook-form";
import {Box, MenuItem} from "@mui/material";
import COISelect from "../Form/Select";
import {AxiosResponse} from "axios";
import COITextField from "../Form/Textfield";

const Home: React.FC = () => {

    const queryClient = useQueryClient()


    const {data, isSuccess} = useQuery('currencyConvertData', getCurrencyConvertData);

    const getCurrencies = () => {
        const {symbols} = data;
        return Object.keys(symbols)
    }

    const methods = useForm({
        defaultValues: {
            startCurrency: '',
            endCurrency: '',
            convertedValue: 0,
        },
    });

    const {control, getValues} = methods;

    return (
        <Box>
            <FormProvider {...methods}>
                <COISelect label={'start currency'} name={'startCurrency'} control={control}>
                    <>
                        {!isSuccess && <MenuItem
                            value={''}>
                            no options
                        </MenuItem>}
                        {isSuccess && getCurrencies().map((currency: any) => (
                            <MenuItem
                                key={currency}
                                value={currency}
                                selected={currency === getValues('startCurrency')}>
                                {currency}
                            </MenuItem>
                        ))}
                    </>
                </COISelect>
                <COISelect label={'end currency'} name={'endCurrency'} control={control}>
                    <>
                        {!isSuccess && <MenuItem
                            value={''}>
                            no options
                        </MenuItem>}
                        {isSuccess && getCurrencies().map((currency: any) => (
                            <MenuItem
                                key={currency}
                                value={currency}
                                selected={currency === getValues('endCurrency')}>
                                {currency}
                            </MenuItem>
                        ))}
                    </>
                </COISelect>
                <COITextField label={'value'} name={'value'} control={control}/>
            </FormProvider>
        </Box>
    )
}

export default Home