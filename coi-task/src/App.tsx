import React from 'react';
import './App.css';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Home from "./components/Home";
import {QueryClient, QueryClientProvider} from "react-query";
import {createTheme, CssBaseline, Theme, ThemeProvider} from "@mui/material";

export const coiTaskTheme: Theme = createTheme({})

const queryClient = new QueryClient()

const App: React.FC = () => {

    return (
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
                            element={<div>history</div>}
                        />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
