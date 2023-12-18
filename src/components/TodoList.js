import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todos/todosSlice";
import TodoItem from "./TodoItem";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDetailsClick = (todo) => {
    setSelectedTodo(todo);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Checked</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Finished At</TableCell>
              <TableCell>Archive At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDetailsClick={() => handleDetailsClick(todo)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogTitle>Title: {selectedTodo?.title}</DialogTitle>
        <DialogContent>
          <b>Description: {selectedTodo?.description}</b>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoList;
