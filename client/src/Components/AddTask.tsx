import { useMutation } from "@apollo/client";
import {
    Box,
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddTask {}

const AddTask: React.FC<AddTask> = ({}) => {
    const [startDate, setStartDate] = useState(
        new Date("2014/02/08")
    );
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    const [taskDesc, setTaskDesc] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef() as RefObject<HTMLButtonElement>;

    const ADD = gql`
        mutation Add($Id: String!, $CreationDate: String!) {
            Add(TodoItem: { Id: $Id, CreationDate: $CreationDate }) {
                Id
                Title
                Description
                DueDate
                CreationDate
                DaysCreated
                Completed
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
                size="lg"
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            Create your new task
                        </DrawerHeader>

                        <DrawerBody
                            display="flex"
                            flexDirection="column"
                        >
                            <Input
                                placeholder="Type here..."
                                onChange={(e) =>
                                    setTaskDesc(e.target.value)
                                }
                                marginBottom="10%"
                            />
                            <Box
                                display="flex"
                                flexDirection="column"
                                width="100%"
                                justifyItems="flex-start"
                                marginBottom="auto"
                            >
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date | null) =>
                                        date && setStartDate(date)
                                    }
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    className="date__picker"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date: Date | null) =>
                                        date && setEndDate(date)
                                    }
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    className="date__picker"
                                />
                            </Box>
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
