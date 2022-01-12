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

      // IF MODAL IS FOR ADDING A TASK
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
    const projectDomIcon = projectFormIcon.value;
    const projectIconsDiv = modal.querySelector('.radio-form');
    const modalTitleText = modalTitle.value;

    if (task === 'add' || task === 'edit') {
      if (modalTitleText === '') {
        modalTitleError.classList.remove('hide');
        modalTitleError.classList.add('show');

        // ADD A PROJECT TO ARRAY
      } else if (task === 'add' && projectIconsDiv.classList.contains('show')) {
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectDomIcon, modalTitleText);

        // EDIT A PROJECT FROM ARRAY
      } else if (task === 'edit') {
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(projectDomIcon, modalTitleText, index);

        // ADD A TASK TO ARRAY
      } else if (task === 'add' && projectIconsDiv.classList.contains('hide')) {
        const selectedLink = document.querySelector('.selected-link');
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

      // DELETE A PROJECT FROM ARRAY
    } else if (task === 'delete') {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(index);
    }
  }

  // MAIN CONTENT
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
    const projectsLinks = document.querySelector('.projects-links-div');

    // SHOW NUMBER OF PROJECTS
    projectsCount.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length;
    projectsLinks.textContent = '';

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
      projectsLinks.appendChild(projectLink);
    }

    manipulateModal('close');
  }

  // TASKS
  function showTasks(menuTitle, index) {
    let tasksNumber = 0;
    let indexStart;
    let indexEnd;

    tasksList.textContent = '';

    // IF CLICKED ON MENU LINK 'ALL'
    if (menuTitle === 'all') {
      indexStart = 0;
      indexEnd = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length;

      // IF CLICKED ON MENU LINK 'TODAY'
    } else if (menuTitle === 'today') {
      tasksList.textContent = 'Tasks for today..';

      // IF CLICKED ON MENU LINK 'WEEK'
    } else if (menuTitle === 'week') {
      tasksList.textContent = 'Tasks of the week..';

      // IF CLICKED ON MENU LINK 'IMPORTANT'
    } else if (menuTitle === 'important') {
      tasksList.textContent = 'Important tasks..';

      // IF CLICKED ON PROJECT LINK
    } else if (!Number.isNaN(index)) { // If number of index exists - project was clicked
      indexStart = index;
      indexEnd = index + 1;
    }

    for (let i = indexStart; i < indexEnd; i += 1) {
      for (let j = 0; j < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks.length; j += 1) {
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

  function selectLink(target, index) {
    const allLinks = document.querySelectorAll('.link');
    const menuTitle = target.getAttribute('data-title');
    const addTaskButton = document.querySelector('.add-task');

    addTaskButton.classList.add('hide'); // By default 'Add Task' button is hidden

    allLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });

    // IF CLICKED DIRECTLY ON A LINK (BOTH - MENU OR PROJECT)
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
      // SHOW BUTTON TO ADD A TASK FOR SELECTED PROJECT
      addTaskButton.classList.remove('hide');
      showTasks('', index);

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
      dom.showTasks(menuTitle);
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
    showTasks,
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

        // MODAL FOR PROJECT EDITION
        if (target.classList.contains('edit-project')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Edit Project', 'Edit');
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(index);

          // MODAL FOR PROJECT DELETION
        } else if (target.classList.contains('delete-project')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Project', 'Delete', index);
        }
      }

      // MODAL FOR PROJECT ADDITION
      if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Project', 'Add');

        // MODAL FOR TASK ADDITION
      } else if (target.classList.contains('add-task')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Task', 'Add');

        // MODAL FOR TASK DELETION
      } else if (target.classList.contains('delete-task')) {
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Task', 'Delete', 0, taskIndex);

        // MODAL FOR WATCHING TASK INFO
      } else if (target.classList.contains('fa-info-circle')) {
        const selectedProject = document.querySelector('.selected-link');
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        const projectIndex = parseInt(selectedProject.getAttribute('data-index'), 10);

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);

        // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        const selectedProject = document.querySelector('.selected-link');

        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('add');
        } else if (target.textContent === 'Edit') {
          index = parseInt(selectedProject.getAttribute('data-index'), 10);
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('edit', index);

          // DELETION MODAL
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE A PROJECT
          if (!projectDeletionText.classList.contains('hide')) { // If deletion text is shown
            const projectIndex = parseInt(selectedProject.getAttribute('data-index'), 10);

            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('delete', projectIndex);

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
_projects__WEBPACK_IMPORTED_MODULE_2__["default"].addProject('fa-tools', 'Craft Example');

// ADD DEFAULT TASK (EXAMPLE)
_tasks__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(
  0,
  'Enjoy my tea as much as my coding! 🍵',
  'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ',
  '2011-11-11',
  'low'
);

// WHEN PAGE IS LOADED - SHOW TITLE FROM MENU LINK 'ALL'
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].showMainTitle(0);

// WHEN PAGE IS LOADED - SHOW ALL TASKS FROM ALL PROJECTS
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].showTasks('all');

_dom__WEBPACK_IMPORTED_MODULE_0__["default"].responsiveMenu();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].resizeWindow();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].listenClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ053QjtBQUNVO0FBQ0E7QUFDTjs7QUFFNUI7QUFDQSw0REFBbUI7O0FBRW5CO0FBQ0Esc0RBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBaUI7O0FBRWpCO0FBQ0Esc0RBQWE7O0FBRWIsMkRBQWtCO0FBQ2xCLDhEQUFxQjtBQUNyQiw4REFBcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHRvZ2dsZU1lbnVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1tZW51Jyk7XG4gIGNvbnN0IHNpZGViYXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXItbWVudScpO1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluJyk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsJyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXRpdGxlJyk7XG4gIGNvbnN0IG1vZGFsVGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZS1lcnJvcicpO1xuICBjb25zdCBtYWluVGl0bGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtaWNvbicpO1xuICBjb25zdCBtYWluVGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtdGV4dCcpO1xuICBjb25zdCB0YXNrc0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWNvdW50Jyk7XG4gIGNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1saXN0Jyk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uc2l2ZU1lbnUoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDEwMDApIHtcbiAgICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgSVQgT1BBUVVFXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnYWRkLXotaW5kZXgnKTtcblxuICAgICAgLy8gRVhQQU5EIE1BSU4gQ09OVEVOVFxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnY29udHJhY3QtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZXhwYW5kLW1haW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIElUIEEgQklUIFRSQU5TUEFSRU5UXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXotaW5kZXgnKTtcblxuICAgICAgLy8gQ09OVFJBQ1QgTUFJTiBDT05URU5UIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kLW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUtc2lkZWJhcicpKSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUtbWFpbicpO1xuXG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgTUFJTiBDT05URU5UIE9QQVFVRVxuICAgIH0gZWxzZSBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3YXRjaFRhc2tJbmZvKHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgaW5mb1Rhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stdGl0bGUnKTtcbiAgICBjb25zdCBpbmZvVGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcuaW5mby10YXNrLWRlc2NyaXB0aW9uJ1xuICAgICk7XG4gICAgY29uc3QgaW5mb1Rhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1kdWUtZGF0ZScpO1xuICAgIGNvbnN0IGluZm9UYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXByaW9yaXR5Jyk7XG4gICAgY29uc3QgaW5mb1Rhc2tQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1wcm9qZWN0Jyk7XG5cbiAgICAvLyBUQVNLIFRJVExFXG4gICAgaW5mb1Rhc2tUaXRsZS50ZXh0Q29udGVudCA9IGAke3Byb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGV9YDtcblxuICAgIC8vIFRBU0sgREVTQ1JJUFRJT05cbiAgICBpbmZvVGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7cHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kZXNjcmlwdGlvbn1gO1xuXG4gICAgLy8gVEFTSyBEVUUgREFURVxuICAgIGluZm9UYXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke3Byb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGF0ZX1gO1xuXG4gICAgLy8gVEFTSyBQUklPUklUWVxuICAgIGlmIChcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPT09ICdsb3cnXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgY2FuIGRvIGl0IGxhdGVyIG9yIG5ldmVyIGF0IGFsbC4uIPCfmLQnO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID09PSAnbWVkaXVtJ1xuICAgICkge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICdJIHN0YXkgc29tZXdoZXJlIGJldHdlZW4gcmVsYXhhdGlvbiBhbmQgZm9jdXMg8J+YhSc7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPT09ICdoaWdoJ1xuICAgICkge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICdJIG11c3QgZG8gaXQgLSBzb29uZXIgb3IgbGF0ZXIhIPCfmLInO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuXG4gICAgLy8gVEFTSyBQUk9KRUNUXG4gICAgaW5mb1Rhc2tQcm9qZWN0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG4gIH1cblxuICBmdW5jdGlvbiBtYW5pcHVsYXRlTW9kYWwoc3RhdGUsIHRpdGxlLCB0YXNrLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuICAgIGNvbnN0IG1vZGFsTWFpblRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLW1haW4tdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFRhc2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFzay1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IHRhc2tEZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgdGFza0luZm9EaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuaW5mby1kaXYnKTtcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW1vZGFsJyk7XG5cbiAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicsICdoaWRlJyk7XG5cbiAgICBpZiAoc3RhdGUgPT09ICdzaG93Jykge1xuICAgICAgY29uc3QgbW9kYWxJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgICBjb25zdCBtb2RhbFRhc2tzRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRhc2tzLWRpdicpO1xuXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgbW9kYWxUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gdGFzaztcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAgICAgLy8gSUYgTU9EQUwgSVMgRk9SIEFERElORyBBIFRBU0tcbiAgICAgIGlmICh0aXRsZSA9PT0gJ0FkZCBUYXNrJykge1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIC8vIElGIE1PREFMIElTIEZPUiBXQVRDSElORyBUQVNLIElORk9cbiAgICAgIH0gZWxzZSBpZiAodGl0bGUgPT09ICdUYXNrIEluZm8nKSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIHdhdGNoVGFza0luZm8ocHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgfVxuXG4gICAgICAvLyBUTyBDTE9TRSBUSEUgTU9EQUxcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgLy8gREVMRVRJT04gTU9EQUwgQ09OVEVOVFxuICAgIGlmICh0YXNrID09PSAnRGVsZXRlJykge1xuICAgICAgbW9kYWxIZWFkZXIuY2xhc3NMaXN0LmFkZCgnZGVsZXRpb24tbW9kYWwtaGVhZGVyJyk7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjYW5jZWwtZGVsZXRpb24nKTtcbiAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnY29uZmlybS1kZWxldGlvbicpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFTEVUSU9OXG4gICAgICBpZiAodGl0bGUgPT09ICdEZWxldGUgUHJvamVjdCcpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcucHJvamVjdC1kZWxldGlvbi10aXRsZSdcbiAgICAgICAgKTtcblxuICAgICAgICBwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcHJvamVjdERlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPVxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuXG4gICAgICAgIC8vIFRBU0sgREVMRVRJT05cbiAgICAgIH0gZWxzZSBpZiAodGl0bGUgPT09ICdEZWxldGUgVGFzaycpIHtcbiAgICAgICAgY29uc3QgdGFza0RlbGV0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcudGFzay1kZWxldGlvbi10aXRsZSdcbiAgICAgICAgKTtcblxuICAgICAgICB0YXNrRGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgdGFza0RlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPVxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVNb2RhbCh0YXNrLCBpbmRleCkge1xuICAgIGNvbnN0IHsgcHJvamVjdEZvcm1JY29uIH0gPSBkb2N1bWVudC5mb3Jtcy5mb3JtO1xuICAgIGNvbnN0IHByb2plY3REb21JY29uID0gcHJvamVjdEZvcm1JY29uLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgY29uc3QgbW9kYWxUaXRsZVRleHQgPSBtb2RhbFRpdGxlLnZhbHVlO1xuXG4gICAgaWYgKHRhc2sgPT09ICdhZGQnIHx8IHRhc2sgPT09ICdlZGl0Jykge1xuICAgICAgaWYgKG1vZGFsVGl0bGVUZXh0ID09PSAnJykge1xuICAgICAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIEFERCBBIFBST0pFQ1QgVE8gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2FkZCcgJiYgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdERvbUljb24sIG1vZGFsVGl0bGVUZXh0KTtcblxuICAgICAgICAvLyBFRElUIEEgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdlZGl0Jykge1xuICAgICAgICBwcm9qZWN0cy5lZGl0UHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQsIGluZGV4KTtcblxuICAgICAgICAvLyBBREQgQSBUQVNLIFRPIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdhZGQnICYmIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBzZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5U2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stcHJpb3JpdHknKTtcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eTtcblxuICAgICAgICAvLyBDSEVDSyBUQVNLIFBSSU9SSVRZXG4gICAgICAgIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdsb3cnKSB7XG4gICAgICAgICAgdGFza1ByaW9yaXR5ID0gJ2xvdyc7XG4gICAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbWVkaXVtJykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdtZWRpdW0nO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgdGFza1ByaW9yaXR5ID0gJ2hpZ2gnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFza3MuYWRkVGFzayhcbiAgICAgICAgICBzZWxlY3RlZFByb2plY3QsXG4gICAgICAgICAgbW9kYWxUaXRsZVRleHQsXG4gICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLFxuICAgICAgICAgIHRhc2tEdWVEYXRlLFxuICAgICAgICAgIHRhc2tQcmlvcml0eVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBERUxFVEUgQSBQUk9KRUNUIEZST00gQVJSQVlcbiAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdkZWxldGUnKSB7XG4gICAgICBwcm9qZWN0cy5kZWxldGVQcm9qZWN0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvLyBNQUlOIENPTlRFTlRcbiAgZnVuY3Rpb24gc2hvd01haW5UaXRsZShpbmRleCkge1xuICAgIGNvbnN0IGFsbE1lbnVJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmstaWNvbicpO1xuICAgIGNvbnN0IG1lbnVJY29uID0gYWxsTWVudUljb25zW2luZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpO1xuICAgIGNvbnN0IG1lbnVUZXh0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmstdGV4dCcpO1xuXG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgJ2ZhbCcsXG4gICAgICAnZmEtZncnLFxuICAgICAgJ21haW4tdGl0bGUtaWNvbicsXG4gICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICBtZW51SWNvblxuICAgICk7XG4gICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IG1lbnVUZXh0c1tpbmRleF0udGV4dENvbnRlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VNYWluVGl0bGUodGFyZ2V0LCBpbmRleCkge1xuICAgIG1haW5UaXRsZUljb24uY2xhc3NOYW1lID0gJyc7XG5cbiAgICAvLyBUSVRMRSBPRiBUQVNLUyBGUk9NIFRIRSBNRU5VXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JylcbiAgICApIHtcbiAgICAgIHNob3dNYWluVGl0bGUoaW5kZXgpO1xuICAgIH1cblxuICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gUFJPSkVDVFNcbiAgICBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWxpbmsnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtdGV4dCcpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKVxuICAgICkge1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG5cbiAgICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS1mdycsXG4gICAgICAgICdtYWluLXRpdGxlLWljb24nLFxuICAgICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICAgIHByb2plY3RJY29uXG4gICAgICApO1xuICAgICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUFJPSkVDVFNcbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaW5kZXgpIHtcbiAgICBjb25zdCBhbGxQcm9qZWN0SWNvbnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCcuaWNvbicpO1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5pY29uO1xuXG4gICAgLy8gU0hPVyBFRElUQUJMRSBQUk9KRUNUIFRJVExFXG4gICAgbW9kYWxUaXRsZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG5cbiAgICAvLyBTRUxFQ1QgRURJVEFCTEUgUFJPSkVDVCBJQ09OXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0SWNvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChhbGxQcm9qZWN0SWNvbnNbaV0udmFsdWUgPT09IHByb2plY3RJY29uKSB7XG4gICAgICAgIGFsbFByb2plY3RJY29uc1tpXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1jb3VudCcpO1xuICAgIGNvbnN0IHByb2plY3RzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtbGlua3MtZGl2Jyk7XG5cbiAgICAvLyBTSE9XIE5VTUJFUiBPRiBQUk9KRUNUU1xuICAgIHByb2plY3RzQ291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoO1xuICAgIHByb2plY3RzTGlua3MudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBwcm9qZWN0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uQW5kVGV4dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgcHJvamVjdEVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgcHJvamVjdFRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcblxuICAgICAgLy8gUFJPSkVDVCBJQ09OL1RFWFQgQU5EIERFRkFVTFQgSUNPTlMgRElWU1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnc2VsZWN0J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCdcbiAgICAgICk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgTElOS1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnbGluaycsICdwcm9qZWN0LWxpbmsnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBJQ09OXG4gICAgICBwcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLWZ3JyxcbiAgICAgICAgJ3Byb2plY3QtaWNvbicsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmljb25cbiAgICAgICk7XG4gICAgICBwcm9qZWN0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBURVhUXG4gICAgICBwcm9qZWN0VGV4dC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRleHQnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRpdGxlO1xuICAgICAgcHJvamVjdFRleHQuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgREVGQVVMVCBJQ09OU1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZWRpdCcsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ2VkaXQtcHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS10cmFzaC1hbHQnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdkZWxldGUtcHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAnc2NhbGUtZWxlbWVudCdcbiAgICAgICk7XG4gICAgICBwcm9qZWN0VHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBBUFBFTkRTXG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdEVkaXRJY29uKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0VHJhc2hJY29uKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRleHQpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb25BbmRUZXh0RGl2KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uc0Rpdik7XG4gICAgICBwcm9qZWN0c0xpbmtzLmFwcGVuZENoaWxkKHByb2plY3RMaW5rKTtcbiAgICB9XG5cbiAgICBtYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gIH1cblxuICAvLyBUQVNLU1xuICBmdW5jdGlvbiBzaG93VGFza3MobWVudVRpdGxlLCBpbmRleCkge1xuICAgIGxldCB0YXNrc051bWJlciA9IDA7XG4gICAgbGV0IGluZGV4U3RhcnQ7XG4gICAgbGV0IGluZGV4RW5kO1xuXG4gICAgdGFza3NMaXN0LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyAnQUxMJ1xuICAgIGlmIChtZW51VGl0bGUgPT09ICdhbGwnKSB7XG4gICAgICBpbmRleFN0YXJ0ID0gMDtcbiAgICAgIGluZGV4RW5kID0gcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDtcblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ1RPREFZJ1xuICAgIH0gZWxzZSBpZiAobWVudVRpdGxlID09PSAndG9kYXknKSB7XG4gICAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnVGFza3MgZm9yIHRvZGF5Li4nO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyAnV0VFSydcbiAgICB9IGVsc2UgaWYgKG1lbnVUaXRsZSA9PT0gJ3dlZWsnKSB7XG4gICAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnVGFza3Mgb2YgdGhlIHdlZWsuLic7XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdJTVBPUlRBTlQnXG4gICAgfSBlbHNlIGlmIChtZW51VGl0bGUgPT09ICdpbXBvcnRhbnQnKSB7XG4gICAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnSW1wb3J0YW50IHRhc2tzLi4nO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgTElOS1xuICAgIH0gZWxzZSBpZiAoIU51bWJlci5pc05hTihpbmRleCkpIHsgLy8gSWYgbnVtYmVyIG9mIGluZGV4IGV4aXN0cyAtIHByb2plY3Qgd2FzIGNsaWNrZWRcbiAgICAgIGluZGV4U3RhcnQgPSBpbmRleDtcbiAgICAgIGluZGV4RW5kID0gaW5kZXggKyAxO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSBpbmRleFN0YXJ0OyBpIDwgaW5kZXhFbmQ7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3MubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB0YXNrSWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCB0YXNrSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdGFza0VkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrVHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrSW5mb0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cbiAgICAgICAgLy8gU0hPVyBOVU1CRVIgT0YgVEFTS1NcbiAgICAgICAgdGFza3NOdW1iZXIgKz0gMTtcbiAgICAgICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IHRhc2tzTnVtYmVyO1xuXG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kaXYnLCAnaG92ZXItZWxlbWVudCcpO1xuICAgICAgICB0YXNrRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAgIC8vIFRBU0sgUFJJT1JJVFksIFRFWFQgQU5EIElUUyBESVZcbiAgICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcblxuICAgICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ID09PSAnbG93Jykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAgICdmYS1jaXJjbGUnLFxuICAgICAgICAgICAgJ2xvdy1wcmlvcml0eScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgICAnZmEtY2lyY2xlJyxcbiAgICAgICAgICAgICdtaWQtcHJpb3JpdHknLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgPT09ICdoaWdoJykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAgICdmYS1jaXJjbGUnLFxuICAgICAgICAgICAgJ2hpZ2gtcHJpb3JpdHknLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtY2lyY2xlJywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhc2tUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGV4dCcpO1xuICAgICAgICB0YXNrVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS50aXRsZTtcblxuICAgICAgICAvLyBUQVNLIElORk8gRElWXG4gICAgICAgIHRhc2tJbmZvLmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcblxuICAgICAgICAvLyBUQVNLUyBEVUUgREFURVxuICAgICAgICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWUtZGF0ZScsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0uZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0uZGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEFTSyBERUZBVUxUIElDT05TXG4gICAgICAgIHRhc2tFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICdmYS1lZGl0JyxcbiAgICAgICAgICAnZWRpdC10YXNrJyxcbiAgICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza1RyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICdmYS10cmFzaC1hbHQnLFxuICAgICAgICAgICdkZWxldGUtdGFzaycsXG4gICAgICAgICAgJ3NjYWxlLWVsZW1lbnQnLFxuICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICApO1xuICAgICAgICB0YXNrVHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrSW5mb0ljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ3NjYWxlLWVsZW1lbnQnLCAnZmEtaW5mby1jaXJjbGUnKTtcbiAgICAgICAgdGFza0luZm9JY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAgIC8vIEFQUEVORFNcbiAgICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHRhc2tJY29uKTtcbiAgICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcbiAgICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRWRpdEljb24pO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrVHJhc2hJY29uKTtcbiAgICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0luZm9JY29uKTtcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrSWNvbkFuZFRleHREaXYpO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJbmZvKTtcbiAgICAgICAgdGFza3NMaXN0LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdExpbmsodGFyZ2V0LCBpbmRleCkge1xuICAgIGNvbnN0IGFsbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpbmsnKTtcbiAgICBjb25zdCBtZW51VGl0bGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyk7XG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzaycpO1xuXG4gICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7IC8vIEJ5IGRlZmF1bHQgJ0FkZCBUYXNrJyBidXR0b24gaXMgaGlkZGVuXG5cbiAgICBhbGxMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9KTtcblxuICAgIC8vIElGIENMSUNLRUQgRElSRUNUTFkgT04gQSBMSU5LIChCT1RIIC0gTUVOVSBPUiBQUk9KRUNUKVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rJykpIHtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LIElDT04gT1IgVEVYVFxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpXG4gICAgKSB7XG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgfVxuXG4gICAgLy8gSUYgQ0xJQ0tFRCBTT01FV0hFUkUgT04gUFJPSkVDVCBMSU5LXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QnKSkge1xuICAgICAgLy8gU0hPVyBCVVRUT04gVE8gQUREIEEgVEFTSyBGT1IgU0VMRUNURUQgUFJPSkVDVFxuICAgICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBzaG93VGFza3MoJycsIGluZGV4KTtcblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIElDT04gT1IgVEVYVCBPUiBFRElUL0RFTEVURSBJQ09OU1xuICAgICAgaWYgKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIEVMRU1FTlRTIERJVlNcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JylcbiAgICAgICkge1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSUYgQ0xJQ0tFRCBTT01FV0hFUkUgT04gTUVOVSBMSU5LXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JylcbiAgICApIHtcbiAgICAgIGRvbS5zaG93VGFza3MobWVudVRpdGxlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc3BvbnNpdmVNZW51LFxuICAgIHRvZ2dsZU1lbnUsXG4gICAgbWFuaXB1bGF0ZU1vZGFsLFxuICAgIHZhbGlkYXRlTW9kYWwsXG4gICAgc2hvd01haW5UaXRsZSxcbiAgICBjaGFuZ2VNYWluVGl0bGUsXG4gICAgZWRpdFByb2plY3QsXG4gICAgc2hvd1Byb2plY3RzLFxuICAgIHNob3dUYXNrcyxcbiAgICBzZWxlY3RMaW5rLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgbGV0IGluZGV4ID0gMDtcblxuICAvLyBSRVNJWkUgTUVOVSBERVBFTkRJTkcgT04gV0lORE9XIFNJWkVcbiAgZnVuY3Rpb24gcmVzaXplV2luZG93KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkb20ucmVzcG9uc2l2ZU1lbnUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuQ2xpY2tzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG5cbiAgICAgIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7IC8vIEdldCBhbmQgaW5kZXggb2YgY2xpY2tlZCBsaW5rXG5cbiAgICAgIC8vIFRPR0dMRSBTSURFIE1FTlVcbiAgICAgIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLW1lbnUnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpXG4gICAgICApIHtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcblxuICAgICAgICAvLyBTVFlMRSBDTElDS0VEIExJTktcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0JykpIHtcblxuICAgICAgICBkb20uc2VsZWN0TGluayh0YXJnZXQsIGluZGV4KTtcblxuICAgICAgICAvLyBJTiBUSEUgTUFJTiBDT05URU5UIFNIT1cgTUVOVSBUSVRMRSBBQ0NPUkRJTkdMWVxuICAgICAgICBkb20uY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgaW5kZXgpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBQUk9KRUNUIEVESVRJT05cbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdFZGl0IFByb2plY3QnLCAnRWRpdCcpO1xuICAgICAgICAgIGRvbS5lZGl0UHJvamVjdChpbmRleCk7XG5cbiAgICAgICAgICAvLyBNT0RBTCBGT1IgUFJPSkVDVCBERUxFVElPTlxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JykpIHtcbiAgICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0RlbGV0ZSBQcm9qZWN0JywgJ0RlbGV0ZScsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNT0RBTCBGT1IgUFJPSkVDVCBBRERJVElPTlxuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0JykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgUHJvamVjdCcsICdBZGQnKTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgVEFTSyBBRERJVElPTlxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtdGFzaycpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnQWRkIFRhc2snLCAnQWRkJyk7XG5cbiAgICAgICAgLy8gTU9EQUwgRk9SIFRBU0sgREVMRVRJT05cbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXRhc2snKSkge1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdEZWxldGUgVGFzaycsICdEZWxldGUnLCAwLCB0YXNrSW5kZXgpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBXQVRDSElORyBUQVNLIElORk9cbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmEtaW5mby1jaXJjbGUnKSkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoc2VsZWN0ZWRQcm9qZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdUYXNrIEluZm8nLCAnJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuXG4gICAgICAgIC8vIFZBTElEQVRFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tbW9kYWwnKSkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdBZGQnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2FkZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0VkaXQnKSB7XG4gICAgICAgICAgaW5kZXggPSBwYXJzZUludChzZWxlY3RlZFByb2plY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZWRpdCcsIGluZGV4KTtcblxuICAgICAgICAgIC8vIERFTEVUSU9OIE1PREFMXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRGVsZXRlJykge1xuICAgICAgICAgIGNvbnN0IHByb2plY3REZWxldGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10ZXh0Jyk7XG5cbiAgICAgICAgICAvLyBERUxFVEUgQSBQUk9KRUNUXG4gICAgICAgICAgaWYgKCFwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7IC8vIElmIGRlbGV0aW9uIHRleHQgaXMgc2hvd25cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHBhcnNlSW50KHNlbGVjdGVkUHJvamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZGVsZXRlJywgcHJvamVjdEluZGV4KTtcblxuICAgICAgICAgICAgLy8gREVMRVRFIEEgVEFTS1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RlbGV0ZSBhIHRhc2shJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ0xPU0UgTU9EQUxcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNpemVXaW5kb3csXG4gICAgbGlzdGVuQ2xpY2tzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcnM7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgcHJvamVjdHMgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBbXTtcblxuICBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpY29uLCB0aXRsZSkge1xuICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KGljb24sIHRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KGljb24sIHRpdGxlKTtcbiAgICBwcm9qZWN0c0xpc3QucHVzaChwcm9qZWN0KTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpY29uLCB0aXRsZSwgaW5kZXgpIHtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLmljb24gPSBpY29uO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0udGl0bGUgPSB0aXRsZTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHByb2plY3RzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBhZGRQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCB0YXNrcyA9ICgoKSA9PiB7XG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzayhpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkge1xuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzLnB1c2godGFzayk7XG4gICAgY29uc29sZS5sb2coJ0FkZCBhIHRhc2shJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9oYW5kbGVycyc7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbi8vIEFERCBERUZBVUxUIFBST0pFQ1QgKEVYQU1QTEUpXG5wcm9qZWN0cy5hZGRQcm9qZWN0KCdmYS10b29scycsICdDcmFmdCBFeGFtcGxlJyk7XG5cbi8vIEFERCBERUZBVUxUIFRBU0sgKEVYQU1QTEUpXG50YXNrcy5hZGRUYXNrKFxuICAwLFxuICAnRW5qb3kgbXkgdGVhIGFzIG11Y2ggYXMgbXkgY29kaW5nISDwn421JyxcbiAgJ0xvbmdlciBkZXNjcmlwdGlvbiBvZiBteSBkZW1vIHRhc2ssIGp1c3QgdG8gc2hvdyB5b3UgdGhpcyBzdXJwcmlzaW5nbHkgbmljZSBzY3JvbGxiYXIgYW5kIGFtYXppbmdseSBjdXRlIGtpdHR5IOC4hShe4peJ4bSl4peJXinguIUnLFxuICAnMjAxMS0xMS0xMScsXG4gICdsb3cnXG4pO1xuXG4vLyBXSEVOIFBBR0UgSVMgTE9BREVEIC0gU0hPVyBUSVRMRSBGUk9NIE1FTlUgTElOSyAnQUxMJ1xuZG9tLnNob3dNYWluVGl0bGUoMCk7XG5cbi8vIFdIRU4gUEFHRSBJUyBMT0FERUQgLSBTSE9XIEFMTCBUQVNLUyBGUk9NIEFMTCBQUk9KRUNUU1xuZG9tLnNob3dUYXNrcygnYWxsJyk7XG5cbmRvbS5yZXNwb25zaXZlTWVudSgpO1xuaGFuZGxlcnMucmVzaXplV2luZG93KCk7XG5oYW5kbGVycy5saXN0ZW5DbGlja3MoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==