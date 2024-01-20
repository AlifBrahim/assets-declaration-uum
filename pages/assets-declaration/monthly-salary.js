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
import {getAuth} from "firebase/auth";

export const MonthlySalaryForm = () => {
    console.log('Entering monthly-salary-form.js');
    const filePondRef = useRef();
    const [data, setData] = useState([]);
    const toast = useToast();

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const idToken = await user.getIdToken();
                const response = await fetch('/api/getMonthlyIncome', {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();
                setData(responseData);
            } else {
                throw new Error('User not authenticated');
            }
        } catch (error) {
            toast({
                title: "Error fetching data",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };


    // Add this outside the form submit handler
    useEffect(() => {
        fetchData();
        const fileInput = document.querySelector('#proof');
        fileInput.addEventListener('change', (event) => {
            console.log(event.target.files[0]);
        });
    }, []);

    const handleSubmit = async (formData) => {
        console.log('Form submitted with data:', formData);

        // Get the current user's ID token from Firebase
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            toast({
                title: "Error",
                description: "Not authenticated",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const idToken = await user.getIdToken();

        // FormData can be created from the form data object
        const form = new FormData();
        for (const name in formData) {
            form.append(name, formData[name]);
        }

        // If you have a file to append, handle it here
        // Check if FilePond instance has files
        if (filePondRef.current && filePondRef.current.getFiles().length > 0) {
            // Get the file data from the FilePond instance
            const file = filePondRef.current.getFiles()[0].file;
            form.append('proof', file);
        }

        // Attach the Firebase ID token in the headers
        const headers = {
            'Authorization': idToken,
            // Include other headers as needed
        };

        console.log('Sending request to server');
        try {
            const response = await axios.post('/api/submitMonthlySalary', form, { headers });
            console.log('Server response:', response.data);

            // Refresh the data after successful submission
            await fetchData();

            // Reset the FilePond instance
            filePondRef.current.removeFiles();

            toast({
                title: "Form submitted.",
                description: "Your form has been successfully submitted.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error during fetch:', error);
            toast({
                title: "Error",
                description: "Failed to submit form",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };




    return (
        <React.Fragment>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
                Pendapatan Bulanan
            </Heading>
            <br/>
            <Flex direction="row" justify="space-between">
                <Box overflowX="auto">
                    <TableComponent
                        data={data.filter(item => item.category === 'pegawai')}
                        title='Pegawai'
                    />
                </Box>

                <Box width="50px" />

                <Box overflowX="auto">
                    <TableComponent
                        data={data.filter(item => item.category === 'suami_isteri')}
                        title='Suami/Isteri'
                    />
                </Box>
            </Flex>
            <br/>
            <Box overflowX="auto">
                <TableComponent
                    data={data.filter(item => item.category === 'lain_lain')}
                    title='Lain-lain pendapatan'
                />
            </Box>
            <br/>
            <FormComponent onSubmit={handleSubmit} filePondRef={filePondRef} />
        </React.Fragment>
    )
}
export default MonthlySalaryForm;

