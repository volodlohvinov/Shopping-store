import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem } from './reducers/ShoppingListReducer';
import './ShoppingList.scss'
import { Button } from 'antd';
import { coolButton } from './button.module.scss'
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';



const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingList.items);
  const [newItem, setNewItem] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);
  const [error, setError] = useState('');

  const validateInput = (name, quantity) => {
    if (!name.trim()) {
      setError('Product name cannot be empty.');
      return false;
    }
    

    if (isNaN(quantity) || quantity <= 0) {
      setError('Quantity must be a positive number.');
      return false;
    }

    setError('');
    return true;
  };

  const handleAddItem = () => {

    if (!isNaN(newItem) || newItem.trim() === '') {
        setError('Product name cannot be a number or empty.');
        return;
      }
    if (validateInput(newItem, newItemQuantity)) {
        const newItemObject = {
          id: Date.now(),
          name: newItem,
          quantity: parseInt(newItemQuantity, 10) || 1,
        };
        dispatch(addItem(newItemObject));
        setNewItem('');
        setNewItemQuantity('');
        setError(''); 
      }
    };

    const handleEditItem = () => {
        if (!isNaN(newItem) || newItem.trim() === '') {
          setError('Product name cannot be a number or empty.');
          return;
        }
      
        if (editMode && editedItemId) {
          if (validateInput(newItem, newItemQuantity)) {
            dispatch(
              editItem(editedItemId, {
                id: editedItemId,
                name: newItem,
                quantity: parseInt(newItemQuantity, 10) || 1,
              })
            );
            setNewItem('');
            setNewItemQuantity('');
            setEditMode(false);
            setEditedItemId(null);
            setError(''); 
          }
        }
      };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className='edit'>
      <h1>Shopping List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} ({item.quantity})
            <DeleteOutlined onClick={() => handleDeleteItem(item.id)}>Delete</DeleteOutlined>
            <EditOutlined onClick={() => {setNewItem(item.name); setNewItemQuantity(item.quantity); setEditMode(true); setEditedItemId(item.id); }}>Edit</EditOutlined>
          </li>
        ))}
      </ul>
      <div className='ShoppingList__field_container '>
        <input className={"ShoppingList__product_field"}
          type="text"
          placeholder='Name of product'
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input className={"ShoppingList__quantiy_field"}
          type="number"
          placeholder="Quantity"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
        />
        {editMode ? (
          <Button className={'button ' + coolButton} onClick={handleEditItem}>Edit Item</Button>
        ) : (
          <Button className={'button ' + coolButton} onClick={handleAddItem}>Add Item</Button>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
