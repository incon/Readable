import React, { Component } from "react";
import "./CategoriesList.css";

class CategoriesList extends Component {
  render() {
    return (
      <div className="categories-list">
        <ul>
          <li>All</li>
          <li>React</li>
          <li>Redux</li>
          <li>Udacity</li>
        </ul>
      </div>
    );
  }
}

export default CategoriesList;
