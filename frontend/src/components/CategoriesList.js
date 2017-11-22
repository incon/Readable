import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../actions/index";
import "./CategoriesList.css";

class CategoriesList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="categories-list">
        <ul>
          <li>All</li>
          {categories && categories.map(category => <li>{category.name}</li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
