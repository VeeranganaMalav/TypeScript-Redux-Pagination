import { Product } from '../utils/type'
import { Badge, Box, Circle, Flex, Icon, Image, Tooltip, chakra, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi';
import {AiOutlineEdit} from 'react-icons/ai';


const data = {
    isNew: true,
    imageURL: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
}

const ProductCard = ({ id, title, price, image }: Product) => {

    return (
        <Flex
            p={50}
            w={'450px'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW={'sm'}
                borderWidth={'1px'}
                rounded={'lg'}
                shadow={'lg'}
                position={'relative'}
            >
                {data.isNew && (
                    <Circle
                        size={'10px'}
                        position={'absolute'}
                        top={2}
                        right={2}
                        bg={'red.500'}
                    />
                )}

                <Link to={`/product/${id}`}>
                    <Image 
                        boxSize={'400px'}
                        height={`200px`}
                        objectFit={'contain'}
                        src={image}
                        alt={`Picture of ${title}`}
                        roundedTop={'lg'}
                    />
                </Link>

                <Box p={6}>

                    {data.isNew && (
                        <Badge 
                            rounded={'full'}
                            px={'2'}
                            fontSize={'0.8em'}
                            colorScheme={'red'}
                        >
                            New
                        </Badge>
                    )}

                    <Flex
                        mt={'1'}
                        justifyContent={'space-between'}
                        alignContent={'center'}
                    >
                        <Box
                            fontSize={'2xl'}
                            fontWeight={'semibold'}
                            as={'h4'}
                            lineHeight={'tight'}
                            isTruncated
                        >
                            {title}
                        </Box>

                        <Tooltip
                            label={'Add to cart'}
                            bg={'white'}
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1.2em'}
                        >
                            <chakra.a href={'#'} display={'flex'}>
                                <Icon 
                                    as={FiShoppingCart}
                                    h={7}
                                    w={7}
                                    alignSelf={'center'} 
                                />
                            </chakra.a>
                        </Tooltip>
                    </Flex>

                    <Box>
                        <Link to={`/product/${id}/edit`}>
                            <Icon
                                cursor={'pointer'}
                                as={AiOutlineEdit}
                                h={7}
                                w={7}
                            />
                        </Link>
                    </Box>


                    <Flex
                        justifyContent="space-between"
                        alignContent="center"
                    >
                        <Box
                            fontSize={'2xl'}
                            color={useColorModeValue('gray.800', 'white')}
                        >
                            <Box 
                                as={'span'}
                                color={'gray.600'}
                                fontSize={'lg'}
                            >
                                £
                            </Box>
                            {price.toFixed(2)}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default ProductCard