import { gql, useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import {
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
} from "@chakra-ui/stat";
import React from "react";

interface TodoLists {}

const TODOITEMS = gql`
    query TodoItems {
        TodoItems {
            Id
            Title
            Description
            DueDate
        }
    }
`;
const TodoLists: React.FC<TodoLists> = ({}) => {
    const { loading, error, data } = useQuery(TODOITEMS);
    if (loading) return <div>"Loading..."</div>;
    if (error) return <div>`Error! ${error.message}`</div>;
    return (
        <Flex alignItems="center" width="100%">
            <StatGroup
                width="60%"
                alignItems="center"
                justifySelf="center"
            >
                {data.TodoItems.map((item: any) => {
                    return (
                        <Stat
                            backgroundColor="#0CA25F"
                            color="white"
                            paddingX="10"
                            paddingY="5"
                            borderRadius="8px"
                        >
                            <StatLabel>{item.Title}</StatLabel>
                            <StatHelpText>
                                {item.Description}
                            </StatHelpText>
                        </Stat>
                    );
                })}
            </StatGroup>
        </Flex>
    );
};

export default TodoLists;
