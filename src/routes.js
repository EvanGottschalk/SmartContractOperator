import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import Main from './pages/main';
import AvatarPage from './pages/avatarpage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/avatarstats" component={AvatarPage} />
  </Route>
);