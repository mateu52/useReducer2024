import { useReducer, useState } from "react"

type User = {
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

    const handleEdit =(user: User) => {
        setEditUser(user);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(editUser) {
            const { name, value } = e.target;
            setEditUser({...editUser, [name]: value})
        }
    }
    const handleUpdate = () => {
        if(editUser){
            dispatch({type: "update", payload: editUser})
            setEditUser(null)
        }
    }
    
    return (
        <div>
            {editUser ? (
                <div>
                    <input
                        type="text" name="nickname" value={editUser.nickname} onChange={handleChange}
                    />
                    <input 
                        type="number" name="age" value={editUser.age} onChange={handleChange}
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditUser(null)}>Cancel</button>
                </div>
            ): (
                <div>
                    <button onClick={() => dispatch({ type: "add", payload: { id: state.length + 1, nickname: "newUser", age: 28}})}>
                        Add
                    </button>
                    {state.map((user, index) => {
                        return (
                            <div key={user.id} className="flex items-center justify-between mb-2">
                                <p key={index} className="" onClick={()=>handleEdit(user)}>{user.nickname}</p>
                                <button onClick={() => dispatch({ type: "remove", payload: index })}>delete</button>
                            </div>
                        )
            })}
                </div>
            )}
        </div>
    )
}