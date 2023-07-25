import React, { useState } from 'react'
import { useAppDispatch } from '../Redux/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginData } from '../utils/type';
import { userLogin } from '../Redux/auth/auth.action';
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const Login = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const comingFrom = location.state?.data || "/";


    const handleClick = () => {
        if (email.length && password.length) {
            const payload: LoginData = {
                email, password
            }

            dispatch(userLogin(payload))
            .then(() => {
                navigate(comingFrom, { replace: true })
            });
        }
    }


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack
                spacing={8}
                mx={'auto'}
                maxW={'lg'}
                py={12}
                px={6}
            >
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link to={"#"} color={'blue.400'}>features</Link>
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link to={'#'} color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                onClick={handleClick}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login