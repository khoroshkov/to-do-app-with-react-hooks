import React from "react";
import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList({ todos }) {
 const  id = uuidv4()
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <ul 
        ref={provided.innerRef}
        {...provided.droppableProps}>
          {todos.map((item, index) => (
            <TodoItem key={item.id} index={index} {...item} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
