import { useReducer } from "react"

type User = {
    id: number;
    nickname: string;
    age: number;
}

type State = User[];

type Action = 
    { type: "add"; payload: User } |
    { type: "remove"; payload: number };

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "add":
            return [...state, action.payload]
        case "remove":
            return state.filter((_, index) => index !== action.payload);
        default:
            return state;
    }
  };
  

export const UsersReducer = () => {
    const users: State = [{ id: 1, nickname: 'john', age: 45 }, { id: 2, nickname: 'olivier', age: 32 }, { id: 3, nickname: 'macgyver', age: 65 }];

    const [ state, dispatch ] = useReducer(reducer, users)

    
    return (
        <div>
            <p className="bg-dark-600 font-bold">ok</p>
            <button onClick={() => dispatch({type:"add", payload : {id: 1, nickname: 'john', age: 45}})}>Add</button>
            {state.map((user, index) => {
                return (
                    <div key={user.id} className="flex items-center justify-between mb-2">
                        <p key={index} className="">{user.nickname}</p>
                        <button onClick={() => dispatch({ type: "remove", payload: index })}>delete</button>
                    </div>
                )
            })}
        </div>
    )
}