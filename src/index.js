import React from 'react';
import AppBase from './containers/AppBase';
import {Provider} from 'react-redux';
import getStore from './store';


const store = getStore();
//possibly dispach actions here

export default PriorityWinePass = () => (
  <Provider store={store}>
      <AppBase />
  </Provider>
);

