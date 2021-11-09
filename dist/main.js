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

// import tasks from './tasks';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFFBQVEsRUFBQzs7Ozs7OztVQ3ZDeEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ053QjtBQUNVO0FBQ0E7O0FBRWxDO0FBQ0EseURBQW1CO0FBQ25CLHlEQUFtQjtBQUNuQix5REFBbUI7QUFDbkIsc0RBQWdCOztBQUVoQjtBQUNBLHVEQUFpQjs7QUFFakIsd0RBQWtCO0FBQ2xCLDJEQUFxQjtBQUNyQiwyREFBcUIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbi8vIGltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgdG9nZ2xlTWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLW1lbnUnKTtcbiAgY29uc3Qgc2lkZWJhck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhci1tZW51Jyk7XG4gIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4nKTtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwnKTtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXRpdGxlJyk7XG4gIGNvbnN0IHByb2plY3RUaXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tdGl0bGUtZXJyb3InKTtcbiAgY29uc3QgZGVsZXRpb25Qcm9qZWN0VGl0bGUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudG9kby10aXRsZScpO1xuICBjb25zdCBtYWluVGl0bGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtaWNvbicpO1xuICBjb25zdCBtYWluVGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtdGV4dCcpO1xuXG4gIGZ1bmN0aW9uIHJlc3BvbnNpdmVNZW51KCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMDAwKSB7XG4gICAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIC8vIEhJREUgU0lERUJBUiBBTkQgTUFLRSBJVCBPUEFRVUVcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdhZGQtei1pbmRleCcpO1xuICAgICAgLy8gRVhQQU5EIE1BSU4gQ09OVEVOVFxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnY29udHJhY3QtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZXhwYW5kLW1haW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIElUIEEgQklUIFRSQU5TUEFSRU5UXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXotaW5kZXgnKTtcbiAgICAgIC8vIENPTlRSQUNUIE1BSU4gQ09OVEVOVCBBTkQgTUFLRSBJVCBPUEFRVUVcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblxuICAgIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUtc2lkZWJhcicpKSB7XG4gICAgICAvLyBTSE9XIFNJREVCQVIgQU5EIE1BS0UgTUFJTiBDT05URU5UIEEgQklUIFRSQU5TUEFSRU5UXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUtbWFpbicpO1xuICAgIH0gZWxzZSBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LXNpZGViYXInKSkge1xuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBPUEFRVUVcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0TWVudUxpbmsodGFyZ2V0KSB7XG4gICAgY29uc3QgYWxsTWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdi1saW5rJyk7XG5cbiAgICBhbGxNZW51TGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgbGluay5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgfSk7XG5cbiAgICAvLyBBREQgQkFDS0dST1VORCBDT0xPUiBPTiBDTElDS0VEIE5BVklHQVRJT04gQkFSIExJTktcbiAgICAvLyBJRiBDTElDS0VEIERJUkVDVExZIE9OIE1FTlUgT1IgUFJPSkVDVCBMSU5LXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1saW5rJykpIHtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyBJQ09OIE9SIFRFWFRcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1saW5rLWljb24nKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmF2LWxpbmstdGV4dCcpKSB7XG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgSUNPTiBPUiBURVhUXG4gICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykpIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIEVMRU1FTlRTIERJVlNcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpKSB7XG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFuaXB1bGF0ZU1vZGFsKHN0YXRlLCB0aXRsZSwgdGFzaywgaW5kZXgpIHtcbiAgICBjb25zdCBtb2RhbEhlYWRlciA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcbiAgICBjb25zdCBtb2RhbFRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxUYXNrID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRhc2snKTtcbiAgICBjb25zdCBkZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1tb2RhbCcpO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbW9kYWwnKTtcblxuICAgIG1vZGFsSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0aW9uLW1vZGFsLWhlYWRlcicpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBwcm9qZWN0VGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgZGVsZXRpb25UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY2FuY2VsLWRlbGV0aW9uJyk7XG4gICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb25maXJtLWRlbGV0aW9uJyk7XG5cbiAgICBpZiAoc3RhdGUgPT09ICdzaG93Jykge1xuICAgICAgY29uc3QgbW9kYWxJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgICBjb25zdCBtb2RhbFRhc2tzRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRhc2tzLWRpdicpO1xuXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbFRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgICBtb2RhbFRhc2sudGV4dENvbnRlbnQgPSB0YXNrO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXG4gICAgICAvLyBJRiBNT0RBTCBJUyBGT1IgQURESU5HIEEgVEFTS1xuICAgICAgaWYgKHRpdGxlID09PSAnQWRkIFRhc2snKSB7XG4gICAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgbW9kYWxUYXNrc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cblxuICAgIGlmICh0YXNrID09PSAnRGVsZXRlJykge1xuICAgICAgbW9kYWxIZWFkZXIuY2xhc3NMaXN0LmFkZCgnZGVsZXRpb24tbW9kYWwtaGVhZGVyJyk7XG4gICAgICBkZWxldGlvblRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgZGVsZXRpb25Qcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2FuY2VsLWRlbGV0aW9uJyk7XG4gICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tZGVsZXRpb24nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKHRhc2ssIGluZGV4KSB7XG4gICAgY29uc3QgeyBwcm9qZWN0SWNvbiB9ID0gZG9jdW1lbnQuZm9ybXMuZm9ybTtcblxuICAgIGlmICh0YXNrID09PSAnYWRkJyB8fCB0YXNrID09PSAnZWRpdCcpIHtcbiAgICAgIGlmIChwcm9qZWN0VGl0bGUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHByb2plY3RUaXRsZUVycm9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcHJvamVjdFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAvLyBBREQgUFJPSkVDVCBUTyBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnYWRkJykge1xuICAgICAgICBwcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3RJY29uLnZhbHVlLCBwcm9qZWN0VGl0bGUudmFsdWUpO1xuXG4gICAgICAvLyBFRElUIFBST0pFQ1QgRlJPTSBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnZWRpdCcpIHtcbiAgICAgICAgcHJvamVjdHMuZWRpdFByb2plY3QocHJvamVjdEljb24udmFsdWUsIHByb2plY3RUaXRsZS52YWx1ZSwgaW5kZXgpO1xuICAgICAgfVxuICAgIC8vIERFTEVURSBQUk9KRUNUIEZST00gQVJSQVlcbiAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdkZWxldGUnKSB7XG4gICAgICBwcm9qZWN0cy5kZWxldGVQcm9qZWN0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvLyBQUk9KRUNUU1xuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpbmRleCkge1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5pY29uO1xuICAgIGNvbnN0IGFsbFByb2plY3RJY29ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJyk7XG5cbiAgICAvLyBTSE9XIEVESVRBQkxFIFBST0pFQ1QgVElUTEVcbiAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuXG4gICAgLy8gU0VMRUNUIEVESVRBQkxFIFBST0pFQ1QgSUNPTlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdEljb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxsUHJvamVjdEljb25zW2ldLnZhbHVlID09PSBwcm9qZWN0SWNvbikge1xuICAgICAgICBhbGxQcm9qZWN0SWNvbnNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY291bnQnKTtcbiAgICBjb25zdCBwcm9qZWN0c0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWxpbmtzLWRpdicpO1xuXG4gICAgLy8gU0hPVyBOVU1CRVIgT0YgUFJPSkVDVFNcbiAgICBwcm9qZWN0c0NvdW50LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDtcbiAgICBwcm9qZWN0c0xpbmtzLnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgcHJvamVjdFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUcmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTi9URVhUIEFORCBERUZBVUxUIElDT05TIERJVlNcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdEljb25zRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIExJTktcbiAgICAgIHByb2plY3RMaW5rLmNsYXNzTGlzdC5hZGQoJ25hdi1saW5rJywgJ3Byb2plY3QtbGluaycsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT05cbiAgICAgIHByb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdwcm9qZWN0LWljb24nLCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0uaWNvbiwgJ2ZhLWZ3JywgJ3Byb2plY3QnLCAnc2VsZWN0JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIHByb2plY3RJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIFRFWFRcbiAgICAgIHByb2plY3RUZXh0LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGV4dCcsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdFRleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGl0bGU7XG4gICAgICBwcm9qZWN0VGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBERUZBVUxUIElDT05TXG4gICAgICBwcm9qZWN0RWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLWVkaXQnLCAncGFkZGluZy1yaWdodCcsICdlZGl0LXByb2plY3QnKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLXRyYXNoLWFsdCcsICdkZWxldGUtcHJvamVjdCcpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gQVBQRU5EU1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRyYXNoSWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUZXh0KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uQW5kVGV4dERpdik7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbnNEaXYpO1xuICAgICAgcHJvamVjdHNMaW5rcy5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgfVxuXG4gICAgbWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICB9XG5cbiAgLy8gTUFJTiBDT05URU5UXG4gIGZ1bmN0aW9uIHNob3dNYWluVGl0bGUoaW5kZXgpIHtcbiAgICBjb25zdCBhbGxNZW51SWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1pY29uJyk7XG4gICAgY29uc3QgbWVudUljb24gPSBhbGxNZW51SWNvbnNbaW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1pY29uJyk7XG4gICAgY29uc3QgbWVudVRleHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtdGV4dCcpO1xuXG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCBtZW51SWNvbiwgJ21haW4tdGl0bGUtaWNvbicsICdmYS1mdycsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IG1lbnVUZXh0c1tpbmRleF0udGV4dENvbnRlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VNYWluVGl0bGUodGFyZ2V0LCBpbmRleCkge1xuICAgIG1haW5UaXRsZUljb24uY2xhc3NOYW1lID0gJyc7XG4gICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBUSEUgTUVOVVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmsnKVxuICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWljb24nKVxuICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LXRleHQnKSkge1xuICAgICAgc2hvd01haW5UaXRsZShpbmRleCk7XG5cbiAgICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gUFJPSkVDVFNcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcblxuICAgICAgbWFpblRpdGxlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCBwcm9qZWN0SWNvbiwgJ21haW4tdGl0bGUtaWNvbicsICdmYS1mdycsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50aXRsZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc3BvbnNpdmVNZW51LFxuICAgIHRvZ2dsZU1lbnUsXG4gICAgc2VsZWN0TWVudUxpbmssXG4gICAgZWRpdFByb2plY3QsXG4gICAgbWFuaXB1bGF0ZU1vZGFsLFxuICAgIHZhbGlkYXRlTW9kYWwsXG4gICAgc2hvd1Byb2plY3RzLFxuICAgIHNob3dNYWluVGl0bGUsXG4gICAgY2hhbmdlTWFpblRpdGxlLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgbGV0IGluZGV4ID0gMDtcblxuICAvLyBSRVNJWkUgTUVOVSBERVBFTkRJTkcgT04gV0lORE9XIFNJWkVcbiAgZnVuY3Rpb24gcmVzaXplV2luZG93KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkb20ucmVzcG9uc2l2ZU1lbnUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuQ2xpY2tzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG5cbiAgICAgIC8vIFRPR0dMRSBTSURFIE1FTlVcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2dnbGUtbWVudScpIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlci1saW5lJykpIHtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcblxuICAgICAgLy8gU1RZTEUgTUVOVSBMSU5LXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdCcpKSB7XG4gICAgICAgIGluZGV4ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBkb20uc2VsZWN0TWVudUxpbmsodGFyZ2V0KTtcbiAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KTtcblxuICAgICAgLy8gTU9EQUwgVE8gQUREIEEgUFJPSkVDVFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdCcpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnQWRkIFByb2plY3QnLCAnQWRkJyk7XG5cbiAgICAgIC8vIE1PREFMIFRPIEVESVQgQSBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgIGluZGV4ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBkb20uc2VsZWN0TWVudUxpbmsodGFyZ2V0KTtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdFZGl0IFByb2plY3QnLCAnRWRpdCcpO1xuICAgICAgICBkb20uZWRpdFByb2plY3QoaW5kZXgpO1xuXG4gICAgICAvLyBNT0RBTCBUTyBERUxFVEUgQSBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JykpIHtcbiAgICAgICAgaW5kZXggPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGRvbS5zZWxlY3RNZW51TGluayh0YXJnZXQpO1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0RlbGV0ZSBQcm9qZWN0JywgJ0RlbGV0ZScsIGluZGV4KTtcblxuICAgICAgLy8gTU9EQUwgVE8gQUREIEEgVEFTS1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtdGFzaycpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnQWRkIFRhc2snLCAnQWRkJyk7XG5cbiAgICAgIC8vIFZBTElEQVRFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tbW9kYWwnKSkge1xuICAgICAgICBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnQWRkJykge1xuICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdhZGQnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdFZGl0Jykge1xuICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdlZGl0JywgaW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZGVsZXRlJywgaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgIC8vIENMT1NFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzaXplV2luZG93LFxuICAgIGxpc3RlbkNsaWNrcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gW107XG5cbiAgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWNvbiwgdGl0bGUpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJvamVjdChpY29uLCB0aXRsZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChpY29uLCB0aXRsZSk7XG4gICAgcHJvamVjdHNMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaWNvbiwgdGl0bGUsIGluZGV4KSB7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5pY29uID0gaWNvbjtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpbmRleCkge1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBwcm9qZWN0c0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0c0xpc3QsXG4gICAgYWRkUHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBkZWxldGVQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG4vLyBBREQgQU5EIFNIT1cgREVGQVVMVCBQUk9KRUNUIChFWEFNUExFKVxucHJvamVjdHMuYWRkUHJvamVjdCgnZmEtdG9vbHMnLCAnQ3JhZnQgRXhhbXBsZScpO1xucHJvamVjdHMuYWRkUHJvamVjdCgnZmEtdm9sbGV5YmFsbC1iYWxsJywgJ1lveW8nKTtcbnByb2plY3RzLmFkZFByb2plY3QoJ2ZhLWdpZnQnLCAnU3VycHJpc2UhJyk7XG5kb20uc2hvd1Byb2plY3RzKCk7XG5cbi8vIFNIT1cgREVGQVVMVCBDT05URU5UXG5kb20uc2hvd01haW5UaXRsZSgwKTtcblxuZG9tLnJlc3BvbnNpdmVNZW51KCk7XG5oYW5kbGVycy5yZXNpemVXaW5kb3coKTtcbmhhbmRsZXJzLmxpc3RlbkNsaWNrcygpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==