import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import Loading from "./components/common/Loading";
import { anonymousRouters } from "./routing";
import AuthTemplate from "./template/AuthTemplate";
import DefaultTemplate from "./template/DefaultTemplate";
import JiraTemplate from "./template/JiraTemplate";
import history from "./utils/history";


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Loading />
        
        <Switch>
          {anonymousRouters.map((route, index) => {
            switch (route.template) {
              case 'default':
                return <DefaultTemplate key={index} path={route.href} Component={route.component} exact />
              case 'jira':
                return <JiraTemplate key={index} path={route.href} Component={route.component} exact />
              case 'auth':
                return <AuthTemplate key={index} path={route.href} Component={route.component} exact />
              default:
                return <Route key={index} path={route.href} component={route.component} exact />
            }
          })}
        </Switch>
      </Router >
    </div>
  );
}

export default App;
