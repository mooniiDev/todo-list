import dom from './dom';
import projects from './projects';

const tasks = (() => {
  class Task {
    constructor(title, description, date, priority) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
    }
  }

  function addTask(index, title, description, date, priority) {
    const task = new Task(title, description, date, priority);
    projects.projectsList[index].tasks.push(task);
    dom.showTasks(index, title, date, priority);
  }

  return {
    addTask,
  };
})();

export default tasks;
