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
import React, {useEffect, useRef, useState} from "react";
import TableComponent from './monthly-salary-table';
import FormComponent from './monthly-salary-form';
import axios from "axios";

export const MonthlySalaryForm = () => {
    console.log('Entering monthly-salary-form.js');
    const filePondRef = useRef();
    const [data, setData] = useState([]);
    const toast = useToast();

    const fetchData = async () => {
        const response = await fetch('/api/getMonthlyIncome');
        const responseData = await response.json();
        setData(responseData);
    };

    // Add this outside the form submit handler
    useEffect(() => {
        fetchData();
        const fileInput = document.querySelector('#proof');
        fileInput.addEventListener('change', (event) => {
            console.log(event.target.files[0]);
        });
    }, []);

    const handleSubmit = async (event) => {
        console.log('Form submitted');
        event.preventDefault();
        const formData = new FormData(event.target);

        console.log(filePondRef.current)
        console.log(filePondRef.current.getFiles())
        // Check if a file has been uploaded
        if (filePondRef.current.getFiles().length > 0) {
            // Get the file data from the FilePond instance
            const file = filePondRef.current.getFiles()[0].file;
            console.log('File:', file);
            formData.append('proof', file);
        } else {
            console.log('No file uploaded');
        }

        // Log the form data
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        console.log('Sending request to server');
        try {
            const response = await axios.post('/api/submitMonthlySalary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error during fetch:', error);
        }

        // Refresh the data
        await fetchData();
        // reset the fields
        event.target.reset();
        // Reset the FilePond instance
        filePondRef.current.removeFiles();


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
            <FormComponent onSubmit={handleSubmit} filePondRef={filePondRef} />
        </React.Fragment>
    )
}
export default MonthlySalaryForm;

