import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/store';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../Redux/app/app.action';
import { Box, Flex } from '@chakra-ui/react';
import FilterAndSort from '../Components/FilterAndSort';
import ProductCard from '../Components/ProductCard';
import Pagination from '../Components/Pagination';

const Homepage = () => {

    const dispatch = useAppDispatch();
    const products = useAppSelector((store) => store.appReducer.data);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [activePage, setActivePage] = useState(1);


    useEffect(() => {
        if (products.length === 0 || location) {
            const getProductsParam = {
                params: {
                    category: searchParams.getAll('filter'),
                    _sort: "price",
                    _order: searchParams.get('_order')
                }
            }

            dispatch(getProducts(getProductsParam));
        }
    }, [location.search])

    const handlePageChange = (newPageNumber: number): void => {
        setActivePage(newPageNumber)
    }

  return (
    <div>
        <Flex>
            <Box minW={'300px'}>
                <FilterAndSort />
            </Box>
            <Box>


                <Flex
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                >
                    {
                        products.length > 0 && 
                        products.filter((item, index) => {
                            return index >= 2 * (activePage - 1) && index < 2 * activePage
                        }).map(item => {
                            return <ProductCard key={item.id} {...item} />
                        })
                    }
                </Flex>

                <Flex
                    justifyContent={'center'}
                    p={6}
                >
                    <Pagination
                        productsLength={products?.length}
                        perPage={2}
                        activePage={activePage}
                        handlePageChange={handlePageChange} 
                    />
                </Flex>
                
            </Box>
        </Flex>
    </div>
  )
}

export default Homepage