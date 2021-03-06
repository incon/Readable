import React from "react";
import CategoriesList from "./CategoriesList";
import PostsList from "./PostsList";
import "./CategoriesPage.css";

function CategoriesPage(props) {
  const { match } = props;

  return (
    <div className="category-page">
      <CategoriesList
        category={match.params.category ? match.params.category : "all"}
      />
      <PostsList
        category={match.params.category ? match.params.category : "all"}
      />
    </div>
  );
}

export default CategoriesPage;
