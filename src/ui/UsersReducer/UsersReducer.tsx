import React, { useReducer, useState } from 'react';
import { UserList } from './UserList';
import { UserForm } from './UserForm';
export type User = {
    id: number;
    nickname: string;
    age: number;
}

type State = User[];

type Action = 
    { type: "add"; payload: User } |
    { type: "remove"; payload: number }
    | { type: "update"; payload: User };

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "add":
            return [...state, action.payload]
        case "remove":
            return state.filter((_, index) => index !== action.payload);
        case "update":
            return state.map(user => user.id === action.payload.id ? action.payload : user);
        default:
            return state;
    }
  };
  
 
  
export const UsersReducer = () => {
    const users: State = [{ id: 1, nickname: 'john', age: 45 }, { id: 2, nickname: 'olivier', age: 32 }, { id: 3, nickname: 'macgyver', age: 65 }];

    const [ state, dispatch ] = useReducer(reducer, users)
    const [editUser, setEditUser]= useState<User|null>(null)

    const handleAddUser = (user: User) => {
        dispatch({ type: 'add', payload: user });
      };
    
      const handleEditUser = (user: User) => {
        setEditUser(user);
      };
    
      const handleUpdateUser = (user: User) => {
        dispatch({ type: 'update', payload: user });
        setEditUser(null);
      };
    
      const handleDeleteUser = (id: number) => {
        dispatch({ type: 'remove', payload: id });
      };
    return (
        <div>
        <UserForm onSubmit={editUser ? handleUpdateUser : handleAddUser} editUser={editUser} />
        <UserList users={state} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      </div>
    )
}