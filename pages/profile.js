import { Box, Image, Text, Link, Stack, Heading, Flex, Button, Skeleton } from "@chakra-ui/react";
import Layout from 'components/Layout'
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isImageLoading, setIsImageLoading] = useState(true);

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

    const handleLogout = () => {
        // Add your logout logic here
        signOut();
    };

    return (
        <Layout title="Profile">
            <Flex justify="center" align="center">
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Skeleton isLoaded={!isImageLoading}>
                        <Image src="https://bit.ly/sage-adebayo" alt="Adrian Brewer" onLoad={() => setIsImageLoading(false)} />
                    </Skeleton>

                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <Heading size="lg">{session.user.name}</Heading>
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                ml="2"
                            >
                                Engineer & Designer
                            </Box>
                        </Box>

                        <Text mt="2">Hi, I'm {session.user.name} and I'm an Engineer & Designer, Designer at heart.
                            I love the design field and have been working with many people across the world to move away from different design paradigms.
                            My design journey started in 2012, and since then I have collaborated with clients like Google, Kik, and more.
                            I have created templates and design processes for</Text>

                        <Stack mt="2" isInline spacing="2">
                            <Link href="#" color="teal.500">Product Management</Link>
                            <Link href="#" color="teal.500">About Me</Link>
                        </Stack>

                        <Button colorScheme="teal" variant="outline" mt={4} onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Layout>
    );
}
