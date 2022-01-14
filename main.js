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

        // ADD TASK TO ARRAY
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

      // DELETE PROJECT FROM ARRAY
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
  function showTasks(menuTitle, projectIndexStart, projectIndexEnd) {
    let tasksNumber = 0;
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
_projects__WEBPACK_IMPORTED_MODULE_2__["default"].addProject('fa-tools', 'Craft New Project');

// ADD DEFAULT TASK (EXAMPLE)
_tasks__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(
  0,
  'Enjoy my tea as much as my coding! 🍵',
  'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ',
  '2011-11-11',
  'low'
);
_tasks__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(
  0,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7VUN4QnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDVTtBQUNBO0FBQ047O0FBRTVCO0FBQ0EsNERBQW1COztBQUVuQjtBQUNBLHNEQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBaUI7O0FBRWpCO0FBQ0EscURBQVk7O0FBRVosMkRBQWtCO0FBQ2xCLDhEQUFxQjtBQUNyQiw4REFBcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHRvZ2dsZU1lbnVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1tZW51Jyk7XG4gIGNvbnN0IHNpZGViYXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXItbWVudScpO1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluJyk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsJyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXRpdGxlJyk7XG4gIGNvbnN0IG1vZGFsVGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZS1lcnJvcicpO1xuICBjb25zdCBtYWluVGl0bGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtaWNvbicpO1xuICBjb25zdCBtYWluVGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtdGV4dCcpO1xuICBjb25zdCB0YXNrc0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWNvdW50Jyk7XG4gIGNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1saXN0Jyk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uc2l2ZU1lbnUoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDEwMDApIHtcbiAgICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgSVQgT1BBUVVFXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnYWRkLXotaW5kZXgnKTtcblxuICAgICAgLy8gRVhQQU5EIE1BSU4gQ09OVEVOVFxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnY29udHJhY3QtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZXhwYW5kLW1haW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIElUIEEgQklUIFRSQU5TUEFSRU5UXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXotaW5kZXgnKTtcblxuICAgICAgLy8gQ09OVFJBQ1QgTUFJTiBDT05URU5UIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kLW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUtc2lkZWJhcicpKSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUtbWFpbicpO1xuXG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgTUFJTiBDT05URU5UIE9QQVFVRVxuICAgIH0gZWxzZSBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3YXRjaFRhc2tJbmZvKHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgaW5mb1Rhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stdGl0bGUnKTtcbiAgICBjb25zdCBpbmZvVGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcuaW5mby10YXNrLWRlc2NyaXB0aW9uJ1xuICAgICk7XG4gICAgY29uc3QgaW5mb1Rhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1kdWUtZGF0ZScpO1xuICAgIGNvbnN0IGluZm9UYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXByaW9yaXR5Jyk7XG4gICAgY29uc3QgaW5mb1Rhc2tQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1wcm9qZWN0Jyk7XG5cbiAgICAvLyBUQVNLIFRJVExFXG4gICAgaW5mb1Rhc2tUaXRsZS50ZXh0Q29udGVudCA9IGAke3Byb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGV9YDtcblxuICAgIC8vIFRBU0sgREVTQ1JJUFRJT05cbiAgICBpbmZvVGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7cHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kZXNjcmlwdGlvbn1gO1xuXG4gICAgLy8gVEFTSyBEVUUgREFURVxuICAgIGluZm9UYXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke3Byb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGF0ZX1gO1xuXG4gICAgLy8gVEFTSyBQUklPUklUWVxuICAgIGlmIChcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPT09ICdsb3cnXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgY2FuIGRvIGl0IGxhdGVyIG9yIG5ldmVyIGF0IGFsbC4uIPCfmLQnO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID09PSAnbWVkaXVtJ1xuICAgICkge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICdJIHN0YXkgc29tZXdoZXJlIGJldHdlZW4gcmVsYXhhdGlvbiBhbmQgZm9jdXMg8J+YhSc7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPT09ICdoaWdoJ1xuICAgICkge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICdJIG11c3QgZG8gaXQgLSBzb29uZXIgb3IgbGF0ZXIhIPCfmLInO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuXG4gICAgLy8gVEFTSyBQUk9KRUNUXG4gICAgaW5mb1Rhc2tQcm9qZWN0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG4gIH1cblxuICBmdW5jdGlvbiBtYW5pcHVsYXRlTW9kYWwoc3RhdGUsIHRpdGxlLCB0YXNrLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuICAgIGNvbnN0IG1vZGFsTWFpblRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLW1haW4tdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFRhc2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFzay1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IHRhc2tEZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgdGFza0luZm9EaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuaW5mby1kaXYnKTtcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW1vZGFsJyk7XG5cbiAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicsICdoaWRlJyk7XG5cbiAgICBpZiAoc3RhdGUgPT09ICdzaG93Jykge1xuICAgICAgY29uc3QgbW9kYWxJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgICBjb25zdCBtb2RhbFRhc2tzRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRhc2tzLWRpdicpO1xuXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgbW9kYWxUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gdGFzaztcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAgICAgLy8gSUYgTU9EQUwgSVMgRk9SIEFERElORyBUQVNLXG4gICAgICBpZiAodGl0bGUgPT09ICdBZGQgVGFzaycpIHtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICAvLyBJRiBNT0RBTCBJUyBGT1IgV0FUQ0hJTkcgVEFTSyBJTkZPXG4gICAgICB9IGVsc2UgaWYgKHRpdGxlID09PSAnVGFzayBJbmZvJykge1xuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIHRhc2tJbmZvRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICB3YXRjaFRhc2tJbmZvKHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIH1cblxuICAgICAgLy8gVE8gQ0xPU0UgVEhFIE1PREFMXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cblxuICAgIC8vIERFTEVUSU9OIE1PREFMIENPTlRFTlRcbiAgICBpZiAodGFzayA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgIG1vZGFsSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2RlbGV0aW9uLW1vZGFsLWhlYWRlcicpO1xuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2FuY2VsLWRlbGV0aW9uJyk7XG4gICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tZGVsZXRpb24nKTtcblxuICAgICAgLy8gUFJPSkVDVCBERUxFVElPTlxuICAgICAgaWYgKHRpdGxlID09PSAnRGVsZXRlIFByb2plY3QnKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REZWxldGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnLnByb2plY3QtZGVsZXRpb24tdGl0bGUnXG4gICAgICAgICk7XG5cbiAgICAgICAgcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHByb2plY3REZWxldGlvblRpdGxlLnRleHRDb250ZW50ID1cbiAgICAgICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcblxuICAgICAgICAvLyBUQVNLIERFTEVUSU9OXG4gICAgICB9IGVsc2UgaWYgKHRpdGxlID09PSAnRGVsZXRlIFRhc2snKSB7XG4gICAgICAgIGNvbnN0IHRhc2tEZWxldGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnLnRhc2stZGVsZXRpb24tdGl0bGUnXG4gICAgICAgICk7XG5cbiAgICAgICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHRhc2tEZWxldGlvblRpdGxlLnRleHRDb250ZW50ID1cbiAgICAgICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlTW9kYWwodGFzaywgaW5kZXgpIHtcbiAgICBjb25zdCB7IHByb2plY3RGb3JtSWNvbiB9ID0gZG9jdW1lbnQuZm9ybXMuZm9ybTtcbiAgICBjb25zdCBwcm9qZWN0RG9tSWNvbiA9IHByb2plY3RGb3JtSWNvbi52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0SWNvbnNEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucmFkaW8tZm9ybScpO1xuICAgIGNvbnN0IG1vZGFsVGl0bGVUZXh0ID0gbW9kYWxUaXRsZS52YWx1ZTtcblxuICAgIGlmICh0YXNrID09PSAnYWRkJyB8fCB0YXNrID09PSAnZWRpdCcpIHtcbiAgICAgIGlmIChtb2RhbFRpdGxlVGV4dCA9PT0gJycpIHtcbiAgICAgICAgbW9kYWxUaXRsZUVycm9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgbW9kYWxUaXRsZUVycm9yLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICAvLyBBREQgUFJPSkVDVCBUTyBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnYWRkJyAmJiBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQpO1xuXG4gICAgICAgIC8vIEVESVQgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdlZGl0Jykge1xuICAgICAgICBwcm9qZWN0cy5lZGl0UHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQsIGluZGV4KTtcblxuICAgICAgICAvLyBBREQgVEFTSyBUTyBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnYWRkJyAmJiBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpbmsnKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eVNlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXByaW9yaXR5Jyk7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHk7XG5cbiAgICAgICAgLy8gQ0hFQ0sgVEFTSyBQUklPUklUWVxuICAgICAgICBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbG93Jykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdsb3cnO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnbWVkaXVtJztcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdoaWdoJykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdoaWdoJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRhc2tzLmFkZFRhc2soXG4gICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0LFxuICAgICAgICAgIG1vZGFsVGl0bGVUZXh0LFxuICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbixcbiAgICAgICAgICB0YXNrRHVlRGF0ZSxcbiAgICAgICAgICB0YXNrUHJpb3JpdHlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gREVMRVRFIFBST0pFQ1QgRlJPTSBBUlJBWVxuICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgIHByb2plY3RzLmRlbGV0ZVByb2plY3QoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1BSU4gQ09OVEVOVFxuICBmdW5jdGlvbiBzaG93TWFpblRpdGxlKGluZGV4KSB7XG4gICAgY29uc3QgYWxsTWVudUljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtbGluay1pY29uJyk7XG4gICAgY29uc3QgbWVudUljb24gPSBhbGxNZW51SWNvbnNbaW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1pY29uJyk7XG4gICAgY29uc3QgbWVudVRleHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtbGluay10ZXh0Jyk7XG5cbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAnZmFsJyxcbiAgICAgICdmYS1mdycsXG4gICAgICAnbWFpbi10aXRsZS1pY29uJyxcbiAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgIG1lbnVJY29uXG4gICAgKTtcbiAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gbWVudVRleHRzW2luZGV4XS50ZXh0Q29udGVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KSB7XG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc05hbWUgPSAnJztcblxuICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gVEhFIE1FTlVcbiAgICBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmsnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgc2hvd01haW5UaXRsZShpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBQUk9KRUNUU1xuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpXG4gICAgKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcblxuICAgICAgbWFpblRpdGxlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLWZ3JyxcbiAgICAgICAgJ21haW4tdGl0bGUtaWNvbicsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgICAgcHJvamVjdEljb25cbiAgICAgICk7XG4gICAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50aXRsZTtcbiAgICB9XG4gIH1cblxuICAvLyBQUk9KRUNUU1xuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpbmRleCkge1xuICAgIGNvbnN0IGFsbFByb2plY3RJY29ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJyk7XG4gICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG5cbiAgICAvLyBTSE9XIEVESVRBQkxFIFBST0pFQ1QgVElUTEVcbiAgICBtb2RhbFRpdGxlLnZhbHVlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50aXRsZTtcblxuICAgIC8vIFNFTEVDVCBFRElUQUJMRSBQUk9KRUNUIElDT05cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb2plY3RJY29ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFsbFByb2plY3RJY29uc1tpXS52YWx1ZSA9PT0gcHJvamVjdEljb24pIHtcbiAgICAgICAgYWxsUHJvamVjdEljb25zW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0c0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvdW50Jyk7XG4gICAgY29uc3QgcHJvamVjdHNMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1saW5rcy1kaXYnKTtcblxuICAgIC8vIFNIT1cgTlVNQkVSIE9GIFBST0pFQ1RTXG4gICAgcHJvamVjdHNDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgcHJvamVjdHNMaW5rcy50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT04vVEVYVCBBTkQgREVGQVVMVCBJQ09OUyBESVZTXG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnc2VsZWN0J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBMSU5LXG4gICAgICBwcm9qZWN0TGluay5jbGFzc0xpc3QuYWRkKCdsaW5rJywgJ3Byb2plY3QtbGluaycsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT05cbiAgICAgIHByb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZncnLFxuICAgICAgICAncHJvamVjdC1pY29uJyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0uaWNvblxuICAgICAgKTtcbiAgICAgIHByb2plY3RJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIFRFWFRcbiAgICAgIHByb2plY3RUZXh0LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGV4dCcsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdFRleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGl0bGU7XG4gICAgICBwcm9qZWN0VGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBERUZBVUxUIElDT05TXG4gICAgICBwcm9qZWN0RWRpdEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS1lZGl0JyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnZWRpdC1wcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdzY2FsZS1lbGVtZW50JyxcbiAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICApO1xuICAgICAgcHJvamVjdEVkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLXRyYXNoLWFsdCcsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ2RlbGV0ZS1wcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdzY2FsZS1lbGVtZW50J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIEFQUEVORFNcbiAgICAgIHByb2plY3RJY29uc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0RWRpdEljb24pO1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RUcmFzaEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RJY29uKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZChwcm9qZWN0VGV4dCk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbkFuZFRleHREaXYpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb25zRGl2KTtcbiAgICAgIHByb2plY3RzTGlua3MuYXBwZW5kQ2hpbGQocHJvamVjdExpbmspO1xuICAgIH1cblxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIC8vIFRBU0tTXG4gIGZ1bmN0aW9uIHNob3dUYXNrcyhtZW51VGl0bGUsIHByb2plY3RJbmRleFN0YXJ0LCBwcm9qZWN0SW5kZXhFbmQpIHtcbiAgICBsZXQgdGFza3NOdW1iZXIgPSAwO1xuICAgIHRhc2tzTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgLy8gR0VORVJBVEUgVEFTS1MgTElTVFxuICAgIGZvciAobGV0IGkgPSBwcm9qZWN0SW5kZXhTdGFydDsgaSA8IHByb2plY3RJbmRleEVuZDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrcy5sZW5ndGg7IGogKz0gMSkge1xuXG4gICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdJTVBPUlRBTlQnIC0gRklMVEVSIE5PVCBJTVBPUlRBTlQgVEFTS1NcbiAgICAgICAgaWYgKG1lbnVUaXRsZSA9PT0gJ2ltcG9ydGFudCcgJiYgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ICE9PSAnaGlnaCcpIHtcbiAgICAgICAgICBjb250aW51ZTsgLy8gSWYgdGFzayBpc24ndCBpbXBvcnRhbnQgLSBza2lwIGl0XG5cbiAgICAgICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyAnVE9EQVknXG4gICAgICAgIH0gZWxzZSBpZiAobWVudVRpdGxlID09PSAndG9kYXknKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2tzIGZvciB0b2RheS4uJyk7XG5cblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdXRUVLJ1xuICAgICAgICB9IGVsc2UgaWYgKG1lbnVUaXRsZSA9PT0gJ3dlZWsnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2tzIG9mIHRoZSB3ZWVrLi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0ljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHRhc2tFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY29uc3QgdGFza1RyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY29uc3QgdGFza0luZm9JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAgIC8vIFNIT1cgTlVNQkVSIE9GIFRBU0tTXG4gICAgICAgIHRhc2tzTnVtYmVyICs9IDE7XG4gICAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSB0YXNrc051bWJlcjtcblxuICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGl2JywgJ2hvdmVyLWVsZW1lbnQnKTtcbiAgICAgICAgdGFza0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgICAvLyBUQVNLIFBSSU9SSVRZLCBURVhUIEFORCBJVFMgRElWXG4gICAgICAgIHRhc2tJY29uQW5kVGV4dERpdi5jbGFzc0xpc3QuYWRkKCdmbGV4Jyk7XG5cbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSA9PT0gJ2xvdycpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgICAnZmEtY2lyY2xlJyxcbiAgICAgICAgICAgICdsb3ctcHJpb3JpdHknLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgPT09ICdtZWRpdW0nKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICAgJ2ZhLWNpcmNsZScsXG4gICAgICAgICAgICAnbWlkLXByaW9yaXR5JyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ID09PSAnaGlnaCcpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgICAnZmEtY2lyY2xlJyxcbiAgICAgICAgICAgICdoaWdoLXByaW9yaXR5JyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICAgICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtY2lyY2xlJywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhc2tUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGV4dCcpO1xuICAgICAgICB0YXNrVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS50aXRsZTtcblxuICAgICAgICAvLyBUQVNLIElORk8gRElWXG4gICAgICAgIHRhc2tJbmZvLmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcblxuICAgICAgICAvLyBUQVNLUyBEVUUgREFURVxuICAgICAgICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWUtZGF0ZScsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0uZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0uZGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEFTSyBERUZBVUxUIElDT05TXG4gICAgICAgIHRhc2tFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICdmYS1lZGl0JyxcbiAgICAgICAgICAnZWRpdC10YXNrJyxcbiAgICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza1RyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICdmYS10cmFzaC1hbHQnLFxuICAgICAgICAgICdkZWxldGUtdGFzaycsXG4gICAgICAgICAgJ3NjYWxlLWVsZW1lbnQnLFxuICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICApO1xuICAgICAgICB0YXNrVHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrSW5mb0ljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ3NjYWxlLWVsZW1lbnQnLCAnZmEtaW5mby1jaXJjbGUnKTtcbiAgICAgICAgdGFza0luZm9JY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAgIC8vIEFQUEVORFNcbiAgICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHRhc2tJY29uKTtcbiAgICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcbiAgICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRWRpdEljb24pO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrVHJhc2hJY29uKTtcbiAgICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0luZm9JY29uKTtcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrSWNvbkFuZFRleHREaXYpO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJbmZvKTtcbiAgICAgICAgdGFza3NMaXN0LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRhc2tzKG1lbnVUaXRsZSwgaW5kZXgpIHtcbiAgICBsZXQgcHJvamVjdEluZGV4U3RhcnQ7XG4gICAgbGV0IHByb2plY3RJbmRleEVuZDtcblxuICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBMSU5LXG4gICAgaWYgKG1lbnVUaXRsZSA9PT0gJycgJiYgIU51bWJlci5pc05hTihpbmRleCkpIHsgLy8gSWYgbnVtYmVyIG9mIGluZGV4IGV4aXN0cyAtIHByb2plY3Qgd2FzIGNsaWNrZWRcbiAgICAgIHByb2plY3RJbmRleFN0YXJ0ID0gaW5kZXg7XG4gICAgICBwcm9qZWN0SW5kZXhFbmQgPSBpbmRleCArIDFcblxuICAgICAgLy8gSUYgUFJPSkVDVCBET0VTTidUIEhBVkUgQU5ZIFRBU0tTXG4gICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50YXNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IDA7XG4gICAgICB9XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LXG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3RJbmRleFN0YXJ0ID0gMDtcbiAgICAgIHByb2plY3RJbmRleEVuZCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2hvd1Rhc2tzKG1lbnVUaXRsZSwgcHJvamVjdEluZGV4U3RhcnQsIHByb2plY3RJbmRleEVuZCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RMaW5rKHRhcmdldCwgaW5kZXgpIHtcbiAgICBjb25zdCBhbGxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saW5rJyk7XG4gICAgY29uc3QgbWVudVRpdGxlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpO1xuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2snKTtcblxuICAgIGFkZFRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZScpOyAvLyBCeSBkZWZhdWx0ICdBZGQgVGFzaycgYnV0dG9uIGlzIGhpZGRlblxuXG4gICAgYWxsTGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgbGluay5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgfSk7XG5cbiAgICAvLyBJRiBDTElDS0VEIERJUkVDVExZIE9OIExJTksgKEJPVEggLSBNRU5VIE9SIFBST0pFQ1QpXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmsnKSkge1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgSUNPTiBPUiBURVhUXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JylcbiAgICApIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9XG5cbiAgICAvLyBJRiBDTElDS0VEIFNPTUVXSEVSRSBPTiBQUk9KRUNUIExJTktcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdCcpKSB7XG4gICAgICAvLyBTSE9XIEJVVFRPTiBUTyBBREQgVEFTSyBGT1IgU0VMRUNURUQgUFJPSkVDVFxuICAgICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBnZXRUYXNrcygnJywgaW5kZXgpO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgSUNPTiBPUiBURVhUIE9SIEVESVQvREVMRVRFIElDT05TXG4gICAgICBpZiAoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbicpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtdGV4dCcpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JylcbiAgICAgICkge1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgRUxFTUVOVFMgRElWU1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKVxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJRiBDTElDS0VEIFNPTUVXSEVSRSBPTiBNRU5VIExJTktcbiAgICBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmsnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgZG9tLmdldFRhc2tzKG1lbnVUaXRsZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNwb25zaXZlTWVudSxcbiAgICB0b2dnbGVNZW51LFxuICAgIG1hbmlwdWxhdGVNb2RhbCxcbiAgICB2YWxpZGF0ZU1vZGFsLFxuICAgIHNob3dNYWluVGl0bGUsXG4gICAgY2hhbmdlTWFpblRpdGxlLFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIHNob3dQcm9qZWN0cyxcbiAgICBnZXRUYXNrcyxcbiAgICBzaG93VGFza3MsXG4gICAgc2VsZWN0TGluayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBoYW5kbGVycyA9ICgoKSA9PiB7XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgLy8gUkVTSVpFIE1FTlUgREVQRU5ESU5HIE9OIFdJTkRPVyBTSVpFXG4gIGZ1bmN0aW9uIHJlc2l6ZVdpbmRvdygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZG9tLnJlc3BvbnNpdmVNZW51KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbkNsaWNrcygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgICBpbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApOyAvLyBHZXQgYW5kIGluZGV4IG9mIGNsaWNrZWQgbGlua1xuXG4gICAgICAvLyBUT0dHTEUgU0lERSBNRU5VXG4gICAgICBpZiAoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS1tZW51JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyLWxpbmUnKVxuICAgICAgKSB7XG4gICAgICAgIGRvbS50b2dnbGVNZW51KCk7XG5cbiAgICAgICAgLy8gU1RZTEUgQ0xJQ0tFRCBMSU5LXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdCcpKSB7XG5cbiAgICAgICAgZG9tLnNlbGVjdExpbmsodGFyZ2V0LCBpbmRleCk7XG5cbiAgICAgICAgLy8gSU4gVEhFIE1BSU4gQ09OVEVOVCBTSE9XIE1FTlUgVElUTEUgQUNDT1JESU5HTFlcbiAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgUFJPSkVDVCBFRElUSU9OXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSkge1xuICAgICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRWRpdCBQcm9qZWN0JywgJ0VkaXQnKTtcbiAgICAgICAgICBkb20uZWRpdFByb2plY3QoaW5kZXgpO1xuXG4gICAgICAgICAgLy8gTU9EQUwgRk9SIFBST0pFQ1QgREVMRVRJT05cbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdEZWxldGUgUHJvamVjdCcsICdEZWxldGUnLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTU9EQUwgRk9SIFBST0pFQ1QgQURESVRJT05cbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdCcpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnQWRkIFByb2plY3QnLCAnQWRkJyk7XG5cbiAgICAgICAgLy8gTU9EQUwgRk9SIFRBU0sgQURESVRJT05cbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2snKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBUYXNrJywgJ0FkZCcpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBUQVNLIERFTEVUSU9OXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS10YXNrJykpIHtcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFRhc2snLCAnRGVsZXRlJywgMCwgdGFza0luZGV4KTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgV0FUQ0hJTkcgVEFTSyBJTkZPXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLWluZm8tY2lyY2xlJykpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpbmsnKTtcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHBhcnNlSW50KHNlbGVjdGVkUHJvamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnVGFzayBJbmZvJywgJycsIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcblxuICAgICAgICAvLyBWQUxJREFURSBNT0RBTFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLW1vZGFsJykpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgICBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnQWRkJykge1xuICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdhZGQnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdFZGl0Jykge1xuICAgICAgICAgIGluZGV4ID0gcGFyc2VJbnQoc2VsZWN0ZWRQcm9qZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2VkaXQnLCBpbmRleCk7XG5cbiAgICAgICAgICAvLyBERUxFVElPTiBNT0RBTFxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuXG4gICAgICAgICAgLy8gREVMRVRFIEEgUFJPSkVDVFxuICAgICAgICAgIGlmICghcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkgeyAvLyBJZiBkZWxldGlvbiB0ZXh0IGlzIHNob3duXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwYXJzZUludChzZWxlY3RlZFByb2plY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2RlbGV0ZScsIHByb2plY3RJbmRleCk7XG5cbiAgICAgICAgICAgIC8vIERFTEVURSBBIFRBU0tcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZWxldGUgYSB0YXNrIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENMT1NFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzaXplV2luZG93LFxuICAgIGxpc3RlbkNsaWNrcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gW107XG5cbiAgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWNvbiwgdGl0bGUpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJvamVjdChpY29uLCB0aXRsZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChpY29uLCB0aXRsZSk7XG4gICAgcHJvamVjdHNMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaWNvbiwgdGl0bGUsIGluZGV4KSB7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5pY29uID0gaWNvbjtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpbmRleCkge1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBwcm9qZWN0c0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0c0xpc3QsXG4gICAgYWRkUHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBkZWxldGVQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHM7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgdGFza3MgPSAoKCkgPT4ge1xuICBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRhc2soaW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSk7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50YXNrcy5wdXNoKHRhc2spO1xuICAgIGNvbnNvbGUubG9nKCdBZGQgYSB0YXNrIScpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRUYXNrLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza3M7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuXG4vLyBBREQgREVGQVVMVCBQUk9KRUNUIChFWEFNUExFKVxucHJvamVjdHMuYWRkUHJvamVjdCgnZmEtdG9vbHMnLCAnQ3JhZnQgTmV3IFByb2plY3QnKTtcblxuLy8gQUREIERFRkFVTFQgVEFTSyAoRVhBTVBMRSlcbnRhc2tzLmFkZFRhc2soXG4gIDAsXG4gICdFbmpveSBteSB0ZWEgYXMgbXVjaCBhcyBteSBjb2RpbmchIPCfjbUnLFxuICAnTG9uZ2VyIGRlc2NyaXB0aW9uIG9mIG15IGRlbW8gdGFzaywganVzdCB0byBzaG93IHlvdSB0aGlzIHN1cnByaXNpbmdseSBuaWNlIHNjcm9sbGJhciBhbmQgYW1hemluZ2x5IGN1dGUga2l0dHkg4LiFKF7il4nhtKXil4leKeC4hScsXG4gICcyMDExLTExLTExJyxcbiAgJ2xvdydcbik7XG50YXNrcy5hZGRUYXNrKFxuICAwLFxuICAnQ3JlYXRlIG1hZ2ljIHRocm91Z2ggbXkgbWluZCwgbXkgaGVhcnQgYW5kIG15IGtleWJvYXJkLi4g8J+RqfCfj7vigI3wn5K7JyxcbiAgJ0xvbmdlciBkZXNjcmlwdGlvbiBvZiBteSBkZW1vIHRhc2ssIGp1c3QgdG8gc2hvdyB5b3UgdGhpcyBzdXJwcmlzaW5nbHkgbmljZSBzY3JvbGxiYXIgYW5kIGFtYXppbmdseSBjdXRlIGtpdHR5IOC4hShe4peJ4bSl4peJXinguIUnLFxuICAnMjAxMi0xMi0xMicsXG4gICdoaWdoJ1xuKTtcblxuLy8gV0hFTiBQQUdFIElTIExPQURFRCAtIFNIT1cgVElUTEUgRlJPTSBNRU5VIExJTksgJ0FMTCdcbmRvbS5zaG93TWFpblRpdGxlKDApO1xuXG4vLyBXSEVOIFBBR0UgSVMgTE9BREVEIC0gU0hPVyBBTEwgVEFTS1MgRlJPTSBBTEwgUFJPSkVDVFNcbmRvbS5nZXRUYXNrcygnYWxsJyk7XG5cbmRvbS5yZXNwb25zaXZlTWVudSgpO1xuaGFuZGxlcnMucmVzaXplV2luZG93KCk7XG5oYW5kbGVycy5saXN0ZW5DbGlja3MoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==