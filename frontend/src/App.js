import React, { Component } from "react";
import { Route } from "react-router-dom";
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
        <Route exact path="/" component={CategoriesPage} />
        <Route path="/category/:category" component={CategoriesPage} />
        <Route path="/post/:postId" component={PostPage} />
        <Route path="/posts/create" component={PostCreatePage} />
        <Route path="/posts/:postId/edit" component={PostEditPage} />
      </div>
    );
  }
}

export default App;
