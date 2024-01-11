import { HartaTable } from './assets-declaration/maklumat-harta';
import TableComponent from './assets-declaration/monthly-salary-table';
import Layout from 'components/Layout';
import {Box, Center, Container, Flex, Heading, Spacer} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";

export default function ViewAssetsPage() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch('/api/getMonthlyIncome');
        const responseData = await response.json();
        setData(responseData);
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
                            data={data.filter(item => item.category === 'pegawai')}
                            title='Pegawai'
                        />
                    </Box>

                    {/* Adjust the Box width to be responsive */}
                    <Box width={{ base: "0", md: "50px" }} />

                    <Box flex="1" overflowX="auto">
                        <TableComponent
                            data={data.filter(item => item.category === 'suami_isteri')}
                            title='Suami/Isteri'
                        />
                    </Box>
                </Flex>



                <br/>
                <TableComponent
                    data={data.filter(item => item.category === 'lain_lain')}
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
