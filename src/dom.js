import projects from './projects';

const dom = (() => {
  const menuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const modalName = document.querySelector('.modal-name');
  const modalTask = document.querySelector('.modal-task');
  const title = document.querySelector('#title');
  const titleError = document.querySelector('.title-error');

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

  function manipulateModal(state, name, task) {
    const form = document.querySelector('#form');
    form.reset();
    titleError.classList.remove('show');
    titleError.classList.add('hide');
    if (state === 'show') {
      modal.classList.remove('hide');
      modal.classList.add('show');
      modalName.textContent = name;
      modalTask.textContent = task;
    } else if (state === 'close') {
      modal.classList.remove('show');
      modal.classList.add('hide');
    }
  }

  function showProject(icon, name) {
    const navProjects = document.querySelector('#nav-projects');
    const projectLink = document.createElement('a');
    const projectIcon = document.createElement('i');
    const projectName = document.createElement('p');
    const projectIconsDiv = document.createElement('div');
    const projectEditIcon = document.createElement('i');
    const projectTrashIcon = document.createElement('i');
    // PROJECT LINK
    projectLink.setAttribute('href', '#');
    projectLink.classList.add('nav-link', 'project-link');
    // PROJECT SELECTED ICON
    projectIcon.classList.add('fal', 'project-icon', icon, 'fa-fw', 'padding-right');
    projectIconsDiv.classList.add('float-right');
    // PROJECT NAME
    projectName.classList.add('project-text');
    projectName.textContent = name;
    // PROJECT DEFAULT ICONS
    projectEditIcon.classList.add('fal', 'fa-edit', 'padding-right', 'hover-icon');
    projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'hover-icon');
    // APPENDS
    projectIconsDiv.appendChild(projectEditIcon);
    projectIconsDiv.appendChild(projectTrashIcon);
    projectLink.appendChild(projectIcon);
    projectLink.appendChild(projectName);
    projectLink.appendChild(projectIconsDiv);
    navProjects.appendChild(projectLink);
  }

  function validateModal() {
    const { icon } = document.forms.form;
    if (title.value === '') {
      titleError.classList.remove('hide');
      titleError.classList.add('show');
    } else {
      projects.addProject(title.value, icon.value);
      showProject(icon.value, title.value);
      manipulateModal('close');
    }
  }

  return {
    responsiveMenu,
    toggleMenu,
    selectTask,
    selectProject,
    manipulateModal,
    validateModal,
    showProject,
  };
})();

export default dom;
