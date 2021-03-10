import { ApolloQueryResult } from "@apollo/client";
import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import AddTask from "./AddTask";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

interface NavBar {
    refetch: (
        variables?: Partial<Record<string, any>> | undefined
    ) => Promise<ApolloQueryResult<any>>;
}

const NavBar: React.FC<NavBar> = ({ refetch }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer>
            <Logo />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} refetch={refetch} />
        </NavBarContainer>
    );
};

export default NavBar;

const CloseIcon = () => (
    <svg
        width="24"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

const MenuToggle = ({ toggle, isOpen }: any) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }: any) => {
    return (
        <Link href={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    );
};

const MenuLinks = ({ isOpen, refetch }: any) => {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={[
                    "center",
                    "space-between",
                    "flex-end",
                    "flex-end",
                ]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <MenuItem to="/over">Overdue Tasks </MenuItem>
                <AddTask refetch={refetch} />
            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }: any) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg={[
                "primary.500",
                "primary.500",
                "transparent",
                "transparent",
            ]}
            color={["white", "white", "primary.700", "primary.700"]}
            {...props}
        >
            {children}
        </Flex>
    );
};
