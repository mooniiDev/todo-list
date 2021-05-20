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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst dom = (() => {\n  const menuIcon = document.querySelector('.toggle-menu');\n  const sidebarMenu = document.querySelector('#sidebar-menu');\n  const mainContent = document.querySelector('#main');\n  const modal = document.querySelector('#modal');\n  const modalTitle = document.querySelector('.modal-title');\n  const modalTask = document.querySelector('.modal-task');\n\n  function responsiveMenu() {\n    if (window.innerWidth <= 1000) {\n      menuIcon.classList.remove('active');\n      sidebarMenu.classList.remove('show-sidebar');\n      sidebarMenu.classList.add('hide-sidebar');\n      mainContent.classList.remove('contract-main');\n      mainContent.classList.add('expand-main');\n    } else {\n      sidebarMenu.classList.remove('hide-sidebar');\n      sidebarMenu.classList.add('show-sidebar');\n      mainContent.classList.remove('expand-main');\n      mainContent.classList.add('contract-main');\n      mainContent.classList.remove('darker-backround');\n    }\n  }\n\n  function toggleMenu() {\n    menuIcon.classList.toggle('active');\n    if (sidebarMenu.classList.contains('hide-sidebar')) {\n      sidebarMenu.classList.remove('hide-sidebar');\n      sidebarMenu.classList.add('show-sidebar');\n      mainContent.classList.add('darker-backround');\n    } else if (sidebarMenu.classList.contains('show-sidebar')) {\n      sidebarMenu.classList.remove('show-sidebar');\n      sidebarMenu.classList.add('hide-sidebar');\n      mainContent.classList.remove('darker-backround');\n    }\n  }\n\n  function manipulateModal(state, title, task) {\n    const form = document.querySelector('#form');\n    form.reset();\n    if (state === 'show') {\n      modal.classList.remove('display-none');\n      modal.classList.add('display-block');\n      modalTitle.textContent = title;\n      modalTask.textContent = task;\n    } else if (state === 'close') {\n      modal.classList.remove('display-block');\n      modal.classList.add('display-none');\n    }\n  }\n\n  return {\n    responsiveMenu,\n    toggleMenu,\n    manipulateModal,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n\n//# sourceURL=webpack://todo-list/./src/dom.js?");

/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\nconst handlers = (() => {\n  // RESIZE MENU DEPENDING ON WINDOW SIZE\n  function resizeWindow() {\n    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu);\n  }\n\n  function listenClicks() {\n    document.addEventListener('click', (event) => {\n      const { target } = event;\n      if (target.classList.contains('toggle-menu') || event.target.classList.contains('burger-line')) {\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.toggleMenu();\n      } else if (target.classList.contains('add-project')) {\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('show', 'Add New Project', 'Add');\n      } else if (target.classList.contains('close')) {\n        _dom__WEBPACK_IMPORTED_MODULE_0__.default.manipulateModal('close');\n      }\n    });\n  }\n\n  return {\n    resizeWindow,\n    listenClicks,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlers);\n\n\n//# sourceURL=webpack://todo-list/./src/handlers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ \"./src/handlers.js\");\n\n\n\n_dom__WEBPACK_IMPORTED_MODULE_0__.default.responsiveMenu();\n_handlers__WEBPACK_IMPORTED_MODULE_1__.default.resizeWindow();\n_handlers__WEBPACK_IMPORTED_MODULE_1__.default.listenClicks();\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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