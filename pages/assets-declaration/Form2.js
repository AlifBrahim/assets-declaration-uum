// Form2.js
import {
    Heading,
    FormControl,
    FormLabel,
    Select,
    GridItem, Input,
    Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Spacer, Box, Button,
} from '@chakra-ui/react'
import React from "react";

export const Form2 = () => {
    console.log('Entering Form2.js');
    const handleSubmit = async (event) => {
        console.log('Form submitted');
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const response = await fetch('/api/submitForm2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
        alert("Successlah!");
    };

    return (
        <React.Fragment>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                Pendapatan Bulanan
            </Heading>
            <br/>
            <Flex direction="row" justify="space-between">
                <Box>
                    <Box borderWidth="1px" borderRadius="lg" p="2" mb="2">
                        <Heading textAlign={"center"} size="sm">Pegawai</Heading>
                    </Box>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>BIL</Th>
                                <Th>KETERANGAN</Th>
                                <Th>AMAUN</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/* Your rows for the first table go here */}
                        </Tbody>
                    </Table>
                </Box>

                <Box width="50px" />

                <Box>
                    <Box borderWidth="1px" borderRadius="lg" p="2" mb="2">
                        <Heading textAlign={"center"} size="sm">Suami/Isteri</Heading>
                    </Box>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>BIL</Th>
                                <Th>KETERANGAN</Th>
                                <Th>AMAUN</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/* Your rows for the second table go here */}
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
            <br/>
            <Box>
                <Box borderWidth="1px" borderRadius="lg" p="2" mb="2">
                    <Heading textAlign={"center"} size="sm">Lain-lain pendapatan</Heading>
                </Box>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>BIL</Th>
                            <Th>KETERANGAN</Th>
                            <Th>AMAUN</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* Your rows for the first table go here */}
                    </Tbody>
                </Table>
            </Box>
            <br/>
            <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel
                    htmlFor="keterangan"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50"
                    }}
                >
                    Keterangan
                </FormLabel>
                < Input
                    id='keterangan'
                    name='keterangan'
                    placeholder='Keterangan'
                >
                </Input>
            </FormControl>
                <FormControl>
                    <FormLabel htmlFor="category" fontSize="sm" fontWeight="md" color="gray.700" _dark={{color: "gray.50"}}>Category</FormLabel>
                    <Select id="category" name="category" placeholder="Category">
                        <option value="pegawai">Pegawai</option>
                        <option value="suami_isteri">Suami/Isteri</option>
                        <option value="lain_lain">Lain-lain pendapatan</option>
                    </Select>
                </FormControl>

            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                <FormLabel
                    htmlFor="salary_jumlah"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50"
                    }}
                    mt="2%"
                >
                    Jumlah (RM)
                </FormLabel>
                <Input
                    type="number"
                    name="salary_jumlah"
                    id="salary_jumlah"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>
            <Button colorScheme="red" mt={5}>
                Tambah
            </Button>
                <button type="submit">Submit</button>
            </form>

        </React.Fragment>
    )
}
