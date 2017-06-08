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
    this.itemEditBoxChange = this.itemEditBoxChange.bind(this);
    this.itemEditBoxKeyPressed = this.itemEditBoxKeyPressed.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  handleSearchTextChange(event) {
    this.setState({inputField:event.target.value});
  }

  addTextInTodoList(event) {
    if (event.key === 'Enter' && this.state.inputField.length >0) {
      this.updateList(itemID++,this.state.inputField,'active');
      this.setState({inputField:''});
    }
  }

  updateList(itemid,itemname,status) {
    this.state.listItem.push({id:itemid,item:itemname,status:status,isEdit:false});
  }

  onChangeCheckBoxState(event) {
    var arrList = this.state.listItem.filter((item)=>{
      if (item.id === parseInt(event.target.id)) {
        item.status = event.target.checked?'complete':'active';
      }
      return item;
    });
    this.setState({listItem:arrList});
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

  itemEditBoxChange(event) {
    var arrList = this.state.listItem.filter(items => {
      if (items.id === parseInt(event.target.id)) {
        items.item = event.target.value;
      }
      return items;
    });
    this.setState({listItem:arrList});
  }

  onClickEdit(event) {
    var arrList = this.state.listItem.filter(items => {
      if (items.id === parseInt(event.target.id)) {
        items.isEdit = true;
      }
      return items;
    });
    this.setState({listItem:arrList});
  }

  itemEditBoxKeyPressed(event) {
      if (event.key === 'Enter' || event.type === 'blur') {
        var arrList = this.state.listItem.filter(items => {
          if (items.id === parseInt(event.target.id)) {
            items.isEdit = false;
          }
          return items;
        });
        this.setState({listItem:arrList});
    }
  }

  render() {
    var arrListItems = this.state.listItem;
    const items =  arrListItems.map((item,key)=> {
      if (this.state.showList === 'all') {
        console.log('all');
        return <li className="listItem" key={item.id}><ListItemsForTodo onClickEdit={this.onClickEdit} onEditBoxChange={this.itemEditBoxChange} onEditBoxKeyPress={this.itemEditBoxKeyPressed} onClickCancel={this.deleteItemFromList} onClickCheckbox={this.onChangeCheckBoxState} listItem={item}/></li>
      } else if (this.state.showList === 'active' && item.status === 'active') {
        console.log('active');
        return <li className="listItem" key={item.id}><ListItemsForTodo onClickEdit={this.onClickEdit} onEditBoxChange={this.itemEditBoxChange} onEditBoxKeyPress={this.itemEditBoxKeyPressed} onClickCancel={this.deleteItemFromList} onClickCheckbox={this.onChangeCheckBoxState} listItem={item}/></li>
      } else if (this.state.showList === 'complete' && item.status === 'complete') {
        console.log('complete');
        return <li className="listItem" key={item.id}><ListItemsForTodo onClickEdit={this.onClickEdit} onEditBoxChange={this.itemEditBoxChange} onEditBoxKeyPress={this.itemEditBoxKeyPressed} onClickCancel={this.deleteItemFromList} onClickCheckbox={this.onChangeCheckBoxState} listItem={item}/></li>
      } else {
        console.log('null');
        return null;
      }
    });

    return (
      <div className="todobox">

        <SearchField inputField={this.state.inputField} onChange={this.handleSearchTextChange} onKeyPress={this.addTextInTodoList}/>
        <ul className="ListItemsForTodo">{items}</ul>
        <ActionButtons onAllClick={this.showAllList} onActiveClick={this.showActiveList} onCompleteClick={this.showCompleteList}/>
      </div>
    );
  }
}

class ActionButtons extends Component {
  render(){
    return (
      <div className="ActionButtons">
        <button className="ActionButtonClass" onClick={this.props.onAllClick}>All</button>
        <button className="ActionButtonClass" onClick={this.props.onActiveClick}>Active</button>
        <button className="ActionButtonClass" onClick={this.props.onCompleteClick}>Complete</button>
      </div>
    );
  }
}

class SearchField extends Component {
  render() {
    return (
      <div className="searchField">
        <input className="searchFieldInput" type="text" placeholder="What needs to be done?" value={this.props.inputField} onChange={this.props.onChange} onKeyPress={this.props.onKeyPress}/>
      </div>
    );
  }
}

class ListItemsForTodo extends Component {
  render(){
    let inputEditItem = null;
    let lblEditItem = null;
    if (this.props.listItem.isEdit) {
      inputEditItem = <input className="inputEditItem" id={this.props.listItem.id} type="text" value={this.props.listItem.item} onChange={this.props.onEditBoxChange} onKeyPress={this.props.onEditBoxKeyPress} onBlur={this.props.onEditBoxKeyPress} autoFocus/>
    } else {
      lblEditItem = <LabelItem listItem={this.props.listItem} id={this.props.listItem.id} />
    }
    return(
      <div>
        <CheckboxItem listItem={this.props.listItem} id={this.props.listItem.id} onChange={this.props.onClickCheckbox}/>
        {lblEditItem}
        {inputEditItem}
        <button className="editButton" id={this.props.listItem.id} onClick={this.props.onClickEdit}>edit</button>
        <button className="deleteButton" id={this.props.listItem.id} onClick={this.props.onClickCancel}>X</button>
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
      itembox =  <input type="checkbox" id={this.props.id} onChange={this.props.onChange}/>
    }
    return(itembox);
  }
}

class LabelItem extends Component {
  render() {
    var itembox = null;
    if (this.props.listItem.status === 'complete') {
      itembox = <label className="CompleteLabel" id={this.props.listItem.id}>{this.props.listItem.item}</label>
    } else {
      itembox = <label className="ActiveLabel" id={this.props.listItem.id}>{this.props.listItem.item}</label>
    }
    return(itembox);
  }
}

export default App;
