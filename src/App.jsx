// App.js
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shoppingListReducer } from './reducers/ShoppingListReducer';
import ShoppingList from './ShoppingList.jsx';

const store = createStore(shoppingListReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
