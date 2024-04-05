// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import AppStack from './lib/router/router';
import store from './lib/store/store';


const App = () => {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
};

export default App;
