import React, { Component } from 'react';
import axios from 'axios';

import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
  card: {
    height: '250',
    width: 'auto',
    margin: '0 20% 0 20%',
  },
  image: {
    height: '250',
    width: 'auto',
  },
  selected: {
    display: 'flex',
    flexDirection: 'column',
    width: '30vw',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '0 30% 0 30%',
  },
};

class AddItemSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      image: '',
      url: '',
      houseId: this.props.houseId,
      errorName: '',
      errorText: '',
      searchedFoods: this.props.searchedFoods,
      selected: {},
      showSelection: true,
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  postItem(obj) {
    axios.post('/add', obj)
    .then(() => {
      console.log('Successful POST request to /add');
      this.props.submitItem();
      // this.props.handleClose();
    })
    .catch(err => {
      console.log('Bad POST request to /add: ', err.response.data);
      this.setState({
        errorName: err.response.data.name,
        errorNotes: err.response.data.notes,
      });
    });
  }

  handleSelection(index) {
    console.log(this.state.searchedFoods[index].title);
    this.setState({
      showSelection: false,
      name: this.state.searchedFoods[index].title,
      image: this.state.searchedFoods[index].image,
    });
  }

  handleSubmit() {
    this.postItem(this.state);
    this.props.handleClose();
  }

  savePrice (event){
    this.setState({
      price: event.target.value
    })
  }
  
  render() {
    if (this.state.showSelection) {
      return (
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={1} cellHeight={300}>
            {this.props.searchedFoods.map((item, index) => (
              <GridTile
                key={index}
                title={item.title}
                className="ripple"
                titleStyle={styles.titleStyle}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.75) 70%,rgba(0,0,0,0.7) 100%)"
                onClick={() => this.handleSelection(index)}
              >
                <img src={item.image} alt="food" />
              </GridTile>
            ))}
          </GridList>
        </div>
      );
    } else {
      return (
        <div style={styles.selected}>
          <img src={this.state.image} />
          <TextField floatingLabelText="Item Price" value={this.state.price} onChange={this.savePrice.bind(this)}/>
          <RaisedButton primary label="Submit" onClick={() => this.handleSubmit()} />
      </div>
      );
    }
  }
}

export default AddItemSelect;
