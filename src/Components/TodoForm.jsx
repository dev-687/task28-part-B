import React, { useState } from 'react'
import { useTodo } from '../Contexts/ToDoContext';
import axios from 'axios';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add=async (e)=>{
        console.log(todo);
        
        e.preventDefault()
        if(!todo) return
        try {
            const res = await axios.post("http://localhost:5000/api/v1/todos", {
              task: todo, 
              completed: false,
            });
      
            addTodo(res.data.todo); 
            setTodo(""); 
          } catch (error) {
            console.error("Error adding todo:", error);
          }
    }

  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default TodoForm;