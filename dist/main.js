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
  const menuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const modalName = document.querySelector('.modal-name');
  const modalTask = document.querySelector('.modal-task');
  const modalTitle = document.querySelector('#title');
  const modalTitleError = document.querySelector('.title-error');

  function responsiveMenu() {
    if (window.innerWidth <= 1000) {
      menuIcon.classList.remove('active');
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
    menuIcon.classList.toggle('active');
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

  function selectTask(target) {
    const tasksLinks = document.querySelectorAll('.task-link');
    tasksLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });
    if (target.classList.contains('task-icon') || target.classList.contains('task-text')) {
      target.parentElement.classList.add('selected-link');
    } else if (target.classList.contains('task-link')) {
      target.classList.add('selected-link');
    }
  }
  function selectProject(target) {
    const projectsLinks = document.querySelectorAll('.project-link');
    projectsLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });
    if (target.classList.contains('project-icon') || target.classList.contains('project-text')) {
      target.parentElement.classList.add('selected-link');
    } else if (target.classList.contains('project-link')) {
      target.classList.add('selected-link');
    }
  }

  function manipulateModal(state, name, task) {
    const form = document.querySelector('#form');
    form.reset();
    modalTitleError.classList.remove('show');
    modalTitleError.classList.add('hide');
    if (state === 'show') {
      modal.classList.remove('hide');
      modal.classList.add('show');
      modalName.textContent = name;
      modalTask.textContent = task;
    } else if (state === 'close') {
      modal.classList.remove('show');
      modal.classList.add('hide');
    }
  }

  function validateModal(task) {
    const { modalIcon } = document.forms.form;
    if (modalTitle.value === '') {
      modalTitleError.classList.remove('hide');
      modalTitleError.classList.add('show');
    } else if (task === 'add') {
      // ADD PROJECT TO ARRAY AND DOM
      _projects__WEBPACK_IMPORTED_MODULE_0__.default.addProject(modalIcon.value, modalTitle.value);
    } else if (task === 'edit') {
      manipulateModal('close');
    } else if (task === 'delete') {
      manipulateModal('close');
    }
  }

  function showProjects() {
    const projectsLinks = document.querySelector('#projects-links-div');
    projectsLinks.textContent = '';
    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList.length; i += 1) {
      const projectLink = document.createElement('a');
      const projectIcon = document.createElement('i');
      const projectTitle = document.createElement('p');
      const projectIconsDiv = document.createElement('div');
      const projectEditIcon = document.createElement('i');
      const projectTrashIcon = document.createElement('i');
      // PROJECT LINK
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('index', [i]);
      projectLink.classList.add('nav-link', 'project-link');
      // PROJECT SELECTED ICON
      projectIcon.classList.add('fal', 'project-icon', _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].icon, 'fa-fw', 'padding-right');
      projectIconsDiv.classList.add('float-right');
      // PROJECT NAME
      projectTitle.classList.add('project-text');
      projectTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].title;
      projectEditIcon.classList.add('fal', 'fa-edit', 'padding-right', 'edit-project', 'hover-icon');
      projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'delete-project', 'hover-icon');
      // APPENDS
      projectIconsDiv.appendChild(projectEditIcon);
      projectIconsDiv.appendChild(projectTrashIcon);
      projectLink.appendChild(projectIcon);
      projectLink.appendChild(projectTitle);
      projectLink.appendChild(projectIconsDiv);
      projectsLinks.appendChild(projectLink);
    }
    manipulateModal('close');
  }

  return {
    responsiveMenu,
    toggleMenu,
    selectTask,
    selectProject,
    manipulateModal,
    validateModal,
    showProjects,
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
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;
      // SIDE MENU TOGGLE
      if (target.classList.contains('toggle-menu') || target.classList.contains('burger-line')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.toggleMenu();
      // STYLE TASK LINK
      } else if (target.classList.contains('task-link')
                || target.classList.contains('task-icon')
                || target.classList.contains('task-text')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectTask(target);
      // STYLE PROJECT LINK
      } else if (target.classList.contains('project-link')
                || target.classList.contains('project-icon')
                || target.classList.contains('project-text')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectProject(target);
      // MODAL TO ADD PROJECT
      } else if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Add New Project', 'Add');
        // MODAL TO EDIT PROJECT
      } else if (target.classList.contains('edit-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Edit Your Project', 'Edit');
      // MODAL TO DELETE PROJECT
      } else if (target.classList.contains('delete-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Delete Your Project', 'Delete');
      // // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('add');
        } else if (target.textContent === 'Edit') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('edit');
        } else if (target.textContent === 'Delete') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('delete');
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
    console.log(projectsList);
  }

  return {
    projectsList,
    addProject,
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



_dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.resizeWindow();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.listenClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsTUFBTSx5REFBbUI7QUFDekIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSyxrRUFBNEIsQ0FBQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELDJEQUFxQjtBQUM1RTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsMkRBQXFCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLEdBQUcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzNJSzs7QUFFeEI7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHdEQUFrQjtBQUN4RDs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQSxRQUFRLG9EQUFjO0FBQ3RCO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxRQUFRLG9EQUFjO0FBQ3RCO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxRQUFRLHVEQUFpQjtBQUN6QjtBQUNBLE9BQU87QUFDUCxRQUFRLHlEQUFtQjtBQUMzQjtBQUNBLE9BQU87QUFDUCxRQUFRLHlEQUFtQjtBQUMzQjtBQUNBLE9BQU87QUFDUCxRQUFRLHlEQUFtQjtBQUMzQjtBQUNBLE9BQU87QUFDUDtBQUNBLFVBQVUsdURBQWlCO0FBQzNCLFNBQVM7QUFDVCxVQUFVLHVEQUFpQjtBQUMzQixTQUFTO0FBQ1QsVUFBVSx1REFBaUI7QUFDM0I7QUFDQTtBQUNBLE9BQU87QUFDUCxRQUFRLHlEQUFtQjtBQUMzQjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkRBOztBQUV4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFnQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7VUN6QnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ053QjtBQUNVOztBQUVsQyx3REFBa0I7QUFDbEIsMkRBQXFCO0FBQ3JCLDJEQUFxQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBtZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtbWVudScpO1xuICBjb25zdCBzaWRlYmFyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLW1lbnUnKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbicpO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbCcpO1xuICBjb25zdCBtb2RhbE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtbmFtZScpO1xuICBjb25zdCBtb2RhbFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFzaycpO1xuICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG4gIGNvbnN0IG1vZGFsVGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1lcnJvcicpO1xuXG4gIGZ1bmN0aW9uIHJlc3BvbnNpdmVNZW51KCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMDAwKSB7XG4gICAgICBtZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdleHBhbmQtbWFpbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kLW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rhcmtlci1iYWNrcm91bmQnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAgIG1lbnVJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUtc2lkZWJhcicpKSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZGFya2VyLWJhY2tyb3VuZCcpO1xuICAgIH0gZWxzZSBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rhcmtlci1iYWNrcm91bmQnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RUYXNrKHRhcmdldCkge1xuICAgIGNvbnN0IHRhc2tzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1saW5rJyk7XG4gICAgdGFza3NMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9KTtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFzay1pY29uJykgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFzay10ZXh0JykpIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stbGluaycpKSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBzZWxlY3RQcm9qZWN0KHRhcmdldCkge1xuICAgIGNvbnN0IHByb2plY3RzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1saW5rJyk7XG4gICAgcHJvamVjdHNMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9KTtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJykgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykpIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpKSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hbmlwdWxhdGVNb2RhbChzdGF0ZSwgbmFtZSwgdGFzaykge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgaWYgKHN0YXRlID09PSAnc2hvdycpIHtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgIG1vZGFsTmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgICBtb2RhbFRhc2sudGV4dENvbnRlbnQgPSB0YXNrO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdjbG9zZScpIHtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKHRhc2spIHtcbiAgICBjb25zdCB7IG1vZGFsSWNvbiB9ID0gZG9jdW1lbnQuZm9ybXMuZm9ybTtcbiAgICBpZiAobW9kYWxUaXRsZS52YWx1ZSA9PT0gJycpIHtcbiAgICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2FkZCcpIHtcbiAgICAgIC8vIEFERCBQUk9KRUNUIFRPIEFSUkFZIEFORCBET01cbiAgICAgIHByb2plY3RzLmFkZFByb2plY3QobW9kYWxJY29uLnZhbHVlLCBtb2RhbFRpdGxlLnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdlZGl0Jykge1xuICAgICAgbWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1saW5rcy1kaXYnKTtcbiAgICBwcm9qZWN0c0xpbmtzLnRleHRDb250ZW50ID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUcmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAvLyBQUk9KRUNUIExJTktcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2luZGV4JywgW2ldKTtcbiAgICAgIHByb2plY3RMaW5rLmNsYXNzTGlzdC5hZGQoJ25hdi1saW5rJywgJ3Byb2plY3QtbGluaycpO1xuICAgICAgLy8gUFJPSkVDVCBTRUxFQ1RFRCBJQ09OXG4gICAgICBwcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAncHJvamVjdC1pY29uJywgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmljb24sICdmYS1mdycsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnZmxvYXQtcmlnaHQnKTtcbiAgICAgIC8vIFBST0pFQ1QgTkFNRVxuICAgICAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGV4dCcpO1xuICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRpdGxlO1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1lZGl0JywgJ3BhZGRpbmctcmlnaHQnLCAnZWRpdC1wcm9qZWN0JywgJ2hvdmVyLWljb24nKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLXRyYXNoLWFsdCcsICdkZWxldGUtcHJvamVjdCcsICdob3Zlci1pY29uJyk7XG4gICAgICAvLyBBUFBFTkRTXG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdEVkaXRJY29uKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0VHJhc2hJY29uKTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uKTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbnNEaXYpO1xuICAgICAgcHJvamVjdHNMaW5rcy5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgfVxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzcG9uc2l2ZU1lbnUsXG4gICAgdG9nZ2xlTWVudSxcbiAgICBzZWxlY3RUYXNrLFxuICAgIHNlbGVjdFByb2plY3QsXG4gICAgbWFuaXB1bGF0ZU1vZGFsLFxuICAgIHZhbGlkYXRlTW9kYWwsXG4gICAgc2hvd1Byb2plY3RzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgLy8gUkVTSVpFIE1FTlUgREVQRU5ESU5HIE9OIFdJTkRPVyBTSVpFXG4gIGZ1bmN0aW9uIHJlc2l6ZVdpbmRvdygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZG9tLnJlc3BvbnNpdmVNZW51KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbkNsaWNrcygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuICAgICAgLy8gU0lERSBNRU5VIFRPR0dMRVxuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS1tZW51JykgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyLWxpbmUnKSkge1xuICAgICAgICBkb20udG9nZ2xlTWVudSgpO1xuICAgICAgLy8gU1RZTEUgVEFTSyBMSU5LXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stbGluaycpXG4gICAgICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFzay1pY29uJylcbiAgICAgICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLXRleHQnKSkge1xuICAgICAgICBkb20uc2VsZWN0VGFzayh0YXJnZXQpO1xuICAgICAgLy8gU1RZTEUgUFJPSkVDVCBMSU5LXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpXG4gICAgICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJylcbiAgICAgICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKSkge1xuICAgICAgICBkb20uc2VsZWN0UHJvamVjdCh0YXJnZXQpO1xuICAgICAgLy8gTU9EQUwgVE8gQUREIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBOZXcgUHJvamVjdCcsICdBZGQnKTtcbiAgICAgICAgLy8gTU9EQUwgVE8gRURJVCBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRWRpdCBZb3VyIFByb2plY3QnLCAnRWRpdCcpO1xuICAgICAgLy8gTU9EQUwgVE8gREVMRVRFIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0RlbGV0ZSBZb3VyIFByb2plY3QnLCAnRGVsZXRlJyk7XG4gICAgICAvLyAvLyBWQUxJREFURSBNT0RBTFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLW1vZGFsJykpIHtcbiAgICAgICAgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0FkZCcpIHtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnYWRkJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRWRpdCcpIHtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZWRpdCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZGVsZXRlJyk7XG4gICAgICAgIH1cbiAgICAgIC8vIENMT1NFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzaXplV2luZG93LFxuICAgIGxpc3RlbkNsaWNrcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gW107XG5cbiAgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWNvbiwgdGl0bGUpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJvamVjdChpY29uLCB0aXRsZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChpY29uLCB0aXRsZSk7XG4gICAgcHJvamVjdHNMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzTGlzdCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBhZGRQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuXG5kb20ucmVzcG9uc2l2ZU1lbnUoKTtcbmhhbmRsZXJzLnJlc2l6ZVdpbmRvdygpO1xuaGFuZGxlcnMubGlzdGVuQ2xpY2tzKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9