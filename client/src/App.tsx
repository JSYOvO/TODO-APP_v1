import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import "./App.css";
import Clock from "./Components/Clock";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import TodoLists from "./Components/TodoLists";
import { TODOITEM } from "./Graphql/TodoItem";
import { TODOITEMS } from "./Graphql/TodoItems";

interface App {}

export const searchConditionContext = React.createContext({
    searchCondition: "",
    setSearchCondition: (newCondition: string) => {},
});

const App: React.FC<App> = () => {
    const allData = useQuery(TODOITEMS);
    const searchData = useQuery(TODOITEM);
    const [searchCon, setSearchCon] = useState("");
    const searchConditionState = {
        searchCondition: searchCon,
        setSearchCondition: (newCondition: string) => {
            setSearchCon(newCondition);
        },
    };
    if (allData.loading || searchData.loading)
        return <div>"Loading..."</div>;
    if (allData.error || searchData.error)
        return (
            <div>
                `Error! ${allData.error} ${searchData.error}`
            </div>
        );
    return (
        <searchConditionContext.Provider value={searchConditionState}>
            <Box>
                <NavBar
                    refetch={
                        searchCon === ""
                            ? allData.refetch
                            : searchData.refetch
                    }
                />
                <Clock />
                <SearchBar />
                <TodoLists
                    data={
                        searchCon === ""
                            ? allData.data
                            : searchData.data
                    }
                    refetch={
                        searchCon === ""
                            ? allData.refetch
                            : searchData.refetch
                    }
                />
            </Box>
        </searchConditionContext.Provider>
    );
};

export default App;
