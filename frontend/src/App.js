import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CategoriesPage from "./components/CategoriesPage";
import PostPage from "./components/PostPage";
import PostCreatePage from "./components/PostCreatePage";
import PostEditPage from "./components/PostEditPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Readable</h1>
        </header>
        <Switch>
          <Route exact path="/" component={CategoriesPage} />
          <Route path="/posts/:postId/edit" component={PostEditPage} />
          <Route path="/posts/create" component={PostCreatePage} />
          <Route path="/:category/:postId" component={PostPage} />
          <Route path="/:category" component={CategoriesPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
