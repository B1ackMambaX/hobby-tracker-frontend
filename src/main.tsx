import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import {ChakraProvider, defaultSystem} from "@chakra-ui/react";
import {Provider} from "react-redux";
import store from "@/store";
import {registerSW} from "virtual:pwa-register";

registerSW({
    immediate: false,
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider value={defaultSystem}>
                <App/>
            </ChakraProvider>
        </Provider>
    </StrictMode>,
)
