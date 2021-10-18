import projects from './projects';

const dom = (() => {
  const toggleMenuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalTask = document.querySelector('.modal-task');
  const form = document.querySelector('#form');
  const projectTitle = document.querySelector('#project-title');
  const projectTitleError = document.querySelector('.project-title-error');

  function responsiveMenu() {
    if (window.innerWidth <= 1000) {
      toggleMenuIcon.classList.remove('active');
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
    toggleMenuIcon.classList.toggle('active');

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

  function selectMenuLink(target) {
    const allMenuLinks = document.querySelectorAll('.nav-link');

    allMenuLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });

    if (target.classList.contains('nav-link')) {
      target.classList.add('selected-link');
    } else {
      target.parentElement.classList.add('selected-link');
    }
  }

  function editProject(index) {
    const projectIcon = projects.projectsList[index].icon;
    const allProjectIcons = modal.querySelectorAll('.icon');

    // SHOW EDITABLE PROJECT TITLE
    projectTitle.value = projects.projectsList[index].title;

    // CHECK EDITABLE PROJECT ICON
    for (let i = 0; i < allProjectIcons.length; i += 1) {
      if (allProjectIcons[i].value === projectIcon) {
        allProjectIcons[i].checked = true;
      }
    }
  }

  function manipulateModal(state, title, task) {
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

  function validateModal(task, index) {
    const { projectIcon } = document.forms.form;
    if (projectTitle.value === '') {
      projectTitleError.classList.remove('hide');
      projectTitleError.classList.add('show');

    // ADD PROJECT TO ARRAY
    } else if (task === 'add') {
      projects.addProject(projectIcon.value, projectTitle.value);

    // EDIT PROJECT FROM ARRAY
    } else if (task === 'edit') {
      projects.editProject(projectIcon.value, projectTitle.value, index);

    // DELETE PROJECT FROM ARRAY
    } else if (task === 'delete') {
      console.log('Delete your project from array.');
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
      projectLink.classList.add('nav-link');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-index', i);

      // PROJECT ICON
      projectIcon.classList.add('fal', 'nav-link-icon', projects.projectsList[i].icon, 'fa-fw', 'padding-right');
      projectIconsDiv.classList.add('float-right');

      // PROJECT TEXT
      projectText.classList.add('nav-link-text');
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
    selectMenuLink,
    editProject,
    manipulateModal,
    validateModal,
    showProjects,
  };
})();

export default dom;
