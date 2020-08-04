import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { NewsReducer } from './reducers/reducer';

export const configStore=(initialStoreState)=>{
    const store = createStore(NewsReducer, { ...initialStoreState },applyMiddleware(thunk));
    return store;
}