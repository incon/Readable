import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
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
        <div className="categories-menu">
          <div className="categories-heading">Categories</div>
          <ul>
            <NavLink exact activeClassName="link-active" to="/">
              <li>All</li>
            </NavLink>
            {categories &&
              categories.map(category => (
                <NavLink
                  exact
                  to={`/category/${category.path}`}
                  activeClassName="link-active"
                  key={category.path}
                >
                  <li>{category.name}</li>
                </NavLink>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
