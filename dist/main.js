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
  const projectTitle = document.querySelector('#project-title');
  const projectTitleError = document.querySelector('.project-title-error');

  function responsiveMenu() {
    if (window.innerWidth <= 1000) {
      toggleMenuIcon.classList.remove('active');
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
    toggleMenuIcon.classList.toggle('active');

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

  function selectMenuLink(target) {
    const allMenuLinks = document.querySelectorAll('.nav-link');

    allMenuLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });

    if (target.classList.contains('nav-link')) {
      target.classList.add('selected-link');
    } else {
      target.parentElement.classList.add('selected-link');
    }
  }

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

  function manipulateModal(state, title, task, index) {
    const modalHeader = modal.querySelector('.modal-header');
    const deletionText = modal.querySelector('.deletion-text');
    const confirmButton = modal.querySelector('.confirm-modal');
    const cancelButton = modal.querySelector('.cancel-modal');

    modalHeader.classList.remove('deletion-modal-header');
    form.reset();
    form.classList.remove('hide');
    projectTitleError.classList.remove('show');
    projectTitleError.classList.add('hide');
    deletionText.classList.add('hide');
    cancelButton.classList.remove('cancel-deletion');
    confirmButton.classList.remove('confirm-deletion');

    if (state === 'show') {
      const modalTitle = modal.querySelector('.modal-title');
      const modalTask = modal.querySelector('.modal-task');

      modal.classList.remove('hide');
      modal.classList.add('show');
      modalTitle.textContent = title;
      modalTask.textContent = task;
    } else if (state === 'close') {
      modal.classList.remove('show');
      modal.classList.add('hide');
    }

    if (task === 'Delete') {
      const deletionProjectTitle = modal.querySelector('.project-title');

      modalHeader.classList.add('deletion-modal-header');
      deletionText.classList.remove('hide');
      deletionText.classList.add('show');
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

  function showProjects() {
    const projectsLinks = document.querySelector('#projects-links-div');
    projectsLinks.textContent = '';

    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList.length; i += 1) {
      const projectLink = document.createElement('a');
      const projectIcon = document.createElement('i');
      const projectText = document.createElement('p');
      const projectIconsDiv = document.createElement('div');
      const projectEditIcon = document.createElement('i');
      const projectTrashIcon = document.createElement('i');

      // PROJECT LINK
      projectLink.classList.add('nav-link');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-index', i);

      // PROJECT ICON
      projectIcon.classList.add('fal', 'nav-link-icon', _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].icon, 'fa-fw', 'padding-right');
      projectIconsDiv.classList.add('float-right');

      // PROJECT TEXT
      projectText.classList.add('nav-link-text');
      projectText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].title;

      // PROJECT DEFAULT ICONS
      projectEditIcon.classList.add('fal', 'fa-edit', 'padding-right', 'edit-project', 'hover-icon');
      projectEditIcon.setAttribute('data-index', i);
      projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'delete-project', 'hover-icon');
      projectTrashIcon.setAttribute('data-index', i);

      // APPENDS
      projectIconsDiv.appendChild(projectEditIcon);
      projectIconsDiv.appendChild(projectTrashIcon);
      projectLink.appendChild(projectIcon);
      projectLink.appendChild(projectText);
      projectLink.appendChild(projectIconsDiv);
      projectsLinks.appendChild(projectLink);
    }
    manipulateModal('close');
  }

  return {
    responsiveMenu,
    toggleMenu,
    selectMenuLink,
    editProject,
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
  let projectIndex = 0;

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
      } else if (target.classList.contains('nav-link')
                || target.classList.contains('nav-link-icon')
                || target.classList.contains('nav-link-text')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectMenuLink(target);

      // MODAL TO ADD PROJECT
      } else if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Add Project', 'Add');

      // MODAL TO EDIT PROJECT
      } else if (target.classList.contains('edit-project')) {
        projectIndex = target.getAttribute('data-index');
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Edit Project', 'Edit');
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.editProject(projectIndex);

      // MODAL TO DELETE PROJECT
      } else if (target.classList.contains('delete-project')) {
        projectIndex = target.getAttribute('data-index');
        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Delete Project', 'Delete', projectIndex);

      // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('add');
        } else if (target.textContent === 'Edit') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('edit', projectIndex);
        } else if (target.textContent === 'Delete') {
          _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal('delete', projectIndex);
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
  const projectsList = [{ icon: 'fa-tools', title: 'Craft Example' }];

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



_dom__WEBPACK_IMPORTED_MODULE_0__.default.showProjects();
_dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.resizeWindow();
_handlers__WEBPACK_IMPORTED_MODULE_1__.default.listenClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiwyREFBcUI7QUFDN0M7O0FBRUE7QUFDQSx5QkFBeUIsMkRBQXFCOztBQUU5QztBQUNBLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QywyREFBcUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsY0FBYzs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1AsUUFBUSx5REFBbUI7O0FBRTNCO0FBQ0EsT0FBTztBQUNQLFFBQVEsMERBQW9CO0FBQzVCO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsTUFBTSw0REFBc0I7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLEtBQUssa0VBQTRCLENBQUM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0RBQXdELDJEQUFxQjtBQUM3RTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLDJEQUFxQjs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLEdBQUcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzFMSzs7QUFFeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLHdEQUFrQjtBQUN4RDs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTOztBQUV0QjtBQUNBO0FBQ0EsUUFBUSxvREFBYzs7QUFFdEI7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQVEsd0RBQWtCOztBQUUxQjtBQUNBLE9BQU87QUFDUCxRQUFRLHlEQUFtQjs7QUFFM0I7QUFDQSxPQUFPO0FBQ1A7QUFDQSxRQUFRLHlEQUFtQjtBQUMzQixRQUFRLHFEQUFlOztBQUV2QjtBQUNBLE9BQU87QUFDUDtBQUNBLFFBQVEseURBQW1COztBQUUzQjtBQUNBLE9BQU87QUFDUDtBQUNBLFVBQVUsdURBQWlCO0FBQzNCLFNBQVM7QUFDVCxVQUFVLHVEQUFpQjtBQUMzQixTQUFTO0FBQ1QsVUFBVSx1REFBaUI7QUFDM0I7O0FBRUE7QUFDQSxPQUFPO0FBQ1AsUUFBUSx5REFBbUI7QUFDM0I7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzlEQTs7QUFFeEI7QUFDQSx5QkFBeUIsMkNBQTJDOztBQUVwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzREFBZ0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzREFBZ0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFnQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFFBQVEsRUFBQzs7Ozs7OztVQ3ZDeEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ1U7O0FBRWxDLHNEQUFnQjtBQUNoQix3REFBa0I7QUFDbEIsMkRBQXFCO0FBQ3JCLDJEQUFxQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCB0b2dnbGVNZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtbWVudScpO1xuICBjb25zdCBzaWRlYmFyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLW1lbnUnKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbicpO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbCcpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcbiAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKTtcbiAgY29uc3QgcHJvamVjdFRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZS1lcnJvcicpO1xuXG4gIGZ1bmN0aW9uIHJlc3BvbnNpdmVNZW51KCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMDAwKSB7XG4gICAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdleHBhbmQtbWFpbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kLW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rhcmtlci1iYWNrcm91bmQnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gICAgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnaGlkZS1zaWRlYmFyJykpIHtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdkYXJrZXItYmFja3JvdW5kJyk7XG4gICAgfSBlbHNlIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctc2lkZWJhcicpKSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGFya2VyLWJhY2tyb3VuZCcpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdE1lbnVMaW5rKHRhcmdldCkge1xuICAgIGNvbnN0IGFsbE1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXYtbGluaycpO1xuXG4gICAgYWxsTWVudUxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1saW5rJykpIHtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpbmRleCkge1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5pY29uO1xuICAgIGNvbnN0IGFsbFByb2plY3RJY29ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJyk7XG5cbiAgICAvLyBTSE9XIEVESVRBQkxFIFBST0pFQ1QgVElUTEVcbiAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuXG4gICAgLy8gU0VMRUNUIEVESVRBQkxFIFBST0pFQ1QgSUNPTlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdEljb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxsUHJvamVjdEljb25zW2ldLnZhbHVlID09PSBwcm9qZWN0SWNvbikge1xuICAgICAgICBhbGxQcm9qZWN0SWNvbnNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFuaXB1bGF0ZU1vZGFsKHN0YXRlLCB0aXRsZSwgdGFzaywgaW5kZXgpIHtcbiAgICBjb25zdCBtb2RhbEhlYWRlciA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcbiAgICBjb25zdCBkZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1tb2RhbCcpO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbW9kYWwnKTtcblxuICAgIG1vZGFsSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0aW9uLW1vZGFsLWhlYWRlcicpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBwcm9qZWN0VGl0bGVFcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgcHJvamVjdFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIGRlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicpO1xuXG4gICAgaWYgKHN0YXRlID09PSAnc2hvdycpIHtcbiAgICAgIGNvbnN0IG1vZGFsVGl0bGUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKTtcbiAgICAgIGNvbnN0IG1vZGFsVGFzayA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10YXNrJyk7XG5cbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgIG1vZGFsVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgIG1vZGFsVGFzay50ZXh0Q29udGVudCA9IHRhc2s7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cblxuICAgIGlmICh0YXNrID09PSAnRGVsZXRlJykge1xuICAgICAgY29uc3QgZGVsZXRpb25Qcm9qZWN0VGl0bGUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZScpO1xuXG4gICAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QuYWRkKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICAgIGRlbGV0aW9uVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBkZWxldGlvblRleHQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgZGVsZXRpb25Qcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2FuY2VsLWRlbGV0aW9uJyk7XG4gICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tZGVsZXRpb24nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKHRhc2ssIGluZGV4KSB7XG4gICAgY29uc3QgeyBwcm9qZWN0SWNvbiB9ID0gZG9jdW1lbnQuZm9ybXMuZm9ybTtcblxuICAgIGlmICh0YXNrID09PSAnYWRkJyB8fCB0YXNrID09PSAnZWRpdCcpIHtcbiAgICAgIGlmIChwcm9qZWN0VGl0bGUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHByb2plY3RUaXRsZUVycm9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcHJvamVjdFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAvLyBBREQgUFJPSkVDVCBUTyBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnYWRkJykge1xuICAgICAgICBwcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3RJY29uLnZhbHVlLCBwcm9qZWN0VGl0bGUudmFsdWUpO1xuXG4gICAgICAvLyBFRElUIFBST0pFQ1QgRlJPTSBBUlJBWVxuICAgICAgfSBlbHNlIGlmICh0YXNrID09PSAnZWRpdCcpIHtcbiAgICAgICAgcHJvamVjdHMuZWRpdFByb2plY3QocHJvamVjdEljb24udmFsdWUsIHByb2plY3RUaXRsZS52YWx1ZSwgaW5kZXgpO1xuICAgICAgfVxuICAgIC8vIERFTEVURSBQUk9KRUNUIEZST00gQVJSQVlcbiAgICB9IGVsc2UgaWYgKHRhc2sgPT09ICdkZWxldGUnKSB7XG4gICAgICBwcm9qZWN0cy5kZWxldGVQcm9qZWN0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1saW5rcy1kaXYnKTtcbiAgICBwcm9qZWN0c0xpbmtzLnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAvLyBQUk9KRUNUIExJTktcbiAgICAgIHByb2plY3RMaW5rLmNsYXNzTGlzdC5hZGQoJ25hdi1saW5rJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTlxuICAgICAgcHJvamVjdEljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ25hdi1saW5rLWljb24nLCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0uaWNvbiwgJ2ZhLWZ3JywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdmbG9hdC1yaWdodCcpO1xuXG4gICAgICAvLyBQUk9KRUNUIFRFWFRcbiAgICAgIHByb2plY3RUZXh0LmNsYXNzTGlzdC5hZGQoJ25hdi1saW5rLXRleHQnKTtcbiAgICAgIHByb2plY3RUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRpdGxlO1xuXG4gICAgICAvLyBQUk9KRUNUIERFRkFVTFQgSUNPTlNcbiAgICAgIHByb2plY3RFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtZWRpdCcsICdwYWRkaW5nLXJpZ2h0JywgJ2VkaXQtcHJvamVjdCcsICdob3Zlci1pY29uJyk7XG4gICAgICBwcm9qZWN0RWRpdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0VHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS10cmFzaC1hbHQnLCAnZGVsZXRlLXByb2plY3QnLCAnaG92ZXItaWNvbicpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcblxuICAgICAgLy8gQVBQRU5EU1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRyYXNoSWNvbik7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbik7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0VGV4dCk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbnNEaXYpO1xuICAgICAgcHJvamVjdHNMaW5rcy5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgfVxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzcG9uc2l2ZU1lbnUsXG4gICAgdG9nZ2xlTWVudSxcbiAgICBzZWxlY3RNZW51TGluayxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBtYW5pcHVsYXRlTW9kYWwsXG4gICAgdmFsaWRhdGVNb2RhbCxcbiAgICBzaG93UHJvamVjdHMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICBsZXQgcHJvamVjdEluZGV4ID0gMDtcblxuICAvLyBSRVNJWkUgTUVOVSBERVBFTkRJTkcgT04gV0lORE9XIFNJWkVcbiAgZnVuY3Rpb24gcmVzaXplV2luZG93KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkb20ucmVzcG9uc2l2ZU1lbnUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuQ2xpY2tzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG5cbiAgICAgIC8vIFRPR0dMRSBTSURFIE1FTlVcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2dnbGUtbWVudScpIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlci1saW5lJykpIHtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcblxuICAgICAgLy8gU1RZTEUgTUVOVSBMSU5LXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1saW5rJylcbiAgICAgICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtbGluay1pY29uJylcbiAgICAgICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtbGluay10ZXh0JykpIHtcbiAgICAgICAgZG9tLnNlbGVjdE1lbnVMaW5rKHRhcmdldCk7XG5cbiAgICAgIC8vIE1PREFMIFRPIEFERCBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0JykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgUHJvamVjdCcsICdBZGQnKTtcblxuICAgICAgLy8gTU9EQUwgVE8gRURJVCBQUk9KRUNUXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdFZGl0IFByb2plY3QnLCAnRWRpdCcpO1xuICAgICAgICBkb20uZWRpdFByb2plY3QocHJvamVjdEluZGV4KTtcblxuICAgICAgLy8gTU9EQUwgVE8gREVMRVRFIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFByb2plY3QnLCAnRGVsZXRlJywgcHJvamVjdEluZGV4KTtcblxuICAgICAgLy8gVkFMSURBVEUgTU9EQUxcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybS1tb2RhbCcpKSB7XG4gICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdBZGQnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2FkZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0VkaXQnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2VkaXQnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZGVsZXRlJywgcHJvamVjdEluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAvLyBDTE9TRSBNT0RBTFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZScpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc2l6ZVdpbmRvdyxcbiAgICBsaXN0ZW5DbGlja3MsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVycztcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IFt7IGljb246ICdmYS10b29scycsIHRpdGxlOiAnQ3JhZnQgRXhhbXBsZScgfV07XG5cbiAgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWNvbiwgdGl0bGUpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJvamVjdChpY29uLCB0aXRsZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChpY29uLCB0aXRsZSk7XG4gICAgcHJvamVjdHNMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaWNvbiwgdGl0bGUsIGluZGV4KSB7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5pY29uID0gaWNvbjtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpbmRleCkge1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBwcm9qZWN0c0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0c0xpc3QsXG4gICAgYWRkUHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBkZWxldGVQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuXG5kb20uc2hvd1Byb2plY3RzKCk7XG5kb20ucmVzcG9uc2l2ZU1lbnUoKTtcbmhhbmRsZXJzLnJlc2l6ZVdpbmRvdygpO1xuaGFuZGxlcnMubGlzdGVuQ2xpY2tzKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9