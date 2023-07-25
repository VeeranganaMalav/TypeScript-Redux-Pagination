import { Box, Checkbox, CheckboxGroup, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterAndSort = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const initialFilterValues = searchParams.getAll('filter');
    const [filterValues, setFilterValues] = useState<string[]>(initialFilterValues || []);

    // const initialSortValue = searchParams.get('sort');
    // const [sortValue, setSortValue] = useState<string | undefined>(initialSortValue || undefined);

    const initialOrderValue = searchParams.get('_order');
    const [orderValue, setOrderValue] = useState<string | undefined>(initialOrderValue || undefined);


    useEffect(() => {
        // let params: { filter?: string[] } = {};

        // if (filterValues.length) {
        //     params.filter = filterValues;
        // }

        // setSearchParams(params);


        let params: { filter?: string[], _sort?: string, _order?: string } = {};

        if (filterValues.length) {
            params.filter = filterValues;
        }

        if (orderValue !== undefined) {
            params._sort = "price";
            params._order = orderValue;
        }

        setSearchParams(params);
    }, [filterValues, orderValue])


    const handleFilterChange = (value: string[]) => {
        setFilterValues(value);
    }


    const handleSortChange = (value: string) => {
        setOrderValue(value);
    };

    return (
        <Box p={6}>
            <Heading>Filter</Heading>
            <CheckboxGroup
                colorScheme={'facebook'}
                value={filterValues}
                onChange={handleFilterChange}
            >
                <Stack
                    spacing={[1, 5]}
                    direction={['column']}
                >
                    <Checkbox value='bags'>Bags</Checkbox>
                    <Checkbox value='electronics'>Electronics</Checkbox>
                    <Checkbox value='jewelery'>Jewelery</Checkbox>
                    <Checkbox value="men's clothing">Mens' Clothing</Checkbox>
                    <Checkbox value="women's clothing">Womens' Clothing</Checkbox>
                </Stack>
            </CheckboxGroup>

            <Heading>Sort</Heading>
            <RadioGroup
                colorScheme={'facebook'}
                value={orderValue}
                onChange={handleSortChange}
            >
                <Stack direction='column'>
                    <Radio value='asc'>Asc</Radio>
                    <Radio value='desc'>Desc</Radio>
                </Stack>
            </RadioGroup>
        </Box>
    )
}

export default FilterAndSort