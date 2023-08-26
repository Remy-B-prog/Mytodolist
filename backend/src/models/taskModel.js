const database = require('../services/database');

const getAllTask = () => {
  return database.query(
    `SELECT T.id, T.title, T.description, T.earned_point, TC.category
    FROM task AS T
    INNER JOIN task_category AS TC ON T.task_category_id = TC.id;
   `

   );
}


const getOneTaskById = (taskId) => {
  return database.query(
    `SELECT title, description,task_category_id, earned_point 
    FROM task WHERE id = ?`,
    [taskId]
  );
}


const getAllUserAssignedTask = (userId) => {
  return database.query(
` SELECT task.id, task.title, task.description,task.earned_point, c.category
  FROM task
  INNER JOIN assigned_task AS AT ON AT.task_id = task.id
  INNER JOIN task_category AS c ON task.task_category_id = c.id
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
    `SELECT T.id, T.title, T.description, T.earned_point
    FROM accomplish_task AS AT
    INNER JOIN task AS T ON AT.task_id = T.id
    WHERE AT.user_id = ?`,
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
  getOneTaskById,
  getAllTask,
}
