import React, { ReactNode } from 'react';
import { navigate } from "gatsby";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import * as style from "../../components/Header/Tab.module.css";



import newLogo from '../../images/assets/logo_face_white.svg'


const LinkItems = [
  { name: 'MarketPlace', link: '/explore' },
  { name: 'RoadMap', link: '/tutorial'  },
  { name: 'Rarities', link: '/tutorial'},
  { name: 'About Us', link: '/about'},
  { name: 'How to Buy', link: '/tutorial'  },
];


export default function SidebarWithHeader({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}


const SidebarContent = ({ onClose, ...rest }) => {
    const matches = useBreakpoint();
  return (
    <Box
      transition="3s ease"
      bg="#171717"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex  alignItems="center" mx="10" justifyContent="space-between">

             {/* Logo */}
             <div
          style={{

            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 2,
            textAlign: 'center',
          }}
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          <img draggable={false} width={!matches.md ? 120 : 45} src={newLogo} />
        </div>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
          <div style={{marginTop:40,}}>
          {LinkItems.map((link) => (
        <NavItem key={link.name} link={link.link}>
          {link.name}
        </NavItem>
      ))}
          </div>
    </Box>
  );
};

const NavItem = ({ link, children, ...rest }) => {
  return (
    <div
    color="gray.600"
    className={style.tabItem}
    style={{fontWeight: 500, fontSize:16, marginBottom:10, textTransform: 'uppercase'}}
    onClick={() => {
      navigate(`${link}`);
    }}
  >
      <Flex
        align="center"
        p="1"
        mx="8"
        cursor="pointer"
        {...rest}>
        
        {children}
      </Flex>
    </div>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
    const matches = useBreakpoint();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

           {/* Logo */}
           <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 2,
            textAlign: 'center',
            // marginBottom: 40
            marginTop:20
          }}
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          <img draggable={false} width={!matches.md ? 120 : 45} src={newLogo} />
        </div>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
             
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};