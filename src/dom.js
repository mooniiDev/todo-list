import projects from './projects';

const dom = (() => {
  const menuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalTask = document.querySelector('.modal-task');
  const projectTitle = document.querySelector('#project-title');
  const projectTitleError = document.querySelector('.project-title-error');

  function responsiveMenu() {
    if (window.innerWidth <= 1000) {
      menuIcon.classList.remove('active');
      sidebarMenu.classList.remove('show-sidebar');
      sidebarMenu.classList.add('hide-sidebar');
      mainContent.classList.remove('contract-main');
      mainContent.classList.add('expand-main');
    } else {
      sidebarMenu.classList.remove('hide-sidebar');
      sidebarMenu.classList.add('show-sidebar');
      mainContent.classList.remove('expand-main');
      mainContent.classList.add('contract-main');
      mainContent.classList.remove('darker-backround');
    }
  }

  function toggleMenu() {
    menuIcon.classList.toggle('active');
    if (sidebarMenu.classList.contains('hide-sidebar')) {
      sidebarMenu.classList.remove('hide-sidebar');
      sidebarMenu.classList.add('show-sidebar');
      mainContent.classList.add('darker-backround');
    } else if (sidebarMenu.classList.contains('show-sidebar')) {
      sidebarMenu.classList.remove('show-sidebar');
      sidebarMenu.classList.add('hide-sidebar');
      mainContent.classList.remove('darker-backround');
    }
  }

  function selectTask(target) {
    const tasksLinks = document.querySelectorAll('.task-link');
    tasksLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });
    if (target.classList.contains('task-icon') || target.classList.contains('task-text')) {
      target.parentElement.classList.add('selected-link');
    } else if (target.classList.contains('task-link')) {
      target.classList.add('selected-link');
    }
  }
  function selectProject(target) {
    const projectsLinks = document.querySelectorAll('.project-link');
    projectsLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });
    if (target.classList.contains('project-icon') || target.classList.contains('project-text')) {
      target.parentElement.classList.add('selected-link');
    } else if (target.classList.contains('project-link')) {
      target.classList.add('selected-link');
    }
  }

  function editProject(target) {
    const projectIndex = target.getAttribute('data-index');
    projectTitle.value = projects.projectsList[projectIndex].title;
  }

  function manipulateModal(state, title, task) {
    const form = document.querySelector('#form');
    form.reset();
    projectTitleError.classList.remove('show');
    projectTitleError.classList.add('hide');
    if (state === 'show') {
      modal.classList.remove('hide');
      modal.classList.add('show');
      modalTitle.textContent = title;
      modalTask.textContent = task;
    } else if (state === 'close') {
      modal.classList.remove('show');
      modal.classList.add('hide');
    }
  }

  function validateModal(task) {
    const { projectIcon } = document.forms.form;
    if (projectTitle.value === '') {
      projectTitleError.classList.remove('hide');
      projectTitleError.classList.add('show');
    // ADD PROJECT TO ARRAY
    } else if (task === 'add') {
      projects.addProject(projectIcon.value, projectTitle.value);
    // EDIT PROJECT FROM ARRAY
    } else if (task === 'edit') {
      projects.editProject(projectIcon.value, projectTitle.value);
      // editProject();
    } else if (task === 'delete') {
      manipulateModal('close');
    }
  }

  function showProjects() {
    const projectsLinks = document.querySelector('#projects-links-div');
    projectsLinks.textContent = '';
    for (let i = 0; i < projects.projectsList.length; i += 1) {
      const projectLink = document.createElement('a');
      const projectIcon = document.createElement('i');
      const projectText = document.createElement('p');
      const projectIconsDiv = document.createElement('div');
      const projectEditIcon = document.createElement('i');
      const projectTrashIcon = document.createElement('i');
      // PROJECT LINK
      projectLink.classList.add('nav-link', 'project-link');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-index', i);
      // PROJECT SELECTED ICON
      projectIcon.classList.add('fal', 'project-icon', projects.projectsList[i].icon, 'fa-fw', 'padding-right');
      projectIconsDiv.classList.add('float-right');
      // PROJECT TEXT
      projectText.classList.add('project-text');
      projectText.textContent = projects.projectsList[i].title;
      // PROJECT DEFAULT ICONS
      projectEditIcon.classList.add('fal', 'fa-edit', 'padding-right', 'edit-project', 'hover-icon');
      projectEditIcon.setAttribute('data-index', i);
      projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'delete-project', 'hover-icon');
      projectTrashIcon.setAttribute('data-index', i);
      // APPENDS
      projectIconsDiv.appendChild(projectEditIcon);
      projectIconsDiv.appendChild(projectTrashIcon);
      projectLink.appendChild(projectIcon);
      projectLink.appendChild(projectText);
      projectLink.appendChild(projectIconsDiv);
      projectsLinks.appendChild(projectLink);
    }
    manipulateModal('close');
  }

  return {
    responsiveMenu,
    toggleMenu,
    selectTask,
    selectProject,
    manipulateModal,
    validateModal,
    showProjects,
    editProject,
  };
})();

export default dom;
