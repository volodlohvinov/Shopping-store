export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export function addItem(item) {
  return { type: ADD_ITEM, item };
}

export function editItem(id, newItem) {
  return { type: EDIT_ITEM, id, newItem };
}

export function deleteItem(id) {
  return { type: DELETE_ITEM, id };
}
