import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer'
import logger from 'redux-logger'


const store = createStore(reducer, applyMiddleware(
    promiseMiddleware(),
    logger
));
export default store 