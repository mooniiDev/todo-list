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
  const deletionModalTitle = modal.querySelector('.modal-title');
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

  function manipulateModal(state, title, task, index) {
    const modalHeader = modal.querySelector('.modal-header');
    const modalMainTitle = modal.querySelector('.modal-main-title');
    const modalTask = modal.querySelector('.modal-task');
    const deletionText = modal.querySelector('.deletion-text');
    const confirmButton = modal.querySelector('.confirm-modal');
    const cancelButton = modal.querySelector('.cancel-modal');

    modalHeader.classList.remove('deletion-modal-header');
    form.reset();
    form.classList.remove('hide');
    modalTitleError.classList.add('hide');
    deletionText.classList.add('hide');
    cancelButton.classList.remove('cancel-deletion');
    confirmButton.classList.remove('confirm-deletion');

    if (state === 'show') {
      const modalIconsDiv = modal.querySelector('.radio-form');
      const modalTasksDiv = modal.querySelector('.modal-tasks-div');

      modal.classList.remove('hide');
      modalMainTitle.textContent = title;
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
      deletionModalTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].title;
      form.classList.add('hide');
      cancelButton.classList.add('cancel-deletion');
      confirmButton.classList.add('confirm-deletion');
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
      taskEditIcon.classList.add('fal', 'fa-edit', 'scale-element', 'padding-right');
      taskTrashIcon.classList.add('fal', 'fa-trash-alt', 'scale-element', 'padding-right');
      taskInfoIcon.classList.add('fal', 'scale-element', 'fa-info-circle');

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

        // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        const selectedProject = document.querySelector('.selected-link');

        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('add');
        } else if (target.textContent === 'Edit') {
          index = parseInt(selectedProject.getAttribute('data-index'), 10);
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('edit', index);
        } else if (target.textContent === 'Delete') {
          index = parseInt(selectedProject.getAttribute('data-index'), 10);
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('delete', index);
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
_tasks__WEBPACK_IMPORTED_MODULE_3__.default.addTask(0, 'Show Task Demo', 'Short description of my task.', '2011-11-11', 'low');

// SHOW DEFAULT CONTENT
_dom__WEBPACK_IMPORTED_MODULE_0__.default.showMainTitle(0);

_dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.resizeWindow();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.listenClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ047O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtB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QUFDQSxJQUFJLDJEQUFxQjtBQUN6QixJQUFJLG1EQUFhO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7O1VDeEJyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ053QjtBQUNVO0FBQ0E7QUFDTjs7QUFFNUI7QUFDQSx5REFBbUI7O0FBRW5CO0FBQ0EsbURBQWE7O0FBRWI7QUFDQSx1REFBaUI7O0FBRWpCLHdEQUFrQjtBQUNsQiwyREFBcUI7QUFDckIsMkRBQXFCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHRvZ2dsZU1lbnVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1tZW51Jyk7XG4gIGNvbnN0IHNpZGViYXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXItbWVudScpO1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluJyk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsJyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXRpdGxlJyk7XG4gIGNvbnN0IG1vZGFsVGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZS1lcnJvcicpO1xuICBjb25zdCBkZWxldGlvbk1vZGFsVGl0bGUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKTtcbiAgY29uc3QgbWFpblRpdGxlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlLWljb24nKTtcbiAgY29uc3QgbWFpblRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlLXRleHQnKTtcbiAgY29uc3QgdGFza3NDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb3VudCcpO1xuXG4gIGZ1bmN0aW9uIHJlc3BvbnNpdmVNZW51KCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMDAwKSB7XG4gICAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2FkZC16LWluZGV4Jyk7XG5cbiAgICAgIC8vIEVYUEFORCBNQUlOIENPTlRFTlRcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZC1tYWluJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBJVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC16LWluZGV4Jyk7XG5cbiAgICAgIC8vIENPTlRSQUNUIE1BSU4gQ09OVEVOVCBBTkQgTUFLRSBJVCBPUEFRVUVcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblxuICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBNQUlOIENPTlRFTlQgQSBCSVQgVFJBTlNQQVJFTlRcbiAgICBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlLXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlLW1haW4nKTtcblxuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBPUEFRVUVcbiAgICB9IGVsc2UgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1zaWRlYmFyJykpIHtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFuaXB1bGF0ZU1vZGFsKHN0YXRlLCB0aXRsZSwgdGFzaywgaW5kZXgpIHtcbiAgICBjb25zdCBtb2RhbEhlYWRlciA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcbiAgICBjb25zdCBtb2RhbE1haW5UaXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1tYWluLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxUYXNrID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRhc2snKTtcbiAgICBjb25zdCBkZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1tb2RhbCcpO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbW9kYWwnKTtcblxuICAgIG1vZGFsSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0aW9uLW1vZGFsLWhlYWRlcicpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIGRlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicpO1xuXG4gICAgaWYgKHN0YXRlID09PSAnc2hvdycpIHtcbiAgICAgIGNvbnN0IG1vZGFsSWNvbnNEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucmFkaW8tZm9ybScpO1xuICAgICAgY29uc3QgbW9kYWxUYXNrc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10YXNrcy1kaXYnKTtcblxuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxNYWluVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgIG1vZGFsVGFzay50ZXh0Q29udGVudCA9IHRhc2s7XG4gICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgbW9kYWxUYXNrc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgICAgIC8vIElGIE1PREFMIElTIEZPUiBBRERJTkcgQSBUQVNLXG4gICAgICBpZiAodGl0bGUgPT09ICdBZGQgVGFzaycpIHtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRhc2sgPT09ICdEZWxldGUnKSB7XG4gICAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QuYWRkKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICAgIGRlbGV0aW9uVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBkZWxldGlvbk1vZGFsVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2FuY2VsLWRlbGV0aW9uJyk7XG4gICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tZGVsZXRpb24nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKHRhc2ssIGluZGV4KSB7XG4gICAgY29uc3QgeyBwcm9qZWN0Rm9ybUljb24gfSA9IGRvY3VtZW50LmZvcm1zLmZvcm07XG4gICAgY29uc3QgcHJvamVjdERvbUljb24gPSBwcm9qZWN0Rm9ybUljb24udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhZGlvLWZvcm0nKTtcbiAgICBjb25zdCBtb2RhbFRpdGxlVGV4dCA9IG1vZGFsVGl0bGUudmFsdWU7XG5cbiAgICBpZiAodGFzayA9PT0gJ2FkZCcgfHwgdGFzayA9PT0gJ2VkaXQnKSB7XG4gICAgICBpZiAobW9kYWxUaXRsZVRleHQgPT09ICcnKSB7XG4gICAgICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gQUREIEEgUFJPSkVDVCBUTyBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnYWRkJyAmJiBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQpO1xuXG4gICAgICAgIC8vIEVESVQgQSBQUk9KRUNUIEZST00gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2VkaXQnKSB7XG4gICAgICAgIHByb2plY3RzLmVkaXRQcm9qZWN0KHByb2plY3REb21JY29uLCBtb2RhbFRpdGxlVGV4dCwgaW5kZXgpO1xuXG4gICAgICAgIC8vIEFERCBBIFRBU0sgVE8gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2FkZCcgJiYgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saW5rJyk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHNlbGVjdGVkTGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlRGF0ZScpLnZhbHVlO1xuICAgICAgICBjb25zdCB0YXNrUHJpb3JpdHlTZWxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1wcmlvcml0eScpO1xuICAgICAgICBsZXQgdGFza1ByaW9yaXR5ID0gJyc7XG5cbiAgICAgICAgLy8gQ0hFQ0sgVEFTSyBQUklPUklUWVxuICAgICAgICBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbG93Jykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdsb3cnO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnbWVkaXVtJztcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdoaWdoJykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdoaWdoJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRhc2tzLmFkZFRhc2soc2VsZWN0ZWRQcm9qZWN0LCBtb2RhbFRpdGxlVGV4dCwgdGFza0Rlc2NyaXB0aW9uLCB0YXNrRHVlRGF0ZSwgdGFza1ByaW9yaXR5KTtcbiAgICAgIH1cblxuICAgICAgLy8gREVMRVRFIEEgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgfSBlbHNlIGlmICh0YXNrID09PSAnZGVsZXRlJykge1xuICAgICAgcHJvamVjdHMuZGVsZXRlUHJvamVjdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLy8gTUFJTiBDT05URU5UXG4gIGZ1bmN0aW9uIHNob3dNYWluVGl0bGUoaW5kZXgpIHtcbiAgICBjb25zdCBhbGxNZW51SWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1saW5rLWljb24nKTtcbiAgICBjb25zdCBtZW51SWNvbiA9IGFsbE1lbnVJY29uc1tpbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLWljb24nKTtcbiAgICBjb25zdCBtZW51VGV4dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1saW5rLXRleHQnKTtcblxuICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgbWVudUljb24sICdtYWluLXRpdGxlLWljb24nLCAnZmEtZncnLCAncGFkZGluZy1yaWdodCcpO1xuICAgIG1haW5UaXRsZVRleHQudGV4dENvbnRlbnQgPSBtZW51VGV4dHNbaW5kZXhdLnRleHRDb250ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgaW5kZXgpIHtcbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBUSEUgTUVOVVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmsnKVxuICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpXG4gICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JykpIHtcbiAgICAgIHNob3dNYWluVGl0bGUoaW5kZXgpO1xuXG4gICAgICAvLyBUSVRMRSBPRiBUQVNLUyBGUk9NIFBST0pFQ1RTXG4gICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWxpbmsnKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtdGV4dCcpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKSkge1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG5cbiAgICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgcHJvamVjdEljb24sICdtYWluLXRpdGxlLWljb24nLCAnZmEtZncnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUFJPSkVDVFNcbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaW5kZXgpIHtcbiAgICBjb25zdCBwcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcbiAgICBjb25zdCBhbGxQcm9qZWN0SWNvbnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCcuaWNvbicpO1xuXG4gICAgLy8gU0hPVyBFRElUQUJMRSBQUk9KRUNUIFRJVExFXG4gICAgbW9kYWxUaXRsZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG5cbiAgICAvLyBTRUxFQ1QgRURJVEFCTEUgUFJPSkVDVCBJQ09OXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0SWNvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChhbGxQcm9qZWN0SWNvbnNbaV0udmFsdWUgPT09IHByb2plY3RJY29uKSB7XG4gICAgICAgIGFsbFByb2plY3RJY29uc1tpXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1jb3VudCcpO1xuICAgIGNvbnN0IHByb2plY3RzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtbGlua3MtZGl2Jyk7XG5cbiAgICAvLyBTSE9XIE5VTUJFUiBPRiBQUk9KRUNUU1xuICAgIHByb2plY3RzQ291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoO1xuICAgIHByb2plY3RzTGlua3MudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBwcm9qZWN0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uQW5kVGV4dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgcHJvamVjdEVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgcHJvamVjdFRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcblxuICAgICAgLy8gUFJPSkVDVCBJQ09OL1RFWFQgQU5EIERFRkFVTFQgSUNPTlMgRElWU1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgTElOS1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnbGluaycsICdwcm9qZWN0LWxpbmsnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBJQ09OXG4gICAgICBwcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAncHJvamVjdC1pY29uJywgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmljb24sICdmYS1mdycsICdwcm9qZWN0JywgJ3NlbGVjdCcsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICBwcm9qZWN0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBURVhUXG4gICAgICBwcm9qZWN0VGV4dC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRleHQnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRpdGxlO1xuICAgICAgcHJvamVjdFRleHQuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgREVGQVVMVCBJQ09OU1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1lZGl0JywgJ3Byb2plY3QnLCAnZWRpdC1wcm9qZWN0JywgJ3NjYWxlLWVsZW1lbnQnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgcHJvamVjdEVkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtdHJhc2gtYWx0JywgJ3Byb2plY3QnLCAnZGVsZXRlLXByb2plY3QnLCAnc2NhbGUtZWxlbWVudCcpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gQVBQRU5EU1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRyYXNoSWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUZXh0KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uQW5kVGV4dERpdik7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbnNEaXYpO1xuICAgICAgcHJvamVjdHNMaW5rcy5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgfVxuXG4gICAgbWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICB9XG5cbiAgLy8gVEFTS1NcbiAgZnVuY3Rpb24gc2hvd1Rhc2tzKGluZGV4KSB7XG4gICAgY29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWxpc3QnKTtcblxuICAgIC8vIFNIT1cgTlVNQkVSIE9GIFRBU0tTXG4gICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3MubGVuZ3RoO1xuICAgIHRhc2tzTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCB0YXNrSWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgdGFza1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCB0YXNrSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCB0YXNrRWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCB0YXNrVHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgdGFza0luZm9JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAvLyBUQVNLIERJVlxuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRpdicsICdob3Zlci1lbGVtZW50Jyk7XG5cbiAgICAgIC8vIFRBU0sgUFJJT1JJVFksIFRFWFQgQU5EIElUUyBESVZcbiAgICAgIHRhc2tJY29uQW5kVGV4dERpdi5jbGFzc0xpc3QuYWRkKCdmbGV4Jyk7XG5cbiAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnbG93Jykge1xuICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtY2lyY2xlJywgJ2xvdy1wcmlvcml0eScsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3NbaV0ucHJpb3JpdHkgPT09ICdtZWRpdW0nKSB7XG4gICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1jaXJjbGUnLCAnbWlkLXByaW9yaXR5JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50YXNrc1tpXS5wcmlvcml0eSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1jaXJjbGUnLCAnaGlnaC1wcmlvcml0eScsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtY2lyY2xlJywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIH1cblxuICAgICAgdGFza1RleHQuY2xhc3NMaXN0LmFkZCgndGFzay10ZXh0Jyk7XG4gICAgICB0YXNrVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3NbaV0udGl0bGU7XG5cbiAgICAgIC8vIFRBU0sgSU5GTyBESVZcbiAgICAgIHRhc2tJbmZvLmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcblxuICAgICAgLy8gVEFTS1MgRFVFIERBVEVcbiAgICAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2R1ZS1kYXRlJywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzW2ldLmRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3NbaV0uZGF0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIC8vIFRBU0sgREVGQVVMVCBJQ09OU1xuICAgICAgdGFza0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1lZGl0JywgJ3NjYWxlLWVsZW1lbnQnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgdGFza1RyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtdHJhc2gtYWx0JywgJ3NjYWxlLWVsZW1lbnQnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgdGFza0luZm9JY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdzY2FsZS1lbGVtZW50JywgJ2ZhLWluZm8tY2lyY2xlJyk7XG5cbiAgICAgIC8vIEFQUEVORFNcbiAgICAgIHRhc2tJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZCh0YXNrSWNvbik7XG4gICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza1RleHQpO1xuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0VkaXRJY29uKTtcbiAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tUcmFzaEljb24pO1xuICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0luZm9JY29uKTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0ljb25BbmRUZXh0RGl2KTtcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0luZm8pO1xuICAgICAgdGFza3NMaXN0LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgIH1cblxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdE1lbnVMaW5rKHRhcmdldCwgaW5kZXgpIHtcbiAgICBjb25zdCBhbGxNZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGluaycpO1xuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2snKTtcblxuICAgIGFkZFRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZScpOyAvLyBCeSBkZWZhdWx0ICdBZGQgVGFzaycgYnV0dG9uIGlzIGhpZGRlblxuXG4gICAgYWxsTWVudUxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH0pO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTktcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJykpIHtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LIElDT04gT1IgVEVYVFxuICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKSkge1xuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIFNPTUVXSEVSRSBPTiBQUk9KRUNUIExJTktcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QnKSkge1xuICAgICAgLy8gU0hPVyBCVVRUT04gVE8gQUREIEEgVEFTSyBUTyBTRUxFQ1RFRCBQUk9KRUNUXG4gICAgICBhZGRUYXNrQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgLy8gU0hPVyBUQVNLUyBDT1VOVCBERVBFTkRJTkcgT04gU0VMRUNURUQgUFJPSkVDVFxuICAgICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3MubGVuZ3RoO1xuXG4gICAgICAvLyBTSE9XIFRBU0tTIERFUEVORElORyBPTiBTRUxFQ1RFRCBQUk9KRUNUXG4gICAgICBzaG93VGFza3MoaW5kZXgpO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIERJUkVDVExZIE9OIFBST0pFQ1QgTElOS1xuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIElDT04gT1IgVEVYVCBPUiBFRElUL0RFTEVURSBJQ09OU1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKVxuICAgICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKVxuICAgICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKVxuICAgICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpKSB7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBFTEVNRU5UUyBESVZTXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKVxuICAgICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JykpIHtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzcG9uc2l2ZU1lbnUsXG4gICAgdG9nZ2xlTWVudSxcbiAgICBzZWxlY3RNZW51TGluayxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBtYW5pcHVsYXRlTW9kYWwsXG4gICAgdmFsaWRhdGVNb2RhbCxcbiAgICBzaG93UHJvamVjdHMsXG4gICAgc2hvd01haW5UaXRsZSxcbiAgICBjaGFuZ2VNYWluVGl0bGUsXG4gICAgc2hvd1Rhc2tzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgbGV0IGluZGV4ID0gMDtcblxuICAvLyBSRVNJWkUgTUVOVSBERVBFTkRJTkcgT04gV0lORE9XIFNJWkVcbiAgZnVuY3Rpb24gcmVzaXplV2luZG93KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkb20ucmVzcG9uc2l2ZU1lbnUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuQ2xpY2tzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG5cbiAgICAgIC8vIFRPR0dMRSBTSURFIE1FTlVcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2dnbGUtbWVudScpIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlci1saW5lJykpIHtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcblxuICAgICAgICAvLyBTVFlMRSBNRU5VIExJTktcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0JykpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgZG9tLnNlbGVjdE1lbnVMaW5rKHRhcmdldCwgaW5kZXgpO1xuICAgICAgICBkb20uY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgaW5kZXgpO1xuXG4gICAgICAgIC8vIE1PREFMIFRPIEFERCBBIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBQcm9qZWN0JywgJ0FkZCcpO1xuXG4gICAgICAgIC8vIE1PREFMIFRPIEVESVQgQSBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5zZWxlY3RNZW51TGluayh0YXJnZXQsIGluZGV4KTtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdFZGl0IFByb2plY3QnLCAnRWRpdCcpO1xuICAgICAgICBkb20uZWRpdFByb2plY3QoaW5kZXgpO1xuXG4gICAgICAgIC8vIE1PREFMIFRPIERFTEVURSBBIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICBpbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICBkb20uc2VsZWN0TWVudUxpbmsodGFyZ2V0LCBpbmRleCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFByb2plY3QnLCAnRGVsZXRlJywgaW5kZXgpO1xuXG4gICAgICAgIC8vIE1PREFMIFRPIEFERCBBIFRBU0tcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2snKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBUYXNrJywgJ0FkZCcpO1xuXG4gICAgICAgIC8vIFZBTElEQVRFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tbW9kYWwnKSkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdBZGQnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2FkZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0VkaXQnKSB7XG4gICAgICAgICAgaW5kZXggPSBwYXJzZUludChzZWxlY3RlZFByb2plY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZWRpdCcsIGluZGV4KTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdEZWxldGUnKSB7XG4gICAgICAgICAgaW5kZXggPSBwYXJzZUludChzZWxlY3RlZFByb2plY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZGVsZXRlJywgaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ0xPU0UgTU9EQUxcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNpemVXaW5kb3csXG4gICAgbGlzdGVuQ2xpY2tzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcnM7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgcHJvamVjdHMgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBbXTtcblxuICBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpY29uLCB0aXRsZSkge1xuICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KGljb24sIHRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KGljb24sIHRpdGxlKTtcbiAgICBwcm9qZWN0c0xpc3QucHVzaChwcm9qZWN0KTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpY29uLCB0aXRsZSwgaW5kZXgpIHtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLmljb24gPSBpY29uO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0udGl0bGUgPSB0aXRsZTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHByb2plY3RzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBhZGRQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCB0YXNrcyA9ICgoKSA9PiB7XG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzayhpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkge1xuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRhc2tzLnB1c2godGFzayk7XG4gICAgZG9tLnNob3dUYXNrcyhpbmRleCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9oYW5kbGVycyc7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbi8vIEFERCBERUZBVUxUIFBST0pFQ1QgKEVYQU1QTEUpXG5wcm9qZWN0cy5hZGRQcm9qZWN0KCdmYS10b29scycsICdDcmFmdCBFeGFtcGxlJyk7XG5cbi8vIEFERCBERUZBVUxUIFRBU0sgKEVYQU1QTEUpXG50YXNrcy5hZGRUYXNrKDAsICdTaG93IFRhc2sgRGVtbycsICdTaG9ydCBkZXNjcmlwdGlvbiBvZiBteSB0YXNrLicsICcyMDExLTExLTExJywgJ2xvdycpO1xuXG4vLyBTSE9XIERFRkFVTFQgQ09OVEVOVFxuZG9tLnNob3dNYWluVGl0bGUoMCk7XG5cbmRvbS5yZXNwb25zaXZlTWVudSgpO1xuaGFuZGxlcnMucmVzaXplV2luZG93KCk7XG5oYW5kbGVycy5saXN0ZW5DbGlja3MoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=