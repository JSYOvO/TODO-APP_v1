import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import TodoLists from "./Components/TodoLists";

interface App {}
// function App() {
const App: React.FC<App> = () => {
    return (
        <div className="app">
            <NavBar />
            <TodoLists />
        </div>
    );
};

export default App;
