import { useMutation } from "@apollo/client";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    useDisclosure,
} from "@chakra-ui/react";
import { gql } from "graphql-tag";
import React, { RefObject, useState } from "react";

interface AddTask {}

const AddTask: React.FC<AddTask> = ({}) => {
    const [taskDesc, setTaskDesc] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef() as RefObject<HTMLButtonElement>;
    const ADD = gql`
        mutation Add($input: TodoItemInput!) {
            Add(TodoItem: $input) {
                Title
            }
        }
    `;
    const [add, { data }] = useMutation(ADD);
    const handleSave = (e: any) => {
        e.preventDefault();
        console.log(taskDesc);
        add({ variables: { type: taskDesc } });
    };
    return (
        <div className="App">
            <Button
                ref={btnRef}
                onClick={onOpen}
                size="sm"
                rounded="md"
                color={[
                    "primary.500",
                    "primary.500",
                    "white",
                    "white",
                ]}
                bg={["white", "white", "primary.500", "primary.500"]}
                _hover={{
                    bg: [
                        "primary.100",
                        "primary.100",
                        "primary.600",
                        "primary.600",
                    ],
                }}
            >
                Add Task
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            Create your new task
                        </DrawerHeader>

                        <DrawerBody>
                            <Input
                                placeholder="Type here..."
                                onChange={(e) =>
                                    setTaskDesc(e.target.value)
                                }
                            />
                        </DrawerBody>

                        <DrawerFooter>
                            <Button
                                variant="outline"
                                mr={3}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="blue"
                                onClick={(e) => handleSave(e)}
                            >
                                Save
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </div>
    );
};

export default AddTask;
