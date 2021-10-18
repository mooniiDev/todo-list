import dom from './dom';

const projects = (() => {
  const projectsList = [{ icon: 'fa-tools', title: 'Craft Example' }];

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

  return {
    projectsList,
    addProject,
    editProject,
  };
})();

export default projects;
