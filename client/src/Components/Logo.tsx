import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

interface Logo {}

const Logo: React.FC<Logo> = ({ props }: any) => {
    return (
        <Box {...props}>
            <Text
                fontSize="lg"
                fontWeight="bold"
                color="#0CA25F"
                borderRadius="10px"
                border="solid"
                paddingX="2.5"
                paddingY="1.25"
                backgroundColor="white"
            >
                <Link href={"/"}>
                    <Text display="block">JSYOvO</Text>
                </Link>
            </Text>
        </Box>
    );
};

export default Logo;
