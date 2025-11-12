import React, { useState } from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';
import edit_icon from '../assets/edit.jpg';
import save_icon from '../assets/save.png';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    const newText = editText.trim();
    if (newText !== "") {
      editTodo(id, newText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer select-none"
      >
        <img
          className="w-7 transition-transform duration-150 hover:scale-110"
          src={isComplete ? tick : not_tick}
          alt="toggle"
        />

        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="ml-4 bg-gray-100 px-2 py-1 rounded text-[17px] flex-1 outline-none"
            autoFocus
          />
        ) : (
          <p
            className={`ml-4 text-[17px] transition-all duration-200 ${
              isComplete ? 'text-slate-400 line-through' : 'text-slate-700'
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-sm text-green-600 font-medium px-2"
        >
          <img className="w-3.5 cursor-pointer hover:scale-110 transition-transform duration-150" src={save_icon} alt='save'></img>
          {/* 💾 */}
        </button>
      ) : (
        <>
          <img
            onClick={() => setIsEditing(true)}
            className="w-4 cursor-pointer hover:scale-110 transition-transform duration-150"
            src={edit_icon}
            alt="edit"
          />
          <img
            onClick={() => deleteTodo(id)}
            className="w-3.5 cursor-pointer hover:scale-110 transition-transform duration-150"
            src={delete_icon}
            alt="delete"
          />
        </>
      )}
    </div>
  );
};

export default TodoItems;
