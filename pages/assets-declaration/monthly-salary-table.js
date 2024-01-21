import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

const TableComponent = ({ data, title }) => {
    // Skeleton should be considered loaded whether data is empty or not.
    // Therefore, checking if data is not undefined or null should suffice.
    const isLoaded = data !== undefined && data !== null;

    return (
        <Box>
            <Box borderWidth="1px" borderRadius="lg" p="2" mb="2">
                <Heading textAlign={"center"} size="sm">{title}</Heading>
            </Box>
            <Skeleton isLoaded={isLoaded}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>BIL</Th>
                            <Th>KETERANGAN</Th>
                            <Th>AMAUN</Th>
                            <Th>BUKTI</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoaded && data.length > 0 ? (
                            data.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.description}</Td>
                                    <Td>{item.amount}</Td>
                                    <Td>{/* Logic to display proof */}</Td>
                                </Tr>
                            ))
                        ) : (
                            // If data is loaded and is empty, display 'No Data'.
                            <Tr>
                                <Td colSpan="4">
                                    <Text textAlign="center">No Data</Text>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Skeleton>
        </Box>
    );
};

export default TableComponent;
