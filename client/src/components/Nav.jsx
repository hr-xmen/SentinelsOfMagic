import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      page: this.props.page,
      value: 0
    };
  }

  componentDidMount() {
    if (this.state.page === 'inventory') {
      this.setState({
        value: 0
      });
    } else if (this.state.page === 'shop') {
      this.setState({
        value: 1
      });
    }
  }

  handleToggle(event) {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({open: false});
  }

  changeTab(event) {
    this.setState({
      value: event
    });
  }

  render() {
    return (
      <div>
        <Tabs onChange={this.changeTab.bind(this)} value={this.state.value}>
          <Tab value={0} label='House Inventory' containerElement={<Link to="/inventory"/>}/>
          <Tab value={1} label='My Shopping List' containerElement={<Link to="/shop"/>}/>
        </Tabs>
      </div>
    );
  }
}

export default Nav;
      /*
        <AppBar onLeftIconButtonTouchTap={this.handleToggle.bind(this)} onLeftIconButtonClick={this.handleToggle.bind(this)} title="Fridgr" />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem onTouchTap={this.handleClose.bind(this)}><Link to={'/shop'}>My Shopping List</Link></MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}><Link to={'/inventory'}>House Inventory</Link></MenuItem>
        </Drawer>
        */
