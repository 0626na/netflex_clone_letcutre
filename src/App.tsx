import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Series from "./Routes/Series";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path={["/series", "/series/:videoId"]}>
            <Series />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path={["/", "/movies/:videoId"]}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
