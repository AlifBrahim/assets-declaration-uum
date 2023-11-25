import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Skeleton,
    Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Spacer, Heading, Select, useToast
} from "@chakra-ui/react";
export const HartaTable = ({ refreshKey }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch('/api/getAssetInformation');
        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [refreshKey]); // Add refreshKey here

    return(
        <>
            <Box overflowX="auto">
                <Skeleton isLoaded={!isLoading}>
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
                            {data.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.jenisHarta}</Td>
                                    <Td>{item.pemilikHarta}</Td>
                                    <Td>{item.keteranganHarta}</Td>
                                    <Td>{item.noSijilPendaftaran}</Td>
                                    <Td>{item.tarikhPemilikan}</Td>
                                    <Td>{item.jumlahKuantiti}</Td>
                                    <Td>{item.ukuranKuantiti}</Td>
                                    <Td>{item.nilaiPerolehanHarta}</Td>
                                    <Td>{item.anggaranNilaiSemasa}</Td>
                                    <Td>{item.caraDiperolehi}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Skeleton>
            </Box>
        </>
    );
}
const HartaForm = ({onSubmit}) => (
    <VStack spacing={5}>
        <Box w="500px">
            <form onSubmit={onSubmit}>
                <FormControl id="jenisHarta">
                    <FormLabel>Jenis Harta</FormLabel>
                    <Select
                        id="jenisHarta"
                        name="jenisHarta"
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
                        name="pemilikHarta"
                    >
                        <option value="sendiri">Sendiri</option>
                        <option value="isteri">Isteri/Suami</option>
                        <option value="anak">Anak</option>
                        <option value="lain">Lain-lain</option>
                    </Select>
                </FormControl>

                <FormControl id="keteranganHarta">
                    <FormLabel>Keterangan Harta</FormLabel>
                    <Input name="keteranganHarta" type="text" />
                </FormControl>

                <FormControl id="alamatHarta">
                    <FormLabel>Alamat Harta</FormLabel>
                    <Input name="alamatHarta" type="text" />
                </FormControl>

                <FormControl id="poskod">
                    <FormLabel>Poskod</FormLabel>
                    <Input name="poskod" type="text" />
                </FormControl>

                <FormControl id="bandar">
                    <FormLabel>Bandar</FormLabel>
                    <Input name="bandar" type="text" />
                </FormControl>

                <FormControl id="negeri">
                    <FormLabel>Negeri</FormLabel>
                    <Input name="negeri" type="text" />
                </FormControl>

                <FormControl id="noSijilPendaftaran">
                    <FormLabel>No. Sijil Pendaftaran</FormLabel>
                    <Input name="noSijilPendaftaran" type="text" />
                </FormControl>

                <FormControl id="tarikhPemilikan">
                    <FormLabel>Tarikh Pemilikan</FormLabel>
                    <Input name="tarikhPemilikan" type="date" />
                </FormControl>

                <FormControl id="jumlahKuantiti">
                    <FormLabel>Jumlah Kuantiti</FormLabel>
                    <Input name="jumlahKuantiti" type="number" />
                </FormControl>

                <FormControl id="ukuranKuantiti">
                    <FormLabel>Ukuran Kuantiti</FormLabel>
                    <Input name="ukuranKuantiti" type="number" />
                </FormControl>

                <FormControl id="nilaiPerolehanHarta">
                    <FormLabel>Nilai Perolehan Harta</FormLabel>
                    <Input name="nilaiPerolehanHarta" type="number" />
                </FormControl>

                <FormControl id="anggaranNilaiSemasa">
                    <FormLabel>Anggaran Nilai Semasa</FormLabel>
                    <Input name="anggaranNilaiSemasa" type="number" />
                </FormControl>

                <FormControl id="keteranganLain">
                    <FormLabel>Keterangan Lain (Jika Ada)</FormLabel>
                    <Input name="keteranganLain" type="text" />
                </FormControl>

                <FormControl id="caraDiperolehi">
                    <FormLabel>Cara Diperolehi</FormLabel>
                    <Select name="caraDiperolehi">
                        <option value="belian">Belian</option>
                        <option value="hadiah">Hadiah</option>
                        <option value="warisan">Warisan</option>
                        <option value="lain">Lain-lain</option>
                    </Select>
                </FormControl>
                <Button type="submit" colorScheme="red" mt={5}>
                    Tambah
                </Button>
            </form>
        </Box>
    </VStack>
);
export const MaklumatHartaForm = () => {
    const toast = useToast();

    const [data, setData] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0); // Add this line


    const fetchData = async () => {
        const response = await fetch('/api/getAssetInformation');
        const responseData = await response.json();
        setData(responseData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const response = await fetch('/api/submitAssetInformation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
        // Refresh the data
        await fetchData();
        // Trigger a refresh of HartaTable
        setRefreshKey(refreshKey => refreshKey + 1); // Add this line
        toast({
            title: "Form submitted.",
            description: "Your form has been successfully submitted.",
            status: "success",
            duration: 3000,
            isClosable: true
        })

        // Clear the form
        event.target.reset();
    };

    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                Maklumat Harta
            </Heading>

            <br/>
            <HartaTable key={refreshKey} /> {/* Add key prop here */}
            <br/>
            <HartaForm onSubmit={handleSubmit} />
        </>
    );
};