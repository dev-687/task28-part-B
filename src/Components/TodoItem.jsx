import React, { useState } from 'react'
import { useTodo } from '../Contexts/ToDoContext';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.task)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo._id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo._id, todo.completed)
    }


    return (
        <div
            className={`flex flex-col border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black w-full ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <div className="flex items-center w-full min-w-0">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg break-words whitespace-normal   ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                        } ${todo.completed ? "line-through" : ""}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />
                {/* Edit, Save Button */}
                <button
                    className="inline-flex w-8 h-8 flex-shrink-0 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => {
                        if (todo.completed) return;

                        if (isTodoEditable) {
                            editTodo();
                        } else setIsTodoEditable((prev) => !prev);
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "📁" : "✏️"}
                </button>
                {/* Delete Todo Button */}
                <button
                    className="inline-flex w-8 h-8 flex-shrink-0 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50 ml-1"
                    onClick={() => deleteTodo(todo._id)}
                >
                    ❌
                </button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
           Cr {new Date(todo.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}  
            {" "} {new Date(todo.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
            {/* </p><p className="text-xs text-gray-600 mt-1"> */}
            {" "}
            Comp {new Date(todo.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}  
            {" "} {new Date(todo.updatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
            </p>
        </div>
    );
}

export default TodoItem;