const database = require('../services/database');

const getAllUserAssignedTask = (userId) => {
  return database.query(
` SELECT task.id, task.title, task.description,task.earned_point
  FROM task
  INNER JOIN assigned_task AS AT ON AT.task_id = task.id
  WHERE AT.user_id = ?`,
  [userId]);
};

const postAssigneTask = (taskId, userId) => {
  return database.query(
` INSERT INTO assigned_task (task_id, user_id) VALUES (?, ?)`,
  [taskId, userId]);
}

const getAssignedTask = (taskId, userId) => {
  return database.query(
` SELECT task.id, task.title, task.description,task.earned_point
  FROM task
  INNER JOIN assigned_task AS AT ON AT.task_id = task.id
  WHERE AT.task_id = ?
  AND AT.user_id = ?`,
  [taskId, userId]);
}

const deleteAssignedTask = (taskId, userId) => {
  return database.query(
` DELETE FROM assigned_task WHERE task_id = ? AND user_id = ?`,
  [taskId, userId]);
};

const getAccomplishTask = (userId) => {
  return database.query(
    `SELECT task.id, task.title, task.description,task.earned_point 
    FROM task
    INNER JOIN assigned_task AS AT ON AT.task_id = task.id
    WHERE user_id = ?`,
    [userId]);
}

const getOneAccomplishTask = (taskId, userId) => {
  return database.query(
  `SELECT ta.id, ta.title, ta.description, ta.earned_point
  FROM accomplish_task
  INNER JOIN task AS ta ON task_id = ta.id
  WHERE user_id = ?
  AND task_id = ?`,
  [userId, taskId ]);
}

const postAccomplishedTask = (taskId, userId) => {
return database.query(
  `INSERT INTO accomplish_task (task_id, user_id) VALUES (?, ?)`,
 [taskId, userId]);
};


module.exports = {
  getAccomplishTask,
  deleteAssignedTask,
  getAllUserAssignedTask,
  postAssigneTask,
  getAssignedTask,
  postAccomplishedTask,
  getOneAccomplishTask,
}
