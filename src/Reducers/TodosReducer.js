import { v4 as uuidv4 } from "uuid";

export default function Reducer(currentTodos, action) {
  switch (action.type) {

    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.pyload.title,
        details: action.pyload.details,
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("Todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }


    case "deleted" : {
        const updatedTodos = currentTodos.filter((t) => {
      return t.id != action.pyload.id;
    });
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    return updatedTodos;
    }


    case "updated" :{
         const updatedTodos = currentTodos.map((t) => {
      if (t.id == action.pyload.id) {
        return {
          ...t,
          title: action.pyload.Title,
          details: action.pyload.detail,
        }
      } else {
        return t;
      }
    })
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  return updatedTodos;
    }

    case "get" : {
    const storageTodos = JSON.parse(localStorage.getItem("Todos")) ?? [];
    return storageTodos
    }

    case "check" : {
      const updatedTodos = currentTodos.map((t) => {
      if (t.id == action.pyload.id) {
        const updatedTodoo = {...t, isCompleted : !t.isCompleted}
        return updatedTodoo
      }
      return t;
    });
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    return updatedTodos;
    }

    default: {
      throw Error("unkwon action " + action.type);
    }
  }

  return [];
}
