/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n\n\nconst dom = (() => {\n  const menuIcon = document.querySelector('.toggle-menu');\n  const sidebarMenu = document.querySelector('#sidebar-menu');\n  const mainContent = document.querySelector('#main');\n  const modal = document.querySelector('#modal');\n  const modalName = document.querySelector('.modal-name');\n  const modalTask = document.querySelector('.modal-task');\n  const title = document.querySelector('#title');\n  const titleError = document.querySelector('.title-error');\n\n  function responsiveMenu() {\n    if (window.innerWidth <= 1000) {\n      menuIcon.classList.remove('active');\n      sidebarMenu.classList.remove('show-sidebar');\n      sidebarMenu.classList.add('hide-sidebar');\n      mainContent.classList.remove('contract-main');\n      mainContent.classList.add('expand-main');\n    } else {\n      sidebarMenu.classList.remove('hide-sidebar');\n      sidebarMenu.classList.add('show-sidebar');\n      mainContent.classList.remove('expand-main');\n      mainContent.classList.add('contract-main');\n      mainContent.classList.remove('darker-backround');\n    }\n  }\n\n  function toggleMenu() {\n    menuIcon.classList.toggle('active');\n    if (sidebarMenu.classList.contains('hide-sidebar')) {\n      sidebarMenu.classList.remove('hide-sidebar');\n      sidebarMenu.classList.add('show-sidebar');\n      mainContent.classList.add('darker-backround');\n    } else if (sidebarMenu.classList.contains('show-sidebar')) {\n      sidebarMenu.classList.remove('show-sidebar');\n      sidebarMenu.classList.add('hide-sidebar');\n      mainContent.classList.remove('darker-backround');\n    }\n  }\n\n  function selectTask(target) {\n    const tasksLinks = document.querySelectorAll('.task-link');\n    tasksLinks.forEach((link) => {\n      link.classList.remove('selected-link');\n    });\n    if (target.classList.contains('task-icon') || target.classList.contains('task-text')) {\n      target.parentElement.classList.add('selected-link');\n    } else if (target.classList.contains('task-link')) {\n      target.classList.add('selected-link');\n    }\n  }\n  function selectProject(target) {\n    const projectsLinks = document.querySelectorAll('.project-link');\n    projectsLinks.forEach((link) => {\n      link.classList.remove('selected-link');\n    });\n    if (target.classList.contains('project-icon') || target.classList.contains('project-text')) {\n      target.parentElement.classList.add('selected-link');\n    } else if (target.classList.contains('project-link')) {\n      target.classList.add('selected-link');\n    }\n  }\n\n  function manipulateModal(state, name, task) {\n    const form = document.querySelector('#form');\n    form.reset();\n    titleError.classList.remove('show');\n    titleError.classList.add('hide');\n    if (state === 'show') {\n      modal.classList.remove('hide');\n      modal.classList.add('show');\n      modalName.textContent = name;\n      modalTask.textContent = task;\n    } else if (state === 'close') {\n      modal.classList.remove('show');\n      modal.classList.add('hide');\n    }\n  }\n\n  function showProject(icon, name) {\n    const navProjects = document.querySelector('#nav-projects');\n    const projectLink = document.createElement('a');\n    const projectIcon = document.createElement('i');\n    const projectName = document.createElement('p');\n    const projectIconsDiv = document.createElement('div');\n    const projectEditIcon = document.createElement('i');\n    const projectTrashIcon = document.createElement('i');\n    // PROJECT LINK\n    projectLink.setAttribute('href', '#');\n    projectLink.classList.add('nav-link', 'project-link');\n    // PROJECT SELECTED ICON\n    projectIcon.classList.add('fal', 'project-icon', icon, 'fa-fw', 'padding-right');\n    projectIconsDiv.classList.add('float-right');\n    // PROJECT NAME\n    projectName.classList.add('project-text');\n    projectName.textContent = name;\n    // PROJECT DEFAULT ICONS\n    projectEditIcon.classList.add('fal', 'fa-edit', 'padding-right', 'hover-icon');\n    projectTrashIcon.classList.add('fal', 'fa-trash-alt', 'hover-icon');\n    // APPENDS\n    projectIconsDiv.appendChild(projectEditIcon);\n    projectIconsDiv.appendChild(projectTrashIcon);\n    projectLink.appendChild(projectIcon);\n    projectLink.appendChild(projectName);\n    projectLink.appendChild(projectIconsDiv);\n    navProjects.appendChild(projectLink);\n  }\n\n  function validateModal() {\n    const { icon } = document.forms.form;\n    if (title.value === '') {\n      titleError.classList.remove('hide');\n      titleError.classList.add('show');\n    } else {\n      _projects__WEBPACK_IMPORTED_MODULE_0__.default.addProject(title.value, icon.value);\n      showProject(icon.value, title.value);\n      manipulateModal('close');\n    }\n  }\n\n  return {\n    responsiveMenu,\n    toggleMenu,\n    selectTask,\n    selectProject,\n    manipulateModal,\n    validateModal,\n    showProject,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n\n//# sourceURL=webpack://todo-list/./src/dom.js?");

/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\nconst handlers = (() => {\n  // RESIZE MENU DEPENDING ON WINDOW SIZE\n  function resizeWindow() {\n    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu);\n  }\n\n  function listenClicks() {\n    document.addEventListener('click', (event) => {\n      const { target } = event;\n\n      if (target.classList.contains('toggle-menu') || target.classList.contains('burger-line')) {\n        // SIDE MENU TOGGLE\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.toggleMenu();\n      } else if (target.classList.contains('task-link')\n                || target.classList.contains('task-icon')\n                || target.classList.contains('task-text')) {\n        // STYLE TASK LINK\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectTask(target);\n      } else if (target.classList.contains('project-link')\n                || target.classList.contains('project-icon')\n                || target.classList.contains('project-text')) {\n        // STYLE PROJECT LINK\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.selectProject(target);\n      } else if (target.classList.contains('add-project')) {\n        // ADD PROJECT MODAL\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Add New Project', 'Add');\n      } else if (target.classList.contains('confirm-modal')) {\n        // VALIDATE MODAL INFORMATION\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.validateModal();\n      } else if (target.classList.contains('close')) {\n        // CLOSE MODAL\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('close');\n      }\n    });\n  }\n\n  return {\n    resizeWindow,\n    listenClicks,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlers);\n\n\n//# sourceURL=webpack://todo-list/./src/handlers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ \"./src/handlers.js\");\n\n\n\n_dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu();\n_handlers__WEBPACK_IMPORTED_MODULE_1__.default.resizeWindow();\n_handlers__WEBPACK_IMPORTED_MODULE_1__.default.listenClicks();\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst projects = (() => {\n  const projectsList = [];\n\n  class Project {\n    constructor(title, icon) {\n      this.title = title;\n      this.icon = icon;\n    }\n  }\n\n  function addProject(title, icon) {\n    const project = new Project(title, icon);\n    projectsList.push(project);\n  }\n\n  return {\n    addProject,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);\n\n\n//# sourceURL=webpack://todo-list/./src/projects.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;