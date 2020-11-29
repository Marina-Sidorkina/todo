import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'
import './app.css';

export default class App extends Component { 
  constructor() {
    super();

    this.maxId = 100;

    this.createTodoItem = (label) => {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    };

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Learn React'),
        this.createTodoItem('Take a Walk')
      ]
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        const newArray = [
          ...todoData.slice(0, index),
          ...todoData.slice(index + 1)
        ];
        
        return {
          todoData: newArray
        }
      });
    };

    this.addItem = (text) => {
      const newItem = this.createTodoItem(text);

      this.setState(({ todoData }) => {
        const newArray = [
          ...todoData,
          newItem
        ];

        return {
          todoData: newArray
        }
      });
    };

    this.onToggleImportant = (id) => {
      console.log("onToggleImportant ", id);
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        const newItem = {...todoData[index], done: !todoData[index].done};
        const newArray = [
          ...todoData.slice(0, index),
          newItem,
          ...todoData.slice(index + 1)
        ];
        
        return {
          todoData: newArray
        }
      });
    };
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList 
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
}
