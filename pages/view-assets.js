import { HartaTable } from './assets-declaration/maklumat-harta';
import TableComponent from './assets-declaration/monthly-salary-table';
import Layout from 'components/Layout';
import {Box, Center, Container, Flex, Heading} from "@chakra-ui/react";
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
                <Flex direction="row" justify="center" alignItems="flex-start">
                    <Center>
                        <TableComponent
                            data={data.filter(item => item.category === 'pegawai')}
                            title='Pegawai'
                        />
                    </Center>

                    <Box width="50px" />

                    <Center>
                        <TableComponent
                            data={data.filter(item => item.category === 'suami_isteri')}
                            title='Suami/Isteri'
                        />
                    </Center>
                </Flex>
                <br/>
                <TableComponent
                    data={data.filter(item => item.category === 'lain_lain')}
                    title='Lain-lain pendapatan'
                />
                <br/>
                <Box borderWidth="1px" borderRadius="lg" p="2" mb="2">
                    <Heading textAlign={"center"} size="sm">Maklumat Harta</Heading>
                </Box>
                <HartaTable />
            </Container>
        </Layout>
    );
}
