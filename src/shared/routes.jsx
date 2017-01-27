import React                 from 'react';
import { Route, IndexRoute } from 'react-router';

import AppView   from './views/AppView';

import Home      from './components/Home';

export default (
  <Route path="/" component={AppView}>
    <IndexRoute component={Home} />
  </Route>
);