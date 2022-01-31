import projects from './projects';
import dom from './dom';

const tasks = (() => {
  class Task {
    constructor(title, description, date, priority, projectIndex, taskIndex) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
      this.projectIndex = projectIndex;
      this.taskIndex = taskIndex;
    }
  }

  function addTask(title, description, date, priority, projectIndex, taskIndex) {
    const task = new Task(title, description, date, priority, projectIndex, taskIndex);
    projects.projectsList[projectIndex].tasks.push(task);
  }

  function editTask(title, description, date, priority, projectIndex, taskIndex) {
    projects.projectsList[projectIndex].tasks[taskIndex].title = title;
    projects.projectsList[projectIndex].tasks[taskIndex].description = description;
    projects.projectsList[projectIndex].tasks[taskIndex].date = date;
    projects.projectsList[projectIndex].tasks[taskIndex].priority = priority;
    dom.getTasks('project', projectIndex);
  }

  function deleteTask(projectIndex, taskIndex) {
    if (projectIndex > -1) {
      projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
      dom.getTasks('all');
    }
  }

  return {
    addTask,
    editTask,
    deleteTask,
  };
})();

export default tasks;
