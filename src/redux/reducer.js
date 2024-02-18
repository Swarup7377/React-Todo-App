import { createSlice } from "@reduxjs/toolkit";

// Check if tasks are stored in local storage
const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

// Use stored tasks or initialize an empty array
const initialState=storedTodos;

// Create a reducer slice
const addTodoReducer= createSlice({
    name: "todos", // Name of the slice
    initialState, // Initial state for the slice

    // Reducer functions for handling different actions
    reducers:{

        // Action to add a new todo to the state
        addTodos: (state,action) =>{
            state.unshift(action.payload);
            return state;
        },

        // Action to remove a todo from the state based on its id
        removeTodos: (state,action)=>{
            return state.filter((item)=> item.id !== action.payload);
        },

        // Action to update the content of a todo based on its id
        updateTodos: (state,action)=>{
            return state.map((todo)=>{
                if(todo.id === action.payload.id){
                    return{
                        ...todo,
                        item: action.payload.item
                    };
                    
                }
                return todo;
            });
        },

        // Action to mark a todo as completed based on its id
        completeTodos: (state,action)=>{
            return state.map((todo)=>{
                if(todo.id === action.payload){
                    return{
                        ...todo,
                        completed:true,
                    };  
                }
                return todo;
            });
        }
    }
});

// Export actions and reducer
export const {
    addTodos, removeTodos, updateTodos, completeTodos
  } = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;