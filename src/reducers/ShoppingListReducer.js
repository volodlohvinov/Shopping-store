import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from '../actions/ShoppingListAction';

const initialState = {
  items: [],
};

export function shoppingListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.item],
      };
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? action.newItem : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
}
