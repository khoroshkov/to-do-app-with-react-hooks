import React, { useState, useEffect, useReducer } from "react";
import { Context } from "./context";
import reducer from "./reducer";
import TodoList from "./TodoList";
import { DragDropContext } from "react-beautiful-dnd";
// import DoneTodosCounter from "./TodosCounter";

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos") || JSON.stringify([]))
  );

  const [todoTitle, setTodoTitle] = useState("");
  //const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   const savedTodos = localStorage.getItem("todos") || JSON.stringify([]);

  //   setTodos(JSON.parse(savedTodos));
  // }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const addTodo = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "add",
        payload: todoTitle,
      });
      setTodoTitle("");
    }
  };

  // const removeTodo = (id) => {
  //   setTodos(
  //     todos.filter((todo) => {
  //       return todo.id !== id;
  //     })
  //   );
  // };

  // const toggleTodo = (id) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         todo.completed = !todo.completed;
  //       }
  //       return todo;
  //     })
  //   );
  // };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTaskIds = Array.from(state.map((state) => state.id));

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    dispatch({
      type: "changeOrder",
      payload: newTaskIds,
    });

    localStorage.setItem("todos", JSON.stringify(state));
  };

    // =============== counter
   


    // const count = () => {
    //   return state.filter((todo) => todo.completed).length
    // }
    // console.log(count());

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Context.Provider
        value={{
          dispatch,
        }}
      >
        <div className="container">
          <h1>My TODO app</h1>
          <div className="input-field">
            <input
              type="text"
              value={todoTitle}
              onChange={(event) => setTodoTitle(event.target.value)}
              onKeyPress={addTodo}
            />
            <label>Add task</label>
          </div>
          <TodoList todos={state} />
        </div>
        {/* <DoneTodosCounter/> */}
      </Context.Provider>
    </DragDropContext>
  );
}
