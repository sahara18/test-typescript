import {createStore, combineReducers} from 'redux';
import todos, {IState as TodosState} from './models/todos';

const reducers = combineReducers({
  todos,
});

const store = createStore(reducers);

export default store;

export interface IState {
  todos: TodosState,
}
