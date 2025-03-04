import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from './Contexts'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'
import axios from 'axios'
function App() {
  const [todos, setTodos] = useState([])
  const baseurl="https://task28-part-a-8h6g.vercel.app";
  const addTodo = (todo) => { setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]) }


  const updateTodo =async (id, todo) => {
    try {
      await axios.put(`${baseurl}/api/v1/todos/${id}`, {
        task: todo.todo
      })
      setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

      alert(`Task updated successfully.`);
    } catch (error) {
      console.error("Error deleting todo:", error.response?.data || error.message);
    }
    
  }
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseurl}/api/v1/todos/${id}`);

      setTodos((prev) => prev.filter((prevTodo) => prevTodo._id !== id));

      alert(`Todo with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting todo:", error.response?.data || error.message);
    }
  }
  const toggleComplete = async (id, status) => {
    const todo = await axios.put(`${baseurl}/api/v1/todos/${id}`, {
      completed: !status
    })
    setTodos((prev) =>
      prev.map((prevTodo) => prevTodo._id === id
        ? { ...prevTodo, completed: !prevTodo.completed }
        : prevTodo
      ))
  }

  useEffect(() => {
    const todos = axios.get(`${baseurl}/api/v1/todos/`)
      .then((res) => setTodos(res.data))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {


    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo._id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}


export default App
