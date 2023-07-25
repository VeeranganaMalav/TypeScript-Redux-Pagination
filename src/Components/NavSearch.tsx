import React, { useEffect, useState } from 'react'
import { Product } from '../utils/type';
import { Box, Input, InputGroup, InputLeftElement, Text, useBoolean } from '@chakra-ui/react';
import { useAppSelector } from '../Redux/store';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'
import useThrottle from '../hooks/useThrottle';
// const { useThrottle } = require('use-throttle');

const NavSearch = () => {

    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [showDropdown, setShowDropdown] = useBoolean();
    const products = useAppSelector((store) => store.appReducer.data);

    const throttledText = useThrottle(query, 2000);

    useEffect(() => {
        if (throttledText === '') {
            setSuggestions([]);
        }
        else {
            let newSuggestions = products.filter((product) => {
                return product.title.split(" ").join("").trim().toLowerCase().indexOf(throttledText) !== -1 ? true : false;
            })

            setSuggestions(newSuggestions);
            setShowDropdown.on();
        }
    }, [throttledText]);

    return (
        <Box w="100%" position='relative'>
            <InputGroup>
                <InputLeftElement children={<BsSearch color="gray.300" />} />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} type='text' placeholder='Search' />
            </InputGroup>
            {
                suggestions.length > 0 && 
                <Box
                    border='1px solid black'
                    borderRadius='5px'
                    position='absolute'
                    top='50px'
                    zIndex="10"
                    bgColor='white'
                    overflow='scroll'
                    w='100%'
                    maxH='400px'
                >
                    {
                        suggestions.map(item => {
                            return (
                                <Link to={`/product/${item.id}`}>
                                    <Text 
                                        fontSize='xl' 
                                        cursor='pointer' 
                                        onClick={setShowDropdown.off}
                                    >
                                        {item.title}
                                    </Text>
                                </Link>
                            )
                        })
                    }
                </Box>
            }
        </Box>
    )
}

export default NavSearch