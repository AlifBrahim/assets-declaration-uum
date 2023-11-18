// Form1.js
import { useState } from 'react'
import {
    Heading,
    Flex,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    InputGroup,
    Button,
    InputRightElement,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Tfoot,
    Td,
    TableCaption,
    Th,
    Select,
    Text,
    Radio,
    RadioGroup, Stack,
} from '@chakra-ui/react'


export const Form1 = () => {
    const [value, setValue] = useState('1')
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                Perisytiharan Harta
            </Heading>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

            <Flex>
                <FormControl mr="5%">
                    <FormLabel htmlFor="jenis-isytihar" fontWeight={"normal"}>
                        Jenis Perisytaharan
                    </FormLabel>
                    <Select id="jenis-isytihar">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="no-fail" fontWeight={"normal"}>
                        No fail
                    </FormLabel>
                    <Input id="no-fail" placeholder="No fail" />
                </FormControl>
            </Flex>

            <FormControl mt="2%">
                <FormLabel htmlFor="nama-pasangan" fontWeight={"normal"}>
                    Nama Pasangan
                </FormLabel>
                <Text>Letak nama </Text>
                <Input id="nama-pasangan" />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="kategori-perisytiharan" fontWeight={"normal"} mt="2%">
                    Kategori Perisytiharan
                </FormLabel>
                <RadioGroup onChange={setValue} value={value}>
                    <Stack direction='row'>
                        <Radio value='1'>First</Radio>
                        <Radio value='2'>Second</Radio>
                        <Radio value='3'>Third</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
        </>
    )
}