// Form2.js
import {
    Heading,
    FormControl,
    FormLabel,
    Select,
    GridItem, Input,
    Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Spacer, Box,
} from '@chakra-ui/react'
import React from "react";

export const Form2 = () => {
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                Pendapatan Bulanan
            </Heading>
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
                                <Th>AMUAN</Th>
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
                                <Th>AMUAN</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/* Your rows for the second table go here */}
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
            <FormControl>
                <FormLabel
                    htmlFor="country"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50"
                    }}
                >
                    Country / Region
                </FormLabel>
                <Select
                    id="country"
                    name="country"
                    autoComplete="country"
                    placeholder="Select option"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                </Select>
            </FormControl>

            <FormControl as={GridItem} colSpan={6}>
                <FormLabel
                    htmlFor="street_address"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50"
                    }}
                    mt="2%"
                >
                    Street address
                </FormLabel>
                <Input
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50"
                    }}
                    mt="2%"
                >
                    City
                </FormLabel>
                <Input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                <FormLabel
                    htmlFor="state"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50"
                    }}
                    mt="2%"
                >
                    State / Province
                </FormLabel>
                <Input
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="state"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                <FormLabel
                    htmlFor="postal_code"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50"
                    }}
                    mt="2%"
                >
                    ZIP / Postal
                </FormLabel>
                <Input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    autoComplete="postal-code"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>
        </>
    )
}
