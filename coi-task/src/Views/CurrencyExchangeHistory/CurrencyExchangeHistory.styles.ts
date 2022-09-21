import {styled} from '@mui/material';

export const CurrencyExchangeHistoryStyled = styled('div')(({theme}) => ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '.MuiTableContainer-root': {
        width: 500,
        gap: 12,
    },
    '.clearHistoryBtn':{
        marginTop: 12
    }
}))