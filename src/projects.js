import dom from './dom';

const projects = (() => {
  const projectsList = [{ icon: 'fa-laptop-code', title: 'Learning JS' }];

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

  function editProject(icon, title) {
    console.log(icon, title);
  }

  return {
    projectsList,
    addProject,
    editProject,
  };
})();

export default projects;
