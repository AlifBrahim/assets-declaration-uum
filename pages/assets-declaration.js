// @/components/DummyPage.js
'use client'
import {Form1} from "@/pages/assets-declaration/Form1";
import {Form2} from "@/pages/assets-declaration/Form2";
import {Form3} from "@/pages/assets-declaration/Form3";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";

import { useState } from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import React from 'react'
import Layout from 'components/Layout'
export default function Multistep() {
    const toast = useToast()
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(33.33)

    const [isAccordionView, setIsAccordionView] = useState(false);

    const toggleView = () => {
        setIsAccordionView(!isAccordionView);
    };

    return (
        <>
            <Layout pageTitle='Asset Declaration'>
                <Box
                    borderWidth="1px"
                    rounded="lg"
                    shadow="1px 1px 3px rgba(0,0,0,0.3)"
                    maxWidth={800}
                    p={6}
                    m="10px auto"
                    as="form"
                >
                    <Button onClick={toggleView} mb={4}>
                        {isAccordionView ? "Switch to Progress Bar View" : "Switch to Accordion View"}
                    </Button>


                    {isAccordionView ? (
                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Perisytiharan Harta
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>
                                    <Form1 />
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Pendapatan Bulanan                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>
                                    <Form2 />
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
                                    <Form3 />
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <>
                            <Progress
                                hasStripe
                                value={progress}
                                mb="5%"
                                mx="5%"
                                isAnimated
                            ></Progress>
                            {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
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
                                            isDisabled={step === 3}
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
                                    {step === 3 ? (
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
                        </>
                    )}
                </Box>
            </Layout>
        </>
    );
}
