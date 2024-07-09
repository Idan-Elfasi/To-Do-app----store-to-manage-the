import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { loadToDos, removeToDo, saveToDo } from "../store/todo.action.js"
import { START_LOADING, STOP_LOADING } from "../store/store.js"

const { useState, useEffect, useRef } = React

const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
    const dispatch = useDispatch()
    const countLoaded = useRef(0)
    const todos = useSelector(state => state.todos)
    const Loading = useSelector(state => state.isLoading)
    console.log(Loading);
 
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    const [filterBy, setFilterBy] = useState(defaultFilter)
    useEffect(() => {
        
        // dispatch({ type: START_LOADING ,isLoading:true})
        setSearchParams(filterBy)
        loadToDos(filterBy)
    //     .then(todos => countLoaded.current < 3 ? showSuccessMsg('todos loaded!') : console.log('the todos load again'))
    //     // .then(dispatch({ type: STOP_LOADING ,isLoading:false}))
    //         .catch(err => showErrorMsg('Error loadig todos...'))
    // }
     } , [filterBy])

    function onRemoveTodo(todoId) {
        removeToDo(todoId)
            .then(() => showSuccessMsg(`Todo removed`))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        // todoService.save(todoToSave)
        //     .then((savedTodo) => {
        //         setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
        saveToDo(todoToSave)
            .then(() => showSuccessMsg(`Todo is ${(todoToSave.isDone) ? 'done' : ' still not done,back on your list'}`))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todo._Id)
            })
    }

    // if ( Loading) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
             <h2>Todos List</h2>
            {
                Loading? <div>Loading...</div>
                :
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            }
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}