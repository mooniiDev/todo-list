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
_dom__WEBPACK_IMPORTED_MODULE_0__.default.showProjects();

// SHOW DEFAULT CONTENT
_dom__WEBPACK_IMPORTED_MODULE_0__.default.showMainTitle(0);

_dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.resizeWindow();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.listenClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7VUN2Q3hCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDVTtBQUNBOztBQUVsQztBQUNBLHlEQUFtQjtBQUNuQixzREFBZ0I7O0FBRWhCO0FBQ0EsdURBQWlCOztBQUVqQix3REFBa0I7QUFDbEIsMkRBQXFCO0FBQ3JCLDJEQUFxQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCB0b2dnbGVNZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtbWVudScpO1xuICBjb25zdCBzaWRlYmFyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLW1lbnUnKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbicpO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbCcpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcbiAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdGl0bGUnKTtcbiAgY29uc3QgcHJvamVjdFRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby10aXRsZS1lcnJvcicpO1xuICBjb25zdCBkZWxldGlvblByb2plY3RUaXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXRpdGxlJyk7XG4gIGNvbnN0IG1haW5UaXRsZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10aXRsZS1pY29uJyk7XG4gIGNvbnN0IG1haW5UaXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10aXRsZS10ZXh0Jyk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uc2l2ZU1lbnUoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDEwMDApIHtcbiAgICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2FkZC16LWluZGV4Jyk7XG4gICAgICAvLyBFWFBBTkQgTUFJTiBDT05URU5UXG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdleHBhbmQtbWFpbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTSE9XIFNJREVCQVIgQU5EIE1BS0UgSVQgQSBCSVQgVFJBTlNQQVJFTlRcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhZGQtei1pbmRleCcpO1xuICAgICAgLy8gQ09OVFJBQ1QgTUFJTiBDT05URU5UIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kLW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gICAgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnaGlkZS1zaWRlYmFyJykpIHtcbiAgICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBNQUlOIENPTlRFTlQgQSBCSVQgVFJBTlNQQVJFTlRcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfSBlbHNlIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctc2lkZWJhcicpKSB7XG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgTUFJTiBDT05URU5UIE9QQVFVRVxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RNZW51TGluayh0YXJnZXQpIHtcbiAgICBjb25zdCBhbGxNZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmF2LWxpbmsnKTtcblxuICAgIGFsbE1lbnVMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9KTtcblxuICAgIC8vIEFERCBCQUNLR1JPVU5EIENPTE9SIE9OIENMSUNLRUQgTkFWSUdBVElPTiBCQVIgTElOS1xuICAgIC8vIElGIENMSUNLRUQgRElSRUNUTFkgT04gTUVOVSBPUiBQUk9KRUNUIExJTktcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmF2LWxpbmsnKSkge1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LIElDT04gT1IgVEVYVFxuICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmF2LWxpbmstaWNvbicpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtbGluay10ZXh0JykpIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBJQ09OIE9SIFRFWFRcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbicpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKSkge1xuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgRUxFTUVOVFMgRElWU1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JykpIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYW5pcHVsYXRlTW9kYWwoc3RhdGUsIHRpdGxlLCB0YXNrLCBpbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuICAgIGNvbnN0IG1vZGFsVGl0bGUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFRhc2sgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFzaycpO1xuICAgIGNvbnN0IGRlbGV0aW9uVGV4dCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLW1vZGFsJyk7XG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNhbmNlbC1tb2RhbCcpO1xuXG4gICAgbW9kYWxIZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRpb24tbW9kYWwtaGVhZGVyJyk7XG4gICAgZm9ybS5yZXNldCgpO1xuICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHByb2plY3RUaXRsZUVycm9yLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBkZWxldGlvblRleHQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjYW5jZWwtZGVsZXRpb24nKTtcbiAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbmZpcm0tZGVsZXRpb24nKTtcblxuICAgIGlmIChzdGF0ZSA9PT0gJ3Nob3cnKSB7XG4gICAgICBjb25zdCBtb2RhbEljb25zRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhZGlvLWZvcm0nKTtcbiAgICAgIGNvbnN0IG1vZGFsVGFza3NEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFza3MtZGl2Jyk7XG5cbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgIG1vZGFsVGFzay50ZXh0Q29udGVudCA9IHRhc2s7XG4gICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgbW9kYWxUYXNrc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgICAgIC8vIElGIE1PREFMIElTIEZPUiBBRERJTkcgQSBUQVNLXG4gICAgICBpZiAodGl0bGUgPT09ICdBZGQgVGFzaycpIHtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRhc2sgPT09ICdEZWxldGUnKSB7XG4gICAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QuYWRkKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICAgIGRlbGV0aW9uVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBkZWxldGlvblByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjYW5jZWwtZGVsZXRpb24nKTtcbiAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnY29uZmlybS1kZWxldGlvbicpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlTW9kYWwodGFzaywgaW5kZXgpIHtcbiAgICBjb25zdCB7IHByb2plY3RJY29uIH0gPSBkb2N1bWVudC5mb3Jtcy5mb3JtO1xuXG4gICAgaWYgKHRhc2sgPT09ICdhZGQnIHx8IHRhc2sgPT09ICdlZGl0Jykge1xuICAgICAgaWYgKHByb2plY3RUaXRsZS52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgcHJvamVjdFRpdGxlRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBwcm9qZWN0VGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgIC8vIEFERCBQUk9KRUNUIFRPIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdhZGQnKSB7XG4gICAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdEljb24udmFsdWUsIHByb2plY3RUaXRsZS52YWx1ZSk7XG5cbiAgICAgIC8vIEVESVQgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdlZGl0Jykge1xuICAgICAgICBwcm9qZWN0cy5lZGl0UHJvamVjdChwcm9qZWN0SWNvbi52YWx1ZSwgcHJvamVjdFRpdGxlLnZhbHVlLCBpbmRleCk7XG4gICAgICB9XG4gICAgLy8gREVMRVRFIFBST0pFQ1QgRlJPTSBBUlJBWVxuICAgIH0gZWxzZSBpZiAodGFzayA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgIHByb2plY3RzLmRlbGV0ZVByb2plY3QoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBST0pFQ1RTXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGluZGV4KSB7XG4gICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG4gICAgY29uc3QgYWxsUHJvamVjdEljb25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbCgnLmljb24nKTtcblxuICAgIC8vIFNIT1cgRURJVEFCTEUgUFJPSkVDVCBUSVRMRVxuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG5cbiAgICAvLyBTRUxFQ1QgRURJVEFCTEUgUFJPSkVDVCBJQ09OXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0SWNvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChhbGxQcm9qZWN0SWNvbnNbaV0udmFsdWUgPT09IHByb2plY3RJY29uKSB7XG4gICAgICAgIGFsbFByb2plY3RJY29uc1tpXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1jb3VudCcpO1xuICAgIGNvbnN0IHByb2plY3RzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtbGlua3MtZGl2Jyk7XG5cbiAgICAvLyBTSE9XIE5VTUJFUiBPRiBQUk9KRUNUU1xuICAgIHByb2plY3RzQ291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoO1xuICAgIHByb2plY3RzTGlua3MudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBwcm9qZWN0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uQW5kVGV4dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgcHJvamVjdEVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgcHJvamVjdFRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcblxuICAgICAgLy8gUFJPSkVDVCBJQ09OL1RFWFQgQU5EIERFRkFVTFQgSUNPTlMgRElWU1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgTElOS1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnbmF2LWxpbmsnLCAncHJvamVjdC1saW5rJywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTlxuICAgICAgcHJvamVjdEljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ3Byb2plY3QtaWNvbicsIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS5pY29uLCAnZmEtZncnLCAncHJvamVjdCcsICdzZWxlY3QnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgcHJvamVjdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgVEVYVFxuICAgICAgcHJvamVjdFRleHQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10ZXh0JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0VGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50aXRsZTtcbiAgICAgIHByb2plY3RUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFRkFVTFQgSUNPTlNcbiAgICAgIHByb2plY3RFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtZWRpdCcsICdwYWRkaW5nLXJpZ2h0JywgJ2VkaXQtcHJvamVjdCcpO1xuICAgICAgcHJvamVjdEVkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtdHJhc2gtYWx0JywgJ2RlbGV0ZS1wcm9qZWN0Jyk7XG4gICAgICBwcm9qZWN0VHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBBUFBFTkRTXG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdEVkaXRJY29uKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0VHJhc2hJY29uKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRleHQpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb25BbmRUZXh0RGl2KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uc0Rpdik7XG4gICAgICBwcm9qZWN0c0xpbmtzLmFwcGVuZENoaWxkKHByb2plY3RMaW5rKTtcbiAgICB9XG5cbiAgICBtYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gIH1cblxuICAvLyBNQUlOIENPTlRFTlRcbiAgZnVuY3Rpb24gc2hvd01haW5UaXRsZShpbmRleCkge1xuICAgIGNvbnN0IGFsbE1lbnVJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWljb24nKTtcbiAgICBjb25zdCBtZW51SWNvbiA9IGFsbE1lbnVJY29uc1tpbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLWljb24nKTtcbiAgICBjb25zdCBtZW51VGV4dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS10ZXh0Jyk7XG5cbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsIG1lbnVJY29uLCAnbWFpbi10aXRsZS1pY29uJywgJ2ZhLWZ3JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gbWVudVRleHRzW2luZGV4XS50ZXh0Q29udGVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KSB7XG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc05hbWUgPSAnJztcbiAgICAvLyBUSVRMRSBPRiBUQVNLUyBGUk9NIFRIRSBNRU5VXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluaycpXG4gICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtaWNvbicpXG4gICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtdGV4dCcpKSB7XG4gICAgICBzaG93TWFpblRpdGxlKGluZGV4KTtcblxuICAgICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBQUk9KRUNUU1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1saW5rJylcbiAgICAgICAgICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbicpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JykpIHtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5pY29uO1xuXG4gICAgICBtYWluVGl0bGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsIHByb2plY3RJY29uLCAnbWFpbi10aXRsZS1pY29uJywgJ2ZhLWZ3JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIG1haW5UaXRsZVRleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzcG9uc2l2ZU1lbnUsXG4gICAgdG9nZ2xlTWVudSxcbiAgICBzZWxlY3RNZW51TGluayxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBtYW5pcHVsYXRlTW9kYWwsXG4gICAgdmFsaWRhdGVNb2RhbCxcbiAgICBzaG93UHJvamVjdHMsXG4gICAgc2hvd01haW5UaXRsZSxcbiAgICBjaGFuZ2VNYWluVGl0bGUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICBsZXQgaW5kZXggPSAwO1xuXG4gIC8vIFJFU0laRSBNRU5VIERFUEVORElORyBPTiBXSU5ET1cgU0laRVxuICBmdW5jdGlvbiByZXNpemVXaW5kb3coKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRvbS5yZXNwb25zaXZlTWVudSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5DbGlja3MoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcblxuICAgICAgLy8gVE9HR0xFIFNJREUgTUVOVVxuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS1tZW51JykgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyLWxpbmUnKSkge1xuICAgICAgICBkb20udG9nZ2xlTWVudSgpO1xuXG4gICAgICAvLyBTVFlMRSBNRU5VIExJTktcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0JykpIHtcbiAgICAgICAgaW5kZXggPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGRvbS5zZWxlY3RNZW51TGluayh0YXJnZXQpO1xuICAgICAgICBkb20uY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgaW5kZXgpO1xuXG4gICAgICAvLyBNT0RBTCBUTyBBREQgQSBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0JykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgUHJvamVjdCcsICdBZGQnKTtcblxuICAgICAgLy8gTU9EQUwgVE8gRURJVCBBIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JykpIHtcbiAgICAgICAgaW5kZXggPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGRvbS5zZWxlY3RNZW51TGluayh0YXJnZXQpO1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0VkaXQgUHJvamVjdCcsICdFZGl0Jyk7XG4gICAgICAgIGRvbS5lZGl0UHJvamVjdChpbmRleCk7XG5cbiAgICAgIC8vIE1PREFMIFRPIERFTEVURSBBIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICBpbmRleCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgZG9tLnNlbGVjdE1lbnVMaW5rKHRhcmdldCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFByb2plY3QnLCAnRGVsZXRlJywgaW5kZXgpO1xuXG4gICAgICAvLyBNT0RBTCBUTyBBREQgQSBUQVNLXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10YXNrJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgVGFzaycsICdBZGQnKTtcblxuICAgICAgLy8gVkFMSURBVEUgTU9EQUxcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybS1tb2RhbCcpKSB7XG4gICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdBZGQnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2FkZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0VkaXQnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2VkaXQnLCBpbmRleCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRGVsZXRlJykge1xuICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdkZWxldGUnLCBpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgLy8gQ0xPU0UgTU9EQUxcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNpemVXaW5kb3csXG4gICAgbGlzdGVuQ2xpY2tzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcnM7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgcHJvamVjdHMgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBbXTtcblxuICBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpY29uLCB0aXRsZSkge1xuICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KGljb24sIHRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KGljb24sIHRpdGxlKTtcbiAgICBwcm9qZWN0c0xpc3QucHVzaChwcm9qZWN0KTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpY29uLCB0aXRsZSwgaW5kZXgpIHtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLmljb24gPSBpY29uO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0udGl0bGUgPSB0aXRsZTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHByb2plY3RzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBhZGRQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9oYW5kbGVycyc7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5cbi8vIEFERCBBTkQgU0hPVyBERUZBVUxUIFBST0pFQ1QgKEVYQU1QTEUpXG5wcm9qZWN0cy5hZGRQcm9qZWN0KCdmYS10b29scycsICdDcmFmdCBFeGFtcGxlJyk7XG5kb20uc2hvd1Byb2plY3RzKCk7XG5cbi8vIFNIT1cgREVGQVVMVCBDT05URU5UXG5kb20uc2hvd01haW5UaXRsZSgwKTtcblxuZG9tLnJlc3BvbnNpdmVNZW51KCk7XG5oYW5kbGVycy5yZXNpemVXaW5kb3coKTtcbmhhbmRsZXJzLmxpc3RlbkNsaWNrcygpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==