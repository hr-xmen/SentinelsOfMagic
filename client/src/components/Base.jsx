import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

class Base extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      joke: '',
    };
  }

  componentDidMount() {
    axios.get('/jokes')
    .then(res => {
      this.setState({
        joke: res.data.text,
      });
    })
    .catch(err => {
      throw err;
    });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    if (localStorage.getItem('loggedIn') !== null) {
      return (
        <div>
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            title={<NavLink exact to="/" >{this.state.joke}</NavLink>}
          />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
              <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Change User" containerElement={<Link to="/users" />} />
              <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Logout" containerElement={<Link to="/logout" />} />
            </Drawer>
        </div>
      );
    } else {
      return (
        <div>
          <AppBar
            className="title"
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            title={<NavLink exact to="/" >Fridgr</NavLink>}
          />
            <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={open => this.setState({ open })}
            >
              <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Login" containerElement={<Link to="/login" />} />
              <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Sign Up" containerElement={<Link to="/signup" />} />
            </Drawer>
        </div>
      );
    }
  }
}

export default Base;
