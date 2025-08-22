import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import Todo from './components/Todo';
import TodosProvider  from './Context/TodosContext';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import { ToastProvider } from './Context/ToastContext';



const initialTodos = [
  {
    id: uuidv4(),
    title: "actionneur",
    details: "c'est un moteur électrique",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "disjoncteur",
    details: "c'est un dispositif de protection",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "contacteur",
    details: "c'est un appareil de contrôle",
    isCompleted: false,
  },
];


function App() {
  return (
    <TodosProvider>
    <ToastProvider>
    <div className="App" style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#6f85ce",height:"100vh"}}>
      
      <TodoList />
      
    </div>
    </ToastProvider>
    </TodosProvider>
  );
}

export default App;
