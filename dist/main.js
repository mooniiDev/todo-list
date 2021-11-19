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
    const infoTaskDescription = document.querySelector('.info-task-description');
    const infoTaskDueDate = document.querySelector('.info-task-due-date');
    const infoTaskPriority = document.querySelector('.info-task-priority');
    const infoTaskProject = document.querySelector('.info-task-project');

    // TASK TITLE
    infoTaskTitle.textContent = `${_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].tasks[taskIndex].title}`;

    // TASK DESCRIPTION
    infoTaskDescription.textContent = `${_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].tasks[taskIndex].description}`;

    // TASK DUE DATE
    infoTaskDueDate.textContent = `${_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].tasks[taskIndex].date}`;

    // TASK PRIORITY
    if (_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].tasks[taskIndex].priority === 'low') {
      infoTaskPriority.textContent = 'LOW - It can wait for a month or two.. 😴';
    } else if (_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].tasks[taskIndex].priority === 'medium') {
      infoTaskPriority.textContent = 'MEDIUM - Somewhere between Relax & Focus 😅';
    } else if (_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].tasks[taskIndex].priority === 'high') {
      infoTaskPriority.textContent = 'HIGH - Now or never! 😲';
    } else {
      infoTaskPriority.textContent = '';
    }

    // TASK PROJECT
    infoTaskProject.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].title;
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
        const projectDeletionTitle = document.querySelector('.project-deletion-title');

        projectDeletionText.classList.remove('hide');
        projectDeletionTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].title;

        // TASK DELETION
      } else if (title === 'Delete Task') {
        const taskDeletionTitle = document.querySelector('.task-deletion-title');

        taskDeletionText.classList.remove('hide');
        taskDeletionTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[projectIndex].tasks[taskIndex].title;
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
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.addProject(projectDomIcon, modalTitleText);

        // EDIT A PROJECT FROM ARRAY
      } else if (task === 'edit') {
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.editProject(projectDomIcon, modalTitleText, index);

        // ADD A TASK TO ARRAY
      } else if (task === 'add' && projectIconsDiv.classList.contains('hide')) {
        const selectedLink = document.querySelector('.selected-link');
        const selectedProject = selectedLink.getAttribute('data-index');
        const taskDescription = document.querySelector('.task-description').value;
        const taskDueDate = document.querySelector('#dueDate').value;
        const taskPrioritySelection = document.querySelector('.task-priority');
        let taskPriority = '';

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

        _tasks__WEBPACK_IMPORTED_MODULE_1__.default.addTask(selectedProject, modalTitleText, taskDescription, taskDueDate, taskPriority);
      }

      // DELETE A PROJECT FROM ARRAY
    } else if (task === 'delete') {
      _projects__WEBPACK_IMPORTED_MODULE_0__.default.deleteProject(index);
    }
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
      const projectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].icon;

      mainTitleIcon.classList.add('fal', projectIcon, 'main-title-icon', 'fa-fw', 'padding-right');
      mainTitleText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].title;
    }
  }

  // PROJECTS
  function editProject(index) {
    const projectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].icon;
    const allProjectIcons = modal.querySelectorAll('.icon');

    // SHOW EDITABLE PROJECT TITLE
    modalTitle.value = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].title;

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
    projectsCount.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList.length;
    projectsLinks.textContent = '';

    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList.length; i += 1) {
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
      projectIcon.classList.add('fal', 'project-icon', _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].icon, 'fa-fw', 'project', 'select', 'padding-right');
      projectIcon.setAttribute('data-index', i);

      // PROJECT TEXT
      projectText.classList.add('project-text', 'project', 'select');
      projectText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].title;
      projectText.setAttribute('data-index', i);

      // PROJECT DEFAULT ICONS
      projectEditIcon.classList.add('fal', 'fa-edit', 'project', 'edit-project', 'scale-element', 'padding-right');
      projectEditIcon.setAttribute('data-index', i);
      projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'project', 'delete-project', 'scale-element');
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
  function showTasks(index) {
    const tasksList = document.querySelector('.tasks-list');

    // SHOW NUMBER OF TASKS
    tasksCount.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks.length;
    tasksList.textContent = '';

    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks.length; i += 1) {
      const taskDiv = document.createElement('div');
      const taskIconAndTextDiv = document.createElement('div');
      const taskIcon = document.createElement('i');
      const taskText = document.createElement('p');
      const taskInfo = document.createElement('div');
      const taskDueDate = document.createElement('p');
      const taskEditIcon = document.createElement('i');
      const taskTrashIcon = document.createElement('i');
      const taskInfoIcon = document.createElement('i');

      // TASK DIV
      taskDiv.classList.add('task-div', 'hover-element');
      taskDiv.setAttribute('data-index', i);

      // TASK PRIORITY, TEXT AND ITS DIV
      taskIconAndTextDiv.classList.add('flex');

      if (_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks[i].priority === 'low') {
        taskIcon.classList.add('fal', 'fa-circle', 'low-priority', 'padding-right');
      } else if (_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks[i].priority === 'medium') {
        taskIcon.classList.add('fal', 'fa-circle', 'mid-priority', 'padding-right');
      } else if (_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks[i].priority === 'high') {
        taskIcon.classList.add('fal', 'fa-circle', 'high-priority', 'padding-right');
      } else {
        taskIcon.classList.add('fal', 'fa-circle', 'padding-right');
      }

      taskText.classList.add('task-text');
      taskText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks[i].title;

      // TASK INFO DIV
      taskInfo.classList.add('flex');

      // TASKS DUE DATE
      taskDueDate.classList.add('due-date', 'padding-right');
      if (_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks[i].date !== undefined) {
        taskDueDate.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks[i].date;
      } else {
        taskDueDate.textContent = '';
      }

      // TASK DEFAULT ICONS
      taskEditIcon.classList.add('fal', 'fa-edit', 'edit-task', 'scale-element', 'padding-right');
      taskEditIcon.setAttribute('data-index', i);
      taskTrashIcon.classList.add('fal', 'fa-trash-alt', 'delete-task', 'scale-element', 'padding-right');
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

    manipulateModal('close');
  }

  function selectMenuLink(target, index) {
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
      // SHOW BUTTON TO ADD A TASK TO SELECTED PROJECT
      addTaskButton.classList.remove('hide');

      // SHOW TASKS COUNT DEPENDING ON SELECTED PROJECT
      tasksCount.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].tasks.length;

      // SHOW TASKS DEPENDING ON SELECTED PROJECT
      showTasks(index);

      // IF CLICKED DIRECTLY ON PROJECT LINK
      if (target.classList.contains('project-link')) {
        target.classList.add('selected-link');

        // IF CLICKED ON PROJECT ICON OR TEXT OR EDIT/DELETE ICONS
      } else if (target.classList.contains('project-icon')
              || target.classList.contains('project-text')
              || target.classList.contains('edit-project')
              || target.classList.contains('delete-project')) {
        target.parentElement.parentElement.classList.add('selected-link');

        // IF CLICKED ON PROJECT ELEMENTS DIVS
      } else if (target.classList.contains('project-icon-and-text-div')
              || target.classList.contains('project-default-icons-div')) {
        target.parentElement.classList.add('selected-link');
      }
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
    showTasks,
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
    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;

      // TOGGLE SIDE MENU
      if (target.classList.contains('toggle-menu') || target.classList.contains('burger-line')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.toggleMenu();

        // STYLE MENU LINK
      } else if (target.classList.contains('select')) {
        index = parseInt(target.getAttribute('data-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectMenuLink(target, index);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.changeMainTitle(target, index);

        // MODAL TO ADD A PROJECT
      } else if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Add Project', 'Add');

        // MODAL TO EDIT A PROJECT
      } else if (target.classList.contains('edit-project')) {
        index = parseInt(target.getAttribute('data-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectMenuLink(target, index);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Edit Project', 'Edit');
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.editProject(index);

        // MODAL TO DELETE A PROJECT
      } else if (target.classList.contains('delete-project')) {
        index = parseInt(target.getAttribute('data-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectMenuLink(target, index);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Delete Project', 'Delete', index);

        // MODAL TO ADD A TASK
      } else if (target.classList.contains('add-task')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Add Task', 'Add');

        // MODAL TO DELETE A TASK
      } else if (target.classList.contains('delete-task')) {
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Delete Task', 'Delete', 0, taskIndex);

        // MODAL TO WATCH TASK INFO
      } else if (target.classList.contains('fa-info-circle')) {
        const selectedProject = document.querySelector('.selected-link');
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        const projectIndex = parseInt(selectedProject.getAttribute('data-index'), 10);

        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);

        // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        const selectedProject = document.querySelector('.selected-link');

        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('add');
        } else if (target.textContent === 'Edit') {
          index = parseInt(selectedProject.getAttribute('data-index'), 10);
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('edit', index);

          // DELETION MODAL
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // FOR PROJECT DELETION
          if (!projectDeletionText.classList.contains('hide')) {
            const projectIndex = parseInt(selectedProject.getAttribute('data-index'), 10);
            _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('delete', projectIndex);

            // FOR TASK DELETION
          } else if (projectDeletionText.classList.contains('hide')) {
            console.log('Delete a task!');
          }
        }

        // CLOSE MODAL
      } else if (target.classList.contains('close')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('close');
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
    _dom__WEBPACK_IMPORTED_MODULE_0__.default.showProjects();
  }

  function editProject(icon, title, index) {
    projectsList[index].icon = icon;
    projectsList[index].title = title;
    _dom__WEBPACK_IMPORTED_MODULE_0__.default.showProjects();
  }

  function deleteProject(index) {
    if (index > -1) {
      projectsList.splice(index, 1);
    }
    _dom__WEBPACK_IMPORTED_MODULE_0__.default.showProjects();
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
    _projects__WEBPACK_IMPORTED_MODULE_1__.default.projectsList[index].tasks.push(task);
    _dom__WEBPACK_IMPORTED_MODULE_0__.default.showTasks(index);
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
_projects__WEBPACK_IMPORTED_MODULE_2__.default.addProject('fa-tools', 'Craft Example');

// ADD DEFAULT TASK (EXAMPLE)
_tasks__WEBPACK_IMPORTED_MODULE_3__.default.addTask(0, 'Show Task Demo', 'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ', '2011-11-11', 'low');

// SHOW DEFAULT CONTENT
_dom__WEBPACK_IMPORTED_MODULE_0__.default.showMainTitle(0);

_dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.resizeWindow();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.listenClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ047O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLDJEQUFxQixzQ0FBc0M7O0FBRTlGO0FBQ0EseUNBQXlDLDJEQUFxQiw0Q0FBNEM7O0FBRTFHO0FBQ0EscUNBQXFDLDJEQUFxQixxQ0FBcUM7O0FBRS9GO0FBQ0EsUUFBUSwyREFBcUI7QUFDN0I7QUFD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Ozs7Ozs7Ozs7OztBQ053QjtBQUNVO0FBQ0E7QUFDTjs7QUFFNUI7QUFDQSx5REFBbUI7O0FBRW5CO0FBQ0EsbURBQWE7O0FBRWI7QUFDQSx1REFBaUI7O0FBRWpCLHdEQUFrQjtBQUNsQiwyREFBcUI7QUFDckIsMkRBQXFCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHRvZ2dsZU1lbnVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1tZW51Jyk7XG4gIGNvbnN0IHNpZGViYXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXItbWVudScpO1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluJyk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsJyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXRpdGxlJyk7XG4gIGNvbnN0IG1vZGFsVGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZS1lcnJvcicpO1xuICBjb25zdCBtYWluVGl0bGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtaWNvbicpO1xuICBjb25zdCBtYWluVGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtdGV4dCcpO1xuICBjb25zdCB0YXNrc0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWNvdW50Jyk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uc2l2ZU1lbnUoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDEwMDApIHtcbiAgICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgSVQgT1BBUVVFXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnYWRkLXotaW5kZXgnKTtcblxuICAgICAgLy8gRVhQQU5EIE1BSU4gQ09OVEVOVFxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnY29udHJhY3QtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZXhwYW5kLW1haW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIElUIEEgQklUIFRSQU5TUEFSRU5UXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXotaW5kZXgnKTtcblxuICAgICAgLy8gQ09OVFJBQ1QgTUFJTiBDT05URU5UIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kLW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUtc2lkZWJhcicpKSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUtbWFpbicpO1xuXG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgTUFJTiBDT05URU5UIE9QQVFVRVxuICAgIH0gZWxzZSBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3YXRjaFRhc2tJbmZvKHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgaW5mb1Rhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stdGl0bGUnKTtcbiAgICBjb25zdCBpbmZvVGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1kZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IGluZm9UYXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stZHVlLWRhdGUnKTtcbiAgICBjb25zdCBpbmZvVGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1wcmlvcml0eScpO1xuICAgIGNvbnN0IGluZm9UYXNrUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stcHJvamVjdCcpO1xuXG4gICAgLy8gVEFTSyBUSVRMRVxuICAgIGluZm9UYXNrVGl0bGUudGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnRpdGxlfWA7XG5cbiAgICAvLyBUQVNLIERFU0NSSVBUSU9OXG4gICAgaW5mb1Rhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke3Byb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGVzY3JpcHRpb259YDtcblxuICAgIC8vIFRBU0sgRFVFIERBVEVcbiAgICBpbmZvVGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRhdGV9YDtcblxuICAgIC8vIFRBU0sgUFJJT1JJVFlcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2xvdycpIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnTE9XIC0gSXQgY2FuIHdhaXQgZm9yIGEgbW9udGggb3IgdHdvLi4g8J+YtCc7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID09PSAnbWVkaXVtJykge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICdNRURJVU0gLSBTb21ld2hlcmUgYmV0d2VlbiBSZWxheCAmIEZvY3VzIPCfmIUnO1xuICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2hpZ2gnKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0hJR0ggLSBOb3cgb3IgbmV2ZXIhIPCfmLInO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuXG4gICAgLy8gVEFTSyBQUk9KRUNUXG4gICAgaW5mb1Rhc2tQcm9qZWN0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG4gIH1cblxuICBmdW5jdGlvbiBtYW5pcHVsYXRlTW9kYWwoc3RhdGUsIHRpdGxlLCB0YXNrLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuICAgIGNvbnN0IG1vZGFsTWFpblRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLW1haW4tdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFRhc2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFzay1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IHRhc2tEZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgdGFza0luZm9EaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuaW5mby1kaXYnKTtcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW1vZGFsJyk7XG5cbiAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicsICdoaWRlJyk7XG5cbiAgICBpZiAoc3RhdGUgPT09ICdzaG93Jykge1xuICAgICAgY29uc3QgbW9kYWxJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgICBjb25zdCBtb2RhbFRhc2tzRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRhc2tzLWRpdicpO1xuXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgbW9kYWxUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gdGFzaztcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAgICAgLy8gSUYgTU9EQUwgSVMgRk9SIEFERElORyBBIFRBU0tcbiAgICAgIGlmICh0aXRsZSA9PT0gJ0FkZCBUYXNrJykge1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIC8vIElGIE1PREFMIElTIEZPUiBXQVRDSElORyBUQVNLIElORk9cbiAgICAgIH0gZWxzZSBpZiAodGl0bGUgPT09ICdUYXNrIEluZm8nKSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIHdhdGNoVGFza0luZm8ocHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgfVxuXG4gICAgICAvLyBUTyBDTE9TRSBUSEUgTU9EQUxcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgLy8gREVMRVRJT04gTU9EQUwgQ09OVEVOVFxuICAgIGlmICh0YXNrID09PSAnRGVsZXRlJykge1xuICAgICAgbW9kYWxIZWFkZXIuY2xhc3NMaXN0LmFkZCgnZGVsZXRpb24tbW9kYWwtaGVhZGVyJyk7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjYW5jZWwtZGVsZXRpb24nKTtcbiAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnY29uZmlybS1kZWxldGlvbicpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFTEVUSU9OXG4gICAgICBpZiAodGl0bGUgPT09ICdEZWxldGUgUHJvamVjdCcpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10aXRsZScpO1xuXG4gICAgICAgIHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBwcm9qZWN0RGVsZXRpb25UaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuXG4gICAgICAgIC8vIFRBU0sgREVMRVRJT05cbiAgICAgIH0gZWxzZSBpZiAodGl0bGUgPT09ICdEZWxldGUgVGFzaycpIHtcbiAgICAgICAgY29uc3QgdGFza0RlbGV0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZWxldGlvbi10aXRsZScpO1xuXG4gICAgICAgIHRhc2tEZWxldGlvblRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB0YXNrRGVsZXRpb25UaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVNb2RhbCh0YXNrLCBpbmRleCkge1xuICAgIGNvbnN0IHsgcHJvamVjdEZvcm1JY29uIH0gPSBkb2N1bWVudC5mb3Jtcy5mb3JtO1xuICAgIGNvbnN0IHByb2plY3REb21JY29uID0gcHJvamVjdEZvcm1JY29uLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgY29uc3QgbW9kYWxUaXRsZVRleHQgPSBtb2RhbFRpdGxlLnZhbHVlO1xuXG4gICAgaWYgKHRhc2sgPT09ICdhZGQnIHx8IHRhc2sgPT09ICdlZGl0Jykge1xuICAgICAgaWYgKG1vZGFsVGl0bGVUZXh0ID09PSAnJykge1xuICAgICAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIEFERCBBIFBST0pFQ1QgVE8gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2FkZCcgJiYgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdERvbUljb24sIG1vZGFsVGl0bGVUZXh0KTtcblxuICAgICAgICAvLyBFRElUIEEgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdlZGl0Jykge1xuICAgICAgICBwcm9qZWN0cy5lZGl0UHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQsIGluZGV4KTtcblxuICAgICAgICAvLyBBREQgQSBUQVNLIFRPIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdhZGQnICYmIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBzZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5U2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stcHJpb3JpdHknKTtcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9ICcnO1xuXG4gICAgICAgIC8vIENIRUNLIFRBU0sgUFJJT1JJVFlcbiAgICAgICAgaWYgKHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9PT0gJ2xvdycpIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnbG93JztcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdtZWRpdW0nKSB7XG4gICAgICAgICAgdGFza1ByaW9yaXR5ID0gJ21lZGl1bSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnaGlnaCcpIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnaGlnaCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza1ByaW9yaXR5ID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0YXNrcy5hZGRUYXNrKHNlbGVjdGVkUHJvamVjdCwgbW9kYWxUaXRsZVRleHQsIHRhc2tEZXNjcmlwdGlvbiwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSk7XG4gICAgICB9XG5cbiAgICAgIC8vIERFTEVURSBBIFBST0pFQ1QgRlJPTSBBUlJBWVxuICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgIHByb2plY3RzLmRlbGV0ZVByb2plY3QoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1BSU4gQ09OVEVOVFxuICBmdW5jdGlvbiBzaG93TWFpblRpdGxlKGluZGV4KSB7XG4gICAgY29uc3QgYWxsTWVudUljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtbGluay1pY29uJyk7XG4gICAgY29uc3QgbWVudUljb24gPSBhbGxNZW51SWNvbnNbaW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1pY29uJyk7XG4gICAgY29uc3QgbWVudVRleHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtbGluay10ZXh0Jyk7XG5cbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsIG1lbnVJY29uLCAnbWFpbi10aXRsZS1pY29uJywgJ2ZhLWZ3JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gbWVudVRleHRzW2luZGV4XS50ZXh0Q29udGVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KSB7XG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc05hbWUgPSAnJztcblxuICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gVEhFIE1FTlVcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJylcbiAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKVxuICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpKSB7XG4gICAgICBzaG93TWFpblRpdGxlKGluZGV4KTtcblxuICAgICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBQUk9KRUNUU1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1saW5rJylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbicpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JykpIHtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5pY29uO1xuXG4gICAgICBtYWluVGl0bGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsIHByb2plY3RJY29uLCAnbWFpbi10aXRsZS1pY29uJywgJ2ZhLWZ3JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIG1haW5UaXRsZVRleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBST0pFQ1RTXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGluZGV4KSB7XG4gICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG4gICAgY29uc3QgYWxsUHJvamVjdEljb25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbCgnLmljb24nKTtcblxuICAgIC8vIFNIT1cgRURJVEFCTEUgUFJPSkVDVCBUSVRMRVxuICAgIG1vZGFsVGl0bGUudmFsdWUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuXG4gICAgLy8gU0VMRUNUIEVESVRBQkxFIFBST0pFQ1QgSUNPTlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdEljb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxsUHJvamVjdEljb25zW2ldLnZhbHVlID09PSBwcm9qZWN0SWNvbikge1xuICAgICAgICBhbGxQcm9qZWN0SWNvbnNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY291bnQnKTtcbiAgICBjb25zdCBwcm9qZWN0c0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWxpbmtzLWRpdicpO1xuXG4gICAgLy8gU0hPVyBOVU1CRVIgT0YgUFJPSkVDVFNcbiAgICBwcm9qZWN0c0NvdW50LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDtcbiAgICBwcm9qZWN0c0xpbmtzLnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgcHJvamVjdFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUcmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTi9URVhUIEFORCBERUZBVUxUIElDT05TIERJVlNcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdEljb25zRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIExJTktcbiAgICAgIHByb2plY3RMaW5rLmNsYXNzTGlzdC5hZGQoJ2xpbmsnLCAncHJvamVjdC1saW5rJywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTlxuICAgICAgcHJvamVjdEljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ3Byb2plY3QtaWNvbicsIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS5pY29uLCAnZmEtZncnLCAncHJvamVjdCcsICdzZWxlY3QnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgcHJvamVjdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgVEVYVFxuICAgICAgcHJvamVjdFRleHQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10ZXh0JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0VGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50aXRsZTtcbiAgICAgIHByb2plY3RUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFRkFVTFQgSUNPTlNcbiAgICAgIHByb2plY3RFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtZWRpdCcsICdwcm9qZWN0JywgJ2VkaXQtcHJvamVjdCcsICdzY2FsZS1lbGVtZW50JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLXRyYXNoLWFsdCcsICdwcm9qZWN0JywgJ2RlbGV0ZS1wcm9qZWN0JywgJ3NjYWxlLWVsZW1lbnQnKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIEFQUEVORFNcbiAgICAgIHByb2plY3RJY29uc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0RWRpdEljb24pO1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RUcmFzaEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RJY29uKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZChwcm9qZWN0VGV4dCk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbkFuZFRleHREaXYpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb25zRGl2KTtcbiAgICAgIHByb2plY3RzTGlua3MuYXBwZW5kQ2hpbGQocHJvamVjdExpbmspO1xuICAgIH1cblxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIC8vIFRBU0tTXG4gIGZ1bmN0aW9uIHNob3dUYXNrcyhpbmRleCkge1xuICAgIGNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1saXN0Jyk7XG5cbiAgICAvLyBTSE9XIE5VTUJFUiBPRiBUQVNLU1xuICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzLmxlbmd0aDtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50YXNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgdGFza0ljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCB0YXNrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY29uc3QgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY29uc3QgdGFza0VkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgdGFza1RyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHRhc2tJbmZvSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcblxuICAgICAgLy8gVEFTSyBESVZcbiAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kaXYnLCAnaG92ZXItZWxlbWVudCcpO1xuICAgICAgdGFza0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gVEFTSyBQUklPUklUWSwgVEVYVCBBTkQgSVRTIERJVlxuICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcblxuICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3NbaV0ucHJpb3JpdHkgPT09ICdsb3cnKSB7XG4gICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1jaXJjbGUnLCAnbG93LXByaW9yaXR5JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50YXNrc1tpXS5wcmlvcml0eSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLWNpcmNsZScsICdtaWQtcHJpb3JpdHknLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnaGlnaCcpIHtcbiAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLWNpcmNsZScsICdoaWdoLXByaW9yaXR5JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1jaXJjbGUnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgfVxuXG4gICAgICB0YXNrVGV4dC5jbGFzc0xpc3QuYWRkKCd0YXNrLXRleHQnKTtcbiAgICAgIHRhc2tUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50YXNrc1tpXS50aXRsZTtcblxuICAgICAgLy8gVEFTSyBJTkZPIERJVlxuICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xuXG4gICAgICAvLyBUQVNLUyBEVUUgREFURVxuICAgICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlLWRhdGUnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3NbaV0uZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50YXNrc1tpXS5kYXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgIH1cblxuICAgICAgLy8gVEFTSyBERUZBVUxUIElDT05TXG4gICAgICB0YXNrRWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLWVkaXQnLCAnZWRpdC10YXNrJywgJ3NjYWxlLWVsZW1lbnQnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgdGFza0VkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgdGFza1RyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtdHJhc2gtYWx0JywgJ2RlbGV0ZS10YXNrJywgJ3NjYWxlLWVsZW1lbnQnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgdGFza1RyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHRhc2tJbmZvSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnc2NhbGUtZWxlbWVudCcsICdmYS1pbmZvLWNpcmNsZScpO1xuICAgICAgdGFza0luZm9JY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBBUFBFTkRTXG4gICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza0ljb24pO1xuICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcbiAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tFZGl0SWNvbik7XG4gICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrVHJhc2hJY29uKTtcbiAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tJbmZvSWNvbik7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJY29uQW5kVGV4dERpdik7XG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJbmZvKTtcbiAgICAgIHRhc2tzTGlzdC5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICB9XG5cbiAgICBtYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RNZW51TGluayh0YXJnZXQsIGluZGV4KSB7XG4gICAgY29uc3QgYWxsTWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpbmsnKTtcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrJyk7XG5cbiAgICBhZGRUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTsgLy8gQnkgZGVmYXVsdCAnQWRkIFRhc2snIGJ1dHRvbiBpcyBoaWRkZW5cblxuICAgIGFsbE1lbnVMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9KTtcblxuICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluaycpKSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyBJQ09OIE9SIFRFWFRcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay1pY29uJylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JykpIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBTT01FV0hFUkUgT04gUFJPSkVDVCBMSU5LXG4gICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0JykpIHtcbiAgICAgIC8vIFNIT1cgQlVUVE9OIFRPIEFERCBBIFRBU0sgVE8gU0VMRUNURUQgUFJPSkVDVFxuICAgICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgICAgIC8vIFNIT1cgVEFTS1MgQ09VTlQgREVQRU5ESU5HIE9OIFNFTEVDVEVEIFBST0pFQ1RcbiAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzLmxlbmd0aDtcblxuICAgICAgLy8gU0hPVyBUQVNLUyBERVBFTkRJTkcgT04gU0VMRUNURUQgUFJPSkVDVFxuICAgICAgc2hvd1Rhc2tzKGluZGV4KTtcblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBESVJFQ1RMWSBPTiBQUk9KRUNUIExJTktcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWxpbmsnKSkge1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBJQ09OIE9SIFRFWFQgT1IgRURJVC9ERUxFVEUgSUNPTlNcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJylcbiAgICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JylcbiAgICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JylcbiAgICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgRUxFTUVOVFMgRElWU1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JylcbiAgICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpKSB7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc3BvbnNpdmVNZW51LFxuICAgIHRvZ2dsZU1lbnUsXG4gICAgc2VsZWN0TWVudUxpbmssXG4gICAgZWRpdFByb2plY3QsXG4gICAgbWFuaXB1bGF0ZU1vZGFsLFxuICAgIHZhbGlkYXRlTW9kYWwsXG4gICAgc2hvd1Byb2plY3RzLFxuICAgIHNob3dNYWluVGl0bGUsXG4gICAgY2hhbmdlTWFpblRpdGxlLFxuICAgIHNob3dUYXNrcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBoYW5kbGVycyA9ICgoKSA9PiB7XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgLy8gUkVTSVpFIE1FTlUgREVQRU5ESU5HIE9OIFdJTkRPVyBTSVpFXG4gIGZ1bmN0aW9uIHJlc2l6ZVdpbmRvdygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZG9tLnJlc3BvbnNpdmVNZW51KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbkNsaWNrcygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgICAvLyBUT0dHTEUgU0lERSBNRU5VXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLW1lbnUnKSB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpKSB7XG4gICAgICAgIGRvbS50b2dnbGVNZW51KCk7XG5cbiAgICAgICAgLy8gU1RZTEUgTUVOVSBMSU5LXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdCcpKSB7XG4gICAgICAgIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5zZWxlY3RNZW51TGluayh0YXJnZXQsIGluZGV4KTtcbiAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KTtcblxuICAgICAgICAvLyBNT0RBTCBUTyBBREQgQSBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0JykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgUHJvamVjdCcsICdBZGQnKTtcblxuICAgICAgICAvLyBNT0RBTCBUTyBFRElUIEEgUFJPSkVDVFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSkge1xuICAgICAgICBpbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICBkb20uc2VsZWN0TWVudUxpbmsodGFyZ2V0LCBpbmRleCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRWRpdCBQcm9qZWN0JywgJ0VkaXQnKTtcbiAgICAgICAgZG9tLmVkaXRQcm9qZWN0KGluZGV4KTtcblxuICAgICAgICAvLyBNT0RBTCBUTyBERUxFVEUgQSBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JykpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgZG9tLnNlbGVjdE1lbnVMaW5rKHRhcmdldCwgaW5kZXgpO1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0RlbGV0ZSBQcm9qZWN0JywgJ0RlbGV0ZScsIGluZGV4KTtcblxuICAgICAgICAvLyBNT0RBTCBUTyBBREQgQSBUQVNLXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10YXNrJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgVGFzaycsICdBZGQnKTtcblxuICAgICAgICAvLyBNT0RBTCBUTyBERUxFVEUgQSBUQVNLXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS10YXNrJykpIHtcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFRhc2snLCAnRGVsZXRlJywgMCwgdGFza0luZGV4KTtcblxuICAgICAgICAvLyBNT0RBTCBUTyBXQVRDSCBUQVNLIElORk9cbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmEtaW5mby1jaXJjbGUnKSkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoc2VsZWN0ZWRQcm9qZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdUYXNrIEluZm8nLCAnJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuXG4gICAgICAgIC8vIFZBTElEQVRFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tbW9kYWwnKSkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdBZGQnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2FkZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0VkaXQnKSB7XG4gICAgICAgICAgaW5kZXggPSBwYXJzZUludChzZWxlY3RlZFByb2plY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZWRpdCcsIGluZGV4KTtcblxuICAgICAgICAgIC8vIERFTEVUSU9OIE1PREFMXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRGVsZXRlJykge1xuICAgICAgICAgIGNvbnN0IHByb2plY3REZWxldGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10ZXh0Jyk7XG5cbiAgICAgICAgICAvLyBGT1IgUFJPSkVDVCBERUxFVElPTlxuICAgICAgICAgIGlmICghcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoc2VsZWN0ZWRQcm9qZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZGVsZXRlJywgcHJvamVjdEluZGV4KTtcblxuICAgICAgICAgICAgLy8gRk9SIFRBU0sgREVMRVRJT05cbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZWxldGUgYSB0YXNrIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENMT1NFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzaXplV2luZG93LFxuICAgIGxpc3RlbkNsaWNrcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gW107XG5cbiAgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWNvbiwgdGl0bGUpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJvamVjdChpY29uLCB0aXRsZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChpY29uLCB0aXRsZSk7XG4gICAgcHJvamVjdHNMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaWNvbiwgdGl0bGUsIGluZGV4KSB7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5pY29uID0gaWNvbjtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpbmRleCkge1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBwcm9qZWN0c0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0c0xpc3QsXG4gICAgYWRkUHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBkZWxldGVQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHM7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgdGFza3MgPSAoKCkgPT4ge1xuICBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRhc2soaW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSk7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50YXNrcy5wdXNoKHRhc2spO1xuICAgIGRvbS5zaG93VGFza3MoaW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRUYXNrLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza3M7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuXG4vLyBBREQgREVGQVVMVCBQUk9KRUNUIChFWEFNUExFKVxucHJvamVjdHMuYWRkUHJvamVjdCgnZmEtdG9vbHMnLCAnQ3JhZnQgRXhhbXBsZScpO1xuXG4vLyBBREQgREVGQVVMVCBUQVNLIChFWEFNUExFKVxudGFza3MuYWRkVGFzaygwLCAnU2hvdyBUYXNrIERlbW8nLCAnTG9uZ2VyIGRlc2NyaXB0aW9uIG9mIG15IGRlbW8gdGFzaywganVzdCB0byBzaG93IHlvdSB0aGlzIHN1cnByaXNpbmdseSBuaWNlIHNjcm9sbGJhciBhbmQgYW1hemluZ2x5IGN1dGUga2l0dHkg4LiFKF7il4nhtKXil4leKeC4hScsICcyMDExLTExLTExJywgJ2xvdycpO1xuXG4vLyBTSE9XIERFRkFVTFQgQ09OVEVOVFxuZG9tLnNob3dNYWluVGl0bGUoMCk7XG5cbmRvbS5yZXNwb25zaXZlTWVudSgpO1xuaGFuZGxlcnMucmVzaXplV2luZG93KCk7XG5oYW5kbGVycy5saXN0ZW5DbGlja3MoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=