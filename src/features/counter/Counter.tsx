import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
//import styles from './Counter.module.css'
import { RootState } from '../../app/store'

export const Counter: React.FC = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
        </div>
    )
}