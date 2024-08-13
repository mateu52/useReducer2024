import { createSlice } from "@reduxjs/toolkit";

export type User = {
    id: number;
    nickname: string;
    age: number;
}

type UserState = User[];

const initialState: UserState = [
        { id: 1, nickname: 'john', age: 45 }, 
        { id: 2, nickname: 'olivier', age: 32 }, 
        { id: 3, nickname: 'macgyver', age: 65 }
    ];


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        add: [...state, action.payload]
    }
})