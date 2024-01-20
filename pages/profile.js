import { Box, Image, Text, Link, Stack, Heading, Flex, Button, Skeleton } from "@chakra-ui/react";
import Layout from 'components/Layout'
import { getAuth, signOut } from 'firebase/auth';
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

export default function Profile() {
    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            // User is not signed in, redirect them to the sign-in page
            router.push('/signin');
        }
    }, [user, router]);


    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful, redirect to sign-in page
            router.push('/signin');
        }).catch((error) => {
            // An error happened during sign out
            console.error('Error signing out:', error);
        });
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
                            <Heading size="lg">{user ? user.displayName : 'Loading...'}</Heading>
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

                        <Text mt="2">Hi, I'm {user.displayName} and I'm an Engineer & Designer, Designer at heart.
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
