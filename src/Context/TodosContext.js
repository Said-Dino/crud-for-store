import {createContext, useContext, useReducer} from "react";
import TodosReducer from "../Reducers/TodosReducer";

const TodosContext = createContext([]);

const TodosProvider = ({children})=>{

    const [Todos,dispatch] = useReducer(TodosReducer,[]);

    return (
        <TodosContext.Provider value={{Todos,dispatch}}>{children}</TodosContext.Provider>
    )
}

export default TodosProvider

export const useTodos = ()=>{
    return useContext(TodosContext);
} 
// export const TodosContext = createContext([])
