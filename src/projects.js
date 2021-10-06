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

  return {
    projectsList,
    addProject,
  };
})();

export default projects;
