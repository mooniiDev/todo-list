import projects from './projects';

const dom = (() => {
  const toggleMenuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const form = document.querySelector('#form');
  const projectTitle = document.querySelector('#todo-title');
  const projectTitleError = document.querySelector('.todo-title-error');
  const deletionProjectTitle = modal.querySelector('.todo-title');
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

    // SHOW SIDEBAR AND MAKE MAIN CONTENT A BIT TRANSPARENT
    if (sidebarMenu.classList.contains('hide-sidebar')) {
      sidebarMenu.classList.remove('hide-sidebar');
      sidebarMenu.classList.add('show-sidebar');
      mainContent.classList.add('inactive-main');

      // HIDE SIDEBAR AND MAKE MAIN CONTENT OPAQUE
    } else if (sidebarMenu.classList.contains('show-sidebar')) {
      sidebarMenu.classList.remove('show-sidebar');
      sidebarMenu.classList.add('hide-sidebar');
      mainContent.classList.remove('inactive-main');
    }
  }

  function selectMenuLink(target) {
    const allMenuLinks = document.querySelectorAll('.link');
    const addTaskButton = document.querySelector('.add-task');

    addTaskButton.classList.add('hide'); // By default 'Add Task' button is hidden

    allMenuLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });

    // IF CLICKED ON MENU LINK
    if (target.classList.contains('menu-link')) {
      target.classList.add('selected-link');

      // IF CLICKED ON MENU LINK ICON OR TEXT
    } else if (target.classList.contains('menu-link-icon')
            || target.classList.contains('menu-link-text')) {
      target.parentElement.classList.add('selected-link');

      // IF CLICKED SOMEWHERE ON PROJECT LINK
    } else if (target.classList.contains('project')) {
      // SHOW BUTTON TO ADD A TASK
      addTaskButton.classList.remove('hide');

      // IF CLICKED DIRECTLY ON PROJECT LINK
      if (target.classList.contains('project-link')) {
        target.classList.add('selected-link');

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
  }

  function manipulateModal(state, title, task, index) {
    const modalHeader = modal.querySelector('.modal-header');
    const modalTitle = modal.querySelector('.modal-title');
    const modalTask = modal.querySelector('.modal-task');
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
      const modalIconsDiv = modal.querySelector('.radio-form');
      const modalTasksDiv = modal.querySelector('.modal-tasks-div');

      modal.classList.remove('hide');
      modalTitle.textContent = title;
      modalTask.textContent = task;
      modalIconsDiv.classList.remove('hide');
      modalIconsDiv.classList.add('show');
      modalTasksDiv.classList.add('hide');

      // IF MODAL IS FOR ADDING A TASK
      if (title === 'Add Task') {
        modalIconsDiv.classList.remove('show');
        modalIconsDiv.classList.add('hide');
        modalTasksDiv.classList.remove('hide');
      }
    } else if (state === 'close') {
      modal.classList.add('hide');
    }

    if (task === 'Delete') {
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
    const projectIconsDiv = modal.querySelector('.radio-form');

    if (task === 'add' || task === 'edit') {
      if (projectTitle.value === '') {
        projectTitleError.classList.remove('hide');
        projectTitleError.classList.add('show');

        // ADD A PROJECT TO ARRAY
      } else if (task === 'add' && projectIconsDiv.classList.contains('show')) {
        projects.addProject(projectIcon.value, projectTitle.value);

        // EDIT A PROJECT FROM ARRAY
      } else if (task === 'edit') {
        projects.editProject(projectIcon.value, projectTitle.value, index);
      }

      // DELETE A PROJECT FROM ARRAY
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
      projectIconAndTextDiv.classList.add('project-icon-and-text-div', 'project', 'select');
      projectIconAndTextDiv.setAttribute('data-index', i);
      projectIconsDiv.classList.add('project-default-icons-div', 'project', 'select');
      projectIconsDiv.setAttribute('data-index', i);

      // PROJECT LINK
      projectLink.classList.add('link', 'project-link', 'project', 'select');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-index', i);

      // PROJECT ICON
      projectIcon.classList.add('fal', 'project-icon', projects.projectsList[i].icon, 'fa-fw', 'project', 'select', 'padding-right');
      projectIcon.setAttribute('data-index', i);

      // PROJECT TEXT
      projectText.classList.add('project-text', 'project', 'select');
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

  // MAIN CONTENT
  function showMainTitle(index) {
    const allMenuIcons = document.querySelectorAll('.menu-link-icon');
    const menuIcon = allMenuIcons[index].getAttribute('data-icon');
    const menuTexts = document.querySelectorAll('.menu-link-text');

    mainTitleIcon.classList.add('fal', menuIcon, 'main-title-icon', 'fa-fw', 'padding-right');
    mainTitleText.textContent = menuTexts[index].textContent;
  }

  function changeMainTitle(target, index) {
    mainTitleIcon.className = '';

    // TITLE OF TASKS FROM THE MENU
    if (target.classList.contains('menu-link')
     || target.classList.contains('menu-link-icon')
     || target.classList.contains('menu-link-text')) {
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
