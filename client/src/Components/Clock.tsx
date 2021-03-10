import { Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface Clock {}

const Clock: React.FC<Clock> = ({}) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const timer = setInterval(
        () => setTime(new Date().toLocaleTimeString()),
        1000
    );

    return (
        <Text
            spacing={4}
            color="#0CA25F"
            fontSize="6xl"
            marginBottom="10"
            width="100%"
            textAlign="center"
        >
            {time}
        </Text>
    );
};

export default Clock;
