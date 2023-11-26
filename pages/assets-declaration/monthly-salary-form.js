// FormComponent.js
import { Button, FormControl, FormLabel, GridItem, Input, Select } from '@chakra-ui/react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import React, { useRef } from 'react';

const FormComponent = ({ onSubmit, filePondRef }) => (
    <form onSubmit={onSubmit} encType="multipart/form-data">
        <FormControl isRequired>
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
                required
            />
        </FormControl>
        <FormControl isRequired>
            <FormLabel htmlFor="category" fontSize="sm" fontWeight="md" color="gray.700"
                       _dark={{color: "gray.50"}}>Kategori</FormLabel>
            <Select id="category" name="category" placeholder="Kategori" required>
                <option value="pegawai">Pegawai</option>
                <option value="suami_isteri">Suami/Isteri</option>
                <option value="lain_lain">Lain-lain pendapatan</option>
            </Select>
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 6, null, 2]} isRequired>
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
                required
            />
        </FormControl>
        <br/>
        <FormControl>
            <FormLabel htmlFor="proof"  fontWeight="md" color="gray.700" _dark={{color: "gray.50"}}>Bukti</FormLabel>
            <FilePond name="proof" id="proof" ref={filePondRef} />
        </FormControl>
        <Button type="submit" colorScheme="red" mt={5}>
            Tambah
        </Button>
    </form>
);
export default FormComponent;

