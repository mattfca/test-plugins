import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Example from './screens/Example/index';
import ExampleTwo from './screens/ExampleTwo/index';

export default function App() {
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    import('./components/SimpleAds/prebid/latest');
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/example">Example</Link>
            </li>
            <li>
              <Link to="/example2">Example 2</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/example">
            <Example />
          </Route>
          <Route path="/example2">
            <ExampleTwo />
          </Route>
          <Route path="/">
            <div>no ads</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}