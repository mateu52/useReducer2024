import { KeyboardEventHandler, useReducer, useRef } from "react";

// const reducer = (state, action) => {
//     switch(action.type){
//         case "add" {
//             return {}
//         }
//     }
// }
type State = {
    count: number;
}
enum ActionType {
    INCREMENT = 'increment',
    DECREMENT = 'decrement',
    SET_VALUE = 'set-value'
}
type Action = {
    type: ActionType;
    payload?: number;
}
const setValue = (value: number) => ({
    type: ActionType.SET_VALUE,
    payload: value,
})
const initialState: State = {count: 0};
const reducer = (state: State, action: Action) => {
    switch(action.type){
        case ActionType.DECREMENT:
            return { count: state.count - 1};
        case ActionType.INCREMENT:
            return { count: state.count + 1};
        case ActionType.SET_VALUE:
            return { count: action.payload };
        default:
            return state;
    }
    return state
}

export const Users = () => {
    const users = [{ id: 1, nickname: 'john', age: 45 }, { id: 2, nickname: 'olivier', age: 32 }, { id: 3, nickname: 'macgyver', age: 65 }];
    //const [ state, dispatch ] = useReducer( reducer, users );
    const [ state, dispatch ] = useReducer( reducer, initialState );
    const valueFieldRef = useRef<HTMLInputElement>(null);
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.code === "Enter" && valueFieldRef.current) {
            dispatch(setValue(parseInt(valueFieldRef.current.value, 10)));
          }
    }
    return(
        <div>
            <button onClick={() => dispatch({ type: ActionType.DECREMENT})}>-</button>
            <div>{state.count}</div>
            <button onClick={() => dispatch({ type: ActionType.INCREMENT})}>+</button>
            <input ref={valueFieldRef} onKeyDown={handleKeyDown} />
        </div>
    )
}