import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

export default function App({
                              Component,
                              pageProps: { session, ...pageProps },
                            }) {
  return(
      <SessionProvider session={session}>
        <ChakraProvider>
    <div className="min-h-screen flex flex-col">
      <Component {...pageProps} />
    </div>
    </ChakraProvider>
      </SessionProvider>
  )

  // <Component {...pageProps} />
}
