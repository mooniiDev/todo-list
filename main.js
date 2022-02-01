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

        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'low') {
          taskIcon.classList.add(
            'fal',
            'fa-circle',
            'low-priority',
            'padding-right'
          );
        } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'medium') {
          taskIcon.classList.add(
            'fal',
            'fa-circle',
            'mid-priority',
            'padding-right'
          );
        } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority === 'high') {
          taskIcon.classList.add(
            'fal',
            'fa-circle',
            'high-priority',
            'padding-right'
          );
        } else {
          taskIcon.classList.add('fal', 'fa-circle', 'padding-right');
        }

        taskText.classList.add('task-text');
        taskText.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].title;

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
    const addTaskButton = document.querySelector('.add-task');

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
    let menuTitle = clickedLink.getAttribute('data-title');

    // MODALS TO ADD AND EDIT PROJECTS AND TASKS
    if (modalAction === 'add' || modalAction === 'edit') {
      if (modalTitleText === '') {
        modalTitleError.classList.remove('hide');
        modalTitleError.classList.add('show');

        // ADD PROJECT TO ARRAY
      } else if (
        modalAction === 'add' &&
        projectIconsDiv.classList.contains('show')
      ) {
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectDomIcon, modalTitleText);

        // KEEP NEWLY ADDED PROJECT VISUALLY SELECTED IN DOM
        const lastProject = projectsLinksDiv.lastChild;
        const lastProjectIndex = projectsLinksDiv.lastChild.getAttribute('data-link-index');

        selectLink(lastProject, lastProjectIndex);
        changeMainTitle(lastProject, lastProjectIndex);

        // EDIT PROJECT FROM ARRAY
      } else if (modalAction === 'edit' &&
        projectIconsDiv.classList.contains('show')
      ) {
        const allProjectsLinks = document.querySelectorAll('.project-link');
        const editedProject = allProjectsLinks[projectIndex];

        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(projectDomIcon, modalTitleText, projectIndex, clickedLink);
        changeMainTitle(editedProject, projectIndex);

        // ADD TASK TO ARRAY
      } else if (
        modalAction === 'add' &&
        projectIconsDiv.classList.contains('hide')
      ) {
        const selectedLink = document.querySelector('.selected-link');
        const selectedProject = selectedLink.getAttribute('data-link-index');
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
          selectedProject,
          modalTitleText,
          taskDescription.value,
          taskDueDate.value,
          taskPriority
        );

        // EDIT TASK FROM ARRAY
      } else if (modalAction === 'edit' &&
        projectIconsDiv.classList.contains('hide')
      ) {
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
      }

      // MODALS TO DELETE PROJECTS AND TASKS
      // DELETE PROJECT FROM ARRAY
    } else if (
      modalAction === 'delete' &&
      !projectDeletionText.classList.contains('hide')
    ) {
      const allTasksLink = document.querySelector('.link:first-child');

      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(projectIndex);
      allTasksLink.classList.add('selected-link');

      // DELETE TASK FROM ARRAY
    } else if (
      modalAction === 'delete' &&
      projectDeletionText.classList.contains('hide')
    ) {
      _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTask(projectIndex, taskIndex);

      // IF TASK DELETED FROM CLICKED MENU LINK
      if (clickedLink.classList.contains('menu-link')) {
        menuTitle = clickedLink.getAttribute('data-title');

        // IF TASK DELETED FROM CLICKED PROJECTS LINK
      } else if (clickedLink.classList.contains('project-link')) {
        menuTitle = 'project';
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
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('add');

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

  return {
    addTask,
    editTask,
    deleteTask,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ047O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw4REFBcUI7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDhEQUFxQjtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSw4REFBcUI7O0FBRTNCO0FBQ0E7QUFDQSxNQUFNLDhEQUFxQjs7QUFFM0I7QUFDQTtBQUNBLE1BQU0sOERBQXFCOztBQUUzQjtBQUNBO0FBQ0EsTUFBTSw4REFBcUI7QUFDM0I7QUFDQTtBQUNBLE1BQU07QUFDTixNQUFNLDhEQUFxQjtBQUMzQjtBQUNBO0FBQ0EsTUFBTTtBQUNOLE1BQU0sOERBQXFCO0FBQzNCO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyw4REFBcUI7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw4REFBcUI7O0FBRWpEO0FBQ0EsMkJBQTJCLDhEQUFxQjs7QUFFaEQ7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsOERBQXFCO0FBQ2xELGtDQUFrQyw4REFBcUI7QUFDdkQsOEJBQThCLDhEQUFxQjtBQUNuRCx3Q0FBd0MsOERBQXFCO0FBQzdEOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLDhEQUFxQjs7QUFFaEU7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBLFVBQVUsOERBQXFCO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MscUJBQXFCO0FBQ3pELHNCQUFzQixJQUFJLDhEQUFxQixrQkFBa0I7QUFDakU7QUFDQTtBQUNBO0FBQ0EsVUFBVSw4REFBcUI7QUFDL0I7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSw4REFBcUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxTQUFTLDhEQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFNBQVMsOERBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLDhEQUFxQjs7QUFFcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSw4REFBcUI7QUFDakMsaUNBQWlDLDhEQUFxQjtBQUN0RCxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSw4REFBcUI7QUFDL0I7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBLHdCQUF3QixxRUFBNEI7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDOztBQUV6QztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxrQkFBa0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNERBQW1COztBQUUzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLDZEQUFvQjtBQUM1Qjs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUEsUUFBUSxzREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsdURBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU0sK0RBQXNCO0FBQzVCOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU0seURBQWdCOztBQUV0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLHFFQUE0QjtBQUM1RDs7QUFFQSxvQkFBb0IsSUFBSSxxRUFBNEIsRUFBRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOERBQXFCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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O1VDMUNyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ1U7QUFDQTtBQUNOOztBQUU1QjtBQUNBLDREQUFtQjtBQUNuQiw0REFBbUI7O0FBRW5CO0FBQ0Esc0RBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBaUI7O0FBRWpCO0FBQ0EscURBQVk7O0FBRVosMkRBQWtCO0FBQ2xCLDhEQUFxQjtBQUNyQiw4REFBcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHRvZ2dsZU1lbnVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1tZW51Jyk7XG4gIGNvbnN0IHNpZGViYXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXItbWVudScpO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbCcpO1xuICBjb25zdCBmb3JtID0gbW9kYWwucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcbiAgY29uc3QgbW9kYWxUaXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC10aXRsZScpO1xuICBjb25zdCBtb2RhbFRpdGxlRXJyb3IgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUtZXJyb3InKTtcbiAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbicpO1xuICBjb25zdCBtYWluVGl0bGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtaWNvbicpO1xuICBjb25zdCBtYWluVGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdGl0bGUtdGV4dCcpO1xuICBjb25zdCBwcm9qZWN0c0xpbmtzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWxpbmtzLWRpdicpO1xuICBjb25zdCB0YXNrc0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWNvdW50Jyk7XG4gIGNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1saXN0Jyk7XG4gIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlc2NyaXB0aW9uJyk7XG4gIGNvbnN0IHRhc2tEdWVEYXRlID0gbW9kYWwucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKTtcbiAgY29uc3QgdGFza1ByaW9yaXR5U2VsZWN0aW9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnRhc2stcHJpb3JpdHknKTtcblxuICBmdW5jdGlvbiByZXNwb25zaXZlTWVudSgpIHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gMTAwMCkge1xuICAgICAgdG9nZ2xlTWVudUljb24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgIC8vIEhJREUgU0lERUJBUiBBTkQgTUFLRSBJVCBPUEFRVUVcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdhZGQtei1pbmRleCcpO1xuXG4gICAgICAvLyBFWFBBTkQgTUFJTiBDT05URU5UXG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdleHBhbmQtbWFpbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTSE9XIFNJREVCQVIgQU5EIE1BS0UgSVQgQSBCSVQgVFJBTlNQQVJFTlRcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhZGQtei1pbmRleCcpO1xuXG4gICAgICAvLyBDT05UUkFDVCBNQUlOIENPTlRFTlQgQU5EIE1BS0UgSVQgT1BBUVVFXG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmQtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udHJhY3QtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUtbWFpbicpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICAgdG9nZ2xlTWVudUljb24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG5cbiAgICAvLyBTSE9XIFNJREVCQVIgQU5EIE1BS0UgTUFJTiBDT05URU5UIEEgQklUIFRSQU5TUEFSRU5UXG4gICAgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnaGlkZS1zaWRlYmFyJykpIHtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZS1tYWluJyk7XG5cbiAgICAgIC8vIEhJREUgU0lERUJBUiBBTkQgTUFLRSBNQUlOIENPTlRFTlQgT1BBUVVFXG4gICAgfSBlbHNlIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctc2lkZWJhcicpKSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUtbWFpbicpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1BSU4gQ09OVEVOVCBUSVRMRVxuICBmdW5jdGlvbiBzaG93TWFpblRpdGxlKGluZGV4KSB7XG4gICAgY29uc3QgYWxsTWVudUljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtbGluay1pY29uJyk7XG4gICAgY29uc3QgbWVudUljb24gPSBhbGxNZW51SWNvbnNbaW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1pY29uJyk7XG4gICAgY29uc3QgbWVudVRleHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtbGluay10ZXh0Jyk7XG5cbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAnZmFsJyxcbiAgICAgICdmYS1mdycsXG4gICAgICAnbWFpbi10aXRsZS1pY29uJyxcbiAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgIG1lbnVJY29uXG4gICAgKTtcbiAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gbWVudVRleHRzW2luZGV4XS50ZXh0Q29udGVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KSB7XG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc05hbWUgPSAnJztcblxuICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gVEhFIE1FTlVcbiAgICBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmsnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgc2hvd01haW5UaXRsZShpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBQUk9KRUNUU1xuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKVxuICAgICkge1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG5cbiAgICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS1mdycsXG4gICAgICAgICdtYWluLXRpdGxlLWljb24nLFxuICAgICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICAgIHByb2plY3RJY29uXG4gICAgICApO1xuICAgICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2F0Y2hUYXNrSW5mbyhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IGluZm9UYXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXRpdGxlJyk7XG4gICAgY29uc3QgaW5mb1Rhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBpbmZvVGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLWR1ZS1kYXRlJyk7XG4gICAgY29uc3QgaW5mb1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stcHJpb3JpdHknKTtcbiAgICBjb25zdCBpbmZvVGFza1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXByb2plY3QnKTtcblxuICAgIC8vIFRBU0sgVElUTEVcbiAgICBpbmZvVGFza1RpdGxlLnRleHRDb250ZW50ID1cbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG5cbiAgICAvLyBUQVNLIERFU0NSSVBUSU9OXG4gICAgaW5mb1Rhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2NyaXB0aW9uO1xuXG4gICAgLy8gVEFTSyBEVUUgREFURVxuICAgIGluZm9UYXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRhdGU7XG5cbiAgICAvLyBUQVNLIFBSSU9SSVRZXG4gICAgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2xvdydcbiAgICApIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSSBjYW4gZG8gaXQgbGF0ZXIgb3IgbmV2ZXIgYXQgYWxsLi4g8J+YtCc7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPT09ICdtZWRpdW0nXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgc3RheSBzb21ld2hlcmUgYmV0d2VlbiByZWxheGF0aW9uIGFuZCBmb2N1cyDwn5iFJztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2hpZ2gnXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgbXVzdCBkbyBpdCAtIHNvb25lciBvciBsYXRlciEg8J+Ysic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG5cbiAgICAvLyBUQVNLIFBST0pFQ1RcbiAgICBpbmZvVGFza1Byb2plY3QudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hbmlwdWxhdGVNb2RhbChtb2RhbFN0YXRlLCBtb2RhbFRhc2ssIG1vZGFsQWN0aW9uLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuICAgIGNvbnN0IG1vZGFsTWFpblRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLW1haW4tdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFRhc2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFzay1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IHRhc2tEZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgdGFza0luZm9EaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuaW5mby1kaXYnKTtcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW1vZGFsJyk7XG5cbiAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicsICdoaWRlJyk7XG5cbiAgICBpZiAobW9kYWxTdGF0ZSA9PT0gJ3Nob3cnKSB7XG4gICAgICBjb25zdCBtb2RhbEljb25zRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhZGlvLWZvcm0nKTtcbiAgICAgIGNvbnN0IG1vZGFsVGFza3NEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFza3MtZGl2Jyk7XG5cbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsTWFpblRpdGxlLnRleHRDb250ZW50ID0gbW9kYWxUYXNrO1xuICAgICAgbW9kYWxUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gbW9kYWxBY3Rpb247XG4gICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgbW9kYWxUYXNrc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgICAgIC8vIElGIE1PREFMIElTIEZPUiBFRElUSU5HIFBST0pFQ1RcbiAgICAgIGlmIChtb2RhbFRhc2sgPT09ICdFZGl0IFByb2plY3QnKSB7XG4gICAgICAgIGNvbnN0IGFsbFByb2plY3RJY29ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0uaWNvbjtcblxuICAgICAgICAvLyBTSE9XIEVESVRBQkxFIFBST0pFQ1QgVElUTEVcbiAgICAgICAgbW9kYWxUaXRsZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuXG4gICAgICAgIC8vIFNFTEVDVCBFRElUQUJMRSBQUk9KRUNUIElDT05cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0SWNvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoYWxsUHJvamVjdEljb25zW2ldLnZhbHVlID09PSBwcm9qZWN0SWNvbikge1xuICAgICAgICAgICAgYWxsUHJvamVjdEljb25zW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAvLyBJRiBNT0RBTCBJUyBGT1IgQURESU5HIE9SIEVESVRJTkcgVEFTS1xuICAgICAgfSBlbHNlIGlmIChtb2RhbFRhc2sgPT09ICdBZGQgVGFzayd8fFxuICAgICAgICAgIG1vZGFsVGFzayA9PT0gJ0VkaXQgVGFzaydcbiAgICAgICkge1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmIChtb2RhbFRhc2sgPT09ICdFZGl0IFRhc2snKSB7XG4gICAgICAgICAgbW9kYWxUaXRsZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnZhbHVlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICB0YXNrRHVlRGF0ZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGF0ZTtcbiAgICAgICAgICB0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSUYgTU9EQUwgSVMgRk9SIFdBVENISU5HIFRBU0sgSU5GT1xuICAgICAgfSBlbHNlIGlmIChtb2RhbFRhc2sgPT09ICdUYXNrIEluZm8nKSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB3YXRjaFRhc2tJbmZvKHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBERUxFVElPTiBNT0RBTCBDT05URU5UXG4gICAgaWYgKG1vZGFsQWN0aW9uID09PSAnRGVsZXRlJykge1xuICAgICAgbW9kYWxIZWFkZXIuY2xhc3NMaXN0LmFkZCgnZGVsZXRpb24tbW9kYWwtaGVhZGVyJyk7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjYW5jZWwtZGVsZXRpb24nKTtcbiAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnY29uZmlybS1kZWxldGlvbicpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFTEVUSU9OXG4gICAgICBpZiAobW9kYWxUYXNrID09PSAnRGVsZXRlIFByb2plY3QnKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REZWxldGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGl0bGUnKTtcblxuICAgICAgICBwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcHJvamVjdERlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcblxuICAgICAgICAvLyBUQVNLIERFTEVUSU9OXG4gICAgICB9IGVsc2UgaWYgKG1vZGFsVGFzayA9PT0gJ0RlbGV0ZSBUYXNrJykge1xuICAgICAgICBjb25zdCB0YXNrRGVsZXRpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlbGV0aW9uLXRpdGxlJyk7XG5cbiAgICAgICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHRhc2tEZWxldGlvblRpdGxlLnRleHRDb250ZW50ID1cbiAgICAgICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnRpdGxlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPIENMT1NFIFRIRSBNT0RBTFxuICAgIGlmIChtb2RhbFN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Rhc2tzKG1lbnVUaXRsZSwgcHJvamVjdEluZGV4U3RhcnQsIHByb2plY3RJbmRleEVuZCkge1xuICAgIGxldCB0YXNrc051bWJlciA9IDA7XG5cbiAgICB0YXNrc0NvdW50LnRleHRDb250ZW50ID0gMDtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcblxuICAgIC8vIEdFTkVSQVRFIFRBU0tTIExJU1RcbiAgICBmb3IgKGxldCBpID0gcHJvamVjdEluZGV4U3RhcnQ7IGkgPCBwcm9qZWN0SW5kZXhFbmQ7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3MubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ0lNUE9SVEFOVCcgLSBGSUxURVIgTk9UIElNUE9SVEFOVCBUQVNLU1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbWVudVRpdGxlID09PSAnaW1wb3J0YW50JyAmJlxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSAhPT0gJ2hpZ2gnXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnRpbnVlOyAvLyBJZiB0YXNrIGlzbid0IGltcG9ydGFudCAtIHNraXAgaXRcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdUT0RBWSdcbiAgICAgICAgfSBlbHNlIGlmIChtZW51VGl0bGUgPT09ICd0b2RheScpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnVGFza3MgZm9yIHRvZGF5Li4nKTtcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdXRUVLJ1xuICAgICAgICB9IGVsc2UgaWYgKG1lbnVUaXRsZSA9PT0gJ3dlZWsnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2tzIG9mIHRoZSB3ZWVrLi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0ljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHRhc2tFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY29uc3QgdGFza1RyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY29uc3QgdGFza0luZm9JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAgIC8vIFNIT1cgTlVNQkVSIE9GIFRBU0tTXG4gICAgICAgIHRhc2tzTnVtYmVyICs9IDE7XG4gICAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSB0YXNrc051bWJlcjtcblxuICAgICAgICAvLyBUQVNLIFBSSU9SSVRZLCBURVhUIEFORCBJVFMgRElWXG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kaXYnLCAnaG92ZXItZWxlbWVudCcpO1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xuXG4gICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgPT09ICdsb3cnKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICAgJ2ZhLWNpcmNsZScsXG4gICAgICAgICAgICAnbG93LXByaW9yaXR5JyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ID09PSAnbWVkaXVtJykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAgICdmYS1jaXJjbGUnLFxuICAgICAgICAgICAgJ21pZC1wcmlvcml0eScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICAgJ2ZhLWNpcmNsZScsXG4gICAgICAgICAgICAnaGlnaC1wcmlvcml0eScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1jaXJjbGUnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFza1RleHQuY2xhc3NMaXN0LmFkZCgndGFzay10ZXh0Jyk7XG4gICAgICAgIHRhc2tUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnRpdGxlO1xuXG4gICAgICAgIC8vIFRBU0sgSU5GTyBESVZcbiAgICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xuXG4gICAgICAgIC8vIFRBU0tTIERVRSBEQVRFXG4gICAgICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ2R1ZS1kYXRlJywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5kYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5kYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUQVNLIEVESVQgSUNPTlxuICAgICAgICB0YXNrRWRpdEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAnZmEtZWRpdCcsXG4gICAgICAgICAgJ2VkaXQtdGFzaycsXG4gICAgICAgICAgJ3Rhc2staWNvbicsXG4gICAgICAgICAgJ3NjYWxlLWVsZW1lbnQnLFxuICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICApO1xuICAgICAgICB0YXNrRWRpdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza0VkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG5cbiAgICAgICAgLy8gVEFTSyBERUxFVEUgSUNPTlxuICAgICAgICB0YXNrVHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgJ2ZhLXRyYXNoLWFsdCcsXG4gICAgICAgICAgJ2RlbGV0ZS10YXNrJyxcbiAgICAgICAgICAndGFzay1pY29uJyxcbiAgICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza1RyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcsIGopO1xuXG4gICAgICAgIC8vIFRBU0sgSU5GTyBJQ09OXG4gICAgICAgIHRhc2tJbmZvSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICd0YXNrLWljb24nLFxuICAgICAgICAgICdzY2FsZS1lbGVtZW50JyxcbiAgICAgICAgICAnZmEtaW5mby1jaXJjbGUnXG4gICAgICAgICAgKTtcbiAgICAgICAgdGFza0luZm9JY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JywgaSk7XG4gICAgICAgIHRhc2tJbmZvSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcsIGopO1xuXG4gICAgICAgIC8vIEFQUEVORFNcbiAgICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHRhc2tJY29uKTtcbiAgICAgICAgdGFza0ljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcbiAgICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRWRpdEljb24pO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrVHJhc2hJY29uKTtcbiAgICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0luZm9JY29uKTtcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrSWNvbkFuZFRleHREaXYpO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJbmZvKTtcbiAgICAgICAgdGFza3NMaXN0LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgICAgfVxuICAgIH1cbiAgICBtYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYXNrcyhtZW51VGl0bGUsIHByb2plY3RJbmRleCkge1xuICAgIGxldCBwcm9qZWN0SW5kZXhTdGFydDtcbiAgICBsZXQgcHJvamVjdEluZGV4RW5kO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIExJTktcbiAgICBpZiAobWVudVRpdGxlID09PSAncHJvamVjdCcpIHtcbiAgICAgIHByb2plY3RJbmRleFN0YXJ0ID0gcHJvamVjdEluZGV4O1xuICAgICAgcHJvamVjdEluZGV4RW5kID0gcHJvamVjdEluZGV4ICsgMTtcblxuICAgICAgLy8gSUYgUFJPSkVDVCBET0VTTidUIEhBVkUgQU5ZIFRBU0tTXG4gICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSAwO1xuICAgICAgfVxuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOS1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9qZWN0SW5kZXhTdGFydCA9IDA7XG4gICAgICBwcm9qZWN0SW5kZXhFbmQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoO1xuICAgIH1cbiAgICBzaG93VGFza3MobWVudVRpdGxlLCBwcm9qZWN0SW5kZXhTdGFydCwgcHJvamVjdEluZGV4RW5kKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdExpbmsodGFyZ2V0LCBpbmRleCwgYWN0aW9uKSB7XG4gICAgY29uc3QgYWxsTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGluaycpO1xuICAgIGNvbnN0IGFsbFByb2plY3RzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1saW5rJyk7XG4gICAgY29uc3QgbWVudVRpdGxlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpO1xuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2snKTtcblxuICAgIGFkZFRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZScpOyAvLyBCeSBkZWZhdWx0ICdBZGQgVGFzaycgYnV0dG9uIGlzIGhpZGRlblxuXG4gICAgYWxsTGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgbGluay5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgfSk7XG5cbiAgICAvLyBJRiBDTElDS0VEIERJUkVDVExZIE9OIExJTksgKEJPVEggLSBNRU5VIE9SIFBST0pFQ1QpXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmsnKSkge1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgLy8gSUYgV0FTIENMSUNLRUQgVE8gRURJVCBQUk9KRUNUIExJTktcbiAgICAgIGlmIChhY3Rpb24gPT09ICdlZGl0Jykge1xuICAgICAgICBhbGxQcm9qZWN0c0xpbmtzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7IC8vIEtlZXAgcHJvamVjdCB2aXN1YWxseSBzZWxlY3RlZCBhZnRlciBlZGl0aW5nXG4gICAgICB9XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LIElDT04gT1IgVEVYVFxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpXG4gICAgKSB7XG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgfVxuXG4gICAgLy8gSUYgQ0xJQ0tFRCBTT01FV0hFUkUgT04gUFJPSkVDVCBMSU5LXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QnKSkge1xuICAgICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7IC8vIFNob3cgYnV0dG9uIHRvIGFkZCB0YXNrIGZvciBzZWxlY3RlZCBwcm9qZWN0XG4gICAgICBnZXRUYXNrcygncHJvamVjdCcsIGluZGV4KTtcblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIElDT04gT1IgVEVYVCBPUiBFRElUL0RFTEVURSBJQ09OU1xuICAgICAgaWYgKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIEVMRU1FTlRTIERJVlNcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JylcbiAgICAgICkge1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSUYgQ0xJQ0tFRCBTT01FV0hFUkUgT04gTUVOVSBMSU5LXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JylcbiAgICApIHtcbiAgICAgIGdldFRhc2tzKG1lbnVUaXRsZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVNb2RhbChtb2RhbEFjdGlvbiwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIGNsaWNrZWRMaW5rKSB7XG4gICAgY29uc3QgeyBwcm9qZWN0Rm9ybUljb24gfSA9IGRvY3VtZW50LmZvcm1zLmZvcm07XG4gICAgY29uc3QgcHJvamVjdERvbUljb24gPSBwcm9qZWN0Rm9ybUljb24udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhZGlvLWZvcm0nKTtcbiAgICBjb25zdCBtb2RhbFRpdGxlVGV4dCA9IG1vZGFsVGl0bGUudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWRlbGV0aW9uLXRleHQnKTtcbiAgICBsZXQgbWVudVRpdGxlID0gY2xpY2tlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyk7XG5cbiAgICAvLyBNT0RBTFMgVE8gQUREIEFORCBFRElUIFBST0pFQ1RTIEFORCBUQVNLU1xuICAgIGlmIChtb2RhbEFjdGlvbiA9PT0gJ2FkZCcgfHwgbW9kYWxBY3Rpb24gPT09ICdlZGl0Jykge1xuICAgICAgaWYgKG1vZGFsVGl0bGVUZXh0ID09PSAnJykge1xuICAgICAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXG4gICAgICAgIC8vIEFERCBQUk9KRUNUIFRPIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBtb2RhbEFjdGlvbiA9PT0gJ2FkZCcgJiZcbiAgICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpXG4gICAgICApIHtcbiAgICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQpO1xuXG4gICAgICAgIC8vIEtFRVAgTkVXTFkgQURERUQgUFJPSkVDVCBWSVNVQUxMWSBTRUxFQ1RFRCBJTiBET01cbiAgICAgICAgY29uc3QgbGFzdFByb2plY3QgPSBwcm9qZWN0c0xpbmtzRGl2Lmxhc3RDaGlsZDtcbiAgICAgICAgY29uc3QgbGFzdFByb2plY3RJbmRleCA9IHByb2plY3RzTGlua3NEaXYubGFzdENoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4Jyk7XG5cbiAgICAgICAgc2VsZWN0TGluayhsYXN0UHJvamVjdCwgbGFzdFByb2plY3RJbmRleCk7XG4gICAgICAgIGNoYW5nZU1haW5UaXRsZShsYXN0UHJvamVjdCwgbGFzdFByb2plY3RJbmRleCk7XG5cbiAgICAgICAgLy8gRURJVCBQUk9KRUNUIEZST00gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAobW9kYWxBY3Rpb24gPT09ICdlZGl0JyAmJlxuICAgICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JylcbiAgICAgICkge1xuICAgICAgICBjb25zdCBhbGxQcm9qZWN0c0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtbGluaycpO1xuICAgICAgICBjb25zdCBlZGl0ZWRQcm9qZWN0ID0gYWxsUHJvamVjdHNMaW5rc1twcm9qZWN0SW5kZXhdO1xuXG4gICAgICAgIHByb2plY3RzLmVkaXRQcm9qZWN0KHByb2plY3REb21JY29uLCBtb2RhbFRpdGxlVGV4dCwgcHJvamVjdEluZGV4LCBjbGlja2VkTGluayk7XG4gICAgICAgIGNoYW5nZU1haW5UaXRsZShlZGl0ZWRQcm9qZWN0LCBwcm9qZWN0SW5kZXgpO1xuXG4gICAgICAgIC8vIEFERCBUQVNLIFRPIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBtb2RhbEFjdGlvbiA9PT0gJ2FkZCcgJiZcbiAgICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpbmsnKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4Jyk7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHk7XG5cbiAgICAgICAgLy8gQ0hFQ0sgVEFTSyBQUklPUklUWVxuICAgICAgICBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbG93Jykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdsb3cnO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnbWVkaXVtJztcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdoaWdoJykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdoaWdoJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRhc2tzLmFkZFRhc2soXG4gICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0LFxuICAgICAgICAgIG1vZGFsVGl0bGVUZXh0LFxuICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgICAgICB0YXNrRHVlRGF0ZS52YWx1ZSxcbiAgICAgICAgICB0YXNrUHJpb3JpdHlcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBFRElUIFRBU0sgRlJPTSBBUlJBWVxuICAgICAgfSBlbHNlIGlmIChtb2RhbEFjdGlvbiA9PT0gJ2VkaXQnICYmXG4gICAgICAgIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHRhc2tOZXdUaXRsZSA9IG1vZGFsVGl0bGUudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tOZXdEZXNjcmlwdGlvbiA9IHRhc2tEZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza05ld0RhdGUgPSB0YXNrRHVlRGF0ZS52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza05ld1ByaW9yaXR5ID0gdGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlO1xuXG4gICAgICAgIHRhc2tzLmVkaXRUYXNrKFxuICAgICAgICAgIHRhc2tOZXdUaXRsZSxcbiAgICAgICAgICB0YXNrTmV3RGVzY3JpcHRpb24sXG4gICAgICAgICAgdGFza05ld0RhdGUsXG4gICAgICAgICAgdGFza05ld1ByaW9yaXR5LFxuICAgICAgICAgIHByb2plY3RJbmRleCxcbiAgICAgICAgICB0YXNrSW5kZXhcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gTU9EQUxTIFRPIERFTEVURSBQUk9KRUNUUyBBTkQgVEFTS1NcbiAgICAgIC8vIERFTEVURSBQUk9KRUNUIEZST00gQVJSQVlcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbW9kYWxBY3Rpb24gPT09ICdkZWxldGUnICYmXG4gICAgICAhcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKVxuICAgICkge1xuICAgICAgY29uc3QgYWxsVGFza3NMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbms6Zmlyc3QtY2hpbGQnKTtcblxuICAgICAgcHJvamVjdHMuZGVsZXRlUHJvamVjdChwcm9qZWN0SW5kZXgpO1xuICAgICAgYWxsVGFza3NMaW5rLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgLy8gREVMRVRFIFRBU0sgRlJPTSBBUlJBWVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBtb2RhbEFjdGlvbiA9PT0gJ2RlbGV0ZScgJiZcbiAgICAgIHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJylcbiAgICApIHtcbiAgICAgIHRhc2tzLmRlbGV0ZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuXG4gICAgICAvLyBJRiBUQVNLIERFTEVURUQgRlJPTSBDTElDS0VEIE1FTlUgTElOS1xuICAgICAgaWYgKGNsaWNrZWRMaW5rLmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJykpIHtcbiAgICAgICAgbWVudVRpdGxlID0gY2xpY2tlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyk7XG5cbiAgICAgICAgLy8gSUYgVEFTSyBERUxFVEVEIEZST00gQ0xJQ0tFRCBQUk9KRUNUUyBMSU5LXG4gICAgICB9IGVsc2UgaWYgKGNsaWNrZWRMaW5rLmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1saW5rJykpIHtcbiAgICAgICAgbWVudVRpdGxlID0gJ3Byb2plY3QnO1xuICAgICAgfVxuICAgICAgZ2V0VGFza3MobWVudVRpdGxlLCBwcm9qZWN0SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0c0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvdW50Jyk7XG5cbiAgICAvLyBTSE9XIE5VTUJFUiBPRiBQUk9KRUNUU1xuICAgIHByb2plY3RzQ291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoO1xuICAgIHByb2plY3RzTGlua3NEaXYudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBwcm9qZWN0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uQW5kVGV4dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgcHJvamVjdEVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgcHJvamVjdFRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcblxuXG4gICAgICAvLyBQUk9KRUNUIElDT04vVEVYVCBBTkQgREVGQVVMVCBJQ09OUyBESVZTXG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb25zRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgTElOS1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnbGluaycsICdwcm9qZWN0LWxpbmsnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT05cbiAgICAgIHByb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZncnLFxuICAgICAgICAncHJvamVjdC1pY29uJyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0uaWNvblxuICAgICAgKTtcbiAgICAgIHByb2plY3RJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgVEVYVFxuICAgICAgcHJvamVjdFRleHQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10ZXh0JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0VGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50aXRsZTtcbiAgICAgIHByb2plY3RUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgREVGQVVMVCBJQ09OU1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZWRpdCcsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ3Byb2plY3QtaWNvbicsXG4gICAgICAgICdlZGl0LXByb2plY3QnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3NjYWxlLWVsZW1lbnQnLFxuICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICk7XG4gICAgICBwcm9qZWN0RWRpdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS10cmFzaC1hbHQnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdwcm9qZWN0LWljb24nLFxuICAgICAgICAnZGVsZXRlLXByb2plY3QnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3NjYWxlLWVsZW1lbnQnXG4gICAgICApO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBBUFBFTkRTXG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdEVkaXRJY29uKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0VHJhc2hJY29uKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRleHQpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb25BbmRUZXh0RGl2KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uc0Rpdik7XG4gICAgICBwcm9qZWN0c0xpbmtzRGl2LmFwcGVuZENoaWxkKHByb2plY3RMaW5rKTtcbiAgICB9XG4gICAgbWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNwb25zaXZlTWVudSxcbiAgICB0b2dnbGVNZW51LFxuICAgIHNob3dNYWluVGl0bGUsXG4gICAgY2hhbmdlTWFpblRpdGxlLFxuICAgIG1hbmlwdWxhdGVNb2RhbCxcbiAgICBzaG93VGFza3MsXG4gICAgZ2V0VGFza3MsXG4gICAgc2VsZWN0TGluayxcbiAgICB2YWxpZGF0ZU1vZGFsLFxuICAgIHNob3dQcm9qZWN0c1xuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgLy8gUkVTSVpFIE1FTlUgREVQRU5ESU5HIE9OIFdJTkRPVyBTSVpFXG4gIGZ1bmN0aW9uIHJlc2l6ZVdpbmRvdygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZG9tLnJlc3BvbnNpdmVNZW51KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbkNsaWNrcygpIHtcbiAgICAvLyBWQVJJQUJMRVMgTk9UIEJFIE9WRVJXUklUVEVOIEFGVEVSIENMSUNLIEVWRU5UXG4gICAgbGV0IHByb2plY3RJbmRleDtcbiAgICBsZXQgdGFza0luZGV4O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcbiAgICAgIGNvbnN0IG1vZGFsTWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLW1haW4tdGl0bGUnKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saW5rJyk7XG4gICAgICBjb25zdCBsaW5rSW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnKSwgMTApO1xuXG4gICAgICAvLyBUT0dHTEUgU0lERSBNRU5VXG4gICAgICBpZiAoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS1tZW51JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyLWxpbmUnKVxuICAgICAgKSB7XG4gICAgICAgIGRvbS50b2dnbGVNZW51KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNUWUxFIENMSUNLRUQgTElOS1xuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdCcpKSB7XG4gICAgICAgIGRvbS5zZWxlY3RMaW5rKHRhcmdldCwgbGlua0luZGV4KTtcbiAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGxpbmtJbmRleCk7IC8vIEluIHRoZSBtYWluIGNvbnRlbnQgc2hvdyB0aXRsZSBhY2NvcmRpbmcgdG8gc2VsZWN0ZWQgbGluayB0aXRsZVxuICAgICAgfVxuXG4gICAgICAvLyBNT0RBTCBGT1IgQURESU5HIFBST0pFQ1RcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdCcpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnQWRkIFByb2plY3QnLCAnQWRkJyk7XG5cbiAgICAgICAgLy8gTU9EQUxTIEZPUiBQUk9KRUNUIEVESVRJTkcgQU5EIERFTEVUSU5HXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbicpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgLy8gTU9EQUwgRk9SIEVESVRJTkcgUFJPSkVDVFxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdFZGl0IFByb2plY3QnLCAnRWRpdCcsIHByb2plY3RJbmRleCk7XG5cbiAgICAgICAgICAvLyBNT0RBTCBGT1IgREVMRVRJTkcgUFJPSkVDVFxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JykpIHtcbiAgICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0RlbGV0ZSBQcm9qZWN0JywgJ0RlbGV0ZScsIHByb2plY3RJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTU9EQUxTIEZPUiBUQVNLUyBFRElUSU5HLCBERUxFVElORyBBTkQgV0FUQ0hJTkcgSU5GT1xuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2staWNvbicpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpLCAxMCk7XG4gICAgICAgIHRhc2tJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgLy8gTU9EQUwgRk9SIEFERElORyBUQVNLXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtdGFzaycpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgVGFzaycsICdBZGQnKTtcblxuICAgICAgICAgIC8vIE1PREFMIEZPUiBFRElUSU5HIFRBU0tcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhc2snKSkge1xuICAgICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRWRpdCBUYXNrJywgJ0VkaXQnLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG5cbiAgICAgICAgICAvLyBNT0RBTCBGT1IgREVMRVRJTkcgVEFTS1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS10YXNrJykpIHtcbiAgICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0RlbGV0ZSBUYXNrJywgJ0RlbGV0ZScsIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcblxuICAgICAgICAgIC8vIE1PREFMIEZPUiBXQVRDSElORyBUQVNLIElORk9cbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1pbmZvLWNpcmNsZScpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdUYXNrIEluZm8nLCAnJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFZBTElEQVRFIE1PREFMXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybS1tb2RhbCcpKSB7XG5cbiAgICAgICAgLy8gVkFMSURBVEUgTU9EQUwgRk9SIEFERElOR1xuICAgICAgICBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnQWRkJykge1xuICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdhZGQnKTtcblxuICAgICAgICAgIC8vIFZBTElEQVRFIE1PREFMIEZPUiBFRElUSU5HXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRWRpdCcpIHtcblxuICAgICAgICAgIC8vIEVESVQgUFJPSkVDVFxuICAgICAgICAgIGlmIChtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9PT0gJ0VkaXQgUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdlZGl0JywgcHJvamVjdEluZGV4LCAnJywgc2VsZWN0ZWRMaW5rKTtcblxuICAgICAgICAgICAgLy8gRURJVCBUQVNLXG4gICAgICAgICAgfSBlbHNlIGlmIChtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9PT0gJ0VkaXQgVGFzaycpIHtcbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdlZGl0JywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHNlbGVjdGVkTGluayk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVkFMSURBVEUgTU9EQUwgRk9SIERFTEVUSU5HXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRGVsZXRlJykge1xuICAgICAgICAgIGNvbnN0IHByb2plY3REZWxldGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10ZXh0Jyk7XG5cbiAgICAgICAgICAvLyBERUxFVEUgUFJPSkVDVFxuICAgICAgICAgIGlmICghcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdkZWxldGUnLCBwcm9qZWN0SW5kZXgsICcnLCBzZWxlY3RlZExpbmspO1xuICAgICAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIDApOyAvLyBBZnRlciBkZWxldGluZyBhIHByb2plY3QgLSBjaGFuZ2UgaWNvbiB0byAnZmEtY2FsZW5kYXItYWx0JyAobWVudSBsaW5rICdBbGwnKVxuICAgICAgICAgICAgZG9tLnNob3dNYWluVGl0bGUoMCk7IC8vIEFmdGVyIGRlbGV0aW5nIGEgcHJvamVjdCAtIHNob3cgbWFpbiB0aXRsZSBhcyAnQWxsJ1xuICAgICAgICAgICAgZG9tLmdldFRhc2tzKCdhbGwnKTsgLy8gQWZ0ZXIgZGVsZXRpbmcgYSBwcm9qZWN0IC0gc2hvdyBhbGwgdGFza3MgZnJvbSBhbGwgcmVtYWluaW5nIHByb2plY3RzXG5cbiAgICAgICAgICAgIC8vIERFTEVURSBUQVNLXG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZGVsZXRlJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHNlbGVjdGVkTGluayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENMT1NFIE1PREFMXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNpemVXaW5kb3csXG4gICAgbGlzdGVuQ2xpY2tzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcnM7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgcHJvamVjdHMgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBbXTtcblxuICBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpY29uLCB0aXRsZSkge1xuICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KGljb24sIHRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KGljb24sIHRpdGxlKTtcbiAgICBwcm9qZWN0c0xpc3QucHVzaChwcm9qZWN0KTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpY29uLCB0aXRsZSwgaW5kZXgsIGxpbmspIHtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLmljb24gPSBpY29uO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0udGl0bGUgPSB0aXRsZTtcbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gICAgZG9tLnNlbGVjdExpbmsobGluaywgaW5kZXgsICdlZGl0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHByb2plY3RzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBkb20uc2hvd1Byb2plY3RzKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBhZGRQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGRlbGV0ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCB0YXNrcyA9ICgoKSA9PiB7XG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgdGhpcy5wcm9qZWN0SW5kZXggPSBwcm9qZWN0SW5kZXg7XG4gICAgICB0aGlzLnRhc2tJbmRleCA9IHRhc2tJbmRleDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrcy5wdXNoKHRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGF0ZSA9IGRhdGU7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIGRvbS5nZXRUYXNrcygncHJvamVjdCcsIHByb2plY3RJbmRleCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgaWYgKHByb2plY3RJbmRleCA+IC0xKSB7XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrcy5zcGxpY2UodGFza0luZGV4LCAxKTtcbiAgICAgIGRvbS5nZXRUYXNrcygnYWxsJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRUYXNrLFxuICAgIGVkaXRUYXNrLFxuICAgIGRlbGV0ZVRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9oYW5kbGVycyc7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbi8vIEFERCBERUZBVUxUIFBST0pFQ1QgKEVYQU1QTEUpXG5wcm9qZWN0cy5hZGRQcm9qZWN0KCdmYS10b29scycsICdDcmFmdCBOZXcgUHJvamVjdCcpO1xucHJvamVjdHMuYWRkUHJvamVjdCgnZmEtdG9vbHMnLCAnQ3JhZnQgQW5vdGhlciBQcm9qZWN0Jyk7XG5cbi8vIEFERCBERUZBVUxUIFRBU0sgKEVYQU1QTEUpXG50YXNrcy5hZGRUYXNrKFxuICAnRW5qb3kgbXkgdGVhIGFzIG11Y2ggYXMgbXkgY29kaW5nISDwn421JyxcbiAgJ0xvbmdlciBkZXNjcmlwdGlvbiBvZiBteSBkZW1vIHRhc2ssIGp1c3QgdG8gc2hvdyB5b3UgdGhpcyBzdXJwcmlzaW5nbHkgbmljZSBzY3JvbGxiYXIgYW5kIGFtYXppbmdseSBjdXRlIGtpdHR5IOC4hShe4peJ4bSl4peJXinguIUnLFxuICAnMjAxMS0xMS0xMScsXG4gICdsb3cnLFxuICAwLFxuICAwXG4pO1xudGFza3MuYWRkVGFzayhcbiAgJ0NyZWF0ZSBtYWdpYyB0aHJvdWdoIG15IG1pbmQsIG15IGhlYXJ0IGFuZCBteSBrZXlib2FyZC4uIPCfkanwn4+74oCN8J+SuycsXG4gICdBbm90aGVyIGxvbmdlciBkZXNjcmlwdGlvbiBvZiBteSBkZW1vIHRhc2ssIGp1c3QgdG8gc2hvdyB5b3UgdGhpcyBzdXJwcmlzaW5nbHkgbmljZSBzY3JvbGxiYXIgYW5kIGN1dGUgbGl0dGxlIGJpcmRpZSDPtSgg4oCYzpjigJkgKc+24pmq4pmrJyxcbiAgJzIwMTItMTItMTInLFxuICAnaGlnaCcsXG4gIDEsXG4gIDBcbik7XG5cbi8vIFdIRU4gUEFHRSBJUyBMT0FERUQgLSBTSE9XIFRJVExFIEZST00gTUVOVSBMSU5LICdBTEwnXG5kb20uc2hvd01haW5UaXRsZSgwKTtcblxuLy8gV0hFTiBQQUdFIElTIExPQURFRCAtIFNIT1cgQUxMIFRBU0tTIEZST00gQUxMIFBST0pFQ1RTXG5kb20uZ2V0VGFza3MoJ2FsbCcpO1xuXG5kb20ucmVzcG9uc2l2ZU1lbnUoKTtcbmhhbmRsZXJzLnJlc2l6ZVdpbmRvdygpO1xuaGFuZGxlcnMubGlzdGVuQ2xpY2tzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=