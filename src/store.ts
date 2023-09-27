import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from './reducers/ShoppingListReducer';

const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});

export default store;
