import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme'; // method that returns material-ui theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // material-ui component
import injectTapEventPlugin from 'react-tap-event-plugin'; // required for material-ui to function properly
import { BrowserRouter as Router, Route } from 'react-router-dom'; // react-router v4
import { Grid, Row, Col } from 'react-flexbox-grid';

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import HouseInventory from './components/houseInventory.jsx';
import CreateUser from './components/CreateUser.jsx';
import shoppingList from './components/shoppingList.jsx';
import SelectUser from './components/SelectUser.jsx';
import Logout from './components/Logout.jsx';

injectTapEventPlugin(); // required for material-ui to function properly

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Grid fluid>
          <Router>
            <div>
              <Base />
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/shop" component={shoppingList} />
              <Route path="/createUser" component={CreateUser} />
              <Route path="/users" component={SelectUser} />
              <Route path="/inventory" component={HouseInventory} />
              <Route path="/logout" component={Logout} />
            </div>
          </Router>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
