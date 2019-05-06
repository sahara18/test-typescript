import {List, Record, RecordOf} from 'immutable';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

export interface ITodo {
  text: string;
  done: boolean;
}

const RTodo = Record({
  text: null,
  done: false,
});

export type IState = RecordOf<{
  items: List<ITodo>;
}>;

const RState = Record({
  items: List.of<ITodo>(),
});

const initialState: IState = RState({
  items: List.of<ITodo>(
    RTodo({ text: 'Do smth 1..', done: true }),
    RTodo({ text: 'Do smth 2..', done: false }),
    RTodo({ text: 'Do smth 3..', done: false }),
  ),
});

export default (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case ADD_TODO:
      return state.update('items', items => items.push(RTodo({
        text: action.text,
        done: false,
      })));

    case TOGGLE_TODO:
      return state.updateIn(['items', action.key, 'done'], done => !done);

    default:
      return state;
  }
};

export const addTodo = (text: string): IAddTodo => ({ type: ADD_TODO, text });
export interface IAddTodo {
  type: 'ADD_TODO';
  text: string;
}

export const toggleTodo = (key: number): IToggleTodo => ({ type: TOGGLE_TODO, key });
export interface IToggleTodo {
  type: 'TOGGLE_TODO';
  key: number;
}

export type IAction =
  | IAddTodo
  | IToggleTodo;
