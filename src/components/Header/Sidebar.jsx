import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, navigate } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import React from "react";
import { FiMenu } from "react-icons/fi";
// import * as style from "../../components/Header/Tab.module.css";
// import newLogo from "../../images/assets/logo_face_white.svg";
import NewLogo from '../../images/assets/Nebula Logo.png'
import nebula from "../../images/assets/nebula2.png";
import * as style from "../Header/sidebar.module.css";

const LinkItems = [
  { name: "          ", link: "/", active: true },
  { name: "Store", link: "/about", active: false },
  { name: "Tuition", link: "/about", active: false },
  { name: "Raffles", link: "/raffles", active: true },

  // { name: 'Rarities', link: '/tutorial'},
  // { name: 'Marketplace', link: '/tutorial'  },

  { name: "Auctions", link: "/about", active: false },
  { name: "Missions", link: "/about", active: false },
  { name: "THEHUB", link: "/thehub", active: true },
  { name: "KNOWLEDGE", link: "/knowledge", active: true },

  // { name: "New Raffle", link: "/new-raffle" },
  // { name: 'How to Buy', link: '/tutorial'  },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, lg: 60 }} p="4">
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
      w={{ base: "full", lg: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" mx="8" justifyContent="space-around">
        {/* Logo */}
        <div
          style={{
            // display: "flex",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 2,
            textAlign: "center",
            marginTop: "50px",
            padding: "10px 0 10px 0",
            color: "#2ff101",
            fontSize: "14px",
          }}
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          <img draggable={false} width={!matches.lg ? 300 : 300} src={NewLogo} />
          {/* <p style={{ paddingTop: "5px" }}>Powered by Animaliens</p> */}
        </div>
        <CloseButton
          display={{ base: "flex", lg: "none" }}
          style={{ color: "#fff" }}
          onClick={onClose}
        />
      </Flex>
      <div style={{ marginTop: 20 }}>
        {LinkItems.map((link) => (
          // <NavItem key={link.name} link={link.link}>
          //   {link.name}
          // </NavItem>
          <div className={style.allLinks}>
            {link.active === true ? (
              <>
                <Link
                  className={style.linkItem}
                  activeClassName={style.active}
                  to={link.link}
                  key={link.name}
                >
                  {link.name}
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={style.linkItem}
                  activeClassName={style.active}
                  to={link.link}
                  key={link.name}
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    pointerEvents: "none",
                  }}
                >
                  {link.name}
                </Link>
              </>
            )}
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
      style={{
        fontWeight: 500,
        fontSize: 24,
        marginBottom: 10,
        textTransform: "uppercase",
      }}
      // onClick={() => {
      //   navigate(`${link}`);
      // }}
      to={link}
      className="link-item"
      activeClassName="active"
    >
      <Flex
        style={{ color: "#fff" }}
        align="center"
        p="1"
        mx="8"
        cursor="pointer"
        {...rest}
      >
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const matches = useBreakpoint();
  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, lg: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      {...rest}
    >
      <IconButton
        style={{ color: "#fff" }}
        display={{ base: "flex", lg: "none" }}
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

      <HStack spacing={{ base: "0", lg: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton style={{ color: "#fff" }} py={2}></MenuButton>
            <MenuList bg="#fff">
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
