import { useQuery } from "@apollo/client";
import { FormControl, Input, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { searchConditionContext } from "../App";
import { TODOITEM } from "../Graphql/TodoItem";
interface SearchBar {}

const SearchBar: React.FC<SearchBar> = ({}) => {
    const [inputText, setInputText] = useState<string>("");
    

    const handlePress = function (
        e: React.KeyboardEvent<HTMLInputElement>
    ): Promise<boolean> {
        return new Promise((res, rej) => {
            if (e.key !== "Enter") {
                setInputText(inputText + e.key);
                res(false);
            }
            res(true);
        });
    };
    return (
        <searchConditionContext.Consumer>
            {({ searchCondition, setSearchCondition }) => (
                <FormControl
                    id="email"
                    onSubmit={(e) => console.log(e)}
                >
                    <InputGroup
                        marginBottom="10"
                        color="#0CA25F"
                        paddingX="40%"
                    >
                        <Input
                            type="tel"
                            value={inputText}
                            onKeyPress={(e) => {
                                handlePress(e).then((res) => {
                                    if (res)
                                        setSearchCondition(inputText);
                                });
                            }}
                            placeholder="Search your task !!"
                            textAlign="center"
                        />
                    </InputGroup>
                </FormControl>
            )}
        </searchConditionContext.Consumer>
    );
};

export default SearchBar;
