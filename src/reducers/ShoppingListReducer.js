import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: { items: [] },
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
