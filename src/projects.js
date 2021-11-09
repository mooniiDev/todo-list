import dom from './dom';

const projects = (() => {
  const projectsList = [];

  class Project {
    constructor(icon, title) {
      this.icon = icon;
      this.title = title;
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
