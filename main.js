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
      deletionProjectTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].title;
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
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.addProject(projectIcon.value, projectTitle.value);

      // EDIT PROJECT FROM ARRAY
      } else if (task === 'edit') {
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.editProject(projectIcon.value, projectTitle.value, index);
      }
    // DELETE PROJECT FROM ARRAY
    } else if (task === 'delete') {
      _projects__WEBPACK_IMPORTED_MODULE_0__.default.deleteProject(index);
    }
  }

  // PROJECTS
  function editProject(index) {
    const projectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].icon;
    const allProjectIcons = modal.querySelectorAll('.icon');

    // SHOW EDITABLE PROJECT TITLE
    projectTitle.value = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].title;

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
      projectLink.classList.add('nav-link', 'project-link', 'project', 'select');
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
    const allMenuIcons = document.querySelectorAll('.menu-icon');
    const menuIcon = allMenuIcons[index].getAttribute('data-icon');
    const menuTexts = document.querySelectorAll('.menu-text');

    mainTitleIcon.classList.add('fal', menuIcon, 'main-title-icon', 'fa-fw', 'padding-right');
    mainTitleText.textContent = menuTexts[index].textContent;
  }

  function changeMainTitle(target, index) {
    mainTitleIcon.className = '';
    // TITLE OF TASKS FROM THE MENU
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
      const projectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].icon;

      mainTitleIcon.classList.add('fal', projectIcon, 'main-title-icon', 'fa-fw', 'padding-right');
      mainTitleText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[index].title;
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
        index = target.getAttribute('data-index');
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectMenuLink(target);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.changeMainTitle(target, index);

      // MODAL TO ADD A PROJECT
      } else if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Add Project', 'Add');

      // MODAL TO EDIT A PROJECT
      } else if (target.classList.contains('edit-project')) {
        index = target.getAttribute('data-index');
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectMenuLink(target);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Edit Project', 'Edit');
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.editProject(index);

      // MODAL TO DELETE A PROJECT
      } else if (target.classList.contains('delete-project')) {
        index = target.getAttribute('data-index');
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectMenuLink(target);
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Delete Project', 'Delete', index);

      // MODAL TO ADD A TASK
      } else if (target.classList.contains('add-task')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Add Task', 'Add');

      // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('add');
        } else if (target.textContent === 'Edit') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('edit', index);
        } else if (target.textContent === 'Delete') {
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




// ADD AND SHOW DEFAULT PROJECT (EXAMPLE)
_projects__WEBPACK_IMPORTED_MODULE_2__.default.addProject('fa-tools', 'Craft Example');
_projects__WEBPACK_IMPORTED_MODULE_2__.default.addProject('fa-volleyball-ball', 'Yoyo');
_projects__WEBPACK_IMPORTED_MODULE_2__.default.addProject('fa-gift', 'Surprise!');
_dom__WEBPACK_IMPORTED_MODULE_0__.default.showProjects();

// SHOW DEFAULT CONTENT
_dom__WEBPACK_IMPORTED_MODULE_0__.default.showMainTitle(0);

_dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.resizeWindow();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.listenClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7VUN2Q3hCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDVTtBQUNBOztBQUVsQztBQUNBLHlEQUFtQjtBQUNuQix5REFBbUI7QUFDbkIseURBQW1CO0FBQ25CLHNEQUFnQjs7QUFFaEI7QUFDQSx1REFBaUI7O0FBRWpCLHdEQUFrQjtBQUNsQiwyREFBcUI7QUFDckIsMkRBQXFCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHRvZ2dsZU1lbnVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1tZW51Jyk7XG4gIGNvbnN0IHNpZGViYXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXItbWVudScpO1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluJyk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsJyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby10aXRsZScpO1xuICBjb25zdCBwcm9qZWN0VGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXRpdGxlLWVycm9yJyk7XG4gIGNvbnN0IGRlbGV0aW9uUHJvamVjdFRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnRvZG8tdGl0bGUnKTtcbiAgY29uc3QgbWFpblRpdGxlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlLWljb24nKTtcbiAgY29uc3QgbWFpblRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlLXRleHQnKTtcblxuICBmdW5jdGlvbiByZXNwb25zaXZlTWVudSgpIHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gMTAwMCkge1xuICAgICAgdG9nZ2xlTWVudUljb24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgSVQgT1BBUVVFXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnYWRkLXotaW5kZXgnKTtcbiAgICAgIC8vIEVYUEFORCBNQUlOIENPTlRFTlRcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZC1tYWluJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBJVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC16LWluZGV4Jyk7XG4gICAgICAvLyBDT05UUkFDVCBNQUlOIENPTlRFTlQgQU5EIE1BS0UgSVQgT1BBUVVFXG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmQtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udHJhY3QtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUtbWFpbicpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICAgdG9nZ2xlTWVudUljb24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG5cbiAgICBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlLXNpZGViYXInKSkge1xuICAgICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9IGVsc2UgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1zaWRlYmFyJykpIHtcbiAgICAgIC8vIEhJREUgU0lERUJBUiBBTkQgTUFLRSBNQUlOIENPTlRFTlQgT1BBUVVFXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUtbWFpbicpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdE1lbnVMaW5rKHRhcmdldCkge1xuICAgIGNvbnN0IGFsbE1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXYtbGluaycpO1xuXG4gICAgYWxsTWVudUxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH0pO1xuXG4gICAgLy8gQUREIEJBQ0tHUk9VTkQgQ09MT1IgT04gQ0xJQ0tFRCBOQVZJR0FUSU9OIEJBUiBMSU5LXG4gICAgLy8gSUYgQ0xJQ0tFRCBESVJFQ1RMWSBPTiBNRU5VIE9SIFBST0pFQ1QgTElOS1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtbGluaycpKSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgSUNPTiBPUiBURVhUXG4gICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtbGluay1pY29uJylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1saW5rLXRleHQnKSkge1xuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIElDT04gT1IgVEVYVFxuICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtdGV4dCcpKSB7XG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBFTEVNRU5UUyBESVZTXG4gICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKSkge1xuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hbmlwdWxhdGVNb2RhbChzdGF0ZSwgdGl0bGUsIHRhc2ssIGluZGV4KSB7XG4gICAgY29uc3QgbW9kYWxIZWFkZXIgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG4gICAgY29uc3QgbW9kYWxUaXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZScpO1xuICAgIGNvbnN0IG1vZGFsVGFzayA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10YXNrJyk7XG4gICAgY29uc3QgZGVsZXRpb25UZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmRlbGV0aW9uLXRleHQnKTtcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW1vZGFsJyk7XG5cbiAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgcHJvamVjdFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIGRlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicpO1xuXG4gICAgaWYgKHN0YXRlID09PSAnc2hvdycpIHtcbiAgICAgIGNvbnN0IG1vZGFsSWNvbnNEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucmFkaW8tZm9ybScpO1xuICAgICAgY29uc3QgbW9kYWxUYXNrc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10YXNrcy1kaXYnKTtcblxuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgbW9kYWxUYXNrLnRleHRDb250ZW50ID0gdGFzaztcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAgICAgLy8gSUYgTU9EQUwgSVMgRk9SIEFERElORyBBIFRBU0tcbiAgICAgIGlmICh0aXRsZSA9PT0gJ0FkZCBUYXNrJykge1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdjbG9zZScpIHtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGFzayA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgIG1vZGFsSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2RlbGV0aW9uLW1vZGFsLWhlYWRlcicpO1xuICAgICAgZGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIGRlbGV0aW9uUHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50aXRsZTtcbiAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb25maXJtLWRlbGV0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVNb2RhbCh0YXNrLCBpbmRleCkge1xuICAgIGNvbnN0IHsgcHJvamVjdEljb24gfSA9IGRvY3VtZW50LmZvcm1zLmZvcm07XG5cbiAgICBpZiAodGFzayA9PT0gJ2FkZCcgfHwgdGFzayA9PT0gJ2VkaXQnKSB7XG4gICAgICBpZiAocHJvamVjdFRpdGxlLnZhbHVlID09PSAnJykge1xuICAgICAgICBwcm9qZWN0VGl0bGVFcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHByb2plY3RUaXRsZUVycm9yLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgLy8gQUREIFBST0pFQ1QgVE8gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2FkZCcpIHtcbiAgICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0SWNvbi52YWx1ZSwgcHJvamVjdFRpdGxlLnZhbHVlKTtcblxuICAgICAgLy8gRURJVCBQUk9KRUNUIEZST00gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2VkaXQnKSB7XG4gICAgICAgIHByb2plY3RzLmVkaXRQcm9qZWN0KHByb2plY3RJY29uLnZhbHVlLCBwcm9qZWN0VGl0bGUudmFsdWUsIGluZGV4KTtcbiAgICAgIH1cbiAgICAvLyBERUxFVEUgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgfSBlbHNlIGlmICh0YXNrID09PSAnZGVsZXRlJykge1xuICAgICAgcHJvamVjdHMuZGVsZXRlUHJvamVjdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUFJPSkVDVFNcbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaW5kZXgpIHtcbiAgICBjb25zdCBwcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcbiAgICBjb25zdCBhbGxQcm9qZWN0SWNvbnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCcuaWNvbicpO1xuXG4gICAgLy8gU0hPVyBFRElUQUJMRSBQUk9KRUNUIFRJVExFXG4gICAgcHJvamVjdFRpdGxlLnZhbHVlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50aXRsZTtcblxuICAgIC8vIFNFTEVDVCBFRElUQUJMRSBQUk9KRUNUIElDT05cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb2plY3RJY29ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFsbFByb2plY3RJY29uc1tpXS52YWx1ZSA9PT0gcHJvamVjdEljb24pIHtcbiAgICAgICAgYWxsUHJvamVjdEljb25zW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0c0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvdW50Jyk7XG4gICAgY29uc3QgcHJvamVjdHNMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1saW5rcy1kaXYnKTtcblxuICAgIC8vIFNIT1cgTlVNQkVSIE9GIFBST0pFQ1RTXG4gICAgcHJvamVjdHNDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgcHJvamVjdHNMaW5rcy50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT04vVEVYVCBBTkQgREVGQVVMVCBJQ09OUyBESVZTXG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBMSU5LXG4gICAgICBwcm9qZWN0TGluay5jbGFzc0xpc3QuYWRkKCduYXYtbGluaycsICdwcm9qZWN0LWxpbmsnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBJQ09OXG4gICAgICBwcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAncHJvamVjdC1pY29uJywgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmljb24sICdmYS1mdycsICdwcm9qZWN0JywgJ3NlbGVjdCcsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICBwcm9qZWN0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBURVhUXG4gICAgICBwcm9qZWN0VGV4dC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRleHQnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRpdGxlO1xuICAgICAgcHJvamVjdFRleHQuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgREVGQVVMVCBJQ09OU1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1lZGl0JywgJ3BhZGRpbmctcmlnaHQnLCAnZWRpdC1wcm9qZWN0Jyk7XG4gICAgICBwcm9qZWN0RWRpdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0VHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS10cmFzaC1hbHQnLCAnZGVsZXRlLXByb2plY3QnKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIEFQUEVORFNcbiAgICAgIHByb2plY3RJY29uc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0RWRpdEljb24pO1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RUcmFzaEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RJY29uKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZChwcm9qZWN0VGV4dCk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbkFuZFRleHREaXYpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb25zRGl2KTtcbiAgICAgIHByb2plY3RzTGlua3MuYXBwZW5kQ2hpbGQocHJvamVjdExpbmspO1xuICAgIH1cblxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIC8vIE1BSU4gQ09OVEVOVFxuICBmdW5jdGlvbiBzaG93TWFpblRpdGxlKGluZGV4KSB7XG4gICAgY29uc3QgYWxsTWVudUljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaWNvbicpO1xuICAgIGNvbnN0IG1lbnVJY29uID0gYWxsTWVudUljb25zW2luZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpO1xuICAgIGNvbnN0IG1lbnVUZXh0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LXRleHQnKTtcblxuICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgbWVudUljb24sICdtYWluLXRpdGxlLWljb24nLCAnZmEtZncnLCAncGFkZGluZy1yaWdodCcpO1xuICAgIG1haW5UaXRsZVRleHQudGV4dENvbnRlbnQgPSBtZW51VGV4dHNbaW5kZXhdLnRleHRDb250ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgaW5kZXgpIHtcbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTmFtZSA9ICcnO1xuICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gVEhFIE1FTlVcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJylcbiAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1pY29uJylcbiAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS10ZXh0JykpIHtcbiAgICAgIHNob3dNYWluVGl0bGUoaW5kZXgpO1xuXG4gICAgICAvLyBUSVRMRSBPRiBUQVNLUyBGUk9NIFBST0pFQ1RTXG4gICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWxpbmsnKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtdGV4dCcpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKSkge1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG5cbiAgICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgcHJvamVjdEljb24sICdtYWluLXRpdGxlLWljb24nLCAnZmEtZncnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNwb25zaXZlTWVudSxcbiAgICB0b2dnbGVNZW51LFxuICAgIHNlbGVjdE1lbnVMaW5rLFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIG1hbmlwdWxhdGVNb2RhbCxcbiAgICB2YWxpZGF0ZU1vZGFsLFxuICAgIHNob3dQcm9qZWN0cyxcbiAgICBzaG93TWFpblRpdGxlLFxuICAgIGNoYW5nZU1haW5UaXRsZSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBoYW5kbGVycyA9ICgoKSA9PiB7XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgLy8gUkVTSVpFIE1FTlUgREVQRU5ESU5HIE9OIFdJTkRPVyBTSVpFXG4gIGZ1bmN0aW9uIHJlc2l6ZVdpbmRvdygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZG9tLnJlc3BvbnNpdmVNZW51KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbkNsaWNrcygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgICAvLyBUT0dHTEUgU0lERSBNRU5VXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLW1lbnUnKSB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpKSB7XG4gICAgICAgIGRvbS50b2dnbGVNZW51KCk7XG5cbiAgICAgIC8vIFNUWUxFIE1FTlUgTElOS1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QnKSkge1xuICAgICAgICBpbmRleCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgZG9tLnNlbGVjdE1lbnVMaW5rKHRhcmdldCk7XG4gICAgICAgIGRvbS5jaGFuZ2VNYWluVGl0bGUodGFyZ2V0LCBpbmRleCk7XG5cbiAgICAgIC8vIE1PREFMIFRPIEFERCBBIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBQcm9qZWN0JywgJ0FkZCcpO1xuXG4gICAgICAvLyBNT0RBTCBUTyBFRElUIEEgUFJPSkVDVFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSkge1xuICAgICAgICBpbmRleCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgZG9tLnNlbGVjdE1lbnVMaW5rKHRhcmdldCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRWRpdCBQcm9qZWN0JywgJ0VkaXQnKTtcbiAgICAgICAgZG9tLmVkaXRQcm9qZWN0KGluZGV4KTtcblxuICAgICAgLy8gTU9EQUwgVE8gREVMRVRFIEEgUFJPSkVDVFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpKSB7XG4gICAgICAgIGluZGV4ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBkb20uc2VsZWN0TWVudUxpbmsodGFyZ2V0KTtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdEZWxldGUgUHJvamVjdCcsICdEZWxldGUnLCBpbmRleCk7XG5cbiAgICAgIC8vIE1PREFMIFRPIEFERCBBIFRBU0tcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2snKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBUYXNrJywgJ0FkZCcpO1xuXG4gICAgICAvLyBWQUxJREFURSBNT0RBTFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLW1vZGFsJykpIHtcbiAgICAgICAgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0FkZCcpIHtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnYWRkJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRWRpdCcpIHtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZWRpdCcsIGluZGV4KTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdEZWxldGUnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2RlbGV0ZScsIGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAvLyBDTE9TRSBNT0RBTFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZScpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc2l6ZVdpbmRvdyxcbiAgICBsaXN0ZW5DbGlja3MsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVycztcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IFtdO1xuXG4gIGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKGljb24sIHRpdGxlKSB7XG4gICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFByb2plY3QoaWNvbiwgdGl0bGUpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoaWNvbiwgdGl0bGUpO1xuICAgIHByb2plY3RzTGlzdC5wdXNoKHByb2plY3QpO1xuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGljb24sIHRpdGxlLCBpbmRleCkge1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0uaWNvbiA9IGljb247XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcHJvamVjdHNMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvamVjdHNMaXN0LFxuICAgIGFkZFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBoYW5kbGVycyBmcm9tICcuL2hhbmRsZXJzJztcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcblxuLy8gQUREIEFORCBTSE9XIERFRkFVTFQgUFJPSkVDVCAoRVhBTVBMRSlcbnByb2plY3RzLmFkZFByb2plY3QoJ2ZhLXRvb2xzJywgJ0NyYWZ0IEV4YW1wbGUnKTtcbnByb2plY3RzLmFkZFByb2plY3QoJ2ZhLXZvbGxleWJhbGwtYmFsbCcsICdZb3lvJyk7XG5wcm9qZWN0cy5hZGRQcm9qZWN0KCdmYS1naWZ0JywgJ1N1cnByaXNlIScpO1xuZG9tLnNob3dQcm9qZWN0cygpO1xuXG4vLyBTSE9XIERFRkFVTFQgQ09OVEVOVFxuZG9tLnNob3dNYWluVGl0bGUoMCk7XG5cbmRvbS5yZXNwb25zaXZlTWVudSgpO1xuaGFuZGxlcnMucmVzaXplV2luZG93KCk7XG5oYW5kbGVycy5saXN0ZW5DbGlja3MoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=