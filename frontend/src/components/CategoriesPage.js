import React, { Component } from "react";
import CategoriesList from "./CategoriesList";
import PostsList from "./PostsList";
import "./CategoriesPage.css";

class CategoriesPage extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="category-page">
        <CategoriesList />
        <PostsList
          category={match.params.category ? match.params.category : "all"}
        />
      </div>
    );
  }
}

export default CategoriesPage;
