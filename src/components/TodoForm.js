import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";
import { Button, TextField, Box } from "@mui/material";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const handleAddTodo = () => {
    if (newTodo.title.trim() !== "") {
      dispatch(addTodo({ ...newTodo, checked: false, createdAt: new Date() }));
      setNewTodo({ title: "", description: "" });
    }
  };

  return (
    <Box>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newTodo.title}
        onChange={(e) =>
          setNewTodo((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        margin="normal"
        value={newTodo.description}
        onChange={(e) =>
          setNewTodo((prev) => ({ ...prev, description: e.target.value }))
        }
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        sx={{ marginBottom: 8 }}
      >
        Add Todo
      </Button>
    </Box>
  );
};

export default TodoForm;
