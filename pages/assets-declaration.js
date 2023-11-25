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
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
function AuthenticatedContent() {
    const toast = useToast(); // Moved to the top
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(33.33)

    const [isAccordionView, setIsAccordionView] = useState(false);

    const toggleView = () => {
        setIsAccordionView(!isAccordionView);
    };

    return (
        <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
        >
            <Button onClick={toggleView} mb={4}>
                {isAccordionView ? "Switch to Progress Bar View" : "Switch to Accordion View"}
            </Button>

            <div style={{ display: isAccordionView ? 'block' : 'none' }}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Pendapatan Bulanan                                    </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <MonthlySalaryForm />
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Maklumat Harta
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <MaklumatHartaForm />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
            <div style={{ display: isAccordionView ? 'none' : 'block' }}>
                <Progress
                    hasStripe
                    value={progress}
                    mb="5%"
                    mx="5%"
                    isAnimated
                ></Progress>
                {step === 1 ? <MonthlySalaryForm /> : <MaklumatHartaForm />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1)
                                    setProgress(progress - 33.33)
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
                                    setStep(step + 1)
                                    if (step === 3) {
                                        setProgress(100)
                                    } else {
                                        setProgress(progress + 33.33)
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
                                    })
                                }}
                            >
                                Submit
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </div>
        </Box>
    );
}

export default function Multistep() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (!session) signIn(); // If not authenticated, force log in
    }, [session, status]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>Redirecting...</p>; // Show a redirecting message or a spinner
    }

    return (
        <Layout pageTitle='Asset Declaration'>
            <AuthenticatedContent />
        </Layout>
    );
}