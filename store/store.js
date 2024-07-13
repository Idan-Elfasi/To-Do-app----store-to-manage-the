const {createStore,combineReducers,compose} = Redux

import { todoService } from "../services/todo.service.js"

export  const INCREMENT='INCREMENT'
export  const SET_TODOS ='SET_TODOS'
export  const REMOVE_TODO ='REMOVE_TODO'
export  const ADD_TODO ='ADD_TODO'
export  const UPDATE_TODO ='UPDATE_TODO'
export const SET_IS_LOADING='SET_IS_LOADING'
export const SET_FILTER_BY='SET_FILTER_BY'


const initialState={
count:50,
todos:[],
isLoading:false,
filterBy: todoService.getDefaultFilter()
}

function appReducer(state=initialState,action={}){
    switch (action.type) {
        case  INCREMENT:
            return {...state,count:state.count+1}
        case  SET_TODOS:
            return {...state, todos: action.todos}   
            // store.dispatch in the js action file  update the action object and play the appReducer function ,
            // then  update the shareabale state  by the updated action object
            case  REMOVE_TODO:
                var todos = state.todos.filter(todo =>todo._id !== action.todoId )
               return {...state ,  todos } 
            case  ADD_TODO:
               return {...state ,  todos: [...state.todos,action.todo] } 
            case  UPDATE_TODO:
                var todos = state.todos.map(todo=>todo._id === action.todo._id? action.todo :todo )
               return {...state ,  todos } 
            case  SET_IS_LOADING:
               return {...state ,isLoading: action.isLoading }  

            case  SET_FILTER_BY:
               return {...state ,filterBy: {...state.filterBy, ...action.filterBy} }  

    
        default:
            return state
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store=createStore(appReducer,composeEnhancers())

window.gStore = store