import React, { Component } from 'react';
import './App.css';

let itemID = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {inputField:'',
                  listItem:[],
                  showList:'all'
                };
    this.showAllList = this.showAllList.bind(this);
    this.showActiveList = this.showActiveList.bind(this);
    this.showCompleteList = this.showCompleteList.bind(this);
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.onChangeCheckBoxState = this.onChangeCheckBoxState.bind(this);
    this.addTextInTodoList = this.addTextInTodoList.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(event) {
    this.setState({inputField:event.target.value});
  }

  addTextInTodoList(event) {
    if (event.key === 'Enter' && this.state.inputField.length >0) {
      this.updateList();
      this.setState({inputField:''});
    }
  }

  updateList() {
    this.state.listItem.push({id:itemID++,item:this.state.inputField,status:'active'});
  }

  onChangeCheckBoxState(event) {
    this.state.listItem.forEach((item)=>{
      if (item.id === parseInt(event.target.id)) {
        item.status = event.target.checked?'complete':'active';
      }
    });
    console.log(this.state.listItem);
  }

  deleteItemFromList(event){
    var arrList = this.state.listItem.filter(item => {
       return item.id !== parseInt(event.target.id);} );
    this.setState({listItem:arrList});
  }

  showAllList(){
    this.setState({showList:'all'});
  }

  showActiveList(){
    this.setState({showList:'active'});
  }

  showCompleteList(){
    this.setState({showList:'complete'});
  }

  render() {
    var arrListItems = this.state.listItem;
    const items =  arrListItems.map((item,key)=> {
      if (this.state.showList === 'all') {
        return <li key={item.id}><ListItemsForTodo onClickCancel={this.deleteItemFromList} onClickCheckbox={this.onChangeCheckBoxState} listItem={item}/></li>
      } else if (this.state.showList === 'active' && item.status === 'active') {
        return <li key={item.id}><ListItemsForTodo onClickCancel={this.deleteItemFromList} onClickCheckbox={this.onChangeCheckBoxState} listItem={item}/></li>
      } else if (this.state.showList === 'complete' && item.status === 'complete') {
        return <li key={item.id}><ListItemsForTodo onClickCancel={this.deleteItemFromList} onClickCheckbox={this.onChangeCheckBoxState} listItem={item}/></li>
      } else {
        return null;
      }
    });

    return (
      <div>
        <SearchField inputField={this.state.inputField} onChange={this.handleSearchTextChange} onKeyPress={this.addTextInTodoList}/>
        <ul>{items}</ul>
        <button onClick={this.showAllList}>All</button>
        <button onClick={this.showActiveList}>Active</button>
        <button onClick={this.showCompleteList}>Complete</button>
      </div>
    );
  }
}

class SearchField extends Component {
  render() {
    return (
      <div className="searchField">
        <input type="text" placeholder="What needs to be done?" value={this.props.inputField} onChange={this.props.onChange} onKeyPress={this.props.onKeyPress}/>
      </div>
    );
  }
}

class ListItemsForTodo extends Component {
  render(){
    return(
      <div>
        <CheckboxItem listItem={this.props.listItem} id={this.props.listItem.id} onChange={this.props.onClickCheckbox}/>
        <LabelItem listItem={this.props.listItem} id={this.props.listItem.id} />
        <button id={this.props.listItem.id} onClick={this.props.onClickCancel}>Delete</button>
      </div>
    );
  }
}

class CheckboxItem extends Component {
  render(){
    var itembox = null;
    if (this.props.listItem.status === 'complete') {
      itembox = <input type="checkbox"  id={this.props.id} onChange={this.props.onChange} checked/>
    } else {
      itembox =  <input type="checkbox"  id={this.props.id} onChange={this.props.onChange}/>
    }
    return(itembox);
  }
}

class LabelItem extends Component {
  render() {
    var itembox = null;
    if (this.props.listItem.status === 'complete') {
      itembox = <label id={this.props.listItem.id}>{this.props.listItem.item}</label>
    } else {
      itembox = <label id={this.props.listItem.id}>{this.props.listItem.item}</label>
    }
    return(itembox);
  }
}

export default App;
