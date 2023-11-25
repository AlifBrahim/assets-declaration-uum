import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    Select,
    useToast
} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import TableComponent from './monthly-salary-table';
import FormComponent from './monthly-salary-form';

export const MonthlySalaryForm = () => {
    console.log('Entering monthly-salary-form.js');

    const [data, setData] = useState([]);
    const toast = useToast();

    const fetchData = async () => {
        const response = await fetch('/api/getMonthlyIncome');
        const responseData = await response.json();
        setData(responseData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        console.log('Form submitted');
        event.preventDefault();
        const formData = new FormData(event.target);

        const response = await fetch('/api/submitMonthlySalary', {
            method: 'POST',
            body: formData,
        });
        const responseData = await response.json();
        console.log(responseData);
        // In your form submit handler
        const fileInput = document.querySelector('#proof');
        console.log(fileInput.files[0]);
        fileInput.addEventListener('change', (event) => {
            console.log(event.target.files[0]);
        });

        // Refresh the data
        fetchData();
        // reset the fields
        event.target.reset();


        toast({
            title: "Form submitted.",
            description: "Your form has been successfully submitted.",
            status: "success",
            duration: 3000,
            isClosable: true
        })
    };


    return (
        <React.Fragment>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                Pendapatan Bulanan
            </Heading>
            <br/>
            <Flex direction="row" justify="space-between">
                <TableComponent
                    data={data.filter(item => item.category === 'pegawai')}
                    title='Pegawai'
                />

                <Box width="50px" />

                <TableComponent
                    data={data.filter(item => item.category === 'suami_isteri')}
                    title='Suami/Isteri'
                />
            </Flex>
            <br/>
            <TableComponent
                data={data.filter(item => item.category === 'lain_lain')}
                title='Lain-lain pendapatan'
            />
            <br/>
            <FormComponent onSubmit={handleSubmit} />
        </React.Fragment>
    )
}
