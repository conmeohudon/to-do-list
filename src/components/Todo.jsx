import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();

  const handleAdd = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  // Lọc theo từ khóa tìm kiếm
  const filteredTodos = todoList.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-md">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* Ô thêm mới */}
      <div className="flex items-center my-5 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          onKeyDown={handleKeyPress}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={handleAdd}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* Ô tìm kiếm */}
      <div className="flex items-center mb-5 bg-gray-100 rounded-full">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-500"
          type="text"
          placeholder="Search task..."
        />
      </div>

      {/* Danh sách To-Do */}
      <div>
        {filteredTodos.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
            editTodo={editTodo}
          />
        ))}

        {filteredTodos.length === 0 && (
          <p className="text-center text-slate-500 mt-10">
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Todo;
