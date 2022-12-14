import React from 'react';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Home from "./Views/Home";
import {QueryClient, QueryClientProvider} from "react-query";
import {createTheme, CssBaseline, Theme, ThemeProvider} from "@mui/material";
import HistoricalConverts from "./Views/CurrencyExchangeHistory";
import {AppProvider} from "./Context/Context";

export const coiTaskTheme: Theme = createTheme({})

const queryClient = new QueryClient()

const App: React.FC = () => {

    return (
        <AppProvider>
            <ThemeProvider theme={coiTaskTheme}>
                <CssBaseline/>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path={'/'}
                                element={<Home/>}
                            />
                            <Route
                                path={'/history'}
                                element={<HistoricalConverts/>}
                            />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </ThemeProvider>
        </AppProvider>
    );
};

export default App;
