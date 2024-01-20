// FormComponent.js
import { Button, FormControl, FormLabel, FormErrorMessage, Input, Select } from '@chakra-ui/react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Yup schema for validation
const validationSchema = yup.object({
    keterangan: yup.string().required('Keterangan is required'),
    category: yup.string().oneOf(['pegawai', 'suami_isteri', 'lain_lain'], 'Invalid category').required('Category is required'),
    salary_jumlah: yup.number().positive('Jumlah must be positive').required('Jumlah is required'),
    // Add more fields if necessary
});

const FormComponent = ({ onSubmit, filePondRef }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <FormControl isInvalid={errors.keterangan}>
                <FormLabel htmlFor="keterangan">Keterangan</FormLabel>
                <Input
                    id='keterangan'
                    name='keterangan'
                    placeholder='Keterangan'
                    {...register('keterangan')}
                />
                <FormErrorMessage>{errors.keterangan?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.category}>
                <FormLabel htmlFor="category">Kategori</FormLabel>
                <Select id="category" name="category" placeholder="Kategori" {...register('category')}>
                    <option value="pegawai">Pegawai</option>
                    <option value="suami_isteri">Suami/Isteri</option>
                    <option value="lain_lain">Lain-lain pendapatan</option>
                </Select>
                <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.salary_jumlah}>
                <FormLabel htmlFor="salary_jumlah">Jumlah (RM)</FormLabel>
                <Input
                    type="number"
                    name="salary_jumlah"
                    id="salary_jumlah"
                    {...register('salary_jumlah')}
                />
                <FormErrorMessage>{errors.salary_jumlah?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.proof}>
                <FormLabel htmlFor="proof">Bukti</FormLabel>
                <FilePond name="proof" id="proof" ref={filePondRef} />
                <FormErrorMessage>{errors.proof?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="red" mt={5}>
                Tambah
            </Button>
        </form>
    );
};

export default FormComponent;
