import {styled} from '@mui/material';

export const HistoricalConvertsStyled = styled('div')(({theme}) => ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 12,
    '.MuiTableContainer-root': {
        width: 500
    }
}))