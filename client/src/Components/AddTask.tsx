import { ApolloQueryResult, useMutation } from "@apollo/client";
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
    Badge,
    Text,
} from "@chakra-ui/react";
import React, { RefObject, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADD } from "../Graphql/Add";

interface AddTask {
    refetch: (
        variables?: Partial<Record<string, any>> | undefined
    ) => Promise<ApolloQueryResult<any>>;
}

const AddTask: React.FC<AddTask> = ({ refetch }) => {
    const btnRef = React.useRef() as RefObject<HTMLButtonElement>;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [taskDesc, setTaskDesc] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [add, { data }] = useMutation(ADD);

    const handleSave = (e: any) => {
        e.preventDefault();

        add({
            variables: {
                Id: "1",
                Title: taskDesc,
                CreationDate: startDate,
                DueDate: endDate,
            },
        })
            .then((res) => {
                console.log(res);
                refetch();
                onClose();
            })
            .catch((err) => {
                console.error(err);
                onClose();
            });
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
                size="sm"
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
                                height="100%"
                            >
                                <Box>
                                    <Text fontWeight="bold">
                                        Start
                                    </Text>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(
                                            date: Date | null
                                        ) =>
                                            date && setStartDate(date)
                                        }
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="Y.MM.dd  hh:mm"
                                        showTimeSelect
                                        className="date__picker"
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        fontWeight="bold"
                                        paddingTop="20px"
                                    >
                                        End
                                    </Text>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(
                                            date: Date | null
                                        ) => date && setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="Y.MM.dd  hh:mm"
                                        showTimeSelect
                                        className="date__picker"
                                    />
                                </Box>
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
