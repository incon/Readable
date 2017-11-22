import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
          <Link to="/">
            <li>All</li>
          </Link>
          {categories &&
            categories.map(category => (
              <Link key={category.path} to={`/category/${category.path}`}>
                <li>{category.name}</li>
              </Link>
            ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
