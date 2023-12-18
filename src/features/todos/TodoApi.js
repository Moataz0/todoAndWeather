import todos from "../../data";

const TodoApi = {
  getTodos: async () => {
    return Promise.resolve({ data: todos });
  },
  addTodo: async (todo) => {
    const newTodo = { id: todos.length + 1, ...todo };
    todos.push(newTodo);
    return Promise.resolve({ data: newTodo });
  },
  deleteTodo: async (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
    return Promise.resolve();
  },
  updateTodo: async (todo) => {
    const existingTodo = todos.find((t) => t.id === todo.id);
    if (existingTodo) {
      Object.assign(existingTodo, todo);
    }
    return Promise.resolve({ data: existingTodo });
  },
};

export default TodoApi;
