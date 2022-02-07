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
  const modal = document.querySelector('#modal');
  const form = modal.querySelector('#form');
  const modalTitle = modal.querySelector('#modal-title');
  const modalTitleError = modal.querySelector('.modal-title-error');
  const mainContent = document.querySelector('#main');
  const mainTitleIcon = document.querySelector('.main-title-icon');
  const mainTitleText = document.querySelector('.main-title-text');
  const projectsLinksDiv = document.querySelector('.projects-links-div');
  const addTaskButton = document.querySelector('.add-task');
  const tasksCount = document.querySelector('.tasks-count');
  const tasksList = document.querySelector('.tasks-list');
  const taskDescription = modal.querySelector('.task-description');
  const taskDueDate = modal.querySelector('#dueDate');
  const taskPrioritySelection = modal.querySelector('.task-priority');

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

  // MAIN CONTENT TITLE
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
    document.title = `ToDo - ${mainTitleText.textContent}`;
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
      target.classList.contains('delete-project') ||
      target.classList.contains('edit-project') ||
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
      document.title = `ToDo - ${mainTitleText.textContent}`;
    }
  }

  function watchTaskInfo(projectIndex, taskIndex) {
    const infoTaskTitle = document.querySelector('.info-task-title');
    const infoTaskDescription = document.querySelector('.info-task-description');
    const infoTaskDueDate = document.querySelector('.info-task-due-date');
    const infoTaskPriority = document.querySelector('.info-task-priority');
    const infoTaskProject = document.querySelector('.info-task-project');

    // TASK TITLE
    infoTaskTitle.textContent =
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;

    // TASK DESCRIPTION
    infoTaskDescription.textContent =
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].description;

    // TASK DUE DATE
    infoTaskDueDate.textContent =
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].date;

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

  function manipulateModal(modalState, modalTask, modalAction, projectIndex, taskIndex) {
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

    if (modalState === 'show') {
      const modalIconsDiv = modal.querySelector('.radio-form');
      const modalTasksDiv = modal.querySelector('.modal-tasks-div');

      modal.classList.remove('hide');
      modalMainTitle.textContent = modalTask;
      modalTaskButton.textContent = modalAction;
      modalIconsDiv.classList.remove('hide');
      modalIconsDiv.classList.add('show');
      modalTasksDiv.classList.add('hide');

      // IF MODAL IS FOR EDITING PROJECT
      if (modalTask === 'Edit Project') {
        const allProjectIcons = modal.querySelectorAll('.icon');
        const projectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].icon;

        // SHOW EDITABLE PROJECT TITLE
        modalTitle.value = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;

        // SELECT EDITABLE PROJECT ICON
        for (let i = 0; i < allProjectIcons.length; i += 1) {
          if (allProjectIcons[i].value === projectIcon) {
            allProjectIcons[i].checked = true;
          }
        }

      // IF MODAL IS FOR ADDING OR EDITING TASK
      } else if (modalTask === 'Add Task'||
          modalTask === 'Edit Task'
      ) {
        modalIconsDiv.classList.remove('show');
        modalIconsDiv.classList.add('hide');
        modalTasksDiv.classList.remove('hide');

        if (modalTask === 'Edit Task') {
          modalTitle.value = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;
          taskDescription.value = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].description;
          taskDueDate.value = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].date;
          taskPrioritySelection.value = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority;
        }

        // IF MODAL IS FOR WATCHING TASK INFO
      } else if (modalTask === 'Task Info') {
        form.classList.add('hide');
        confirmButton.classList.add('hide');
        taskInfoDiv.classList.remove('hide');
        watchTaskInfo(projectIndex, taskIndex);
      }
    }

    // DELETION MODAL CONTENT
    if (modalAction === 'Delete') {
      modalHeader.classList.add('deletion-modal-header');
      form.classList.add('hide');
      cancelButton.classList.add('cancel-deletion');
      confirmButton.classList.add('confirm-deletion');

      // PROJECT DELETION
      if (modalTask === 'Delete Project') {
        const projectDeletionTitle = document.querySelector('.project-deletion-title');

        projectDeletionText.classList.remove('hide');
        projectDeletionTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;

        // TASK DELETION
      } else if (modalTask === 'Delete Task') {
        const taskDeletionTitle = document.querySelector('.task-deletion-title');

        taskDeletionText.classList.remove('hide');
        taskDeletionTitle.textContent =
          _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;
      }
    }

    // TO CLOSE THE MODAL
    if (modalState === 'close') {
      modal.classList.add('hide');
    }
  }

  function showTasks(menuTitle, projectIndexStart, projectIndexEnd) {
    let tasksNumber = 0;

    tasksCount.textContent = 0;
    tasksList.textContent = '';

    // GENERATE TASKS LIST
    for (let i = projectIndexStart; i < projectIndexEnd; i += 1) {
      for (let j = 0; j < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks.length; j += 1) {
        // IF CLICKED ON MENU LINK 'IMPORTANT' - FILTER NOT IMPORTANT TASKS
        if (
          menuTitle === 'important' &&
          _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority !== 'high'
        ) {
          continue; // If task isn't important - skip it

          // IF CLICKED ON MENU LINK 'TODAY'
        } else if (menuTitle === 'today') {
          console.log('Tasks for today..');

          // IF CLICKED ON MENU LINK 'WEEK'
        } else if (menuTitle === 'week') {
          console.log('Tasks of the week..');

          // IF CLICKED ON MENU LINK 'COMPLETED'
        } else if (menuTitle === 'completed' &&
          _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].completed !== true
        ) {
          continue; // If task isn't completed - skip it
        }

        const taskDiv = document.createElement('div');
        const taskIconAndTextDiv = document.createElement('div');
        const taskIcon = document.createElement('i');
        const taskText = document.createElement('p');
        const taskInfo = document.createElement('div');
        const taskDate = document.createElement('p');
        const taskEditIcon = document.createElement('i');
        const taskTrashIcon = document.createElement('i');
        const taskInfoIcon = document.createElement('i');

        // SHOW NUMBER OF TASKS
        tasksNumber += 1;
        tasksCount.textContent = tasksNumber;

        // TASK PRIORITY, TEXT AND ITS DIV
        taskDiv.classList.add('task-div', 'hover-element');
        taskIconAndTextDiv.classList.add('flex');
        taskDiv.setAttribute('data-project-index', i);
        taskDiv.setAttribute('data-task-index', j);

        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'low') {
          taskIcon.classList.add('low-priority');
        } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'medium') {
          taskIcon.classList.add('mid-priority');
        } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'high') {
          taskIcon.classList.add('high-priority');
        } else {
          taskIcon.classList.add('fal', 'padding-right');
        }
        taskIcon.setAttribute('data-project-index', i);
        taskIcon.setAttribute('data-task-index', j);

        taskText.classList.add('task-text');
        taskText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].title;
        taskText.setAttribute('data-project-index', i);
        taskText.setAttribute('data-task-index', j);

        // TASK INFO DIV
        taskInfo.classList.add('flex');

        // TASKS DUE DATE
        taskDate.classList.add('due-date', 'padding-right');
        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].date !== undefined) {
          taskDate.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].date;
        } else {
          taskDate.textContent = '';
        }

        // TASK EDIT ICON
        taskEditIcon.classList.add(
          'fal',
          'fa-edit',
          'edit-task',
          'task-icon',
          'scale-element',
          'padding-right'
        );
        taskEditIcon.setAttribute('data-project-index', i);
        taskEditIcon.setAttribute('data-task-index', j);

        // TASK DELETE ICON
        taskTrashIcon.classList.add(
          'fal',
          'fa-trash-alt',
          'delete-task',
          'task-icon',
          'scale-element',
          'padding-right'
        );
        taskTrashIcon.setAttribute('data-project-index', i);
        taskTrashIcon.setAttribute('data-task-index', j);

        // TASK INFO ICON
        taskInfoIcon.classList.add(
          'fal',
          'task-icon',
          'scale-element',
          'fa-info-circle'
          );
        taskInfoIcon.setAttribute('data-project-index', i);
        taskInfoIcon.setAttribute('data-task-index', j);

        // APPENDS
        taskIconAndTextDiv.appendChild(taskIcon);
        taskIconAndTextDiv.appendChild(taskText);
        taskInfo.appendChild(taskDate);
        taskInfo.appendChild(taskEditIcon);
        taskInfo.appendChild(taskTrashIcon);
        taskInfo.appendChild(taskInfoIcon);
        taskDiv.appendChild(taskIconAndTextDiv);
        taskDiv.appendChild(taskInfo);
        tasksList.appendChild(taskDiv);

        // TASK COMPLETION
        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].completed === false) {
          taskText.classList.remove('task-done-text');
          taskIcon.classList.add('fal' ,'fa-circle', 'padding-right');
        } else {
          taskText.classList.add('task-done-text');
          taskIcon.classList.add('fal', 'fa-check-circle', 'padding-right');
        }
      }
    }
    manipulateModal('close');
  }

  function getTasks(menuTitle, projectIndex) {
    let projectIndexStart;
    let projectIndexEnd;

    // IF CLICKED ON PROJECT LINK
    if (menuTitle === 'project') {
      projectIndexStart = projectIndex;
      projectIndexEnd = projectIndex + 1;

      // IF PROJECT DOESN'T HAVE ANY TASKS
      if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.length === 0) {
        tasksCount.textContent = 0;
      }

      // IF CLICKED ON MENU LINK
    } else {
      projectIndexStart = 0;
      projectIndexEnd = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length;
    }
    showTasks(menuTitle, projectIndexStart, projectIndexEnd);
  }

  function selectLink(target, index, action) {
    const allLinks = document.querySelectorAll('.link');
    const allProjectsLinks = document.querySelectorAll('.project-link');
    const menuTitle = target.getAttribute('data-title');

    addTaskButton.classList.add('hide'); // By default 'Add Task' button is hidden

    allLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });

    // IF CLICKED DIRECTLY ON LINK (BOTH - MENU OR PROJECT)
    if (target.classList.contains('link')) {
      target.classList.add('selected-link');

      // IF WAS CLICKED TO EDIT PROJECT LINK
      if (action === 'edit') {
        allProjectsLinks[index].classList.add('selected-link'); // Keep project visually selected after editing
      }

      // IF CLICKED ON MENU LINK ICON OR TEXT
    } else if (
      target.classList.contains('menu-link-icon') ||
      target.classList.contains('menu-link-text')
    ) {
      target.parentElement.classList.add('selected-link');
    }

    // IF CLICKED SOMEWHERE ON PROJECT LINK
    if (target.classList.contains('project')) {
      addTaskButton.classList.remove('hide'); // Show button to add task for selected project
      getTasks('project', index);

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
      getTasks(menuTitle);
    }
  }

  function validateModal(modalAction, projectIndex, taskIndex, clickedLink) {
    const { projectFormIcon } = document.forms.form;
    const projectDomIcon = projectFormIcon.value;
    const projectIconsDiv = modal.querySelector('.radio-form');
    const modalTitleText = modalTitle.value;
    const projectDeletionText = document.querySelector('.project-deletion-text');
    const menuLinkAll = document.querySelector('.link:first-child');

    // CHECK FOR MODAL TITLE ERROR IF MODAL FORM IS SHOWN
    if (!form.classList.contains('hide') &&
        modalTitleText === ''
    ) {
      modalTitleError.classList.remove('hide');
      modalTitleError.classList.add('show');

      // ADD PROJECT TO ARRAY
    } else if (
      modalAction === 'add' &&
      projectIconsDiv.classList.contains('show')
    ) {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectDomIcon, modalTitleText);

      // KEEP NEWLY ADDED PROJECT VISUALLY SELECTED
      const lastProject = projectsLinksDiv.lastChild;
      const lastProjectIndex = projectsLinksDiv.lastChild.getAttribute('data-link-index');

      selectLink(lastProject, lastProjectIndex);
      changeMainTitle(lastProject, lastProjectIndex);

    } // EDIT PROJECT IN PROJECTS ARRAY
      else if (modalAction === 'edit' &&
        projectIconsDiv.classList.contains('show')
    ) {
      const allProjectsLinks = document.querySelectorAll('.project-link');
      const editedProject = allProjectsLinks[projectIndex];

      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(projectDomIcon, modalTitleText, projectIndex, clickedLink);
      changeMainTitle(editedProject, projectIndex);

      // DELETE PROJECT FROM PROJECTS ARRAY
    } else if (
      modalAction === 'delete' &&
      !projectDeletionText.classList.contains('hide')
    ) {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(projectIndex);
      menuLinkAll.classList.add('selected-link');
      addTaskButton.classList.add('hide');

      // ADD TASK TO ARRAY
    } else if (
      modalAction === 'add' &&
      projectIconsDiv.classList.contains('hide')
    ) {
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
        modalTitleText,
        taskDescription.value,
        taskDueDate.value,
        taskPriority,
        projectIndex
      );
      getTasks('project', projectIndex);

      // IF TASK IS GOING TO BE EDITED OR DELETED
    } else if (modalAction === 'edit' ||
      modalAction === 'delete') {
      let menuTitle;

      // IF TASK IS GOING TO BE EDITED OR DELETED FROM CLICKED MENU LINK
      if (clickedLink.classList.contains('menu-link')) {
        menuTitle = clickedLink.getAttribute('data-title');

        // IF TASK IS GOING TO BE EDITED OR DELETED FROM CLICKED PROJECT LINK
      } else if (clickedLink.classList.contains('project-link')) {
        menuTitle = 'project';
      }

      // EDIT TASK IN TASKS ARRAY
      if (modalAction === 'edit') {
        const taskNewTitle = modalTitle.value;
        const taskNewDescription = taskDescription.value;
        const taskNewDate = taskDueDate.value;
        const taskNewPriority = taskPrioritySelection.value;

        _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].editTask(
          taskNewTitle,
          taskNewDescription,
          taskNewDate,
          taskNewPriority,
          projectIndex,
          taskIndex
        );

        // DELETE TASK FROM TASKS ARRAY
      } else if (modalAction === 'delete') {
        _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTask(projectIndex, taskIndex);
      }
      getTasks(menuTitle, projectIndex);
    }
  }

  function showProjects() {
    const projectsCount = document.querySelector('.projects-count');

    // SHOW NUMBER OF PROJECTS
    projectsCount.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length;
    projectsLinksDiv.textContent = '';

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
      projectIconAndTextDiv.setAttribute('data-link-index', i);
      projectIconsDiv.classList.add(
        'project-default-icons-div',
        'project',
        'select'
      );
      projectIconsDiv.setAttribute('data-link-index', i);

      // PROJECT LINK
      projectLink.classList.add('link', 'project-link', 'project', 'select');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-link-index', i);

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
      projectIcon.setAttribute('data-link-index', i);

      // PROJECT TEXT
      projectText.classList.add('project-text', 'project', 'select');
      projectText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].title;
      projectText.setAttribute('data-link-index', i);

      // PROJECT DEFAULT ICONS
      projectEditIcon.classList.add(
        'fal',
        'fa-edit',
        'project',
        'project-icon',
        'edit-project',
        'select',
        'scale-element',
        'padding-right'
      );
      projectEditIcon.setAttribute('data-link-index', i);
      projectTrashIcon.classList.add(
        'fal',
        'fa-trash-alt',
        'project',
        'project-icon',
        'delete-project',
        'select',
        'scale-element'
      );
      projectTrashIcon.setAttribute('data-link-index', i);

      // APPENDS
      projectIconsDiv.appendChild(projectEditIcon);
      projectIconsDiv.appendChild(projectTrashIcon);
      projectIconAndTextDiv.appendChild(projectIcon);
      projectIconAndTextDiv.appendChild(projectText);
      projectLink.appendChild(projectIconAndTextDiv);
      projectLink.appendChild(projectIconsDiv);
      projectsLinksDiv.appendChild(projectLink);
    }
    manipulateModal('close');
  }

  return {
    responsiveMenu,
    toggleMenu,
    showMainTitle,
    changeMainTitle,
    manipulateModal,
    showTasks,
    getTasks,
    selectLink,
    validateModal,
    showProjects
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
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



const handlers = (() => {
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_0__["default"].responsiveMenu);
  }

  function listenClicks() {
    // VARIABLES NOT BE OVERWRITTEN AFTER CLICK EVENT
    let projectIndex;
    let taskIndex;

    document.addEventListener('click', (event) => {
      const { target } = event;
      const modalMainTitle = document.querySelector('.modal-main-title');
      const selectedLink = document.querySelector('.selected-link');
      const linkIndex = parseInt(target.getAttribute('data-link-index'), 10);

      // TOGGLE SIDE MENU
      if (
        target.classList.contains('toggle-menu') ||
        target.classList.contains('burger-line')
      ) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].toggleMenu();
      }

      // STYLE CLICKED LINK
      if (target.classList.contains('select')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].selectLink(target, linkIndex);
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMainTitle(target, linkIndex); // In the main content show title according to selected link title
      }

      // MODAL FOR ADDING PROJECT
      if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Project', 'Add');

        // MODALS FOR PROJECT EDITING AND DELETING
      } else if (target.classList.contains('project-icon')) {
        projectIndex = parseInt(target.getAttribute('data-link-index'), 10);

        // MODAL FOR EDITING PROJECT
        if (target.classList.contains('edit-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Edit Project', 'Edit', projectIndex);

          // MODAL FOR DELETING PROJECT
        } else if (target.classList.contains('delete-project')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Project', 'Delete', projectIndex);
        }
      }

      // MODALS FOR TASKS EDITING, DELETING AND WATCHING INFO
      if (target.classList.contains('task-icon')) {
        projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
        taskIndex = parseInt(target.getAttribute('data-task-index'), 10);

        // MODAL FOR ADDING TASK
        if (target.classList.contains('add-task')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Task', 'Add');

          // MODAL FOR EDITING TASK
        } else if (target.classList.contains('edit-task')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Edit Task', 'Edit', projectIndex, taskIndex);

          // MODAL FOR DELETING TASK
        } else if (target.classList.contains('delete-task')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Task', 'Delete', projectIndex, taskIndex);

          // MODAL FOR WATCHING TASK INFO
        } else if (target.classList.contains('fa-info-circle')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);
        }
      }

      // VALIDATE MODAL
      if (target.classList.contains('confirm-modal')) {

        // VALIDATE MODAL FOR ADDING
        if (target.textContent === 'Add') {
          projectIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('add', projectIndex, '', selectedLink);

          // VALIDATE MODAL FOR EDITING
        } else if (target.textContent === 'Edit') {

          // EDIT PROJECT
          if (modalMainTitle.textContent === 'Edit Project') {
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('edit', projectIndex, '', selectedLink);

            // EDIT TASK
          } else if (modalMainTitle.textContent === 'Edit Task') {
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('edit', projectIndex, taskIndex, selectedLink);
          }

          // VALIDATE MODAL FOR DELETING
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE PROJECT
          if (!projectDeletionText.classList.contains('hide')) {
            projectIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('delete', projectIndex, '', selectedLink);
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showMainTitle(0); // After deleting a project - show main title as 'All'
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getTasks('all'); // After deleting a project - show all tasks from all remaining projects

            // DELETE TASK
          } else if (projectDeletionText.classList.contains('hide')) {
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('delete', projectIndex, taskIndex, selectedLink);
          }
        }
      }

      // CLOSE MODAL
      if (target.classList.contains('close')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('close');
      }

      // MARK TASK AS COMPLETED
      if (target.classList.contains('task-div') ||
        target.classList.contains('fa-circle') ||
        target.classList.contains('fa-check-circle') ||
        target.classList.contains('task-text')
      ) {
        projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
        taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
        _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].toggleTaskCompletion(projectIndex, taskIndex, selectedLink);
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

  function editProject(icon, title, index, link) {
    projectsList[index].icon = icon;
    projectsList[index].title = title;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showProjects();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].selectLink(link, index, 'edit');
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
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



const tasks = (() => {
  class Task {
    constructor(title, description, date, priority, projectIndex, taskIndex) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
      this.projectIndex = projectIndex;
      this.taskIndex = taskIndex;
      this.completed = false;
    }
  }

  function addTask(title, description, date, priority, projectIndex, taskIndex) {
    const task = new Task(title, description, date, priority, projectIndex, taskIndex);
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.push(task);
  }

  function editTask(title, description, date, priority, projectIndex, taskIndex) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title = title;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].description = description;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].date = date;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority = priority;
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getTasks('project', projectIndex);
  }

  function deleteTask(projectIndex, taskIndex) {
    if (projectIndex > -1) {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.splice(taskIndex, 1);
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getTasks('all');
    }
  }

  function toggleTaskCompletion(projectIndex, taskIndex, selectedLink) {
    let clickedLink;

    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].completed === false) {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].completed = true;
    } else {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].completed = false;
    }

    if (selectedLink.classList.contains('project')) {
      clickedLink = 'project';
    } else {
      clickedLink = selectedLink.getAttribute('data-title');
    }
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getTasks(clickedLink, projectIndex);
  }

  return {
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion
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
_projects__WEBPACK_IMPORTED_MODULE_2__["default"].addProject('fa-tools', 'Craft Another Project');

// ADD DEFAULT TASK (EXAMPLE)
_tasks__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(
  'Enjoy my tea as much as my coding! 🍵',
  'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ',
  '2011-11-11',
  'low',
  0,
  0
);
_tasks__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(
  'Create magic through my mind, my heart and my keyboard.. 👩🏻‍💻',
  'Another longer description of my demo task, just to show you this surprisingly nice scrollbar and cute little birdie ϵ( ‘Θ’ )϶♪♫',
  '2012-12-12',
  'high',
  1,
  0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3pCLElBQUksOERBQXFCO0FBQ3pCLElBQUksOERBQXFCO0FBQ3pCLElBQUkscURBQVk7QUFDaEI7O0FBRUE7QUFDQTtBQUNBLE1BQU0sOERBQXFCO0FBQzNCLE1BQU0scURBQVk7QUFDbEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFFBQVEsOERBQXFCO0FBQzdCLE1BQU0sOERBQXFCO0FBQzNCLE1BQU07QUFDTixNQUFNLDhEQUFxQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJLHFEQUFZO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7O1VDN0RyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ1U7QUFDQTtBQUNOOztBQUU1QjtBQUNBLDREQUFtQjtBQUNuQiw0REFBbUI7O0FBRW5CO0FBQ0Esc0RBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBaUI7O0FBRWpCO0FBQ0EscURBQVk7O0FBRVosMkRBQWtCO0FBQ2xCLDhEQUFxQjtBQUNyQiw4REFBcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHRvZ2dsZU1lbnVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1tZW51Jyk7XG4gIGNvbnN0IHNpZGViYXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXItbWVudScpO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbCcpO1xuICBjb25zdCBmb3JtID0gbW9kYWwucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcbiAgY29uc3QgbW9kYWxUaXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC10aXRsZScpO1xuICBjb25zdCBtb2RhbFRpdGxlRXJyb3IgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUtZXJyb3InKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbicpO1xuICBjb25zdCBtYWluVGl0bGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtaWNvbicpO1xuICBjb25zdCBtYWluVGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtdGV4dCcpO1xuICBjb25zdCBwcm9qZWN0c0xpbmtzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWxpbmtzLWRpdicpO1xuICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrJyk7XG4gIGNvbnN0IHRhc2tzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MtY291bnQnKTtcbiAgY29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWxpc3QnKTtcbiAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnRhc2stZGVzY3JpcHRpb24nKTtcbiAgY29uc3QgdGFza0R1ZURhdGUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZHVlRGF0ZScpO1xuICBjb25zdCB0YXNrUHJpb3JpdHlTZWxlY3Rpb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudGFzay1wcmlvcml0eScpO1xuXG4gIGZ1bmN0aW9uIHJlc3BvbnNpdmVNZW51KCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMDAwKSB7XG4gICAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2FkZC16LWluZGV4Jyk7XG5cbiAgICAgIC8vIEVYUEFORCBNQUlOIENPTlRFTlRcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZC1tYWluJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBJVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC16LWluZGV4Jyk7XG5cbiAgICAgIC8vIENPTlRSQUNUIE1BSU4gQ09OVEVOVCBBTkQgTUFLRSBJVCBPUEFRVUVcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblxuICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBNQUlOIENPTlRFTlQgQSBCSVQgVFJBTlNQQVJFTlRcbiAgICBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlLXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlLW1haW4nKTtcblxuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBPUEFRVUVcbiAgICB9IGVsc2UgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1zaWRlYmFyJykpIHtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gTUFJTiBDT05URU5UIFRJVExFXG4gIGZ1bmN0aW9uIHNob3dNYWluVGl0bGUoaW5kZXgpIHtcbiAgICBjb25zdCBhbGxNZW51SWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1saW5rLWljb24nKTtcbiAgICBjb25zdCBtZW51SWNvbiA9IGFsbE1lbnVJY29uc1tpbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLWljb24nKTtcbiAgICBjb25zdCBtZW51VGV4dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1saW5rLXRleHQnKTtcblxuICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICdmYWwnLFxuICAgICAgJ2ZhLWZ3JyxcbiAgICAgICdtYWluLXRpdGxlLWljb24nLFxuICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgbWVudUljb25cbiAgICApO1xuICAgIG1haW5UaXRsZVRleHQudGV4dENvbnRlbnQgPSBtZW51VGV4dHNbaW5kZXhdLnRleHRDb250ZW50O1xuICAgIGRvY3VtZW50LnRpdGxlID0gYFRvRG8gLSAke21haW5UaXRsZVRleHQudGV4dENvbnRlbnR9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KSB7XG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc05hbWUgPSAnJztcblxuICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gVEhFIE1FTlVcbiAgICBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmsnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgc2hvd01haW5UaXRsZShpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBQUk9KRUNUU1xuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKVxuICAgICkge1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG5cbiAgICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS1mdycsXG4gICAgICAgICdtYWluLXRpdGxlLWljb24nLFxuICAgICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICAgIHByb2plY3RJY29uXG4gICAgICApO1xuICAgICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IGBUb0RvIC0gJHttYWluVGl0bGVUZXh0LnRleHRDb250ZW50fWA7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2F0Y2hUYXNrSW5mbyhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IGluZm9UYXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXRpdGxlJyk7XG4gICAgY29uc3QgaW5mb1Rhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBpbmZvVGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLWR1ZS1kYXRlJyk7XG4gICAgY29uc3QgaW5mb1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stcHJpb3JpdHknKTtcbiAgICBjb25zdCBpbmZvVGFza1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXByb2plY3QnKTtcblxuICAgIC8vIFRBU0sgVElUTEVcbiAgICBpbmZvVGFza1RpdGxlLnRleHRDb250ZW50ID1cbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG5cbiAgICAvLyBUQVNLIERFU0NSSVBUSU9OXG4gICAgaW5mb1Rhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2NyaXB0aW9uO1xuXG4gICAgLy8gVEFTSyBEVUUgREFURVxuICAgIGluZm9UYXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRhdGU7XG5cbiAgICAvLyBUQVNLIFBSSU9SSVRZXG4gICAgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2xvdydcbiAgICApIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSSBjYW4gZG8gaXQgbGF0ZXIgb3IgbmV2ZXIgYXQgYWxsLi4g8J+YtCc7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPT09ICdtZWRpdW0nXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgc3RheSBzb21ld2hlcmUgYmV0d2VlbiByZWxheGF0aW9uIGFuZCBmb2N1cyDwn5iFJztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2hpZ2gnXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgbXVzdCBkbyBpdCAtIHNvb25lciBvciBsYXRlciEg8J+Ysic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG5cbiAgICAvLyBUQVNLIFBST0pFQ1RcbiAgICBpbmZvVGFza1Byb2plY3QudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hbmlwdWxhdGVNb2RhbChtb2RhbFN0YXRlLCBtb2RhbFRhc2ssIG1vZGFsQWN0aW9uLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuICAgIGNvbnN0IG1vZGFsTWFpblRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLW1haW4tdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFRhc2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFzay1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IHRhc2tEZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgdGFza0luZm9EaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuaW5mby1kaXYnKTtcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW1vZGFsJyk7XG5cbiAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicsICdoaWRlJyk7XG5cbiAgICBpZiAobW9kYWxTdGF0ZSA9PT0gJ3Nob3cnKSB7XG4gICAgICBjb25zdCBtb2RhbEljb25zRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhZGlvLWZvcm0nKTtcbiAgICAgIGNvbnN0IG1vZGFsVGFza3NEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFza3MtZGl2Jyk7XG5cbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsTWFpblRpdGxlLnRleHRDb250ZW50ID0gbW9kYWxUYXNrO1xuICAgICAgbW9kYWxUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gbW9kYWxBY3Rpb247XG4gICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgbW9kYWxUYXNrc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgICAgIC8vIElGIE1PREFMIElTIEZPUiBFRElUSU5HIFBST0pFQ1RcbiAgICAgIGlmIChtb2RhbFRhc2sgPT09ICdFZGl0IFByb2plY3QnKSB7XG4gICAgICAgIGNvbnN0IGFsbFByb2plY3RJY29ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0uaWNvbjtcblxuICAgICAgICAvLyBTSE9XIEVESVRBQkxFIFBST0pFQ1QgVElUTEVcbiAgICAgICAgbW9kYWxUaXRsZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuXG4gICAgICAgIC8vIFNFTEVDVCBFRElUQUJMRSBQUk9KRUNUIElDT05cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0SWNvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoYWxsUHJvamVjdEljb25zW2ldLnZhbHVlID09PSBwcm9qZWN0SWNvbikge1xuICAgICAgICAgICAgYWxsUHJvamVjdEljb25zW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAvLyBJRiBNT0RBTCBJUyBGT1IgQURESU5HIE9SIEVESVRJTkcgVEFTS1xuICAgICAgfSBlbHNlIGlmIChtb2RhbFRhc2sgPT09ICdBZGQgVGFzayd8fFxuICAgICAgICAgIG1vZGFsVGFzayA9PT0gJ0VkaXQgVGFzaydcbiAgICAgICkge1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmIChtb2RhbFRhc2sgPT09ICdFZGl0IFRhc2snKSB7XG4gICAgICAgICAgbW9kYWxUaXRsZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnZhbHVlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICB0YXNrRHVlRGF0ZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGF0ZTtcbiAgICAgICAgICB0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSUYgTU9EQUwgSVMgRk9SIFdBVENISU5HIFRBU0sgSU5GT1xuICAgICAgfSBlbHNlIGlmIChtb2RhbFRhc2sgPT09ICdUYXNrIEluZm8nKSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB3YXRjaFRhc2tJbmZvKHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBERUxFVElPTiBNT0RBTCBDT05URU5UXG4gICAgaWYgKG1vZGFsQWN0aW9uID09PSAnRGVsZXRlJykge1xuICAgICAgbW9kYWxIZWFkZXIuY2xhc3NMaXN0LmFkZCgnZGVsZXRpb24tbW9kYWwtaGVhZGVyJyk7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjYW5jZWwtZGVsZXRpb24nKTtcbiAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnY29uZmlybS1kZWxldGlvbicpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFTEVUSU9OXG4gICAgICBpZiAobW9kYWxUYXNrID09PSAnRGVsZXRlIFByb2plY3QnKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REZWxldGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGl0bGUnKTtcblxuICAgICAgICBwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcHJvamVjdERlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcblxuICAgICAgICAvLyBUQVNLIERFTEVUSU9OXG4gICAgICB9IGVsc2UgaWYgKG1vZGFsVGFzayA9PT0gJ0RlbGV0ZSBUYXNrJykge1xuICAgICAgICBjb25zdCB0YXNrRGVsZXRpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlbGV0aW9uLXRpdGxlJyk7XG5cbiAgICAgICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHRhc2tEZWxldGlvblRpdGxlLnRleHRDb250ZW50ID1cbiAgICAgICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnRpdGxlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPIENMT1NFIFRIRSBNT0RBTFxuICAgIGlmIChtb2RhbFN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Rhc2tzKG1lbnVUaXRsZSwgcHJvamVjdEluZGV4U3RhcnQsIHByb2plY3RJbmRleEVuZCkge1xuICAgIGxldCB0YXNrc051bWJlciA9IDA7XG5cbiAgICB0YXNrc0NvdW50LnRleHRDb250ZW50ID0gMDtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcblxuICAgIC8vIEdFTkVSQVRFIFRBU0tTIExJU1RcbiAgICBmb3IgKGxldCBpID0gcHJvamVjdEluZGV4U3RhcnQ7IGkgPCBwcm9qZWN0SW5kZXhFbmQ7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3MubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ0lNUE9SVEFOVCcgLSBGSUxURVIgTk9UIElNUE9SVEFOVCBUQVNLU1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbWVudVRpdGxlID09PSAnaW1wb3J0YW50JyAmJlxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSAhPT0gJ2hpZ2gnXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnRpbnVlOyAvLyBJZiB0YXNrIGlzbid0IGltcG9ydGFudCAtIHNraXAgaXRcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdUT0RBWSdcbiAgICAgICAgfSBlbHNlIGlmIChtZW51VGl0bGUgPT09ICd0b2RheScpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnVGFza3MgZm9yIHRvZGF5Li4nKTtcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdXRUVLJ1xuICAgICAgICB9IGVsc2UgaWYgKG1lbnVUaXRsZSA9PT0gJ3dlZWsnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2tzIG9mIHRoZSB3ZWVrLi4nKTtcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdDT01QTEVURUQnXG4gICAgICAgIH0gZWxzZSBpZiAobWVudVRpdGxlID09PSAnY29tcGxldGVkJyAmJlxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5jb21wbGV0ZWQgIT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29udGludWU7IC8vIElmIHRhc2sgaXNuJ3QgY29tcGxldGVkIC0gc2tpcCBpdFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB0YXNrSWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCB0YXNrSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdGFza0VkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrVHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrSW5mb0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cbiAgICAgICAgLy8gU0hPVyBOVU1CRVIgT0YgVEFTS1NcbiAgICAgICAgdGFza3NOdW1iZXIgKz0gMTtcbiAgICAgICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IHRhc2tzTnVtYmVyO1xuXG4gICAgICAgIC8vIFRBU0sgUFJJT1JJVFksIFRFWFQgQU5EIElUUyBESVZcbiAgICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRpdicsICdob3Zlci1lbGVtZW50Jyk7XG4gICAgICAgIHRhc2tJY29uQW5kVGV4dERpdi5jbGFzc0xpc3QuYWRkKCdmbGV4Jyk7XG4gICAgICAgIHRhc2tEaXYuc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcsIGopO1xuXG4gICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgPT09ICdsb3cnKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnbG93LXByaW9yaXR5Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ID09PSAnbWVkaXVtJykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ21pZC1wcmlvcml0eScpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnaGlnaC1wcmlvcml0eScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFza0ljb24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza0ljb24uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnLCBqKTtcblxuICAgICAgICB0YXNrVGV4dC5jbGFzc0xpc3QuYWRkKCd0YXNrLXRleHQnKTtcbiAgICAgICAgdGFza1RleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0udGl0bGU7XG4gICAgICAgIHRhc2tUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JywgaSk7XG4gICAgICAgIHRhc2tUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG5cbiAgICAgICAgLy8gVEFTSyBJTkZPIERJVlxuICAgICAgICB0YXNrSW5mby5jbGFzc0xpc3QuYWRkKCdmbGV4Jyk7XG5cbiAgICAgICAgLy8gVEFTS1MgRFVFIERBVEVcbiAgICAgICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZCgnZHVlLWRhdGUnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLmRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLmRhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRBU0sgRURJVCBJQ09OXG4gICAgICAgIHRhc2tFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICdmYS1lZGl0JyxcbiAgICAgICAgICAnZWRpdC10YXNrJyxcbiAgICAgICAgICAndGFzay1pY29uJyxcbiAgICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrRWRpdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnLCBqKTtcblxuICAgICAgICAvLyBUQVNLIERFTEVURSBJQ09OXG4gICAgICAgIHRhc2tUcmFzaEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAnZmEtdHJhc2gtYWx0JyxcbiAgICAgICAgICAnZGVsZXRlLXRhc2snLFxuICAgICAgICAgICd0YXNrLWljb24nLFxuICAgICAgICAgICdzY2FsZS1lbGVtZW50JyxcbiAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgKTtcbiAgICAgICAgdGFza1RyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrVHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG5cbiAgICAgICAgLy8gVEFTSyBJTkZPIElDT05cbiAgICAgICAgdGFza0luZm9JY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgJ3Rhc2staWNvbicsXG4gICAgICAgICAgJ3NjYWxlLWVsZW1lbnQnLFxuICAgICAgICAgICdmYS1pbmZvLWNpcmNsZSdcbiAgICAgICAgICApO1xuICAgICAgICB0YXNrSW5mb0ljb24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza0luZm9JY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG5cbiAgICAgICAgLy8gQVBQRU5EU1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza0ljb24pO1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza1RleHQpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tFZGl0SWNvbik7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tUcmFzaEljb24pO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrSW5mb0ljb24pO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJY29uQW5kVGV4dERpdik7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0luZm8pO1xuICAgICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG5cbiAgICAgICAgLy8gVEFTSyBDT01QTEVUSU9OXG4gICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0uY29tcGxldGVkID09PSBmYWxzZSkge1xuICAgICAgICAgIHRhc2tUZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2stZG9uZS10ZXh0Jyk7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmFsJyAsJ2ZhLWNpcmNsZScsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza1RleHQuY2xhc3NMaXN0LmFkZCgndGFzay1kb25lLXRleHQnKTtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnZmEtY2hlY2stY2lyY2xlJywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYXNrcyhtZW51VGl0bGUsIHByb2plY3RJbmRleCkge1xuICAgIGxldCBwcm9qZWN0SW5kZXhTdGFydDtcbiAgICBsZXQgcHJvamVjdEluZGV4RW5kO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIExJTktcbiAgICBpZiAobWVudVRpdGxlID09PSAncHJvamVjdCcpIHtcbiAgICAgIHByb2plY3RJbmRleFN0YXJ0ID0gcHJvamVjdEluZGV4O1xuICAgICAgcHJvamVjdEluZGV4RW5kID0gcHJvamVjdEluZGV4ICsgMTtcblxuICAgICAgLy8gSUYgUFJPSkVDVCBET0VTTidUIEhBVkUgQU5ZIFRBU0tTXG4gICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSAwO1xuICAgICAgfVxuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOS1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9qZWN0SW5kZXhTdGFydCA9IDA7XG4gICAgICBwcm9qZWN0SW5kZXhFbmQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoO1xuICAgIH1cbiAgICBzaG93VGFza3MobWVudVRpdGxlLCBwcm9qZWN0SW5kZXhTdGFydCwgcHJvamVjdEluZGV4RW5kKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdExpbmsodGFyZ2V0LCBpbmRleCwgYWN0aW9uKSB7XG4gICAgY29uc3QgYWxsTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGluaycpO1xuICAgIGNvbnN0IGFsbFByb2plY3RzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1saW5rJyk7XG4gICAgY29uc3QgbWVudVRpdGxlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpO1xuXG4gICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7IC8vIEJ5IGRlZmF1bHQgJ0FkZCBUYXNrJyBidXR0b24gaXMgaGlkZGVuXG5cbiAgICBhbGxMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9KTtcblxuICAgIC8vIElGIENMSUNLRUQgRElSRUNUTFkgT04gTElOSyAoQk9USCAtIE1FTlUgT1IgUFJPSkVDVClcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluaycpKSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAvLyBJRiBXQVMgQ0xJQ0tFRCBUTyBFRElUIFBST0pFQ1QgTElOS1xuICAgICAgaWYgKGFjdGlvbiA9PT0gJ2VkaXQnKSB7XG4gICAgICAgIGFsbFByb2plY3RzTGlua3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTsgLy8gS2VlcCBwcm9qZWN0IHZpc3VhbGx5IHNlbGVjdGVkIGFmdGVyIGVkaXRpbmdcbiAgICAgIH1cblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgSUNPTiBPUiBURVhUXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JylcbiAgICApIHtcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9XG5cbiAgICAvLyBJRiBDTElDS0VEIFNPTUVXSEVSRSBPTiBQUk9KRUNUIExJTktcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdCcpKSB7XG4gICAgICBhZGRUYXNrQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTsgLy8gU2hvdyBidXR0b24gdG8gYWRkIHRhc2sgZm9yIHNlbGVjdGVkIHByb2plY3RcbiAgICAgIGdldFRhc2tzKCdwcm9qZWN0JywgaW5kZXgpO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgSUNPTiBPUiBURVhUIE9SIEVESVQvREVMRVRFIElDT05TXG4gICAgICBpZiAoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbicpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtdGV4dCcpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JylcbiAgICAgICkge1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgRUxFTUVOVFMgRElWU1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKVxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJRiBDTElDS0VEIFNPTUVXSEVSRSBPTiBNRU5VIExJTktcbiAgICBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmsnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgZ2V0VGFza3MobWVudVRpdGxlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKG1vZGFsQWN0aW9uLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgY2xpY2tlZExpbmspIHtcbiAgICBjb25zdCB7IHByb2plY3RGb3JtSWNvbiB9ID0gZG9jdW1lbnQuZm9ybXMuZm9ybTtcbiAgICBjb25zdCBwcm9qZWN0RG9tSWNvbiA9IHByb2plY3RGb3JtSWNvbi52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0SWNvbnNEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucmFkaW8tZm9ybScpO1xuICAgIGNvbnN0IG1vZGFsVGl0bGVUZXh0ID0gbW9kYWxUaXRsZS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IG1lbnVMaW5rQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbms6Zmlyc3QtY2hpbGQnKTtcblxuICAgIC8vIENIRUNLIEZPUiBNT0RBTCBUSVRMRSBFUlJPUiBJRiBNT0RBTCBGT1JNIElTIFNIT1dOXG4gICAgaWYgKCFmb3JtLmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpICYmXG4gICAgICAgIG1vZGFsVGl0bGVUZXh0ID09PSAnJ1xuICAgICkge1xuICAgICAgbW9kYWxUaXRsZUVycm9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgIC8vIEFERCBQUk9KRUNUIFRPIEFSUkFZXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG1vZGFsQWN0aW9uID09PSAnYWRkJyAmJlxuICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpXG4gICAgKSB7XG4gICAgICBwcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3REb21JY29uLCBtb2RhbFRpdGxlVGV4dCk7XG5cbiAgICAgIC8vIEtFRVAgTkVXTFkgQURERUQgUFJPSkVDVCBWSVNVQUxMWSBTRUxFQ1RFRFxuICAgICAgY29uc3QgbGFzdFByb2plY3QgPSBwcm9qZWN0c0xpbmtzRGl2Lmxhc3RDaGlsZDtcbiAgICAgIGNvbnN0IGxhc3RQcm9qZWN0SW5kZXggPSBwcm9qZWN0c0xpbmtzRGl2Lmxhc3RDaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcpO1xuXG4gICAgICBzZWxlY3RMaW5rKGxhc3RQcm9qZWN0LCBsYXN0UHJvamVjdEluZGV4KTtcbiAgICAgIGNoYW5nZU1haW5UaXRsZShsYXN0UHJvamVjdCwgbGFzdFByb2plY3RJbmRleCk7XG5cbiAgICB9IC8vIEVESVQgUFJPSkVDVCBJTiBQUk9KRUNUUyBBUlJBWVxuICAgICAgZWxzZSBpZiAobW9kYWxBY3Rpb24gPT09ICdlZGl0JyAmJlxuICAgICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JylcbiAgICApIHtcbiAgICAgIGNvbnN0IGFsbFByb2plY3RzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1saW5rJyk7XG4gICAgICBjb25zdCBlZGl0ZWRQcm9qZWN0ID0gYWxsUHJvamVjdHNMaW5rc1twcm9qZWN0SW5kZXhdO1xuXG4gICAgICBwcm9qZWN0cy5lZGl0UHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQsIHByb2plY3RJbmRleCwgY2xpY2tlZExpbmspO1xuICAgICAgY2hhbmdlTWFpblRpdGxlKGVkaXRlZFByb2plY3QsIHByb2plY3RJbmRleCk7XG5cbiAgICAgIC8vIERFTEVURSBQUk9KRUNUIEZST00gUFJPSkVDVFMgQVJSQVlcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbW9kYWxBY3Rpb24gPT09ICdkZWxldGUnICYmXG4gICAgICAhcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKVxuICAgICkge1xuICAgICAgcHJvamVjdHMuZGVsZXRlUHJvamVjdChwcm9qZWN0SW5kZXgpO1xuICAgICAgbWVudUxpbmtBbGwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgICAgIC8vIEFERCBUQVNLIFRPIEFSUkFZXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG1vZGFsQWN0aW9uID09PSAnYWRkJyAmJlxuICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpXG4gICAgKSB7XG4gICAgICBsZXQgdGFza1ByaW9yaXR5O1xuXG4gICAgICAvLyBDSEVDSyBUQVNLIFBSSU9SSVRZXG4gICAgICBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbG93Jykge1xuICAgICAgICB0YXNrUHJpb3JpdHkgPSAnbG93JztcbiAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbWVkaXVtJykge1xuICAgICAgICB0YXNrUHJpb3JpdHkgPSAnbWVkaXVtJztcbiAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnaGlnaCcpIHtcbiAgICAgICAgdGFza1ByaW9yaXR5ID0gJ2hpZ2gnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFza1ByaW9yaXR5ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHRhc2tzLmFkZFRhc2soXG4gICAgICAgIG1vZGFsVGl0bGVUZXh0LFxuICAgICAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgIHRhc2tEdWVEYXRlLnZhbHVlLFxuICAgICAgICB0YXNrUHJpb3JpdHksXG4gICAgICAgIHByb2plY3RJbmRleFxuICAgICAgKTtcbiAgICAgIGdldFRhc2tzKCdwcm9qZWN0JywgcHJvamVjdEluZGV4KTtcblxuICAgICAgLy8gSUYgVEFTSyBJUyBHT0lORyBUTyBCRSBFRElURUQgT1IgREVMRVRFRFxuICAgIH0gZWxzZSBpZiAobW9kYWxBY3Rpb24gPT09ICdlZGl0JyB8fFxuICAgICAgbW9kYWxBY3Rpb24gPT09ICdkZWxldGUnKSB7XG4gICAgICBsZXQgbWVudVRpdGxlO1xuXG4gICAgICAvLyBJRiBUQVNLIElTIEdPSU5HIFRPIEJFIEVESVRFRCBPUiBERUxFVEVEIEZST00gQ0xJQ0tFRCBNRU5VIExJTktcbiAgICAgIGlmIChjbGlja2VkTGluay5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluaycpKSB7XG4gICAgICAgIG1lbnVUaXRsZSA9IGNsaWNrZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpO1xuXG4gICAgICAgIC8vIElGIFRBU0sgSVMgR09JTkcgVE8gQkUgRURJVEVEIE9SIERFTEVURUQgRlJPTSBDTElDS0VEIFBST0pFQ1QgTElOS1xuICAgICAgfSBlbHNlIGlmIChjbGlja2VkTGluay5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpKSB7XG4gICAgICAgIG1lbnVUaXRsZSA9ICdwcm9qZWN0JztcbiAgICAgIH1cblxuICAgICAgLy8gRURJVCBUQVNLIElOIFRBU0tTIEFSUkFZXG4gICAgICBpZiAobW9kYWxBY3Rpb24gPT09ICdlZGl0Jykge1xuICAgICAgICBjb25zdCB0YXNrTmV3VGl0bGUgPSBtb2RhbFRpdGxlLnZhbHVlO1xuICAgICAgICBjb25zdCB0YXNrTmV3RGVzY3JpcHRpb24gPSB0YXNrRGVzY3JpcHRpb24udmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tOZXdEYXRlID0gdGFza0R1ZURhdGUudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tOZXdQcmlvcml0eSA9IHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZTtcblxuICAgICAgICB0YXNrcy5lZGl0VGFzayhcbiAgICAgICAgICB0YXNrTmV3VGl0bGUsXG4gICAgICAgICAgdGFza05ld0Rlc2NyaXB0aW9uLFxuICAgICAgICAgIHRhc2tOZXdEYXRlLFxuICAgICAgICAgIHRhc2tOZXdQcmlvcml0eSxcbiAgICAgICAgICBwcm9qZWN0SW5kZXgsXG4gICAgICAgICAgdGFza0luZGV4XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gREVMRVRFIFRBU0sgRlJPTSBUQVNLUyBBUlJBWVxuICAgICAgfSBlbHNlIGlmIChtb2RhbEFjdGlvbiA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgdGFza3MuZGVsZXRlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICB9XG4gICAgICBnZXRUYXNrcyhtZW51VGl0bGUsIHByb2plY3RJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY291bnQnKTtcblxuICAgIC8vIFNIT1cgTlVNQkVSIE9GIFBST0pFQ1RTXG4gICAgcHJvamVjdHNDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgcHJvamVjdHNMaW5rc0Rpdi50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTi9URVhUIEFORCBERUZBVUxUIElDT05TIERJVlNcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCdcbiAgICAgICk7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCdcbiAgICAgICk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBMSU5LXG4gICAgICBwcm9qZWN0TGluay5jbGFzc0xpc3QuYWRkKCdsaW5rJywgJ3Byb2plY3QtbGluaycsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgSUNPTlxuICAgICAgcHJvamVjdEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS1mdycsXG4gICAgICAgICdwcm9qZWN0LWljb24nLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS5pY29uXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBURVhUXG4gICAgICBwcm9qZWN0VGV4dC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRleHQnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRpdGxlO1xuICAgICAgcHJvamVjdFRleHQuc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBERUZBVUxUIElDT05TXG4gICAgICBwcm9qZWN0RWRpdEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS1lZGl0JyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAncHJvamVjdC1pY29uJyxcbiAgICAgICAgJ2VkaXQtcHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLXRyYXNoLWFsdCcsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ3Byb2plY3QtaWNvbicsXG4gICAgICAgICdkZWxldGUtcHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAnc2NhbGUtZWxlbWVudCdcbiAgICAgICk7XG4gICAgICBwcm9qZWN0VHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIEFQUEVORFNcbiAgICAgIHByb2plY3RJY29uc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0RWRpdEljb24pO1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RUcmFzaEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RJY29uKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZChwcm9qZWN0VGV4dCk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbkFuZFRleHREaXYpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb25zRGl2KTtcbiAgICAgIHByb2plY3RzTGlua3NEaXYuYXBwZW5kQ2hpbGQocHJvamVjdExpbmspO1xuICAgIH1cbiAgICBtYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc3BvbnNpdmVNZW51LFxuICAgIHRvZ2dsZU1lbnUsXG4gICAgc2hvd01haW5UaXRsZSxcbiAgICBjaGFuZ2VNYWluVGl0bGUsXG4gICAgbWFuaXB1bGF0ZU1vZGFsLFxuICAgIHNob3dUYXNrcyxcbiAgICBnZXRUYXNrcyxcbiAgICBzZWxlY3RMaW5rLFxuICAgIHZhbGlkYXRlTW9kYWwsXG4gICAgc2hvd1Byb2plY3RzXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICAvLyBSRVNJWkUgTUVOVSBERVBFTkRJTkcgT04gV0lORE9XIFNJWkVcbiAgZnVuY3Rpb24gcmVzaXplV2luZG93KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkb20ucmVzcG9uc2l2ZU1lbnUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuQ2xpY2tzKCkge1xuICAgIC8vIFZBUklBQkxFUyBOT1QgQkUgT1ZFUldSSVRURU4gQUZURVIgQ0xJQ0sgRVZFTlRcbiAgICBsZXQgcHJvamVjdEluZGV4O1xuICAgIGxldCB0YXNrSW5kZXg7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuICAgICAgY29uc3QgbW9kYWxNYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtbWFpbi10aXRsZScpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpbmsnKTtcbiAgICAgIGNvbnN0IGxpbmtJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcpLCAxMCk7XG5cbiAgICAgIC8vIFRPR0dMRSBTSURFIE1FTlVcbiAgICAgIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLW1lbnUnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpXG4gICAgICApIHtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gU1RZTEUgQ0xJQ0tFRCBMSU5LXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0JykpIHtcbiAgICAgICAgZG9tLnNlbGVjdExpbmsodGFyZ2V0LCBsaW5rSW5kZXgpO1xuICAgICAgICBkb20uY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgbGlua0luZGV4KTsgLy8gSW4gdGhlIG1haW4gY29udGVudCBzaG93IHRpdGxlIGFjY29yZGluZyB0byBzZWxlY3RlZCBsaW5rIHRpdGxlXG4gICAgICB9XG5cbiAgICAgIC8vIE1PREFMIEZPUiBBRERJTkcgUFJPSkVDVFxuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0JykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgUHJvamVjdCcsICdBZGQnKTtcblxuICAgICAgICAvLyBNT0RBTFMgRk9SIFBST0pFQ1QgRURJVElORyBBTkQgREVMRVRJTkdcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JyksIDEwKTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgRURJVElORyBQUk9KRUNUXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0VkaXQgUHJvamVjdCcsICdFZGl0JywgcHJvamVjdEluZGV4KTtcblxuICAgICAgICAgIC8vIE1PREFMIEZPUiBERUxFVElORyBQUk9KRUNUXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFByb2plY3QnLCAnRGVsZXRlJywgcHJvamVjdEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNT0RBTFMgRk9SIFRBU0tTIEVESVRJTkcsIERFTEVUSU5HIEFORCBXQVRDSElORyBJTkZPXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFzay1pY29uJykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JyksIDEwKTtcbiAgICAgICAgdGFza0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JyksIDEwKTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgQURESU5HIFRBU0tcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10YXNrJykpIHtcbiAgICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBUYXNrJywgJ0FkZCcpO1xuXG4gICAgICAgICAgLy8gTU9EQUwgRk9SIEVESVRJTkcgVEFTS1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtdGFzaycpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdFZGl0IFRhc2snLCAnRWRpdCcsIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcblxuICAgICAgICAgIC8vIE1PREFMIEZPUiBERUxFVElORyBUQVNLXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXRhc2snKSkge1xuICAgICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFRhc2snLCAnRGVsZXRlJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuXG4gICAgICAgICAgLy8gTU9EQUwgRk9SIFdBVENISU5HIFRBU0sgSU5GT1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLWluZm8tY2lyY2xlJykpIHtcbiAgICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ1Rhc2sgSW5mbycsICcnLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVkFMSURBVEUgTU9EQUxcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLW1vZGFsJykpIHtcblxuICAgICAgICAvLyBWQUxJREFURSBNT0RBTCBGT1IgQURESU5HXG4gICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdBZGQnKSB7XG4gICAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JyksIDEwKTtcbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnYWRkJywgcHJvamVjdEluZGV4LCAnJywgc2VsZWN0ZWRMaW5rKTtcblxuICAgICAgICAgIC8vIFZBTElEQVRFIE1PREFMIEZPUiBFRElUSU5HXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRWRpdCcpIHtcblxuICAgICAgICAgIC8vIEVESVQgUFJPSkVDVFxuICAgICAgICAgIGlmIChtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9PT0gJ0VkaXQgUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdlZGl0JywgcHJvamVjdEluZGV4LCAnJywgc2VsZWN0ZWRMaW5rKTtcblxuICAgICAgICAgICAgLy8gRURJVCBUQVNLXG4gICAgICAgICAgfSBlbHNlIGlmIChtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9PT0gJ0VkaXQgVGFzaycpIHtcbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdlZGl0JywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHNlbGVjdGVkTGluayk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVkFMSURBVEUgTU9EQUwgRk9SIERFTEVUSU5HXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRGVsZXRlJykge1xuICAgICAgICAgIGNvbnN0IHByb2plY3REZWxldGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10ZXh0Jyk7XG5cbiAgICAgICAgICAvLyBERUxFVEUgUFJPSkVDVFxuICAgICAgICAgIGlmICghcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdkZWxldGUnLCBwcm9qZWN0SW5kZXgsICcnLCBzZWxlY3RlZExpbmspO1xuICAgICAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIDApOyAvLyBBZnRlciBkZWxldGluZyBhIHByb2plY3QgLSBjaGFuZ2UgaWNvbiB0byAnZmEtY2FsZW5kYXItYWx0JyAobWVudSBsaW5rICdBbGwnKVxuICAgICAgICAgICAgZG9tLnNob3dNYWluVGl0bGUoMCk7IC8vIEFmdGVyIGRlbGV0aW5nIGEgcHJvamVjdCAtIHNob3cgbWFpbiB0aXRsZSBhcyAnQWxsJ1xuICAgICAgICAgICAgZG9tLmdldFRhc2tzKCdhbGwnKTsgLy8gQWZ0ZXIgZGVsZXRpbmcgYSBwcm9qZWN0IC0gc2hvdyBhbGwgdGFza3MgZnJvbSBhbGwgcmVtYWluaW5nIHByb2plY3RzXG5cbiAgICAgICAgICAgIC8vIERFTEVURSBUQVNLXG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZGVsZXRlJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHNlbGVjdGVkTGluayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENMT1NFIE1PREFMXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICAgICAgfVxuXG4gICAgICAvLyBNQVJLIFRBU0sgQVMgQ09NUExFVEVEXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFzay1kaXYnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1jaXJjbGUnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1jaGVjay1jaXJjbGUnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLXRleHQnKVxuICAgICAgKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpLCAxMCk7XG4gICAgICAgIHRhc2tJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpLCAxMCk7XG4gICAgICAgIHRhc2tzLnRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3RJbmRleCwgdGFza0luZGV4LCBzZWxlY3RlZExpbmspO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNpemVXaW5kb3csXG4gICAgbGlzdGVuQ2xpY2tzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcnM7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgcHJvamVjdHMgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBbXTtcblxuICBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpY29uLCB0aXRsZSkge1xuICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KGljb24sIHRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KGljb24sIHRpdGxlKTtcbiAgICBwcm9qZWN0c0xpc3QucHVzaChwcm9qZWN0KTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpY29uLCB0aXRsZSwgaW5kZXgsIGxpbmspIHtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLmljb24gPSBpY29uO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0udGl0bGUgPSB0aXRsZTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gICAgZG9tLnNlbGVjdExpbmsobGluaywgaW5kZXgsICdlZGl0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHByb2plY3RzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBhZGRQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCB0YXNrcyA9ICgoKSA9PiB7XG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgdGhpcy5wcm9qZWN0SW5kZXggPSBwcm9qZWN0SW5kZXg7XG4gICAgICB0aGlzLnRhc2tJbmRleCA9IHRhc2tJbmRleDtcbiAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3MucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRhdGUgPSBkYXRlO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICBkb20uZ2V0VGFza3MoJ3Byb2plY3QnLCBwcm9qZWN0SW5kZXgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGlmIChwcm9qZWN0SW5kZXggPiAtMSkge1xuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgICBkb20uZ2V0VGFza3MoJ2FsbCcpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3RJbmRleCwgdGFza0luZGV4LCBzZWxlY3RlZExpbmspIHtcbiAgICBsZXQgY2xpY2tlZExpbms7XG5cbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5jb21wbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uY29tcGxldGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdGVkTGluay5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QnKSkge1xuICAgICAgY2xpY2tlZExpbmsgPSAncHJvamVjdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsaWNrZWRMaW5rID0gc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpO1xuICAgIH1cbiAgICBkb20uZ2V0VGFza3MoY2xpY2tlZExpbmssIHByb2plY3RJbmRleCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRhc2ssXG4gICAgZWRpdFRhc2ssXG4gICAgZGVsZXRlVGFzayxcbiAgICB0b2dnbGVUYXNrQ29tcGxldGlvblxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza3M7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuXG4vLyBBREQgREVGQVVMVCBQUk9KRUNUIChFWEFNUExFKVxucHJvamVjdHMuYWRkUHJvamVjdCgnZmEtdG9vbHMnLCAnQ3JhZnQgTmV3IFByb2plY3QnKTtcbnByb2plY3RzLmFkZFByb2plY3QoJ2ZhLXRvb2xzJywgJ0NyYWZ0IEFub3RoZXIgUHJvamVjdCcpO1xuXG4vLyBBREQgREVGQVVMVCBUQVNLIChFWEFNUExFKVxudGFza3MuYWRkVGFzayhcbiAgJ0Vuam95IG15IHRlYSBhcyBtdWNoIGFzIG15IGNvZGluZyEg8J+NtScsXG4gICdMb25nZXIgZGVzY3JpcHRpb24gb2YgbXkgZGVtbyB0YXNrLCBqdXN0IHRvIHNob3cgeW91IHRoaXMgc3VycHJpc2luZ2x5IG5pY2Ugc2Nyb2xsYmFyIGFuZCBhbWF6aW5nbHkgY3V0ZSBraXR0eSDguIUoXuKXieG0peKXiV4p4LiFJyxcbiAgJzIwMTEtMTEtMTEnLFxuICAnbG93JyxcbiAgMCxcbiAgMFxuKTtcbnRhc2tzLmFkZFRhc2soXG4gICdDcmVhdGUgbWFnaWMgdGhyb3VnaCBteSBtaW5kLCBteSBoZWFydCBhbmQgbXkga2V5Ym9hcmQuLiDwn5Gp8J+Pu+KAjfCfkrsnLFxuICAnQW5vdGhlciBsb25nZXIgZGVzY3JpcHRpb24gb2YgbXkgZGVtbyB0YXNrLCBqdXN0IHRvIHNob3cgeW91IHRoaXMgc3VycHJpc2luZ2x5IG5pY2Ugc2Nyb2xsYmFyIGFuZCBjdXRlIGxpdHRsZSBiaXJkaWUgz7UoIOKAmM6Y4oCZICnPtuKZquKZqycsXG4gICcyMDEyLTEyLTEyJyxcbiAgJ2hpZ2gnLFxuICAxLFxuICAwXG4pO1xuXG4vLyBXSEVOIFBBR0UgSVMgTE9BREVEIC0gU0hPVyBUSVRMRSBGUk9NIE1FTlUgTElOSyAnQUxMJ1xuZG9tLnNob3dNYWluVGl0bGUoMCk7XG5cbi8vIFdIRU4gUEFHRSBJUyBMT0FERUQgLSBTSE9XIEFMTCBUQVNLUyBGUk9NIEFMTCBQUk9KRUNUU1xuZG9tLmdldFRhc2tzKCdhbGwnKTtcblxuZG9tLnJlc3BvbnNpdmVNZW51KCk7XG5oYW5kbGVycy5yZXNpemVXaW5kb3coKTtcbmhhbmRsZXJzLmxpc3RlbkNsaWNrcygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9