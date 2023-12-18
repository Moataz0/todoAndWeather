const todos = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    checked: false,
    createdAt: new Date(),
    finishedAt: null,
    archiveAt: null,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    checked: true,
    createdAt: new Date(),
    finishedAt: new Date(),
    archiveAt: null,
  },
  // Add more tasks as needed
];

export default todos;
