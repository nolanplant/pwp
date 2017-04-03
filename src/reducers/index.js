import { combineReducers } from 'redux';

import { loginReducer } from './loginReducer';
import { parentReducer } from './parentReducer';
import { childReducer } from './childReducer';
// import { appReducer } from './appReducer';

const rootReducer = combineReducers({
    loginReducer,
    parentReducer,
    childReducer
});

export default rootReducer;