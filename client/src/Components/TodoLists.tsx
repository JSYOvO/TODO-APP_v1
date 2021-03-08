import { ApolloQueryResult, useMutation } from "@apollo/client";
import { Button, Flex } from "@chakra-ui/react";
import {
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
} from "@chakra-ui/stat";
import React from "react";
import { REMOVE } from "../Graphql/Remove";

interface TodoLists {
    data: any;
    refetch: (
        variables?: Partial<Record<string, any>> | undefined
    ) => Promise<ApolloQueryResult<any>>;
}

const TodoLists: React.FC<TodoLists> = ({ data, refetch }) => {
    const [remove] = useMutation(REMOVE);

    const handleDelete = function (e: any) {
        e.preventDefault();
        console.log(e.target.value);
        remove({
            variables: {
                Id: e.target.value,
            },
        })
            .then(() => refetch())
            .catch((err) => {
                console.error(err);
            });
    };

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
                            color="#0CA25F"
                            border="solid"
                            paddingX="10"
                            paddingY="5"
                            borderRadius="10px"
                        >
                            <StatLabel
                                fontSize="lg"
                                fontWeight="bold"
                            >
                                {item.Title}
                            </StatLabel>
                            <StatHelpText>
                                {item.Description}
                            </StatHelpText>
                            <Button
                                colorScheme="blue"
                                variant="solid"
                            >
                                Edit
                            </Button>
                            <Button
                                colorScheme="pink"
                                variant="solid"
                                value={item.Id}
                                onClick={(e) => handleDelete(e)}
                            >
                                Delete
                            </Button>
                        </Stat>
                    );
                })}
            </StatGroup>
        </Flex>
    );
};

export default TodoLists;
