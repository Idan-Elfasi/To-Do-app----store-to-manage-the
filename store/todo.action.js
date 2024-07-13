// import { func } from "prop-types";
import { todoService } from "../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_IS_LOADING, SET_TODOS, UPDATE_TODO, store } from "./store.js";


export function loadToDos() {
    const filterBy = store.getState().filterBy
    store.dispatch({type:SET_IS_LOADING, isLoading:true})
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos })) //action object
        .catch(err=>{
            console.log('Cannot load todos',err);
            throw err
        })
        .finally(()=>  {store.dispatch({ type: SET_IS_LOADING, isLoading:false })})
}
export function removeToDo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}
export function saveToDo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO

    return todoService.save(todo)
        .then(todo => store.dispatch({ type, todo }))
}

