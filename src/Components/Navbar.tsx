import { Box, Button, Collapse, Flex, Icon, IconButton, Link, Stack, Text, useBreakpointValue, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon} from '@chakra-ui/icons';
import React from 'react'
import NavSearch from './NavSearch';

const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                   flex={{ base: 1, md: 'auto' }}
                   ml={{ base: -2 }}
                   display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton onClick={onToggle} icon={
                        isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                    } variant={'ghost'} aria-label={'Toggle Navigation'} />
                </Flex>



                <Flex
                     flex={{ base: 1 }}
                     justify={{ base: 'center', md: 'start' }}
                >
                    <Link
                        href='/'
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('gray.800', 'white')}
                        >
                            Logo
                        </Text>
                    </Link>

                    <Flex
                      display={{ base: 'none', md: 'flex' }}
                      ml={10}
                    >
                        <DesktopNav />
                    </Flex>
                </Flex>




                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >
                    <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={600}
                        // variant={'link'}
                        href={'#'}
                    >
                        Sign In
                    </Button>
                    <Button
                        as={'a'}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'blue.700'}
                        href={'#'}
                        _hover={{ bg: 'blue.600' }}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

export default Navbar


// ------------------------------------- DESKTOP NAVBAR -------------------------------------------

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHover = useColorModeValue('gray.800', 'white');
    const popoverContentbgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack
            direction={'row'}
            spacing={4}
            minW={'500px'}
        >
            <NavSearch />
        </Stack>
    )
}


const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
        >
            <Stack
                direction={'row'}
                align={'center'}
            >
                <Box>
                    <Text
                        transition={'all 0.3s ease'}
                        _groupHover={{ color: 'blue.400' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>
                        {subLabel}
                    </Text>
                </Box>



                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    )
}





// ------------------------------------- MOBILE NAVBAR -------------------------------------------

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            {
                NAV_ITEMS.map((navItem) => (
                    <MobileNavItem key={navItem.label} {...navItem} />
                ))
            }
        </Stack>
    )
}


const MobileNavItem = ({ label, children, href } : NavItem) => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                hrefLang={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none'
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}
                >
                    {label}
                </Text>
                { children && (
                    <Icon 
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                ) }
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: '0!important' }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {
                        children && (
                            children.map((child) => (
                                <Link key={child.label} py={2} href={child.href}>
                                    {child.label}
                                </Link>
                            ))
                        )
                    }
                </Stack>
            </Collapse>
        </Stack>
    );
}



interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Inspiration',
        children: [
            {
                label: 'Explore Design Work',
                subLabel: 'Trending Design to inspire you',
                href: '#',
            },
            {
                label: 'New & Noteworthy',
                subLabel: 'Up-and-coming Designers',
                href: '#',
            },
        ],
    },
    {
        label: 'Find Work',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'Learn Design',
        href: '#',
    },
    {
        label: 'Hire Designers',
        href: '#',
    },
];