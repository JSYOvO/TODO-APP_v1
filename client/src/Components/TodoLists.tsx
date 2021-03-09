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
import { UPDATE } from "../Graphql/Update";

interface TodoLists {
    data: any;
    refetch: (
        variables?: Partial<Record<string, any>> | undefined
    ) => Promise<ApolloQueryResult<any>>;
}

const TodoLists: React.FC<TodoLists> = ({ data, refetch }) => {
    const [remove] = useMutation(REMOVE);
    const [Update] = useMutation(UPDATE);

    const handleDelete = function (e: any) {
        e.preventDefault();

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

    const handleEdit = function (e: any) {
        e.preventDefault();
        console.log(e.target.value);
        Update({
            variables: {
                Id: "1",
                Title: "taskDesc",
                CreationDate: e.target.value[0],
                DueDate: e.target.value[1],
            },
        })
            .then((res) => {
                if (res.data.Update) refetch();
            })
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
                    const CreationDate = new Date(
                        Date.parse(item.CreationDate)
                    );
                    const DueDate = new Date(
                        Date.parse(item.DueDate)
                    );
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
                                marginY="5"
                                width="100%"
                            >
                                {item.Title}
                            </StatLabel>
                            <StatHelpText>
                                시작 :{" "}
                                {CreationDate.getMonth() +
                                    "월 " +
                                    CreationDate.getDay() +
                                    "일 " +
                                    CreationDate.getHours() +
                                    "시 " +
                                    CreationDate.getMinutes() +
                                    "분"}
                            </StatHelpText>
                            <StatHelpText>
                                종료 :{" "}
                                {DueDate.getMonth() +
                                    "월 " +
                                    DueDate.getDay() +
                                    "일 " +
                                    DueDate.getHours() +
                                    "시 " +
                                    DueDate.getMinutes() +
                                    "분"}
                            </StatHelpText>
                            <Button
                                colorScheme="blue"
                                variant="solid"
                                value={[
                                    item.CreationDate,
                                    item.DueDate,
                                ]}
                                onClick={(e) => handleEdit(e)}
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
