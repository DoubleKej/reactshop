import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Link
} from 'react-router-dom';
import CategoryPage from './containers/CategoryPage'

export default (
    <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="addcategory" component={AddCategoryPage}/>
      <Route path="category" component={CategoryPage}/>
      <Route path="product" component={ProductPage}/>
      <Route path="addproduct" component={AddProductPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);