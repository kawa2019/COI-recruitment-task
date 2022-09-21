import * as yup from 'yup';

export const ConvertFormSchema = yup
    .object({
        fromCurrency: yup
            .string()
            .required('pole wymagane')
            .notOneOf(
                [
                    yup.ref('toCurrency')
                ],
                'Waluty muszą być inne '
            ),
        toCurrency: yup
            .string()
            .required('pole wymagane')
            .notOneOf(
                [
                    yup.ref('fromCurrency')
                ],
                'Waluty muszą być inne '
            ),
        amount: yup
            .number()
            .required('pole wymagane')
            .min(1, 'Wartość powinna być wieksza od 1')
    })
    .required();

export default ConvertFormSchema;
