import projects from './projects';

const dom = (() => {
  const menuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const modalName = document.querySelector('.modal-name');
  const modalTask = document.querySelector('.modal-task');
  const modalTitle = document.querySelector('#title');
  const modalTitleError = document.querySelector('.title-error');

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
    modalTitleError.classList.remove('show');
    modalTitleError.classList.add('hide');
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

  function validateModal(task) {
    const { modalIcon } = document.forms.form;
    if (modalTitle.value === '') {
      modalTitleError.classList.remove('hide');
      modalTitleError.classList.add('show');
    } else if (task === 'add') {
      // ADD PROJECT TO ARRAY AND DOM
      projects.addProject(modalIcon.value, modalTitle.value);
    } else if (task === 'edit') {
      manipulateModal('close');
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
      const projectTitle = document.createElement('p');
      const projectIconsDiv = document.createElement('div');
      const projectEditIcon = document.createElement('i');
      const projectTrashIcon = document.createElement('i');
      // PROJECT LINK
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('index', [i]);
      projectLink.classList.add('nav-link', 'project-link');
      // PROJECT SELECTED ICON
      projectIcon.classList.add('fal', 'project-icon', projects.projectsList[i].icon, 'fa-fw', 'padding-right');
      projectIconsDiv.classList.add('float-right');
      // PROJECT NAME
      projectTitle.classList.add('project-text');
      projectTitle.textContent = projects.projectsList[i].title;
      projectEditIcon.classList.add('fal', 'fa-edit', 'padding-right', 'edit-project', 'hover-icon');
      projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'delete-project', 'hover-icon');
      // APPENDS
      projectIconsDiv.appendChild(projectEditIcon);
      projectIconsDiv.appendChild(projectTrashIcon);
      projectLink.appendChild(projectIcon);
      projectLink.appendChild(projectTitle);
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
  };
})();

export default dom;
