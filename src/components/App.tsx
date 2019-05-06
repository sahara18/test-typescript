import * as React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {IState} from '../store';
import {ITodo, addTodo, toggleTodo} from '../models/todos';
import cx from 'classnames';
import './App.css';

interface IProps {
  todos: List<ITodo>;
  addTodo: Function;
  toggleTodo: Function;
}

function App(props: IProps) {
  return (
    <div className="App">
      <input
        type="text"
        // @ts-ignore
        onKeyDown={(e: KeyboardEvent) => {
          if (e.keyCode === 13) {
            // @ts-ignore
            props.addTodo(e.target.value);
            // @ts-ignore
            e.target.value = '';
          }
        }}
      />

      {props.todos.map((todo: ITodo, key: number) => (
        <label key={key} className={cx({ done: todo.done })}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => props.toggleTodo(key)}
          /> {todo.text}
        </label>
      ))}
    </div>
  );
}

export default connect((state: IState) => ({
  todos: state.todos.get('items'),
}), {addTodo, toggleTodo})(App);
