// _app.js
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { initializeApp } from 'firebase/app';
import 'firebaseui/dist/firebaseui.css';
import { firebaseConfig } from '@/firebaseConfig'; // Make sure to export firebaseConfig from this module

// Initialize Firebase
initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <div className="min-h-screen flex flex-col">
                <Component {...pageProps} />
            </div>
        </ChakraProvider>
    );
}
