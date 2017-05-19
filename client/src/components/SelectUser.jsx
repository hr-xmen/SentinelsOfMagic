import React from 'react';
import $ from 'jquery';
import Users from './Users.jsx';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { parse } from 'cookie';

class SelectUser extends React.Component {
  constructor(props) {
    super(props);

    const cookie = parse(document.cookie);
    const houseId = parseInt(cookie.fridgrSesh.split('"houseId":')[1]);
    console.log('Current houseId:', houseId);

    this.state = {
      data: [],
      houseId,
      userId: 0,
      redirect: false,
      to: '/inventory',
      usersCount: 0,
      redirectTwo: false,
      toTwo: '/createUser',
    };
    this.getUsers = this.getUsers.bind(this);
    this.grabInventory = this.grabInventory.bind(this);
    this.showCreateUser = this.showCreateUser.bind(this);
  }

  componentWillMount() {
    const cookies = parse(document.cookie);
    const fridgrSesh = JSON.parse(cookies.fridgrSesh.slice(2));

    if (!cookies.fridgrSesh || !fridgrSesh.houseId) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    $.ajax({
      method: 'POST',
      url: '/users',
      data: { houseId: this.state.houseId },
      success: (data) => {
        this.setState({
          data,
          usersCount: data.length,
        });
      },
    });
  }

  grabInventory(e) {
    this.setState({
      userId: parseInt(e.target.getAttribute('data-key')),
    }, function () {
      $.ajax({
        method: 'POST',
        url: '/settingCooks',
        data: { userId: this.state.userId },
        success: () => {
          this.setState({
            redirect: true,
          });
        },
      });
    });
  }

  showCreateUser() {
    this.setState({
      redirectTwo: true,
    });
  }

  render() {
    return (
      <div>
      {this.state.redirectTwo ? <Redirect to={this.state.toTwo} /> :
        <div className="item">
          <div className="selectUserTwo selectUserThree">
            <RaisedButton className="title" secondary onTouchTap={this.showCreateUser} label="Create User" />
          </div>
          <div className="selectUserTwo selectUserThree black-text">Who are you? 😄</div>
          {this.state.redirect ? <Redirect to={this.state.to} /> :
          <div className="selectUserTwo item"><Users users={this.state.data} usersCount={this.state.usersCount} houseId={this.state.houseId} redirect={this.grabInventory} /></div>}
        </div>
      }
      </div>
    );
  }

}


// label={<Link to="/createUser">Create User</Link>}
export default SelectUser;
