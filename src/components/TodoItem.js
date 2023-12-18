import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../features/todos/todosSlice";
import {
  TableCell,
  TableRow,
  IconButton,
  Checkbox,
  Button,
  Box,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoItem = ({ todo, onDetailsClick }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    todo.description
  );

  const handleToggle = () => {
    const updatedTodo = {
      ...todo,
      checked: !todo.checked,
      finishedAt: !todo.checked ? new Date().toLocaleString() : null,
    };
    dispatch(updateTodo(updatedTodo));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedTodo = {
      ...todo,
      title: updatedTitle,
      description: updatedDescription,
    };
    dispatch(updateTodo(updatedTodo));
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description);
    setEditing(false);
  };

  // const handleArchive = () => {
  //   const updatedTodo = {
  //     ...todo,
  //     archiveAt: new Date().toLocaleString(),
  //   };
  //   dispatch(updateTodo(updatedTodo));
  // };

  return (
    <TableRow>
      <TableCell>
        {editing ? (
          <TextField
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        ) : (
          todo.title
        )}
      </TableCell>
      <TableCell>
        {editing ? (
          <TextField
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        ) : (
          todo.description
        )}
      </TableCell>
      <TableCell>
        <Checkbox checked={todo.checked} onChange={handleToggle} />
      </TableCell>
      <TableCell>{todo.createdAt?.toLocaleString()}</TableCell>
      <TableCell>
        {todo.finishedAt ? todo.finishedAt.toLocaleString() : "Not Finished"}
      </TableCell>
      <TableCell>
        {todo.archiveAt ? todo.archiveAt.toLocaleString() : "Not Archived"}
      </TableCell>
      <TableCell>
        {editing ? (
          <Box sx={{ width: 150 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleSaveEdit}
              aria-label="save"
              style={{ margin: 4 }}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCancelEdit}
              aria-label="cancel"
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <>
            <IconButton onClick={handleEdit} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <Button onClick={onDetailsClick}>Details</Button>
            {/* {!todo.checked && <Button onClick={handleArchive}>Archive</Button> */}
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;
