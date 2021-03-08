import { useQuery } from "@apollo/client";
import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import TodoLists from "./Components/TodoLists";
import { TODOITEMS } from "./Graphql/TodoItems";

interface App {}
// function App() {
const App: React.FC<App> = () => {
    const { loading, error, data, refetch } = useQuery(TODOITEMS);
    if (loading) return <div>"Loading..."</div>;
    if (error) return <div>`Error! ${error.message}`</div>;
    return (
        <div className="app">
            <NavBar refetch={refetch} />
            <TodoLists data={data} refetch={refetch} />
        </div>
    );
};

export default App;
