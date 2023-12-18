import { createSlice } from "@reduxjs/toolkit";
import TodoApi from "./TodoApi";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTodo: (state, action) => {
      // Local deletion
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      // Local update
      const updatedTodo = action.payload;
      const existingTodo = state.items.find(
        (todo) => todo.id === updatedTodo.id
      );
      if (existingTodo) {
        Object.assign(existingTodo, updatedTodo);
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, updateTodo } = todosSlice.actions;

// Thunk for fetching todos
export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await TodoApi.getTodos();
    dispatch(setTodos(response.data));
  } catch (error) {
    console.error("Error fetching todos:", error.message);
  }
};

export default todosSlice.reducer;
