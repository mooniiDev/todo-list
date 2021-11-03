import projects from './projects';

const dom = (() => {
  const toggleMenuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const form = document.querySelector('#form');
  const projectTitle = document.querySelector('#project-title');
  const projectTitleError = document.querySelector('.project-title-error');
  const mainTitleIcon = document.querySelector('.main-title-icon');
  const mainTitleText = document.querySelector('.main-title-text');

  function responsiveMenu() {
    if (window.innerWidth <= 1000) {
      toggleMenuIcon.classList.remove('active');
      // HIDE SIDEBAR AND MAKE IT OPAQUE
      sidebarMenu.classList.remove('show-sidebar');
      sidebarMenu.classList.add('hide-sidebar');
      sidebarMenu.classList.add('add-z-index');
      // EXPAND MAIN CONTENT
      mainContent.classList.remove('contract-main');
      mainContent.classList.add('expand-main');
    } else {
      // SHOW SIDEBAR AND MAKE IT A BIT TRANSPARENT
      sidebarMenu.classList.remove('hide-sidebar');
      sidebarMenu.classList.add('show-sidebar');
      sidebarMenu.classList.remove('add-z-index');
      // CONTRACT MAIN CONTENT AND MAKE IT OPAQUE
      mainContent.classList.remove('expand-main');
      mainContent.classList.add('contract-main');
      mainContent.classList.remove('inactive-main');
    }
  }

  function toggleMenu() {
    toggleMenuIcon.classList.toggle('active');

    if (sidebarMenu.classList.contains('hide-sidebar')) {
      // SHOW SIDEBAR AND MAKE MAIN CONTENT A BIT TRANSPARENT
      sidebarMenu.classList.remove('hide-sidebar');
      sidebarMenu.classList.add('show-sidebar');
      mainContent.classList.add('inactive-main');
    } else if (sidebarMenu.classList.contains('show-sidebar')) {
      // HIDE SIDEBAR AND MAKE MAIN CONTENT OPAQUE
      sidebarMenu.classList.remove('show-sidebar');
      sidebarMenu.classList.add('hide-sidebar');
      mainContent.classList.remove('inactive-main');
    }
  }

  function selectMenuLink(target) {
    const allMenuLinks = document.querySelectorAll('.nav-link');

    allMenuLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });

    // ADD BACKGROUND COLOR ON CLICKED NAVIGATION BAR LINK
    // IF CLICKED DIRECTLY ON MENU OR PROJECT LINK
    if (target.classList.contains('nav-link')) {
      target.classList.add('selected-link');

    // IF CLICKED ON MENU LINK ICON OR TEXT
    } else if (target.classList.contains('nav-link-icon')
            || target.classList.contains('nav-link-text')) {
      target.parentElement.classList.add('selected-link');

    // IF CLICKED ON PROJECT ICON OR TEXT
    } else if (target.classList.contains('project-icon')
            || target.classList.contains('project-text')) {
      target.parentElement.parentElement.classList.add('selected-link');

    // IF CLICKED ON PROJECT ELEMENTS DIVS
    } else if (target.classList.contains('project-icon-and-text-div')
            || target.classList.contains('project-default-icons-div')) {
      target.parentElement.classList.add('selected-link');
    }
  }

  function manipulateModal(state, title, task, index) {
    const modalHeader = modal.querySelector('.modal-header');
    const deletionText = modal.querySelector('.deletion-text');
    const confirmButton = modal.querySelector('.confirm-modal');
    const cancelButton = modal.querySelector('.cancel-modal');

    modalHeader.classList.remove('deletion-modal-header');
    form.reset();
    form.classList.remove('hide');
    projectTitleError.classList.add('hide');
    deletionText.classList.add('hide');
    cancelButton.classList.remove('cancel-deletion');
    confirmButton.classList.remove('confirm-deletion');

    if (state === 'show') {
      const modalTitle = modal.querySelector('.modal-title');
      const modalTask = modal.querySelector('.modal-task');

      modal.classList.remove('hide');
      modalTitle.textContent = title;
      modalTask.textContent = task;
    } else if (state === 'close') {
      modal.classList.add('hide');
    }

    if (task === 'Delete') {
      const deletionProjectTitle = modal.querySelector('.project-title');

      modalHeader.classList.add('deletion-modal-header');
      deletionText.classList.remove('hide');
      deletionProjectTitle.textContent = projects.projectsList[index].title;
      form.classList.add('hide');
      cancelButton.classList.add('cancel-deletion');
      confirmButton.classList.add('confirm-deletion');
    }
  }

  function validateModal(task, index) {
    const { projectIcon } = document.forms.form;

    if (task === 'add' || task === 'edit') {
      if (projectTitle.value === '') {
        projectTitleError.classList.remove('hide');
        projectTitleError.classList.add('show');

      // ADD PROJECT TO ARRAY
      } else if (task === 'add') {
        projects.addProject(projectIcon.value, projectTitle.value);

      // EDIT PROJECT FROM ARRAY
      } else if (task === 'edit') {
        projects.editProject(projectIcon.value, projectTitle.value, index);
      }
    // DELETE PROJECT FROM ARRAY
    } else if (task === 'delete') {
      projects.deleteProject(index);
    }
  }

  // PROJECTS
  function editProject(index) {
    const projectIcon = projects.projectsList[index].icon;
    const allProjectIcons = modal.querySelectorAll('.icon');

    // SHOW EDITABLE PROJECT TITLE
    projectTitle.value = projects.projectsList[index].title;

    // SELECT EDITABLE PROJECT ICON
    for (let i = 0; i < allProjectIcons.length; i += 1) {
      if (allProjectIcons[i].value === projectIcon) {
        allProjectIcons[i].checked = true;
      }
    }
  }

  function showProjects() {
    const projectsCount = document.querySelector('.projects-count');
    const projectsLinks = document.querySelector('.projects-links-div');

    // SHOW NUMBER OF PROJECTS
    projectsCount.textContent = projects.projectsList.length;
    projectsLinks.textContent = '';

    for (let i = 0; i < projects.projectsList.length; i += 1) {
      const projectLink = document.createElement('a');
      const projectIconAndTextDiv = document.createElement('div');
      const projectIcon = document.createElement('i');
      const projectText = document.createElement('p');
      const projectIconsDiv = document.createElement('div');
      const projectEditIcon = document.createElement('i');
      const projectTrashIcon = document.createElement('i');

      // PROJECT ICON/TEXT AND DEFAULT ICONS DIVS
      projectIconAndTextDiv.classList.add('project-icon-and-text-div', 'select');
      projectIconAndTextDiv.setAttribute('data-index', i);
      projectIconsDiv.classList.add('project-default-icons-div', 'select');
      projectIconsDiv.setAttribute('data-index', i);

      // PROJECT LINK
      projectLink.classList.add('nav-link', 'project-link', 'select');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-index', i);

      // PROJECT ICON
      projectIcon.classList.add('fal', 'project-icon', projects.projectsList[i].icon, 'fa-fw', 'select', 'padding-right');
      projectIcon.setAttribute('data-index', i);

      // PROJECT TEXT
      projectText.classList.add('project-text', 'select');
      projectText.textContent = projects.projectsList[i].title;
      projectText.setAttribute('data-index', i);

      // PROJECT DEFAULT ICONS
      projectEditIcon.classList.add('fal', 'fa-edit', 'padding-right', 'edit-project');
      projectEditIcon.setAttribute('data-index', i);
      projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'delete-project');
      projectTrashIcon.setAttribute('data-index', i);

      // APPENDS
      projectIconsDiv.appendChild(projectEditIcon);
      projectIconsDiv.appendChild(projectTrashIcon);
      projectIconAndTextDiv.appendChild(projectIcon);
      projectIconAndTextDiv.appendChild(projectText);
      projectLink.appendChild(projectIconAndTextDiv);
      projectLink.appendChild(projectIconsDiv);
      projectsLinks.appendChild(projectLink);
    }

    manipulateModal('close');
  }

  function showMainTitle(index) {
    const allMenuIcons = document.querySelectorAll('.menu-icon');
    const menuIcon = allMenuIcons[index].getAttribute('data-icon');
    const menuTexts = document.querySelectorAll('.menu-text');

    mainTitleIcon.classList.add('fal', menuIcon, 'main-title-icon', 'fa-fw', 'padding-right');
    mainTitleText.textContent = menuTexts[index].textContent;
  }

  function changeMainTitle(target, index) {
    mainTitleIcon.className = '';

    // TITLE OF TASKS FROM MENU
    if (target.classList.contains('menu-link')
     || target.classList.contains('menu-icon')
     || target.classList.contains('menu-text')) {
      showMainTitle(index);

      // TITLE OF TASKS FROM PROJECTS
    } else if (target.classList.contains('project-link')
            || target.classList.contains('project-icon')
            || target.classList.contains('project-text')
            || target.classList.contains('project-icon-and-text-div')
            || target.classList.contains('project-default-icons-div')) {
      const projectIcon = projects.projectsList[index].icon;

      mainTitleIcon.classList.add('fal', projectIcon, 'main-title-icon', 'fa-fw', 'padding-right');
      mainTitleText.textContent = projects.projectsList[index].title;
    }
  }

  return {
    responsiveMenu,
    toggleMenu,
    selectMenuLink,
    editProject,
    manipulateModal,
    validateModal,
    showProjects,
    showMainTitle,
    changeMainTitle,
  };
})();

export default dom;
