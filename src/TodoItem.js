import React, { useContext } from "react";
import { Context } from "./context";
import { Draggable } from "react-beautiful-dnd";

export default function TodoItem({ title, id, completed, index }) {
  const { dispatch } = useContext(Context);

  const cls = ["todo"];

  if (completed) {
    cls.push("completed");
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li className={cls.join(" ")} 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={() =>
                dispatch({
                  type: "toggle",
                  payload: id,
                })
              }
            />
            <span>{title}</span>

            <i
              className="material-icons red-text"
              onClick={() =>
                dispatch({
                  type: "remove",
                  payload: id,
                })
              }
            >
              delete
            </i>
          </label>
        </li>
      )}
    </Draggable>
  );
}
