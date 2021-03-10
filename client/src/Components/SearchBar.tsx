import { SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SearchBar {}

const SearchBar: React.FC<SearchBar> = ({}) => {
    const [inputText, setInputText] = useState<string>("");
    const handleSubmit = function (
        e: React.FormEvent<HTMLInputElement>
    ) {
        console.log(e.target);
    };
    return (
        <InputGroup marginBottom="10" color="#0CA25F">
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
            />
            <Input
                type="tel"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onSubmit={(e) => console.log(e)}
            />
        </InputGroup>
    );
};

export default SearchBar;
