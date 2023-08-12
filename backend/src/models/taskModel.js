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

module.exports = getAllUserAssignedTask;
