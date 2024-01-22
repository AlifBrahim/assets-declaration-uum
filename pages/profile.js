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
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwWf4v8y-sHDj4CzyJ07YQa6DlV4T1QyBvA&usqp=CAU" alt onLoad={() => setIsImageLoading(false)} />
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
                                
                            </Box>
                        </Box>

                        <Text mt="2">Welcome and Hi, {user ? user.displayName : 'Loading...'}
                             </Text>


                        <Button colorScheme="teal" variant="outline" mt={4} onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Layout>
    );
}
