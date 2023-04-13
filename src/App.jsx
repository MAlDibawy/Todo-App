import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoImage from "/cfd969583ee9557cb6d7ac303d0d2a80.svg";
function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showDone, setShowDone] = useState(false);
  const inputRef = useRef(null);
  const inputDone = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    if (localStorage.getItem("Todos")) {
      const storedTodos = JSON.parse(localStorage.getItem("Todos"));
      setTodos(storedTodos);
    }
  }, []);

  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      value: inputText,
      done: false,
    };
    setTodos((prevState) => [...prevState, newTodo]);
    setInputText("");
    localStorage.setItem("Todos", JSON.stringify([...todos, newTodo]));
  };

  const removeTodo = (todoId) => {
    const confirm = window.confirm("Are you sure you want delete this todo?");
    if (!confirm) return;
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
    localStorage.setItem("Todos", JSON.stringify(newTodos));
  };

  const checkAsDone = (todoId) => {
    setTodos((prevState) => {
      const newTodos = prevState.map((todo) => {
        if (todo.id === todoId) {
          todo.done
            ? (inputDone.current.style.backgroundColor = "transparent")
            : (inputDone.current.style.backgroundColor = "#0B5ED7");
          return { ...todo, done: !todo.done };
        }
      });
      localStorage.setItem("Todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const toggleShowDone = () => {
    console.log(showDone);
    setShowDone((prevState) => !prevState);
  };

  const editTodo = () => {};

  return (
    <div className="App container">
      <h2 className="text-white mb-4 text-center">Todo List</h2>

      <form onSubmit={addTodo}>
        <div className="d-flex m-auto justify-content-center py-4">
          <input
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            type="text"
            placeholder="Add a todo..."
            className="inpValue form-control me-3 w-50"
            ref={inputRef}
            value={inputText}
          />
          <button className="btn btn-primary px-4 text-white" type="submit">
            <span className="icon">
              <i className="fa-solid fa-check d-inline p-2"></i>
            </span>
          </button>
        </div>
      </form>
      <div className="text-white text-center mb-2">
        <span onClick={toggleShowDone} role="button">
          Show completed todos
        </span>
      </div>
      <div className="d-flex flex-column-reverse">
        {todos.length == 0 ? (
          <div className="text-center">
            <img className="todoImg m-5" src={TodoImage} alt="" />
          </div>
        ) : (
          todos
            .filter((todo) => !todo.done || !showDone)
            .map((todo) => (
              <div className="col-8 m-auto p-2" key={todo.id}>
                <div className="todoItem d-flex justify-content-between rounded border-0 align-items-center px-2">
                  <div className="d-flex align-items-center">
                    <div
                      ref={inputDone}
                      onClick={() => checkAsDone(todo.id)}
                      className="done d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: todo.done ? "#0B5ED7" : "white",
                      }}
                    >
                      <i className="fa-solid fa-check d-inline p-2 text-white"></i>
                    </div>
                    <p className="px-2 py-2 m-0">{todo.value}</p>
                  </div>

                  <i
                    onClick={() => removeTodo(todo.id)}
                    className="deleteIcon fa-solid fa-trash-can p-2"
                    role="button"
                  ></i>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default App;
