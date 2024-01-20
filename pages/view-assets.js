import { HartaTable } from './assets-declaration/maklumat-harta';
import TableComponent from './assets-declaration/monthly-salary-table';
import Layout from 'components/Layout';
import {Box, Center, Container, Flex, Heading, Spacer, useToast} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";

export default function ViewAssetsPage() {
    const toast = useToast();

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const idToken = await user.getIdToken();
                const response = await fetch('/api/getMonthlyIncome', {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();
                // Check if responseData is an array before setting it to state
                if (Array.isArray(responseData)) {
                    setData(responseData);
                } else {
                    // Handle the case where responseData is not an array
                    console.error('Response data is not an array:', responseData);
                    toast({
                        title: "Error",
                        description: "Data format is incorrect",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } else {
                throw new Error('User not authenticated');
            }
        } catch (error) {
            toast({
                title: "Error fetching data",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout title="View Assets">
            <Container maxW="container.xl" >

                <Heading>Pendapatan Bulanan</Heading>
                <Box width="50px" />
                <br/>

                <Flex direction={{ base: "column", md: "row" }} justify="center" alignItems="flex-start" p={4}>
                    <Box flex="1" overflowX="auto">
                        <TableComponent
                            data={Array.isArray(data) ? data.filter(item => item.category === 'pegawai') : []}
                            title='Pegawai'
                        />

                    </Box>

                    {/* Adjust the Box width to be responsive */}
                    <Box width={{ base: "0", md: "50px" }} />

                    <Box flex="1" overflowX="auto">
                        <TableComponent
                            data={Array.isArray(data) ? data.filter(item => item.category === 'suami_isteri'): []}
                            title='Suami/Isteri'
                        />
                    </Box>
                </Flex>



                <br/>
                <TableComponent
                    data={Array.isArray(data) ? data.filter(item => item.category === 'lain_lain') : []}
                    title='Lain-lain pendapatan'
                />
                <br/>
                <Heading>Maklumat Harta</Heading>
                <br/>
                <Box borderWidth="1px" borderRadius="lg" p="2" mb="2">
                    <Heading textAlign={"center"} size="sm">Maklumat Harta</Heading>
                </Box>
                <HartaTable />
            </Container>
        </Layout>
    );
}
