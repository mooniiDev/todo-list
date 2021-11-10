import dom from './dom';
import projects from './projects';

const tasks = (() => {
  class Task {
    constructor(title) {
      this.title = title;
    }
  }

  function addTask(index, title) {
    const task = new Task(title);
    projects.projectsList[index].tasks.push(task);
    dom.showTasks(index, title);
  }

  return {
    addTask,
  };
})();

export default tasks;
