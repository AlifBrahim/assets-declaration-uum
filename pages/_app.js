import '@/styles/globals.css'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return(
      <>
        <ChakraProvider>
    <div className="min-h-screen flex flex-col">
      <Component {...pageProps} />
    </div>
    </ChakraProvider>
      </>
  )

  // <Component {...pageProps} />
}
