import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Foo from './screens/Foo';
import Bar from './screens/Bar';
import FooBar from './screens/FooBar';
import Test from './screens/Test';
import Hook from './screens/Hook';
import HookTwo from './screens/Hook2';
import Example from './screens/Example/index';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Foo</Link>
            </li>
            <li>
              <Link to="/bar">Bar</Link>
            </li>
            <li>
              <Link to="/foobar">FooBar</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/hook">Hook</Link>
            </li>
            <li>
              <Link to="/hook2">Hook2</Link>
            </li>
            <li>
              <Link to="/example">Example</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/bar">
            <Bar />
          </Route>
          <Route path="/foobar">
            <FooBar />
          </Route>
          <Route path="/hook">
            <Hook />
          </Route>
          <Route path="/hook2">
            <HookTwo />
          </Route>
          <Route path="/example">
            <Example />
          </Route>
          <Route path="/">
            <Foo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}