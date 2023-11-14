// @/components/Layout/index.js
import React, { useState } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar';
import MenuBarMobile from './MenuBarMobile';
import Header from './Header'; // import the Header component
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

export default function Layout({ pageTitle, children }) {
    // Concatenate page title (if exists) to site title
    let titleConcat = "Responsive Sidebar Example";
    if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <ChakraProvider>
                <Head>
                    <title>{titleConcat}</title>
                </Head>
                <div className="min-h-screen">
                    <div className="flex">
                        <MenuBarMobile setter={setShowSidebar} />
                        <Sidebar show={showSidebar} setter={setShowSidebar} />
                        <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
                            <Header title={pageTitle} /> {/* use the Header component */}
                            {children}
                        </div>
                    </div>
                </div>
            </ChakraProvider>
        </>
    )
}
