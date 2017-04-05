import { combineReducers } from 'redux';

import { loginReducer } from './loginReducer';
import { homeReducer } from './homeReducer';
import { mapReducer } from './mapReducer';
// import { appReducer } from './appReducer';

const rootReducer = combineReducers({
    loginReducer,
    mapReducer,
    homeReducer
});

export default rootReducer;