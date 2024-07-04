const {createStore} = Redux

export  const INCREMENT='INCREMENT'
export  const SET_TODOS ='SET_TODOS'
export  const REMOVE_TODO ='REMOVE_TODO'
export  const ADD_TODO ='ADD_TODO'
export  const UPDATE_TODO ='UPDATE_TODO'

const initialState={
count:50,
todos:[]
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

    
        default:
            return state
    }
}

export const store=createStore(appReducer)

window.gStore = store