// @/components/DummyPage.js
import {MonthlySalaryForm} from "@/pages/assets-declaration/monthly-salary";
import {MaklumatHartaForm} from "@/pages/assets-declaration/maklumat-harta";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";

import {useEffect, useState} from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import React from 'react'
import Layout from 'components/Layout'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {useRouter} from "next/router";


function AuthenticatedContent() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);

    // Wrap the content in a Box with padding
    return (
        <Box
            p={{ base: "2", md: "6" }} // Padding: 2 on base, 6 on medium screens and up
            m={{ base: "2", md: "6" }} // Margin: 2 on base, 6 on medium screens and up
            mx="auto" // Center horizontally
            maxW={{ base: "xl", md: "3xl" }} // Max width: "xl" on base, "3xl" on medium screens and up
        >
            <Progress
                hasStripe
                value={progress}
                mb="5%"
                isAnimated
            />
            {step === 1 ? <MonthlySalaryForm /> : <MaklumatHartaForm />}
            <ButtonGroup mt="5%" w="100%">
                <Flex w="100%" justifyContent="space-between">
                        <Flex>
                        <Button
                            onClick={() => {
                                setStep(step - 1);
                                setProgress(progress - 33.33);
                            }}
                            isDisabled={step === 1}
                            colorScheme="teal"
                            variant="solid"
                            w="7rem"
                            mr="5%"
                        >
                            Back
                        </Button>
                        <Button
                            w="7rem"
                            isDisabled={step === 2}
                            onClick={() => {
                                setStep(step + 1);
                                if (step === 3) {
                                    setProgress(100);
                                } else {
                                    setProgress(progress + 33.33);
                                }
                            }}
                            colorScheme="teal"
                            variant="outline"
                        >
                            Next
                        </Button>
                    </Flex>
                    {step === 2 ? (
                        <Button
                            w="7rem"
                            colorScheme="red"
                            variant="solid"
                            onClick={() => {
                                toast({
                                    title: "Account created.",
                                    description: "We've created your account for you.",
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true
                                });
                            }}
                        >
                            Submit
                        </Button>
                    ) : null}
                </Flex>
            </ButtonGroup>
        </Box>
    );
}



export default function Multistep() {
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // User is not signed in, redirect them to the sign-in page
                router.push('/signin');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth, router]);

    // If not authenticated, show a loading indicator or return null
    if (!auth.currentUser) {
        return <p>Loading...</p>; // Or a loading spinner
    }

    return (
        <Layout pageTitle='Asset Declaration'>
            <AuthenticatedContent />
        </Layout>
    );
}