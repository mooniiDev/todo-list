const projects = (() => {
  const projectsList = [];

  class Project {
    constructor(title, icon) {
      this.title = title;
      this.icon = icon;
    }
  }

  function addProject(title, icon) {
    const project = new Project(title, icon);
    projectsList.push(project);
  }

  return {
    addProject,
  };
})();

export default projects;
