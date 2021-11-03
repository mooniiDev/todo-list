import dom from './dom';

const projects = (() => {
  const projectsList = [{ icon: 'fa-tools', title: 'Craft Example', tasks: ['Show Task Demo'] }];

  class Project {
    constructor(icon, title, tasks) {
      this.icon = icon;
      this.title = title;
      this.tasks = tasks;
    }
  }

  function addProject(icon, title) {
    const project = new Project(icon, title);
    projectsList.push(project);
    dom.showProjects();
  }

  function editProject(icon, title, index) {
    projectsList[index].icon = icon;
    projectsList[index].title = title;
    dom.showProjects();
  }

  function deleteProject(index) {
    if (index > -1) {
      projectsList.splice(index, 1);
    }
    dom.showProjects();
  }

  return {
    projectsList,
    addProject,
    editProject,
    deleteProject,
  };
})();

export default projects;
