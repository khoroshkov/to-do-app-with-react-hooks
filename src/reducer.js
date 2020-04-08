import { v4 as uuidv4 } from "uuid";
import mapOrder from "./helpers/mapOrder";

export default function (state, { type, payload }) {
  switch (type) {
    case "add":
      return [...state, { id: uuidv4(), title: payload, completed: false }];

    case "toggle":
      return state.map((todo) => {
        if (todo.id === payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });

    case "remove":
      return state.filter((todo) => todo.id !== payload);

    case "changeOrder":
      return mapOrder(state, payload, "id");
    // const newState = mapOrder(state, payload, "id")
    // return newState

    default:
      return state;
  }
}
