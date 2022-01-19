/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



const dom = (() => {
  const toggleMenuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const form = document.querySelector('#form');
  const modalTitle = document.querySelector('#modal-title');
  const modalTitleError = document.querySelector('.modal-title-error');
  const mainTitleIcon = document.querySelector('.main-title-icon');
  const mainTitleText = document.querySelector('.main-title-text');
  const tasksCount = document.querySelector('.tasks-count');
  const tasksList = document.querySelector('.tasks-list');

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

  // MAIN CONTENT TITLE
  function showMainTitle(index) {
    const allMenuIcons = document.querySelectorAll('.menu-link-icon');
    const menuIcon = allMenuIcons[index].getAttribute('data-icon');
    const menuTexts = document.querySelectorAll('.menu-link-text');

    mainTitleIcon.classList.add(
      'fal',
      'fa-fw',
      'main-title-icon',
      'padding-right',
      menuIcon
    );
    mainTitleText.textContent = menuTexts[index].textContent;
  }

  function changeMainTitle(target, index) {
    mainTitleIcon.className = '';

    // TITLE OF TASKS FROM THE MENU
    if (
      target.classList.contains('menu-link') ||
      target.classList.contains('menu-link-icon') ||
      target.classList.contains('menu-link-text')
    ) {
      showMainTitle(index);
    }

    // TITLE OF TASKS FROM PROJECTS
    if (
      target.classList.contains('project-link') ||
      target.classList.contains('project-icon') ||
      target.classList.contains('project-text') ||
      target.classList.contains('delete-project') ||
      target.classList.contains('edit-project') ||
      target.classList.contains('project-icon-and-text-div') ||
      target.classList.contains('project-default-icons-div')
    ) {
      const projectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].icon;

      mainTitleIcon.classList.add(
        'fal',
        'fa-fw',
        'main-title-icon',
        'padding-right',
        projectIcon
      );
      mainTitleText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].title;
    }
  }

  // MODAL FUNCTIONALITY
  function watchTaskInfo(projectIndex, taskIndex) {
    const infoTaskTitle = document.querySelector('.info-task-title');
    const infoTaskDescription = document.querySelector(
      '.info-task-description'
    );
    const infoTaskDueDate = document.querySelector('.info-task-due-date');
    const infoTaskPriority = document.querySelector('.info-task-priority');
    const infoTaskProject = document.querySelector('.info-task-project');

    // TASK TITLE
    infoTaskTitle.textContent = `${_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title}`;

    // TASK DESCRIPTION
    infoTaskDescription.textContent = `${_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].description}`;

    // TASK DUE DATE
    infoTaskDueDate.textContent = `${_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].date}`;

    // TASK PRIORITY
    if (
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority === 'low'
    ) {
      infoTaskPriority.textContent = 'I can do it later or never at all.. 😴';
    } else if (
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority === 'medium'
    ) {
      infoTaskPriority.textContent = 'I stay somewhere between relaxation and focus 😅';
    } else if (
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority === 'high'
    ) {
      infoTaskPriority.textContent = 'I must do it - sooner or later! 😲';
    } else {
      infoTaskPriority.textContent = '';
    }

    // TASK PROJECT
    infoTaskProject.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;
  }

  function manipulateModal(state, title, task, projectIndex, taskIndex) {
    const modalHeader = modal.querySelector('.modal-header');
    const modalMainTitle = modal.querySelector('.modal-main-title');
    const modalTaskButton = modal.querySelector('.modal-task-button');
    const projectDeletionText = modal.querySelector('.project-deletion-text');
    const taskDeletionText = modal.querySelector('.task-deletion-text');
    const taskInfoDiv = modal.querySelector('.info-div');
    const confirmButton = modal.querySelector('.confirm-modal');
    const cancelButton = modal.querySelector('.cancel-modal');

    modalHeader.classList.remove('deletion-modal-header');
    form.reset();
    form.classList.remove('hide');
    taskInfoDiv.classList.add('hide');
    modalTitleError.classList.add('hide');
    projectDeletionText.classList.add('hide');
    taskDeletionText.classList.add('hide');
    cancelButton.classList.remove('cancel-deletion');
    confirmButton.classList.remove('confirm-deletion', 'hide');

    if (state === 'show') {
      const modalIconsDiv = modal.querySelector('.radio-form');
      const modalTasksDiv = modal.querySelector('.modal-tasks-div');

      modal.classList.remove('hide');
      modalMainTitle.textContent = title;
      modalTaskButton.textContent = task;
      modalIconsDiv.classList.remove('hide');
      modalIconsDiv.classList.add('show');
      modalTasksDiv.classList.add('hide');

      // IF MODAL IS FOR ADDING TASK
      if (title === 'Add Task') {
        modalIconsDiv.classList.remove('show');
        modalIconsDiv.classList.add('hide');
        modalTasksDiv.classList.remove('hide');

        // IF MODAL IS FOR WATCHING TASK INFO
      } else if (title === 'Task Info') {
        form.classList.add('hide');
        confirmButton.classList.add('hide');
        taskInfoDiv.classList.remove('hide');

        watchTaskInfo(projectIndex, taskIndex);
      }

      // TO CLOSE THE MODAL
    } else if (state === 'close') {
      modal.classList.add('hide');
    }

    // DELETION MODAL CONTENT
    if (task === 'Delete') {
      modalHeader.classList.add('deletion-modal-header');
      form.classList.add('hide');
      cancelButton.classList.add('cancel-deletion');
      confirmButton.classList.add('confirm-deletion');

      // PROJECT DELETION
      if (title === 'Delete Project') {
        const projectDeletionTitle = document.querySelector(
          '.project-deletion-title'
        );

        projectDeletionText.classList.remove('hide');
        projectDeletionTitle.textContent =
          _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;

        // TASK DELETION
      } else if (title === 'Delete Task') {
        const taskDeletionTitle = document.querySelector(
          '.task-deletion-title'
        );

        taskDeletionText.classList.remove('hide');
        taskDeletionTitle.textContent =
          _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;
      }
    }
  }

  function validateModal(task, index) {
    const { projectFormIcon } = document.forms.form;
    const selectedLink = document.querySelector('.selected-link');
    const projectDomIcon = projectFormIcon.value;
    const projectIconsDiv = modal.querySelector('.radio-form');
    const modalTitleText = modalTitle.value;

    if (task === 'add' || task === 'edit') {
      if (modalTitleText === '') {
        modalTitleError.classList.remove('hide');
        modalTitleError.classList.add('show');

        // ADD PROJECT TO ARRAY
      } else if (task === 'add' && projectIconsDiv.classList.contains('show')) {
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectDomIcon, modalTitleText);

        // EDIT PROJECT FROM ARRAY
      } else if (task === 'edit') {
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(projectDomIcon, modalTitleText, index);

        // KEEP PROJECT VISUALLLY SELECTED IN DOM AFTER EDITING
        const allProjectsLinks = document.querySelectorAll('.project-link');
        allProjectsLinks[index].classList.add('selected-link');

        changeMainTitle(selectedLink, index); // Change main title to icon and text of selected project

        // ADD TASK TO ARRAY
      } else if (task === 'add' && projectIconsDiv.classList.contains('hide')) {

        const selectedProject = selectedLink.getAttribute('data-index');
        const taskDescription = document.querySelector('.task-description').value;
        const taskDueDate = document.querySelector('#dueDate').value;
        const taskPrioritySelection = document.querySelector('.task-priority');
        let taskPriority;

        // CHECK TASK PRIORITY
        if (taskPrioritySelection.value === 'low') {
          taskPriority = 'low';
        } else if (taskPrioritySelection.value === 'medium') {
          taskPriority = 'medium';
        } else if (taskPrioritySelection.value === 'high') {
          taskPriority = 'high';
        } else {
          taskPriority = '';
        }

        _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].addTask(
          selectedProject,
          modalTitleText,
          taskDescription,
          taskDueDate,
          taskPriority
        );
      }

      // DELETE PROJECT FROM ARRAY
    } else if (task === 'delete') {
      const allTasksLink = document.querySelector('.link');

      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(index);
      allTasksLink.classList.add('selected-link');
    }
  }

  // PROJECTS
  function editProject(index) {
    const allProjectIcons = modal.querySelectorAll('.icon');
    const projectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].icon;

    // SHOW EDITABLE PROJECT TITLE
    modalTitle.value = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].title;

    // SELECT EDITABLE PROJECT ICON
    for (let i = 0; i < allProjectIcons.length; i += 1) {
      if (allProjectIcons[i].value === projectIcon) {
        allProjectIcons[i].checked = true;
      }
    }
  }

  function showProjects() {
    const projectsCount = document.querySelector('.projects-count');
    const projectsLinksDiv = document.querySelector('.projects-links-div');

    // SHOW NUMBER OF PROJECTS
    projectsCount.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length;
    projectsLinksDiv.textContent = '';

    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length; i += 1) {
      const projectLink = document.createElement('a');
      const projectIconAndTextDiv = document.createElement('div');
      const projectIcon = document.createElement('i');
      const projectText = document.createElement('p');
      const projectIconsDiv = document.createElement('div');
      const projectEditIcon = document.createElement('i');
      const projectTrashIcon = document.createElement('i');

      // PROJECT ICON/TEXT AND DEFAULT ICONS DIVS
      projectIconAndTextDiv.classList.add(
        'project-icon-and-text-div',
        'project',
        'select'
      );
      projectIconAndTextDiv.setAttribute('data-index', i);
      projectIconsDiv.classList.add(
        'project-default-icons-div',
        'project',
        'select'
      );
      projectIconsDiv.setAttribute('data-index', i);

      // PROJECT LINK
      projectLink.classList.add('link', 'project-link', 'project', 'select');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-index', i);

      // PROJECT ICON
      projectIcon.classList.add(
        'fal',
        'fa-fw',
        'project-icon',
        'project',
        'select',
        'padding-right',
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].icon
      );
      projectIcon.setAttribute('data-index', i);

      // PROJECT TEXT
      projectText.classList.add('project-text', 'project', 'select');
      projectText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].title;
      projectText.setAttribute('data-index', i);

      // PROJECT DEFAULT ICONS
      projectEditIcon.classList.add(
        'fal',
        'fa-edit',
        'project',
        'edit-project',
        'select',
        'scale-element',
        'padding-right'
      );
      projectEditIcon.setAttribute('data-index', i);
      projectTrashIcon.classList.add(
        'fal',
        'fa-trash-alt',
        'project',
        'delete-project',
        'select',
        'scale-element'
      );
      projectTrashIcon.setAttribute('data-index', i);

      // APPENDS
      projectIconsDiv.appendChild(projectEditIcon);
      projectIconsDiv.appendChild(projectTrashIcon);
      projectIconAndTextDiv.appendChild(projectIcon);
      projectIconAndTextDiv.appendChild(projectText);
      projectLink.appendChild(projectIconAndTextDiv);
      projectLink.appendChild(projectIconsDiv);
      projectsLinksDiv.appendChild(projectLink);
    }

    manipulateModal('close');
  }

  // TASKS
  function showTasks(menuTitle, projectIndexStart, projectIndexEnd) {
    let tasksNumber = 0;

    tasksCount.textContent = 0;
    tasksList.textContent = '';

    // GENERATE TASKS LIST
    for (let i = projectIndexStart; i < projectIndexEnd; i += 1) {
      for (let j = 0; j < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks.length; j += 1) {

        // IF CLICKED ON MENU LINK 'IMPORTANT' - FILTER NOT IMPORTANT TASKS
        if (menuTitle === 'important' && _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority !== 'high') {
          continue; // If task isn't important - skip it

          // IF CLICKED ON MENU LINK 'TODAY'
        } else if (menuTitle === 'today') {
          console.log('Tasks for today..');

          // IF CLICKED ON MENU LINK 'WEEK'
        } else if (menuTitle === 'week') {
          console.log('Tasks of the week..');
        }

        const taskDiv = document.createElement('div');
        const taskIconAndTextDiv = document.createElement('div');
        const taskIcon = document.createElement('i');
        const taskText = document.createElement('p');
        const taskInfo = document.createElement('div');
        const taskDueDate = document.createElement('p');
        const taskEditIcon = document.createElement('i');
        const taskTrashIcon = document.createElement('i');
        const taskInfoIcon = document.createElement('i');

        // SHOW NUMBER OF TASKS
        tasksNumber += 1;
        tasksCount.textContent = tasksNumber;

        taskDiv.classList.add('task-div', 'hover-element');
        taskDiv.setAttribute('data-index', i);

        // TASK PRIORITY, TEXT AND ITS DIV
        taskIconAndTextDiv.classList.add('flex');

        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'low') {
          taskIcon.classList.add(
            'fal',
            'fa-circle',
            'low-priority',
            'padding-right'
          );
        } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'medium') {
          taskIcon.classList.add(
            'fal',
            'fa-circle',
            'mid-priority',
            'padding-right'
          );
        } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'high') {
          taskIcon.classList.add(
            'fal',
            'fa-circle',
            'high-priority',
            'padding-right'
          );

        } else {
          taskIcon.classList.add('fal', 'fa-circle', 'padding-right');
        }

        taskText.classList.add('task-text');
        taskText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].title;

        // TASK INFO DIV
        taskInfo.classList.add('flex');

        // TASKS DUE DATE
        taskDueDate.classList.add('due-date', 'padding-right');
        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].date !== undefined) {
          taskDueDate.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].date;
        } else {
          taskDueDate.textContent = '';
        }

        // TASK DEFAULT ICONS
        taskEditIcon.classList.add(
          'fal',
          'fa-edit',
          'edit-task',
          'scale-element',
          'padding-right'
        );
        taskEditIcon.setAttribute('data-index', i);
        taskTrashIcon.classList.add(
          'fal',
          'fa-trash-alt',
          'delete-task',
          'scale-element',
          'padding-right'
        );
        taskTrashIcon.setAttribute('data-index', i);
        taskInfoIcon.classList.add('fal', 'scale-element', 'fa-info-circle');
        taskInfoIcon.setAttribute('data-index', i);

        // APPENDS
        taskIconAndTextDiv.appendChild(taskIcon);
        taskIconAndTextDiv.appendChild(taskText);
        taskInfo.appendChild(taskDueDate);
        taskInfo.appendChild(taskEditIcon);
        taskInfo.appendChild(taskTrashIcon);
        taskInfo.appendChild(taskInfoIcon);
        taskDiv.appendChild(taskIconAndTextDiv);
        taskDiv.appendChild(taskInfo);
        tasksList.appendChild(taskDiv);
      }
    }
  }

  function getTasks(menuTitle, index) {
    let projectIndexStart;
    let projectIndexEnd;

    // IF CLICKED ON PROJECT LINK
    if (menuTitle === '' && !Number.isNaN(index)) { // If number of index exists - project was clicked
      projectIndexStart = index;
      projectIndexEnd = index + 1

      // IF PROJECT DOESN'T HAVE ANY TASKS
      if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].tasks.length === 0) {
        tasksCount.textContent = 0;
      }

      // IF CLICKED ON MENU LINK
    } else {
      projectIndexStart = 0;
      projectIndexEnd = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length;
    }

    showTasks(menuTitle, projectIndexStart, projectIndexEnd);
  }

  function selectLink(target, index) {
    const allLinks = document.querySelectorAll('.link');
    const menuTitle = target.getAttribute('data-title');
    const addTaskButton = document.querySelector('.add-task');

    addTaskButton.classList.add('hide'); // By default 'Add Task' button is hidden

    allLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });

    // IF CLICKED DIRECTLY ON LINK (BOTH - MENU OR PROJECT)
    if (target.classList.contains('link')) {
      target.classList.add('selected-link');

      // IF CLICKED ON MENU LINK ICON OR TEXT
    } else if (
      target.classList.contains('menu-link-icon') ||
      target.classList.contains('menu-link-text')
    ) {
      target.parentElement.classList.add('selected-link');
    }

    // IF CLICKED SOMEWHERE ON PROJECT LINK
    if (target.classList.contains('project')) {
      // SHOW BUTTON TO ADD TASK FOR SELECTED PROJECT
      addTaskButton.classList.remove('hide');
      getTasks('', index);

      // IF CLICKED ON PROJECT ICON OR TEXT OR EDIT/DELETE ICONS
      if (
        target.classList.contains('project-icon') ||
        target.classList.contains('project-text') ||
        target.classList.contains('edit-project') ||
        target.classList.contains('delete-project')
      ) {
        target.parentElement.parentElement.classList.add('selected-link');

        // IF CLICKED ON PROJECT ELEMENTS DIVS
      } else if (
        target.classList.contains('project-icon-and-text-div') ||
        target.classList.contains('project-default-icons-div')
      ) {
        target.parentElement.classList.add('selected-link');
      }
    }

    // IF CLICKED SOMEWHERE ON MENU LINK
    if (
      target.classList.contains('menu-link') ||
      target.classList.contains('menu-link-icon') ||
      target.classList.contains('menu-link-text')
    ) {
      dom.getTasks(menuTitle);
    }
  }

  return {
    responsiveMenu,
    toggleMenu,
    manipulateModal,
    validateModal,
    showMainTitle,
    changeMainTitle,
    editProject,
    showProjects,
    getTasks,
    selectLink,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);


/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


const handlers = (() => {
  let index = 0;

  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_0__["default"].responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;
      const selectedLink = document.querySelector('.selected-link');

      index = parseInt(target.getAttribute('data-index'), 10); // Get and index of clicked link

      // TOGGLE SIDE MENU
      if (
        target.classList.contains('toggle-menu') ||
        target.classList.contains('burger-line')
      ) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].toggleMenu();

        // STYLE CLICKED LINK
      } else if (target.classList.contains('select')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].selectLink(target, index);

        // IN THE MAIN CONTENT SHOW MENU TITLE ACCORDINGLY
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMainTitle(target, index);

        // MODAL FOR EDITING A PROJECT
        if (target.classList.contains('edit-project')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Edit Project', 'Edit');
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(index);

          // MODAL FOR DELETING A PROJECT
        } else if (target.classList.contains('delete-project')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Project', 'Delete', index);
        }
      }

      // MODAL FOR ADDING A PROJECT
      if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Project', 'Add');

        // MODAL FOR ADDING A TASK
      } else if (target.classList.contains('add-task')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Task', 'Add');

        // MODAL FOR DELETING A TASK
      } else if (target.classList.contains('delete-task')) {
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Task', 'Delete', 0, taskIndex);

        // MODAL FOR WATCHING TASK INFO
      } else if (target.classList.contains('fa-info-circle')) {

        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        const projectIndex = parseInt(selectedLink.getAttribute('data-index'), 10);

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);

        // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {

        // VALIDATE MODAL FOR ADDING
        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('add');

          // VALIDATE MODAL FOR EDITING
        } else if (target.textContent === 'Edit') {
          index = parseInt(selectedLink.getAttribute('data-index'), 10);
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('edit', index);

          // VALIDATE MODAL FOR DELETING
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE A PROJECT
          if (!projectDeletionText.classList.contains('hide')) { // If deletion text is shown
            const projectIndex = parseInt(selectedLink.getAttribute('data-index'), 10);

            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('delete', projectIndex);
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showMainTitle(0) // After deleting a project - show main title as 'All'
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getTasks('all'); // After deleting a project - show all tasks from all remaining projects

            // DELETE A TASK
          } else if (projectDeletionText.classList.contains('hide')) {
            console.log('Delete a task!');
          }
        }

        // CLOSE MODAL
      } else if (target.classList.contains('close')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('close');
      }
    });
  }

  return {
    resizeWindow,
    listenClicks,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlers);


/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


const projects = (() => {
  const projectsList = [];

  class Project {
    constructor(icon, title) {
      this.icon = icon;
      this.title = title;
      this.tasks = [];
    }
  }

  function addProject(icon, title) {
    const project = new Project(icon, title);
    projectsList.push(project);
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showProjects();
  }

  function editProject(icon, title, index) {
    projectsList[index].icon = icon;
    projectsList[index].title = title;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showProjects();
  }

  function deleteProject(index) {
    if (index > -1) {
      projectsList.splice(index, 1);
    }
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showProjects();
  }

  return {
    projectsList,
    addProject,
    editProject,
    deleteProject,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);


/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");



const tasks = (() => {
  class Task {
    constructor(title, description, date, priority) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
    }
  }

  function addTask(index, title, description, date, priority) {
    const task = new Task(title, description, date, priority);
    _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectsList[index].tasks.push(task);
    console.log('Add a task!');
  }

  return {
    addTask,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasks);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ "./src/handlers.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");





// ADD DEFAULT PROJECT (EXAMPLE)
_projects__WEBPACK_IMPORTED_MODULE_2__["default"].addProject('fa-tools', 'Craft New Project');
_projects__WEBPACK_IMPORTED_MODULE_2__["default"].addProject('fa-tools', 'Craft Another Project');

// ADD DEFAULT TASK (EXAMPLE)
_tasks__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(
  0,
  'Enjoy my tea as much as my coding! 🍵',
  'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ',
  '2011-11-11',
  'low'
);
_tasks__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(
  1,
  'Create magic through my mind, my heart and my keyboard.. 👩🏻‍💻',
  'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ',
  '2012-12-12',
  'high'
);

// WHEN PAGE IS LOADED - SHOW TITLE FROM MENU LINK 'ALL'
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].showMainTitle(0);

// WHEN PAGE IS LOADED - SHOW ALL TASKS FROM ALL PROJECTS
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].getTasks('all');

_dom__WEBPACK_IMPORTED_MODULE_0__["default"].responsiveMenu();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].resizeWindow();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].listenClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDQTtBQUNVOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksOERBQXFCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7VUN4QnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDVTtBQUNBO0FBQ047O0FBRTVCO0FBQ0EsNERBQW1CO0FBQ25CLDREQUFtQjs7QUFFbkI7QUFDQSxzREFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMERBQWlCOztBQUVqQjtBQUNBLHFEQUFZOztBQUVaLDJEQUFrQjtBQUNsQiw4REFBcUI7QUFDckIsOERBQXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCB0b2dnbGVNZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtbWVudScpO1xuICBjb25zdCBzaWRlYmFyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLW1lbnUnKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbicpO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbCcpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcbiAgY29uc3QgbW9kYWxUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC10aXRsZScpO1xuICBjb25zdCBtb2RhbFRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUtZXJyb3InKTtcbiAgY29uc3QgbWFpblRpdGxlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlLWljb24nKTtcbiAgY29uc3QgbWFpblRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlLXRleHQnKTtcbiAgY29uc3QgdGFza3NDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb3VudCcpO1xuICBjb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MtbGlzdCcpO1xuXG4gIGZ1bmN0aW9uIHJlc3BvbnNpdmVNZW51KCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMDAwKSB7XG4gICAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2FkZC16LWluZGV4Jyk7XG5cbiAgICAgIC8vIEVYUEFORCBNQUlOIENPTlRFTlRcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZC1tYWluJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBJVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC16LWluZGV4Jyk7XG5cbiAgICAgIC8vIENPTlRSQUNUIE1BSU4gQ09OVEVOVCBBTkQgTUFLRSBJVCBPUEFRVUVcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblxuICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBNQUlOIENPTlRFTlQgQSBCSVQgVFJBTlNQQVJFTlRcbiAgICBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlLXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlLW1haW4nKTtcblxuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBPUEFRVUVcbiAgICB9IGVsc2UgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1zaWRlYmFyJykpIHtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gTUFJTiBDT05URU5UIFRJVExFXG4gIGZ1bmN0aW9uIHNob3dNYWluVGl0bGUoaW5kZXgpIHtcbiAgICBjb25zdCBhbGxNZW51SWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1saW5rLWljb24nKTtcbiAgICBjb25zdCBtZW51SWNvbiA9IGFsbE1lbnVJY29uc1tpbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLWljb24nKTtcbiAgICBjb25zdCBtZW51VGV4dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1saW5rLXRleHQnKTtcblxuICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICdmYWwnLFxuICAgICAgJ2ZhLWZ3JyxcbiAgICAgICdtYWluLXRpdGxlLWljb24nLFxuICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgbWVudUljb25cbiAgICApO1xuICAgIG1haW5UaXRsZVRleHQudGV4dENvbnRlbnQgPSBtZW51VGV4dHNbaW5kZXhdLnRleHRDb250ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgaW5kZXgpIHtcbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBUSEUgTUVOVVxuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpXG4gICAgKSB7XG4gICAgICBzaG93TWFpblRpdGxlKGluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBUSVRMRSBPRiBUQVNLUyBGUk9NIFBST0pFQ1RTXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1saW5rJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpXG4gICAgKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcblxuICAgICAgbWFpblRpdGxlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLWZ3JyxcbiAgICAgICAgJ21haW4tdGl0bGUtaWNvbicsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgICAgcHJvamVjdEljb25cbiAgICAgICk7XG4gICAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50aXRsZTtcbiAgICB9XG4gIH1cblxuICAvLyBNT0RBTCBGVU5DVElPTkFMSVRZXG4gIGZ1bmN0aW9uIHdhdGNoVGFza0luZm8ocHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBjb25zdCBpbmZvVGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay10aXRsZScpO1xuICAgIGNvbnN0IGluZm9UYXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5pbmZvLXRhc2stZGVzY3JpcHRpb24nXG4gICAgKTtcbiAgICBjb25zdCBpbmZvVGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLWR1ZS1kYXRlJyk7XG4gICAgY29uc3QgaW5mb1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stcHJpb3JpdHknKTtcbiAgICBjb25zdCBpbmZvVGFza1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXByb2plY3QnKTtcblxuICAgIC8vIFRBU0sgVElUTEVcbiAgICBpbmZvVGFza1RpdGxlLnRleHRDb250ZW50ID0gYCR7cHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZX1gO1xuXG4gICAgLy8gVEFTSyBERVNDUklQVElPTlxuICAgIGluZm9UYXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2NyaXB0aW9ufWA7XG5cbiAgICAvLyBUQVNLIERVRSBEQVRFXG4gICAgaW5mb1Rhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gYCR7cHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kYXRlfWA7XG5cbiAgICAvLyBUQVNLIFBSSU9SSVRZXG4gICAgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2xvdydcbiAgICApIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSSBjYW4gZG8gaXQgbGF0ZXIgb3IgbmV2ZXIgYXQgYWxsLi4g8J+YtCc7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPT09ICdtZWRpdW0nXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgc3RheSBzb21ld2hlcmUgYmV0d2VlbiByZWxheGF0aW9uIGFuZCBmb2N1cyDwn5iFJztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2hpZ2gnXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgbXVzdCBkbyBpdCAtIHNvb25lciBvciBsYXRlciEg8J+Ysic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG5cbiAgICAvLyBUQVNLIFBST0pFQ1RcbiAgICBpbmZvVGFza1Byb2plY3QudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hbmlwdWxhdGVNb2RhbChzdGF0ZSwgdGl0bGUsIHRhc2ssIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgbW9kYWxIZWFkZXIgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG4gICAgY29uc3QgbW9kYWxNYWluVGl0bGUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtbWFpbi10aXRsZScpO1xuICAgIGNvbnN0IG1vZGFsVGFza0J1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10YXNrLWJ1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3REZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgdGFza0RlbGV0aW9uVGV4dCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlbGV0aW9uLXRleHQnKTtcbiAgICBjb25zdCB0YXNrSW5mb0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWRpdicpO1xuICAgIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1tb2RhbCcpO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbW9kYWwnKTtcblxuICAgIG1vZGFsSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0aW9uLW1vZGFsLWhlYWRlcicpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB0YXNrSW5mb0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgbW9kYWxUaXRsZUVycm9yLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB0YXNrRGVsZXRpb25UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY2FuY2VsLWRlbGV0aW9uJyk7XG4gICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb25maXJtLWRlbGV0aW9uJywgJ2hpZGUnKTtcblxuICAgIGlmIChzdGF0ZSA9PT0gJ3Nob3cnKSB7XG4gICAgICBjb25zdCBtb2RhbEljb25zRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhZGlvLWZvcm0nKTtcbiAgICAgIGNvbnN0IG1vZGFsVGFza3NEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFza3MtZGl2Jyk7XG5cbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsTWFpblRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgICBtb2RhbFRhc2tCdXR0b24udGV4dENvbnRlbnQgPSB0YXNrO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXG4gICAgICAvLyBJRiBNT0RBTCBJUyBGT1IgQURESU5HIFRBU0tcbiAgICAgIGlmICh0aXRsZSA9PT0gJ0FkZCBUYXNrJykge1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIC8vIElGIE1PREFMIElTIEZPUiBXQVRDSElORyBUQVNLIElORk9cbiAgICAgIH0gZWxzZSBpZiAodGl0bGUgPT09ICdUYXNrIEluZm8nKSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIHdhdGNoVGFza0luZm8ocHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgfVxuXG4gICAgICAvLyBUTyBDTE9TRSBUSEUgTU9EQUxcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgLy8gREVMRVRJT04gTU9EQUwgQ09OVEVOVFxuICAgIGlmICh0YXNrID09PSAnRGVsZXRlJykge1xuICAgICAgbW9kYWxIZWFkZXIuY2xhc3NMaXN0LmFkZCgnZGVsZXRpb24tbW9kYWwtaGVhZGVyJyk7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjYW5jZWwtZGVsZXRpb24nKTtcbiAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnY29uZmlybS1kZWxldGlvbicpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFTEVUSU9OXG4gICAgICBpZiAodGl0bGUgPT09ICdEZWxldGUgUHJvamVjdCcpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcucHJvamVjdC1kZWxldGlvbi10aXRsZSdcbiAgICAgICAgKTtcblxuICAgICAgICBwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcHJvamVjdERlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPVxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuXG4gICAgICAgIC8vIFRBU0sgREVMRVRJT05cbiAgICAgIH0gZWxzZSBpZiAodGl0bGUgPT09ICdEZWxldGUgVGFzaycpIHtcbiAgICAgICAgY29uc3QgdGFza0RlbGV0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcudGFzay1kZWxldGlvbi10aXRsZSdcbiAgICAgICAgKTtcblxuICAgICAgICB0YXNrRGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgdGFza0RlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPVxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVNb2RhbCh0YXNrLCBpbmRleCkge1xuICAgIGNvbnN0IHsgcHJvamVjdEZvcm1JY29uIH0gPSBkb2N1bWVudC5mb3Jtcy5mb3JtO1xuICAgIGNvbnN0IHNlbGVjdGVkTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saW5rJyk7XG4gICAgY29uc3QgcHJvamVjdERvbUljb24gPSBwcm9qZWN0Rm9ybUljb24udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhZGlvLWZvcm0nKTtcbiAgICBjb25zdCBtb2RhbFRpdGxlVGV4dCA9IG1vZGFsVGl0bGUudmFsdWU7XG5cbiAgICBpZiAodGFzayA9PT0gJ2FkZCcgfHwgdGFzayA9PT0gJ2VkaXQnKSB7XG4gICAgICBpZiAobW9kYWxUaXRsZVRleHQgPT09ICcnKSB7XG4gICAgICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gQUREIFBST0pFQ1QgVE8gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2FkZCcgJiYgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdERvbUljb24sIG1vZGFsVGl0bGVUZXh0KTtcblxuICAgICAgICAvLyBFRElUIFBST0pFQ1QgRlJPTSBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnZWRpdCcpIHtcbiAgICAgICAgcHJvamVjdHMuZWRpdFByb2plY3QocHJvamVjdERvbUljb24sIG1vZGFsVGl0bGVUZXh0LCBpbmRleCk7XG5cbiAgICAgICAgLy8gS0VFUCBQUk9KRUNUIFZJU1VBTExMWSBTRUxFQ1RFRCBJTiBET00gQUZURVIgRURJVElOR1xuICAgICAgICBjb25zdCBhbGxQcm9qZWN0c0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtbGluaycpO1xuICAgICAgICBhbGxQcm9qZWN0c0xpbmtzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgICAgY2hhbmdlTWFpblRpdGxlKHNlbGVjdGVkTGluaywgaW5kZXgpOyAvLyBDaGFuZ2UgbWFpbiB0aXRsZSB0byBpY29uIGFuZCB0ZXh0IG9mIHNlbGVjdGVkIHByb2plY3RcblxuICAgICAgICAvLyBBREQgVEFTSyBUTyBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnYWRkJyAmJiBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBzZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5U2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stcHJpb3JpdHknKTtcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eTtcblxuICAgICAgICAvLyBDSEVDSyBUQVNLIFBSSU9SSVRZXG4gICAgICAgIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdsb3cnKSB7XG4gICAgICAgICAgdGFza1ByaW9yaXR5ID0gJ2xvdyc7XG4gICAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbWVkaXVtJykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdtZWRpdW0nO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgdGFza1ByaW9yaXR5ID0gJ2hpZ2gnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFza3MuYWRkVGFzayhcbiAgICAgICAgICBzZWxlY3RlZFByb2plY3QsXG4gICAgICAgICAgbW9kYWxUaXRsZVRleHQsXG4gICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLFxuICAgICAgICAgIHRhc2tEdWVEYXRlLFxuICAgICAgICAgIHRhc2tQcmlvcml0eVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBERUxFVEUgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgfSBlbHNlIGlmICh0YXNrID09PSAnZGVsZXRlJykge1xuICAgICAgY29uc3QgYWxsVGFza3NMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmsnKTtcblxuICAgICAgcHJvamVjdHMuZGVsZXRlUHJvamVjdChpbmRleCk7XG4gICAgICBhbGxUYXNrc0xpbmsuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBST0pFQ1RTXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGluZGV4KSB7XG4gICAgY29uc3QgYWxsUHJvamVjdEljb25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbCgnLmljb24nKTtcbiAgICBjb25zdCBwcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcblxuICAgIC8vIFNIT1cgRURJVEFCTEUgUFJPSkVDVCBUSVRMRVxuICAgIG1vZGFsVGl0bGUudmFsdWUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuXG4gICAgLy8gU0VMRUNUIEVESVRBQkxFIFBST0pFQ1QgSUNPTlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdEljb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxsUHJvamVjdEljb25zW2ldLnZhbHVlID09PSBwcm9qZWN0SWNvbikge1xuICAgICAgICBhbGxQcm9qZWN0SWNvbnNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY291bnQnKTtcbiAgICBjb25zdCBwcm9qZWN0c0xpbmtzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWxpbmtzLWRpdicpO1xuXG4gICAgLy8gU0hPVyBOVU1CRVIgT0YgUFJPSkVDVFNcbiAgICBwcm9qZWN0c0NvdW50LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDtcbiAgICBwcm9qZWN0c0xpbmtzRGl2LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgcHJvamVjdFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUcmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTi9URVhUIEFORCBERUZBVUxUIElDT05TIERJVlNcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCdcbiAgICAgICk7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb25zRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIExJTktcbiAgICAgIHByb2plY3RMaW5rLmNsYXNzTGlzdC5hZGQoJ2xpbmsnLCAncHJvamVjdC1saW5rJywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTlxuICAgICAgcHJvamVjdEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS1mdycsXG4gICAgICAgICdwcm9qZWN0LWljb24nLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS5pY29uXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgVEVYVFxuICAgICAgcHJvamVjdFRleHQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10ZXh0JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0VGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50aXRsZTtcbiAgICAgIHByb2plY3RUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFRkFVTFQgSUNPTlNcbiAgICAgIHByb2plY3RFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLWVkaXQnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdlZGl0LXByb2plY3QnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3NjYWxlLWVsZW1lbnQnLFxuICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICk7XG4gICAgICBwcm9qZWN0RWRpdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0VHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtdHJhc2gtYWx0JyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnZGVsZXRlLXByb2plY3QnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3NjYWxlLWVsZW1lbnQnXG4gICAgICApO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gQVBQRU5EU1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRyYXNoSWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUZXh0KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uQW5kVGV4dERpdik7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbnNEaXYpO1xuICAgICAgcHJvamVjdHNMaW5rc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgfVxuXG4gICAgbWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICB9XG5cbiAgLy8gVEFTS1NcbiAgZnVuY3Rpb24gc2hvd1Rhc2tzKG1lbnVUaXRsZSwgcHJvamVjdEluZGV4U3RhcnQsIHByb2plY3RJbmRleEVuZCkge1xuICAgIGxldCB0YXNrc051bWJlciA9IDA7XG5cbiAgICB0YXNrc0NvdW50LnRleHRDb250ZW50ID0gMDtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcblxuICAgIC8vIEdFTkVSQVRFIFRBU0tTIExJU1RcbiAgICBmb3IgKGxldCBpID0gcHJvamVjdEluZGV4U3RhcnQ7IGkgPCBwcm9qZWN0SW5kZXhFbmQ7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3MubGVuZ3RoOyBqICs9IDEpIHtcblxuICAgICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyAnSU1QT1JUQU5UJyAtIEZJTFRFUiBOT1QgSU1QT1JUQU5UIFRBU0tTXG4gICAgICAgIGlmIChtZW51VGl0bGUgPT09ICdpbXBvcnRhbnQnICYmIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSAhPT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgY29udGludWU7IC8vIElmIHRhc2sgaXNuJ3QgaW1wb3J0YW50IC0gc2tpcCBpdFxuXG4gICAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ1RPREFZJ1xuICAgICAgICB9IGVsc2UgaWYgKG1lbnVUaXRsZSA9PT0gJ3RvZGF5Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdUYXNrcyBmb3IgdG9kYXkuLicpO1xuXG4gICAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ1dFRUsnXG4gICAgICAgIH0gZWxzZSBpZiAobWVudVRpdGxlID09PSAnd2VlaycpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnVGFza3Mgb2YgdGhlIHdlZWsuLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB0YXNrSWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCB0YXNrSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdGFza0VkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrVHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrSW5mb0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cbiAgICAgICAgLy8gU0hPVyBOVU1CRVIgT0YgVEFTS1NcbiAgICAgICAgdGFza3NOdW1iZXIgKz0gMTtcbiAgICAgICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IHRhc2tzTnVtYmVyO1xuXG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kaXYnLCAnaG92ZXItZWxlbWVudCcpO1xuICAgICAgICB0YXNrRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAgIC8vIFRBU0sgUFJJT1JJVFksIFRFWFQgQU5EIElUUyBESVZcbiAgICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcblxuICAgICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ID09PSAnbG93Jykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAgICdmYS1jaXJjbGUnLFxuICAgICAgICAgICAgJ2xvdy1wcmlvcml0eScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgICAnZmEtY2lyY2xlJyxcbiAgICAgICAgICAgICdtaWQtcHJpb3JpdHknLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgPT09ICdoaWdoJykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAgICdmYS1jaXJjbGUnLFxuICAgICAgICAgICAgJ2hpZ2gtcHJpb3JpdHknLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICAgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1jaXJjbGUnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFza1RleHQuY2xhc3NMaXN0LmFkZCgndGFzay10ZXh0Jyk7XG4gICAgICAgIHRhc2tUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnRpdGxlO1xuXG4gICAgICAgIC8vIFRBU0sgSU5GTyBESVZcbiAgICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xuXG4gICAgICAgIC8vIFRBU0tTIERVRSBEQVRFXG4gICAgICAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2R1ZS1kYXRlJywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5kYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5kYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUQVNLIERFRkFVTFQgSUNPTlNcbiAgICAgICAgdGFza0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgJ2ZhLWVkaXQnLFxuICAgICAgICAgICdlZGl0LXRhc2snLFxuICAgICAgICAgICdzY2FsZS1lbGVtZW50JyxcbiAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgKTtcbiAgICAgICAgdGFza0VkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrVHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgJ2ZhLXRyYXNoLWFsdCcsXG4gICAgICAgICAgJ2RlbGV0ZS10YXNrJyxcbiAgICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICAgIHRhc2tJbmZvSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnc2NhbGUtZWxlbWVudCcsICdmYS1pbmZvLWNpcmNsZScpO1xuICAgICAgICB0YXNrSW5mb0ljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgICAgLy8gQVBQRU5EU1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza0ljb24pO1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza1RleHQpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tFZGl0SWNvbik7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tUcmFzaEljb24pO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrSW5mb0ljb24pO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJY29uQW5kVGV4dERpdik7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0luZm8pO1xuICAgICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VGFza3MobWVudVRpdGxlLCBpbmRleCkge1xuICAgIGxldCBwcm9qZWN0SW5kZXhTdGFydDtcbiAgICBsZXQgcHJvamVjdEluZGV4RW5kO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIExJTktcbiAgICBpZiAobWVudVRpdGxlID09PSAnJyAmJiAhTnVtYmVyLmlzTmFOKGluZGV4KSkgeyAvLyBJZiBudW1iZXIgb2YgaW5kZXggZXhpc3RzIC0gcHJvamVjdCB3YXMgY2xpY2tlZFxuICAgICAgcHJvamVjdEluZGV4U3RhcnQgPSBpbmRleDtcbiAgICAgIHByb2plY3RJbmRleEVuZCA9IGluZGV4ICsgMVxuXG4gICAgICAvLyBJRiBQUk9KRUNUIERPRVNOJ1QgSEFWRSBBTlkgVEFTS1NcbiAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0YXNrc0NvdW50LnRleHRDb250ZW50ID0gMDtcbiAgICAgIH1cblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTktcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvamVjdEluZGV4U3RhcnQgPSAwO1xuICAgICAgcHJvamVjdEluZGV4RW5kID0gcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBzaG93VGFza3MobWVudVRpdGxlLCBwcm9qZWN0SW5kZXhTdGFydCwgcHJvamVjdEluZGV4RW5kKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdExpbmsodGFyZ2V0LCBpbmRleCkge1xuICAgIGNvbnN0IGFsbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpbmsnKTtcbiAgICBjb25zdCBtZW51VGl0bGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyk7XG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzaycpO1xuXG4gICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7IC8vIEJ5IGRlZmF1bHQgJ0FkZCBUYXNrJyBidXR0b24gaXMgaGlkZGVuXG5cbiAgICBhbGxMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9KTtcblxuICAgIC8vIElGIENMSUNLRUQgRElSRUNUTFkgT04gTElOSyAoQk9USCAtIE1FTlUgT1IgUFJPSkVDVClcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluaycpKSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyBJQ09OIE9SIFRFWFRcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH1cblxuICAgIC8vIElGIENMSUNLRUQgU09NRVdIRVJFIE9OIFBST0pFQ1QgTElOS1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0JykpIHtcbiAgICAgIC8vIFNIT1cgQlVUVE9OIFRPIEFERCBUQVNLIEZPUiBTRUxFQ1RFRCBQUk9KRUNUXG4gICAgICBhZGRUYXNrQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIGdldFRhc2tzKCcnLCBpbmRleCk7XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBJQ09OIE9SIFRFWFQgT1IgRURJVC9ERUxFVEUgSUNPTlNcbiAgICAgIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKVxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBFTEVNRU5UUyBESVZTXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElGIENMSUNLRUQgU09NRVdIRVJFIE9OIE1FTlUgTElOS1xuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpXG4gICAgKSB7XG4gICAgICBkb20uZ2V0VGFza3MobWVudVRpdGxlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc3BvbnNpdmVNZW51LFxuICAgIHRvZ2dsZU1lbnUsXG4gICAgbWFuaXB1bGF0ZU1vZGFsLFxuICAgIHZhbGlkYXRlTW9kYWwsXG4gICAgc2hvd01haW5UaXRsZSxcbiAgICBjaGFuZ2VNYWluVGl0bGUsXG4gICAgZWRpdFByb2plY3QsXG4gICAgc2hvd1Byb2plY3RzLFxuICAgIGdldFRhc2tzLFxuICAgIHNlbGVjdExpbmssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICBsZXQgaW5kZXggPSAwO1xuXG4gIC8vIFJFU0laRSBNRU5VIERFUEVORElORyBPTiBXSU5ET1cgU0laRVxuICBmdW5jdGlvbiByZXNpemVXaW5kb3coKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRvbS5yZXNwb25zaXZlTWVudSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5DbGlja3MoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcbiAgICAgIGNvbnN0IHNlbGVjdGVkTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7IC8vIEdldCBhbmQgaW5kZXggb2YgY2xpY2tlZCBsaW5rXG5cbiAgICAgIC8vIFRPR0dMRSBTSURFIE1FTlVcbiAgICAgIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLW1lbnUnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpXG4gICAgICApIHtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcblxuICAgICAgICAvLyBTVFlMRSBDTElDS0VEIExJTktcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0JykpIHtcbiAgICAgICAgZG9tLnNlbGVjdExpbmsodGFyZ2V0LCBpbmRleCk7XG5cbiAgICAgICAgLy8gSU4gVEhFIE1BSU4gQ09OVEVOVCBTSE9XIE1FTlUgVElUTEUgQUNDT1JESU5HTFlcbiAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgRURJVElORyBBIFBST0pFQ1RcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdFZGl0IFByb2plY3QnLCAnRWRpdCcpO1xuICAgICAgICAgIGRvbS5lZGl0UHJvamVjdChpbmRleCk7XG5cbiAgICAgICAgICAvLyBNT0RBTCBGT1IgREVMRVRJTkcgQSBQUk9KRUNUXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFByb2plY3QnLCAnRGVsZXRlJywgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1PREFMIEZPUiBBRERJTkcgQSBQUk9KRUNUXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBQcm9qZWN0JywgJ0FkZCcpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBBRERJTkcgQSBUQVNLXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10YXNrJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgVGFzaycsICdBZGQnKTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgREVMRVRJTkcgQSBUQVNLXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS10YXNrJykpIHtcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFRhc2snLCAnRGVsZXRlJywgMCwgdGFza0luZGV4KTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgV0FUQ0hJTkcgVEFTSyBJTkZPXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLWluZm8tY2lyY2xlJykpIHtcblxuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdUYXNrIEluZm8nLCAnJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuXG4gICAgICAgIC8vIFZBTElEQVRFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tbW9kYWwnKSkge1xuXG4gICAgICAgIC8vIFZBTElEQVRFIE1PREFMIEZPUiBBRERJTkdcbiAgICAgICAgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0FkZCcpIHtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnYWRkJyk7XG5cbiAgICAgICAgICAvLyBWQUxJREFURSBNT0RBTCBGT1IgRURJVElOR1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0VkaXQnKSB7XG4gICAgICAgICAgaW5kZXggPSBwYXJzZUludChzZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZWRpdCcsIGluZGV4KTtcblxuICAgICAgICAgIC8vIFZBTElEQVRFIE1PREFMIEZPUiBERUxFVElOR1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuXG4gICAgICAgICAgLy8gREVMRVRFIEEgUFJPSkVDVFxuICAgICAgICAgIGlmICghcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkgeyAvLyBJZiBkZWxldGlvbiB0ZXh0IGlzIHNob3duXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwYXJzZUludChzZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2RlbGV0ZScsIHByb2plY3RJbmRleCk7XG4gICAgICAgICAgICBkb20uY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgMCk7IC8vIEFmdGVyIGRlbGV0aW5nIGEgcHJvamVjdCAtIGNoYW5nZSBpY29uIHRvICdmYS1jYWxlbmRhci1hbHQnIChtZW51IGxpbmsgJ0FsbCcpXG4gICAgICAgICAgICBkb20uc2hvd01haW5UaXRsZSgwKSAvLyBBZnRlciBkZWxldGluZyBhIHByb2plY3QgLSBzaG93IG1haW4gdGl0bGUgYXMgJ0FsbCdcbiAgICAgICAgICAgIGRvbS5nZXRUYXNrcygnYWxsJyk7IC8vIEFmdGVyIGRlbGV0aW5nIGEgcHJvamVjdCAtIHNob3cgYWxsIHRhc2tzIGZyb20gYWxsIHJlbWFpbmluZyBwcm9qZWN0c1xuXG4gICAgICAgICAgICAvLyBERUxFVEUgQSBUQVNLXG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGVsZXRlIGEgdGFzayEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDTE9TRSBNT0RBTFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZScpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc2l6ZVdpbmRvdyxcbiAgICBsaXN0ZW5DbGlja3MsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVycztcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IFtdO1xuXG4gIGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKGljb24sIHRpdGxlKSB7XG4gICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFByb2plY3QoaWNvbiwgdGl0bGUpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoaWNvbiwgdGl0bGUpO1xuICAgIHByb2plY3RzTGlzdC5wdXNoKHByb2plY3QpO1xuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGljb24sIHRpdGxlLCBpbmRleCkge1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0uaWNvbiA9IGljb247XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcHJvamVjdHNMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvamVjdHNMaXN0LFxuICAgIGFkZFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IHRhc2tzID0gKCgpID0+IHtcbiAgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkge1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUYXNrKGluZGV4LCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSB7XG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3MucHVzaCh0YXNrKTtcbiAgICBjb25zb2xlLmxvZygnQWRkIGEgdGFzayEnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkVGFzayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2tzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBoYW5kbGVycyBmcm9tICcuL2hhbmRsZXJzJztcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuLy8gQUREIERFRkFVTFQgUFJPSkVDVCAoRVhBTVBMRSlcbnByb2plY3RzLmFkZFByb2plY3QoJ2ZhLXRvb2xzJywgJ0NyYWZ0IE5ldyBQcm9qZWN0Jyk7XG5wcm9qZWN0cy5hZGRQcm9qZWN0KCdmYS10b29scycsICdDcmFmdCBBbm90aGVyIFByb2plY3QnKTtcblxuLy8gQUREIERFRkFVTFQgVEFTSyAoRVhBTVBMRSlcbnRhc2tzLmFkZFRhc2soXG4gIDAsXG4gICdFbmpveSBteSB0ZWEgYXMgbXVjaCBhcyBteSBjb2RpbmchIPCfjbUnLFxuICAnTG9uZ2VyIGRlc2NyaXB0aW9uIG9mIG15IGRlbW8gdGFzaywganVzdCB0byBzaG93IHlvdSB0aGlzIHN1cnByaXNpbmdseSBuaWNlIHNjcm9sbGJhciBhbmQgYW1hemluZ2x5IGN1dGUga2l0dHkg4LiFKF7il4nhtKXil4leKeC4hScsXG4gICcyMDExLTExLTExJyxcbiAgJ2xvdydcbik7XG50YXNrcy5hZGRUYXNrKFxuICAxLFxuICAnQ3JlYXRlIG1hZ2ljIHRocm91Z2ggbXkgbWluZCwgbXkgaGVhcnQgYW5kIG15IGtleWJvYXJkLi4g8J+RqfCfj7vigI3wn5K7JyxcbiAgJ0xvbmdlciBkZXNjcmlwdGlvbiBvZiBteSBkZW1vIHRhc2ssIGp1c3QgdG8gc2hvdyB5b3UgdGhpcyBzdXJwcmlzaW5nbHkgbmljZSBzY3JvbGxiYXIgYW5kIGFtYXppbmdseSBjdXRlIGtpdHR5IOC4hShe4peJ4bSl4peJXinguIUnLFxuICAnMjAxMi0xMi0xMicsXG4gICdoaWdoJ1xuKTtcblxuLy8gV0hFTiBQQUdFIElTIExPQURFRCAtIFNIT1cgVElUTEUgRlJPTSBNRU5VIExJTksgJ0FMTCdcbmRvbS5zaG93TWFpblRpdGxlKDApO1xuXG4vLyBXSEVOIFBBR0UgSVMgTE9BREVEIC0gU0hPVyBBTEwgVEFTS1MgRlJPTSBBTEwgUFJPSkVDVFNcbmRvbS5nZXRUYXNrcygnYWxsJyk7XG5cbmRvbS5yZXNwb25zaXZlTWVudSgpO1xuaGFuZGxlcnMucmVzaXplV2luZG93KCk7XG5oYW5kbGVycy5saXN0ZW5DbGlja3MoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==