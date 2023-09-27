import { createSlice } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
  quantity: number;
}

interface ShoppingListState {
  items: Item[];
}

const initialState: ShoppingListState = {
  items: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    editItem: (state, action) => {
      const { id, name, quantity } = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, name, quantity };
        }
        return item;
      });
    },
    
     deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, editItem, deleteItem } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
