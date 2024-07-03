const {createStore} = Redux

export  const INCREMENT='INCREMENT'

const initialState={
count:50,
}

function appReducer(state=initialState,action={}){
    switch (action.type) {
        case  INCREMENT:
            return {...state,count:state.count+1}
            
    
        default:
            return state
    }
}

export const store=createStore(appReducer)