// // Form1.js
// import { useState } from 'react'
// import axios from 'axios' // You'll need to install this package
// import {
//     Heading,
//     Flex,
//     FormControl,
//     FormLabel,
//     Input,
//     FormHelperText,
//     InputGroup,
//     Button,
//     InputRightElement,
//     TableContainer,
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Tfoot,
//     Td,
//     TableCaption,
//     Th,
//     Select,
//     Text,
//     Radio,
//     RadioGroup, Stack,
// } from '@chakra-ui/react'
//
//
// export const Form1 = () => {
//     const [value, setValue] = useState('1')
//     const [show, setShow] = useState(false)
//     const handleClick = () => setShow(!show)
//     const [formState, setFormState] = useState({
//         jenisPerisytaharan: '',
//         noFail: '',
//         namaPasangan: '',
//         kategoriPerisytiharan: '',
//     })
//     const handleChange = (e) => {
//         setFormState({
//             ...formState,
//             [e.target.name]: e.target.value,
//         })
//     }
//
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const response = await axios.post('/api/asset_declaration', formState)
//             console.log(response.data)
//         } catch (error) {
//             console.error(error)
//         }
//     }
//
//
//     return (
//         <>
//             <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
//                 Perisytiharan Harta
//             </Heading>
//             <TableContainer>
//                 <Table variant="simple">
//                     <Thead>
//                         <Tr>
//                             <Th>BIL</Th>
//                             <Th>TAHUN</Th>
//                             <Th>NO FAIL</Th>
//                             <Th>JENIS</Th>
//                             <Th>KATEGORI</Th>
//                             <Th>STATUS</Th>
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {/* Your rows for the first table go here */}
//                     </Tbody>
//                 </Table>
//             </TableContainer>
//             <form onSubmit={handleSubmit}>
//
//             <Flex>
//                     <FormControl mr="5%">
//                         <FormLabel htmlFor="jenis-isytihar" fontWeight={"normal"}>
//                             Jenis Perisytaharan
//                         </FormLabel>
//                         <Select id="jenis-isytihar" name="jenis_perisytaharan" onChange={handleChange}>
//                             <option value="option1">Option 1</option>
//                             <option value="option2">Option 2</option>
//                         </Select>
//                     </FormControl>
//             </Flex>
//
//                 <FormControl>
//                 <FormLabel htmlFor="kategori-perisytiharan" fontWeight={"normal"} mt="2%">
//                     Kategori Perisytiharan
//                 </FormLabel>
//                 <RadioGroup name="kategori_perisytiharan" onChange={setValue} value={value}>
//                     <Stack direction='row'>
//                         <Radio value='1'>First</Radio>
//                         <Radio value='2'>Second</Radio>
//                         <Radio value='3'>Third</Radio>
//                     </Stack>
//                 </RadioGroup>
//             </FormControl>
//             <Button type="submit">Tambah</Button>
//         </form>
//         </>
//     )
// }