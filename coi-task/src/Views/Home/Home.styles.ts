import {styled} from '@mui/material';

export const HomeStyled = styled('div')(({theme}) => ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '.wrapperContent': {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    },
    'form': {
        display: 'flex',
        gap: 12,
        flexDirection: 'column',
        '& .MuiTextField-root': {
            width: 200
        }
    }
}))