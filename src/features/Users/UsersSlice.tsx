import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    id: number;
    nickname: string;
    age: number;
}

export type UserState = User[];

const initialState: UserState = [
        { id: 1, nickname: 'john', age: 45 }, 
        { id: 2, nickname: 'olivier', age: 32 }, 
        { id: 3, nickname: 'macgyver', age: 65 }
    ];


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
        },
        remove: (state, action) => {
            return state.filter((_, index) => index !== action.payload)
        },
        update : (state, action ) => {
            return state.map(user => user.id === action.payload.id ? action.payload: user);
        }
        
    }
})

export const { add, remove, update } = usersSlice.actions;
export default usersSlice.reducer;