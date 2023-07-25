import { Button, Flex } from '@chakra-ui/react';
import React from 'react'

interface IPaginationProps {
    productsLength: number;
    perPage: number;
    activePage: number;
    handlePageChange: (page: number) => void;
}

const Pagination = ({ productsLength, perPage, activePage, handlePageChange }: IPaginationProps) => {

    const totalPages = Math.ceil(productsLength / perPage);

    return (
        <Flex gap={3}>
            {/* Previous Button */}
            {
                <Button
                    isDisabled={activePage === 1}
                    onClick={() => handlePageChange(activePage - 1)}
                >
                    Prev
                </Button>
            }

            {activePage > 2  && '...' }

            {
                Array(totalPages).fill('').map((item, index) => {
                    return (
                        <Button
                            colorScheme={activePage === index+1 ? 'facebook' : 'gray'}
                            onClick={() => handlePageChange(index+1)}
                            key={index}
                        >
                            {index + 1}
                        </Button>
                    )
                }).filter((item, index) => {
                    return (index < activePage + 2 && index > activePage - 2) ? true : false
                })
            }

            {activePage < totalPages - 2 && '...'}


            {
                <Button
                    isDisabled={activePage === totalPages}
                    onClick={() => handlePageChange(activePage + 1)}
                >
                    Next
                </Button>
            }
        </Flex>
    )
}

export default Pagination