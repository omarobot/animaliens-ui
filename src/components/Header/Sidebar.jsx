import {
    Box,
    CloseButton, Drawer,
    DrawerContent, Flex,
    HStack, IconButton, Menu,
    MenuButton, MenuList, useDisclosure
} from '@chakra-ui/react';
import { Link, navigate } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import React from 'react';
import {
    FiMenu
} from 'react-icons/fi';
// import * as style from "../../components/Header/Tab.module.css";
import newLogo from '../../images/assets/logo_face_white.svg';
import * as style from '../Header/sidebar.module.css'




const LinkItems = [
  { name: 'MarketPlace', link: '/explore' },
  { name: 'RoadMap', link: '/tutorial'  },
  // { name: 'Rarities', link: '/tutorial'},
  // { name: 'Marketplace', link: '/tutorial'  },

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
      <Flex  alignItems="center" mx="8" justifyContent="space-around">

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
          <img draggable={false} width={!matches.md ? 150 : 120}  src={newLogo} />
        </div>
        <CloseButton display={{ base: 'flex', md: 'none', }} style={{color: '#fff'}} onClick={onClose} />
      </Flex>
          <div style={{marginTop:20,}}>
          {LinkItems.map((link) => (
        // <NavItem key={link.name} link={link.link}>
        //   {link.name}
        // </NavItem>
        <div className={style.allLinks}>
          <Link className={style.linkItem} activeClassName={style.active} to={link.link} key={link.name}>{link.name}</Link>
        </div>
      ))}
          </div>
    </Box>
  );
};

const NavItem = ({ link, children, ...rest }) => {
  return (
    // <div
    <Link
    // color="gray.600"
    // className={style.tabItem}
    style={{fontWeight: 500, fontSize:24, marginBottom:10, textTransform: 'uppercase'}}
    // onClick={() => {
    //   navigate(`${link}`);
    // }}
    to={link}
    className="link-item"
    activeClassName="active"
  >
      <Flex
      style={{color: '#fff'}}
        align="center"
        p="1"
        mx="8"
        cursor="pointer"
        {...rest}>
        
        {children}
      </Flex>
    </Link>
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
      style={{color: '#fff'}}
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

           {/* Logo */}
           {/* <div
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
          <img draggable={false} src={newLogo} />
        </div> */}

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
            style={{color: '#fff'}}
              py={2}
              >
             
            </MenuButton>
            <MenuList
              bg="#fff"
              >
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};