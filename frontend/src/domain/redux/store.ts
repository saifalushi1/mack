import { configureStore } from "@reduxjs/toolkit"
import { Iuser } from "../../App"

const initialState = {
    id: 0,
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: ""
}

function userReducer(state: Iuser = initialState, action: { type: string; payload: Iuser }) {
    // Check to see if the reducer cares about this action
    if (action.type === "login/signin") {
        // If so, make a copy of `state`
        return {
            ...state,
            id: action.payload.id,
            username: action.payload.username,
            email: action.payload.email,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName
        }
    } else if (action.type === "login/signout") {
        return {
            ...state,
            initialState
        }
    }
    // otherwise return the existing state unchanged
    return state
}

const store = configureStore({ reducer: userReducer })
store.dispatch({ type: "" })
console.log(store.getState())
store.dispatch({ type: "counter/increment" })

const increment = () => {
    return {
        type: "counter/increment"
    }
}

store.dispatch(increment())

console.log(store.getState())

// console.log(store.getState())
// const selectCounterValue = (state: { value: number }) => state.value

// const currentValue = selectCounterValue(store.getState())
// console.log(currentValue)
