import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr, Skeleton } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const TableComponent = ({ data, title }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(false);
        }
    }, [data]);

    return (
        <Box>
            <Box borderWidth="1px" borderRadius="lg" p="2" mb="2">
                <Heading textAlign={"center"} size="sm">{title}</Heading>
            </Box>
            <Skeleton isLoaded={!isLoading}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>BIL</Th>
                            <Th>KETERANGAN</Th>
                            <Th>AMAUN</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{item.description}</Td>
                                <Td>{item.amount}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Skeleton>
        </Box>
    );
};

export default TableComponent;
