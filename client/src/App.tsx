import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";

interface App {}
// function App() {
const App: React.FC<App> = () => {
    return (
        <div className="app">
            <NavBar />
        </div>
    );
};

export default App;
