import React from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Spacer, Heading, Select
} from "@chakra-ui/react";

export const Form3 = () => {
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                Maklumat Harta
            </Heading>

            <br/>
            <Box overflowX="auto">
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>BIL</Th>
                            <Th>JENIS</Th>
                            <Th>PEMILIK</Th>
                            <Th>KETERANGAN HARTA</Th>
                            <Th>NO SIJIL PENDAFTARAN</Th>
                            <Th>TARIKH PEMILIKAN</Th>
                            <Th>JUMLAH KUANTITI</Th>
                            <Th>UKURAN KUANTITI</Th>
                            <Th>NILAI PEROLEH HARTA</Th>
                            <Th>ANGGARAN NILAI SEMASA</Th>
                            <Th>CARA DIPEROLEHI</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* Your rows for the first table go here */}
                    </Tbody>
                </Table>
            </Box>
            <br/>
        <VStack spacing={5}>
            <Box w="500px">
                <FormControl id="jenisHarta">
                    <FormLabel>Jenis Harta</FormLabel>
                    <Select
                        id="jenisHarta"
                    >
                        <option value="saham">Saham</option>
                        <option value="tanah">Tanah</option>
                        <option value="kenderaan">Kenderaan</option>
                        <option value="lain">Lain-lain</option>
                    </Select>
                </FormControl>

                <FormControl id="pemilikHarta">
                    <FormLabel>Pemilik Harta</FormLabel>
                    <Select
                        id = "pemilikHarta"
                    >
                        <option value="sendiri">Sendiri</option>
                        <option value="isteri">Isteri/Suami</option>
                        <option value="anak">Anak</option>
                        <option value="lain">Lain-lain</option>
                    </Select>
                </FormControl>

                <FormControl id="keteranganHarta">
                    <FormLabel>Keterangan Harta</FormLabel>
                    <Input type="text" />
                </FormControl>

                <FormControl id="alamatHarta">
                    <FormLabel>Alamat Harta</FormLabel>
                    <Input type="text" />
                </FormControl>

                <FormControl id="poskod">
                    <FormLabel>Poskod</FormLabel>
                    <Input type="text" />
                </FormControl>

                <FormControl id="bandar">
                    <FormLabel>Bandar</FormLabel>
                    <Input type="text" />
                </FormControl>

                <FormControl id="negeri">
                    <FormLabel>Negeri</FormLabel>
                    <Input type="text" />
                </FormControl>

                <FormControl id="noSijilPendaftaran">
                    <FormLabel>No. Sijil Pendaftaran</FormLabel>
                    <Input type="text" />
                </FormControl>

                <FormControl id="tarikhPemilikan">
                    <FormLabel>Tarikh Pemilikan</FormLabel>
                    <Input type="date" />
                </FormControl>

                <FormControl id="jumlahKuantiti">
                    <FormLabel>Jumlah Kuantiti</FormLabel>
                    <Input type="number" />
                </FormControl>

                <FormControl id="ukuranKuantiti">
                    <FormLabel>Ukuran Kuantiti</FormLabel>
                    <Input type="number" />
                </FormControl>

                <FormControl id="nilaiPerolehanHarta">
                    <FormLabel>Nilai Perolehan Harta</FormLabel>
                    <Input type="number" />
                </FormControl>

                <FormControl id="anggaranNilaiSemasa">
                    <FormLabel>Anggaran Nilai Semasa</FormLabel>
                    <Input type="number" />
                </FormControl>

                <FormControl id="keteranganLain">
                    <FormLabel>Keterangan Lain (Jika Ada)</FormLabel>
                    <Input type="text" />
                </FormControl>

                <FormControl id="caraDiperolehi">
                    <FormLabel>Cara Diperolehi</FormLabel>
                    <Select>
                        <option value="belian">Belian</option>
                        <option value="hadiah">Hadiah</option>
                        <option value="warisan">Warisan</option>
                        <option value="lain">Lain-lain</option>
                    </Select>
                </FormControl>

                <Button colorScheme="red" mt={5}>
                    Tambah
                </Button>
            </Box>
        </VStack>
        </>
    );
};
