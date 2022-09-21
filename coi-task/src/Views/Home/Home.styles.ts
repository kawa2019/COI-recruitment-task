import {styled} from '@mui/material';

export const HomeStyled = styled('div')(({theme}) => ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    'form': {
        display: 'flex',
        gap: 12,
        flexDirection: 'column',
        '& .MuiTextField-root': {
            width: 200
        }
    }
}))