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

    this.state = {
      todoData: [
        { label: 'Drink Coffee', important: false, id: 1 },
        { label: 'Learn React', important: true, id: 2 },
        { label: 'Take a Walk', important: false, id: 3 }
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
      const newItem = {
        label: text,
        important: false,
        id: this.maxId++
      };

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
      console.log("onToggleDone ", id);
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
