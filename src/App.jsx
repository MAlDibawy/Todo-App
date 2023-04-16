import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/todoItem/TodoItem";
import TodoImage from "/cfd969583ee9557cb6d7ac303d0d2a80.svg";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    if (localStorage.getItem("Todos")) {
      const storedTodos = JSON.parse(localStorage.getItem("Todos"));
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        value: inputText,
        done: false,
      };
      setTodos((prevState) => [...prevState, newTodo]);
      setInputText("");
    }
  };

  const removeTodo = (todoId) => {
    const confirm = window.confirm("Are you sure you want delete this todo?");
    if (!confirm) return;
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  const checkAsDone = (todoId) => {
    setTodos((prevState) => {
      const newTodos = prevState.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, done: !todo.done };
        } else {
          return todo;
        }
      });
      return newTodos;
    });
  };

  const toggleShowDone = () => {
    setHideDone((prevState) => !prevState);
  };

  const editTodo = (todoID, newValue) => {
    if (newValue.trim() !== "") {
      setTodos((prevState) => {
        const newTodos = prevState.map((todo) => {
          if (todo.id === todoID && todo.value !== newValue) {
            return { ...todo, value: newValue };
          } else {
            return todo;
          }
        });
        return newTodos;
      });
    }
  };

  return (
    <div className="App container-fluid m-auto">
      <h2 className="text-white mb-4 text-center">Todo List</h2>

      <form onSubmit={addTodo}>
        <div className="d-flex  justify-content-center py-4">
          <input
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            type="text"
            placeholder="Add a todo..."
            className="inpValue form-control me-2"
            ref={inputRef}
            value={inputText}
            style={{ maxWidth: "75%" }}
          />
          <button className="btn btn-primary  text-white" type="submit">
            <span className="icon">
              <i className="fa-solid fa-check d-inline p-2"></i>
            </span>
          </button>
        </div>
      </form>
      <div className="text-white text-center mb-2">
        <span onClick={toggleShowDone} role="button">
          {hideDone ? "Show completed todos" : "Hide completed todos"}
        </span>
      </div>
      <div className="d-flex flex-column-reverse">
        {todos.length == 0 ? (
          <div className="text-center">
            <img
              className="todoImg w-50"
              src={TodoImage}
              alt=""
              style={{ maxHeight: "200px" }}
            />
          </div>
        ) : (
          todos
            .filter((todo) => !hideDone || !todo.done)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                checkAsDone={checkAsDone}
                removeTodo={removeTodo}
                editTodo={editTodo}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default App;
