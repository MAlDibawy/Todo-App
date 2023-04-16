import React, { useRef, useState } from "react";

export default function TodoItem({ todo, checkAsDone, removeTodo, editTodo }) {
  const { id, value, done } = todo;
  const [editValue, setEditValue] = useState(value);

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editValue.trim() !== "") {
      editTodo(id, editValue);
    } else {
      setEditValue(value);
    }
    inputRef.current.blur();
  };

  return (
    <>
      <div className="col-lg-8 col-11 m-auto p-2">
        <div className="todoItem d-flex justify-content-between rounded border-0 align-items-center px-2">
          <div className="d-flex align-items-center justify-content-around">
            <div
              onClick={() => checkAsDone(id)}
              className="done d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: done ? "#0B5ED7" : "white",
              }}
            >
              <i className="fa-solid fa-check d-inline p-2 text-white"></i>
            </div>
            <div className="todoInput">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control border-0 py-2 m-0"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </form>
            </div>
          </div>
          <i
            onClick={() => removeTodo(id)}
            className="deleteIcon fa-solid fa-trash-can p-2"
            role="button"
          ></i>
        </div>
      </div>
    </>
  );
}
