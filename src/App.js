import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Post from "./pages/Post";
import NoMatch from "./pages/no-match";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">
          <h2>My React + Firebase Blog</h2>
        </Link>
        <ul className="right">
          <li><Link to="/"><h5>Login</h5></Link></li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/404" component={NoMatch} /> */}
          <Route path="/:slug" component={Post} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
