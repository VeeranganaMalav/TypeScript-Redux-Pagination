import React, { useEffect, useState } from 'react'
import useCurrentParamProduct from '../hooks/useCurrentParamProduct'
import { useAppDispatch } from '../Redux/store';
import { useNavigate } from 'react-router-dom';
import { updateProduct } from '../Redux/app/app.action';
import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';

const EditProduct = () => {

    const { currentProduct, id } = useCurrentParamProduct();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number>(0);


    useEffect(() => {
        if (currentProduct?.title && currentProduct?.price) {
            setTitle(currentProduct?.title);
            setPrice(currentProduct?.price);
        }
    }, [currentProduct])



    const updateHandler = () => {
        if (title.length && price) {
            const payload = {
                title,
                price
            }

            dispatch(updateProduct(Number(id), payload))
                .then(() => {
                    navigate("/");
                });
        }
    }


    return (
        <div>
            <Heading>Edit Product</Heading>
            <Flex
                m={5}
                justify={'center'}
            >
                <Stack spacing={4}>
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" />
                    </FormControl>
                    <FormControl id="price">
                        <FormLabel>Price</FormLabel>
                        <Input value={price} onChange={(e) => { setPrice(Number(e.target.value)) }} type="number" />
                    </FormControl>
                </Stack>
            </Flex>
            <Button onClick={updateHandler}>Update Product</Button>
        </div>
    )
}

export default EditProduct