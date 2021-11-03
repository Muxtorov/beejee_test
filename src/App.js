import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div>
      <Switch>
        <Router>
          <Navbar />
          <Route exact path="/">
            <Tasks />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/addtask">
            <AddTask />
          </Route>
        </Router>
      </Switch>
    </div>
  );
}

export default App;
