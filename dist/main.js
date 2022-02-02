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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsQ0FBQzs7QUFFRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7VUMxQ3JCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDVTtBQUNBO0FBQ047O0FBRTVCO0FBQ0EsNERBQW1CO0FBQ25CLDREQUFtQjs7QUFFbkI7QUFDQSxzREFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUFpQjs7QUFFakI7QUFDQSxxREFBWTs7QUFFWiwyREFBa0I7QUFDbEIsOERBQXFCO0FBQ3JCLDhEQUFxQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2hhbmRsZXJzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgdG9nZ2xlTWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLW1lbnUnKTtcbiAgY29uc3Qgc2lkZWJhck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhci1tZW51Jyk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsJyk7XG4gIGNvbnN0IGZvcm0gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICBjb25zdCBtb2RhbFRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignI21vZGFsLXRpdGxlJyk7XG4gIGNvbnN0IG1vZGFsVGl0bGVFcnJvciA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZS1lcnJvcicpO1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluJyk7XG4gIGNvbnN0IG1haW5UaXRsZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10aXRsZS1pY29uJyk7XG4gIGNvbnN0IG1haW5UaXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10aXRsZS10ZXh0Jyk7XG4gIGNvbnN0IHByb2plY3RzTGlua3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtbGlua3MtZGl2Jyk7XG4gIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2snKTtcbiAgY29uc3QgdGFza3NDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb3VudCcpO1xuICBjb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MtbGlzdCcpO1xuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZXNjcmlwdGlvbicpO1xuICBjb25zdCB0YXNrRHVlRGF0ZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG4gIGNvbnN0IHRhc2tQcmlvcml0eVNlbGVjdGlvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXByaW9yaXR5Jyk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uc2l2ZU1lbnUoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDEwMDApIHtcbiAgICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgSVQgT1BBUVVFXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnYWRkLXotaW5kZXgnKTtcblxuICAgICAgLy8gRVhQQU5EIE1BSU4gQ09OVEVOVFxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnY29udHJhY3QtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZXhwYW5kLW1haW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIElUIEEgQklUIFRSQU5TUEFSRU5UXG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXotaW5kZXgnKTtcblxuICAgICAgLy8gQ09OVFJBQ1QgTUFJTiBDT05URU5UIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kLW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAgIHRvZ2dsZU1lbnVJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gICAgLy8gU0hPVyBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUtc2lkZWJhcicpKSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUtbWFpbicpO1xuXG4gICAgICAvLyBISURFIFNJREVCQVIgQU5EIE1BS0UgTUFJTiBDT05URU5UIE9QQVFVRVxuICAgIH0gZWxzZSBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlLW1haW4nKTtcbiAgICB9XG4gIH1cblxuICAvLyBNQUlOIENPTlRFTlQgVElUTEVcbiAgZnVuY3Rpb24gc2hvd01haW5UaXRsZShpbmRleCkge1xuICAgIGNvbnN0IGFsbE1lbnVJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmstaWNvbicpO1xuICAgIGNvbnN0IG1lbnVJY29uID0gYWxsTWVudUljb25zW2luZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpO1xuICAgIGNvbnN0IG1lbnVUZXh0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmstdGV4dCcpO1xuXG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgJ2ZhbCcsXG4gICAgICAnZmEtZncnLFxuICAgICAgJ21haW4tdGl0bGUtaWNvbicsXG4gICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICBtZW51SWNvblxuICAgICk7XG4gICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IG1lbnVUZXh0c1tpbmRleF0udGV4dENvbnRlbnQ7XG4gICAgZG9jdW1lbnQudGl0bGUgPSBgVG9EbyAtICR7bWFpblRpdGxlVGV4dC50ZXh0Q29udGVudH1gO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgaW5kZXgpIHtcbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBUSEUgTUVOVVxuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpXG4gICAgKSB7XG4gICAgICBzaG93TWFpblRpdGxlKGluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBUSVRMRSBPRiBUQVNLUyBGUk9NIFBST0pFQ1RTXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1saW5rJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpXG4gICAgKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcblxuICAgICAgbWFpblRpdGxlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLWZ3JyxcbiAgICAgICAgJ21haW4tdGl0bGUtaWNvbicsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgICAgcHJvamVjdEljb25cbiAgICAgICk7XG4gICAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50aXRsZTtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gYFRvRG8gLSAke21haW5UaXRsZVRleHQudGV4dENvbnRlbnR9YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3YXRjaFRhc2tJbmZvKHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgaW5mb1Rhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stdGl0bGUnKTtcbiAgICBjb25zdCBpbmZvVGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1kZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IGluZm9UYXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stZHVlLWRhdGUnKTtcbiAgICBjb25zdCBpbmZvVGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1wcmlvcml0eScpO1xuICAgIGNvbnN0IGluZm9UYXNrUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stcHJvamVjdCcpO1xuXG4gICAgLy8gVEFTSyBUSVRMRVxuICAgIGluZm9UYXNrVGl0bGUudGV4dENvbnRlbnQgPVxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZTtcblxuICAgIC8vIFRBU0sgREVTQ1JJUFRJT05cbiAgICBpbmZvVGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID1cbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGVzY3JpcHRpb247XG5cbiAgICAvLyBUQVNLIERVRSBEQVRFXG4gICAgaW5mb1Rhc2tEdWVEYXRlLnRleHRDb250ZW50ID1cbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGF0ZTtcblxuICAgIC8vIFRBU0sgUFJJT1JJVFlcbiAgICBpZiAoXG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID09PSAnbG93J1xuICAgICkge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICdJIGNhbiBkbyBpdCBsYXRlciBvciBuZXZlciBhdCBhbGwuLiDwn5i0JztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ21lZGl1bSdcbiAgICApIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSSBzdGF5IHNvbWV3aGVyZSBiZXR3ZWVuIHJlbGF4YXRpb24gYW5kIGZvY3VzIPCfmIUnO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID09PSAnaGlnaCdcbiAgICApIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSSBtdXN0IGRvIGl0IC0gc29vbmVyIG9yIGxhdGVyISDwn5iyJztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cblxuICAgIC8vIFRBU0sgUFJPSkVDVFxuICAgIGluZm9UYXNrUHJvamVjdC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFuaXB1bGF0ZU1vZGFsKG1vZGFsU3RhdGUsIG1vZGFsVGFzaywgbW9kYWxBY3Rpb24sIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgbW9kYWxIZWFkZXIgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG4gICAgY29uc3QgbW9kYWxNYWluVGl0bGUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtbWFpbi10aXRsZScpO1xuICAgIGNvbnN0IG1vZGFsVGFza0J1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10YXNrLWJ1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3REZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgdGFza0RlbGV0aW9uVGV4dCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlbGV0aW9uLXRleHQnKTtcbiAgICBjb25zdCB0YXNrSW5mb0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWRpdicpO1xuICAgIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1tb2RhbCcpO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbW9kYWwnKTtcblxuICAgIG1vZGFsSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0aW9uLW1vZGFsLWhlYWRlcicpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB0YXNrSW5mb0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgbW9kYWxUaXRsZUVycm9yLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB0YXNrRGVsZXRpb25UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY2FuY2VsLWRlbGV0aW9uJyk7XG4gICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb25maXJtLWRlbGV0aW9uJywgJ2hpZGUnKTtcblxuICAgIGlmIChtb2RhbFN0YXRlID09PSAnc2hvdycpIHtcbiAgICAgIGNvbnN0IG1vZGFsSWNvbnNEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucmFkaW8tZm9ybScpO1xuICAgICAgY29uc3QgbW9kYWxUYXNrc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10YXNrcy1kaXYnKTtcblxuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxNYWluVGl0bGUudGV4dENvbnRlbnQgPSBtb2RhbFRhc2s7XG4gICAgICBtb2RhbFRhc2tCdXR0b24udGV4dENvbnRlbnQgPSBtb2RhbEFjdGlvbjtcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAgICAgLy8gSUYgTU9EQUwgSVMgRk9SIEVESVRJTkcgUFJPSkVDVFxuICAgICAgaWYgKG1vZGFsVGFzayA9PT0gJ0VkaXQgUHJvamVjdCcpIHtcbiAgICAgICAgY29uc3QgYWxsUHJvamVjdEljb25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbCgnLmljb24nKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS5pY29uO1xuXG4gICAgICAgIC8vIFNIT1cgRURJVEFCTEUgUFJPSkVDVCBUSVRMRVxuICAgICAgICBtb2RhbFRpdGxlLnZhbHVlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG5cbiAgICAgICAgLy8gU0VMRUNUIEVESVRBQkxFIFBST0pFQ1QgSUNPTlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb2plY3RJY29ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChhbGxQcm9qZWN0SWNvbnNbaV0udmFsdWUgPT09IHByb2plY3RJY29uKSB7XG4gICAgICAgICAgICBhbGxQcm9qZWN0SWNvbnNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIC8vIElGIE1PREFMIElTIEZPUiBBRERJTkcgT1IgRURJVElORyBUQVNLXG4gICAgICB9IGVsc2UgaWYgKG1vZGFsVGFzayA9PT0gJ0FkZCBUYXNrJ3x8XG4gICAgICAgICAgbW9kYWxUYXNrID09PSAnRWRpdCBUYXNrJ1xuICAgICAgKSB7XG4gICAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgbW9kYWxUYXNrc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgICAgICAgaWYgKG1vZGFsVGFzayA9PT0gJ0VkaXQgVGFzaycpIHtcbiAgICAgICAgICBtb2RhbFRpdGxlLnZhbHVlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZTtcbiAgICAgICAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2NyaXB0aW9uO1xuICAgICAgICAgIHRhc2tEdWVEYXRlLnZhbHVlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kYXRlO1xuICAgICAgICAgIHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJRiBNT0RBTCBJUyBGT1IgV0FUQ0hJTkcgVEFTSyBJTkZPXG4gICAgICB9IGVsc2UgaWYgKG1vZGFsVGFzayA9PT0gJ1Rhc2sgSW5mbycpIHtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB0YXNrSW5mb0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHdhdGNoVGFza0luZm8ocHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERFTEVUSU9OIE1PREFMIENPTlRFTlRcbiAgICBpZiAobW9kYWxBY3Rpb24gPT09ICdEZWxldGUnKSB7XG4gICAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QuYWRkKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb25maXJtLWRlbGV0aW9uJyk7XG5cbiAgICAgIC8vIFBST0pFQ1QgREVMRVRJT05cbiAgICAgIGlmIChtb2RhbFRhc2sgPT09ICdEZWxldGUgUHJvamVjdCcpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10aXRsZScpO1xuXG4gICAgICAgIHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBwcm9qZWN0RGVsZXRpb25UaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuXG4gICAgICAgIC8vIFRBU0sgREVMRVRJT05cbiAgICAgIH0gZWxzZSBpZiAobW9kYWxUYXNrID09PSAnRGVsZXRlIFRhc2snKSB7XG4gICAgICAgIGNvbnN0IHRhc2tEZWxldGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZGVsZXRpb24tdGl0bGUnKTtcblxuICAgICAgICB0YXNrRGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgdGFza0RlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPVxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE8gQ0xPU0UgVEhFIE1PREFMXG4gICAgaWYgKG1vZGFsU3RhdGUgPT09ICdjbG9zZScpIHtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93VGFza3MobWVudVRpdGxlLCBwcm9qZWN0SW5kZXhTdGFydCwgcHJvamVjdEluZGV4RW5kKSB7XG4gICAgbGV0IHRhc2tzTnVtYmVyID0gMDtcblxuICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSAwO1xuICAgIHRhc2tzTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgLy8gR0VORVJBVEUgVEFTS1MgTElTVFxuICAgIGZvciAobGV0IGkgPSBwcm9qZWN0SW5kZXhTdGFydDsgaSA8IHByb2plY3RJbmRleEVuZDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyAnSU1QT1JUQU5UJyAtIEZJTFRFUiBOT1QgSU1QT1JUQU5UIFRBU0tTXG4gICAgICAgIGlmIChcbiAgICAgICAgICBtZW51VGl0bGUgPT09ICdpbXBvcnRhbnQnICYmXG4gICAgICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ICE9PSAnaGlnaCdcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29udGludWU7IC8vIElmIHRhc2sgaXNuJ3QgaW1wb3J0YW50IC0gc2tpcCBpdFxuXG4gICAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ1RPREFZJ1xuICAgICAgICB9IGVsc2UgaWYgKG1lbnVUaXRsZSA9PT0gJ3RvZGF5Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdUYXNrcyBmb3IgdG9kYXkuLicpO1xuXG4gICAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ1dFRUsnXG4gICAgICAgIH0gZWxzZSBpZiAobWVudVRpdGxlID09PSAnd2VlaycpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnVGFza3Mgb2YgdGhlIHdlZWsuLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB0YXNrSWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCB0YXNrSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdGFza0VkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrVHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrSW5mb0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cbiAgICAgICAgLy8gU0hPVyBOVU1CRVIgT0YgVEFTS1NcbiAgICAgICAgdGFza3NOdW1iZXIgKz0gMTtcbiAgICAgICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IHRhc2tzTnVtYmVyO1xuXG4gICAgICAgIC8vIFRBU0sgUFJJT1JJVFksIFRFWFQgQU5EIElUUyBESVZcbiAgICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRpdicsICdob3Zlci1lbGVtZW50Jyk7XG4gICAgICAgIHRhc2tJY29uQW5kVGV4dERpdi5jbGFzc0xpc3QuYWRkKCdmbGV4Jyk7XG5cbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSA9PT0gJ2xvdycpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgICAnZmEtY2lyY2xlJyxcbiAgICAgICAgICAgICdsb3ctcHJpb3JpdHknLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgPT09ICdtZWRpdW0nKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICAgJ2ZhLWNpcmNsZScsXG4gICAgICAgICAgICAnbWlkLXByaW9yaXR5JyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ID09PSAnaGlnaCcpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgICAnZmEtY2lyY2xlJyxcbiAgICAgICAgICAgICdoaWdoLXByaW9yaXR5JyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLWNpcmNsZScsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXNrVGV4dC5jbGFzc0xpc3QuYWRkKCd0YXNrLXRleHQnKTtcbiAgICAgICAgdGFza1RleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0udGl0bGU7XG5cbiAgICAgICAgLy8gVEFTSyBJTkZPIERJVlxuICAgICAgICB0YXNrSW5mby5jbGFzc0xpc3QuYWRkKCdmbGV4Jyk7XG5cbiAgICAgICAgLy8gVEFTS1MgRFVFIERBVEVcbiAgICAgICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZCgnZHVlLWRhdGUnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLmRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLmRhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRBU0sgRURJVCBJQ09OXG4gICAgICAgIHRhc2tFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICdmYS1lZGl0JyxcbiAgICAgICAgICAnZWRpdC10YXNrJyxcbiAgICAgICAgICAndGFzay1pY29uJyxcbiAgICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrRWRpdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnLCBqKTtcblxuICAgICAgICAvLyBUQVNLIERFTEVURSBJQ09OXG4gICAgICAgIHRhc2tUcmFzaEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAnZmEtdHJhc2gtYWx0JyxcbiAgICAgICAgICAnZGVsZXRlLXRhc2snLFxuICAgICAgICAgICd0YXNrLWljb24nLFxuICAgICAgICAgICdzY2FsZS1lbGVtZW50JyxcbiAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgKTtcbiAgICAgICAgdGFza1RyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrVHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG5cbiAgICAgICAgLy8gVEFTSyBJTkZPIElDT05cbiAgICAgICAgdGFza0luZm9JY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgJ3Rhc2staWNvbicsXG4gICAgICAgICAgJ3NjYWxlLWVsZW1lbnQnLFxuICAgICAgICAgICdmYS1pbmZvLWNpcmNsZSdcbiAgICAgICAgICApO1xuICAgICAgICB0YXNrSW5mb0ljb24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza0luZm9JY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG5cbiAgICAgICAgLy8gQVBQRU5EU1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza0ljb24pO1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza1RleHQpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tFZGl0SWNvbik7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tUcmFzaEljb24pO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrSW5mb0ljb24pO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJY29uQW5kVGV4dERpdik7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0luZm8pO1xuICAgICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgICB9XG4gICAgfVxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRhc2tzKG1lbnVUaXRsZSwgcHJvamVjdEluZGV4KSB7XG4gICAgbGV0IHByb2plY3RJbmRleFN0YXJ0O1xuICAgIGxldCBwcm9qZWN0SW5kZXhFbmQ7XG5cbiAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgTElOS1xuICAgIGlmIChtZW51VGl0bGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgcHJvamVjdEluZGV4U3RhcnQgPSBwcm9qZWN0SW5kZXg7XG4gICAgICBwcm9qZWN0SW5kZXhFbmQgPSBwcm9qZWN0SW5kZXggKyAxO1xuXG4gICAgICAvLyBJRiBQUk9KRUNUIERPRVNOJ1QgSEFWRSBBTlkgVEFTS1NcbiAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IDA7XG4gICAgICB9XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LXG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3RJbmRleFN0YXJ0ID0gMDtcbiAgICAgIHByb2plY3RJbmRleEVuZCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgfVxuICAgIHNob3dUYXNrcyhtZW51VGl0bGUsIHByb2plY3RJbmRleFN0YXJ0LCBwcm9qZWN0SW5kZXhFbmQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0TGluayh0YXJnZXQsIGluZGV4LCBhY3Rpb24pIHtcbiAgICBjb25zdCBhbGxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saW5rJyk7XG4gICAgY29uc3QgYWxsUHJvamVjdHNMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LWxpbmsnKTtcbiAgICBjb25zdCBtZW51VGl0bGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyk7XG5cbiAgICBhZGRUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTsgLy8gQnkgZGVmYXVsdCAnQWRkIFRhc2snIGJ1dHRvbiBpcyBoaWRkZW5cblxuICAgIGFsbExpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH0pO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBESVJFQ1RMWSBPTiBMSU5LIChCT1RIIC0gTUVOVSBPUiBQUk9KRUNUKVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rJykpIHtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgIC8vIElGIFdBUyBDTElDS0VEIFRPIEVESVQgUFJPSkVDVCBMSU5LXG4gICAgICBpZiAoYWN0aW9uID09PSAnZWRpdCcpIHtcbiAgICAgICAgYWxsUHJvamVjdHNMaW5rc1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpOyAvLyBLZWVwIHByb2plY3QgdmlzdWFsbHkgc2VsZWN0ZWQgYWZ0ZXIgZWRpdGluZ1xuICAgICAgfVxuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyBJQ09OIE9SIFRFWFRcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH1cblxuICAgIC8vIElGIENMSUNLRUQgU09NRVdIRVJFIE9OIFBST0pFQ1QgTElOS1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0JykpIHtcbiAgICAgIGFkZFRhc2tCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpOyAvLyBTaG93IGJ1dHRvbiB0byBhZGQgdGFzayBmb3Igc2VsZWN0ZWQgcHJvamVjdFxuICAgICAgZ2V0VGFza3MoJ3Byb2plY3QnLCBpbmRleCk7XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBJQ09OIE9SIFRFWFQgT1IgRURJVC9ERUxFVEUgSUNPTlNcbiAgICAgIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKVxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBFTEVNRU5UUyBESVZTXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElGIENMSUNLRUQgU09NRVdIRVJFIE9OIE1FTlUgTElOS1xuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpXG4gICAgKSB7XG4gICAgICBnZXRUYXNrcyhtZW51VGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlTW9kYWwobW9kYWxBY3Rpb24sIHByb2plY3RJbmRleCwgdGFza0luZGV4LCBjbGlja2VkTGluaykge1xuICAgIGNvbnN0IHsgcHJvamVjdEZvcm1JY29uIH0gPSBkb2N1bWVudC5mb3Jtcy5mb3JtO1xuICAgIGNvbnN0IHByb2plY3REb21JY29uID0gcHJvamVjdEZvcm1JY29uLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgY29uc3QgbW9kYWxUaXRsZVRleHQgPSBtb2RhbFRpdGxlLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3REZWxldGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgbWVudUxpbmtBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluazpmaXJzdC1jaGlsZCcpO1xuXG4gICAgLy8gQ0hFQ0sgRk9SIE1PREFMIFRJVExFIEVSUk9SIElGIE1PREFMIEZPUk0gSVMgU0hPV05cbiAgICBpZiAoIWZvcm0uY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykgJiZcbiAgICAgICAgbW9kYWxUaXRsZVRleHQgPT09ICcnXG4gICAgKSB7XG4gICAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxUaXRsZUVycm9yLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgLy8gQUREIFBST0pFQ1QgVE8gQVJSQVlcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbW9kYWxBY3Rpb24gPT09ICdhZGQnICYmXG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JylcbiAgICApIHtcbiAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdERvbUljb24sIG1vZGFsVGl0bGVUZXh0KTtcblxuICAgICAgLy8gS0VFUCBORVdMWSBBRERFRCBQUk9KRUNUIFZJU1VBTExZIFNFTEVDVEVEXG4gICAgICBjb25zdCBsYXN0UHJvamVjdCA9IHByb2plY3RzTGlua3NEaXYubGFzdENoaWxkO1xuICAgICAgY29uc3QgbGFzdFByb2plY3RJbmRleCA9IHByb2plY3RzTGlua3NEaXYubGFzdENoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4Jyk7XG5cbiAgICAgIHNlbGVjdExpbmsobGFzdFByb2plY3QsIGxhc3RQcm9qZWN0SW5kZXgpO1xuICAgICAgY2hhbmdlTWFpblRpdGxlKGxhc3RQcm9qZWN0LCBsYXN0UHJvamVjdEluZGV4KTtcblxuICAgIH0gLy8gRURJVCBQUk9KRUNUIElOIFBST0pFQ1RTIEFSUkFZXG4gICAgICBlbHNlIGlmIChtb2RhbEFjdGlvbiA9PT0gJ2VkaXQnICYmXG4gICAgICAgIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKVxuICAgICkge1xuICAgICAgY29uc3QgYWxsUHJvamVjdHNMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LWxpbmsnKTtcbiAgICAgIGNvbnN0IGVkaXRlZFByb2plY3QgPSBhbGxQcm9qZWN0c0xpbmtzW3Byb2plY3RJbmRleF07XG5cbiAgICAgIHByb2plY3RzLmVkaXRQcm9qZWN0KHByb2plY3REb21JY29uLCBtb2RhbFRpdGxlVGV4dCwgcHJvamVjdEluZGV4LCBjbGlja2VkTGluayk7XG4gICAgICBjaGFuZ2VNYWluVGl0bGUoZWRpdGVkUHJvamVjdCwgcHJvamVjdEluZGV4KTtcblxuICAgICAgLy8gREVMRVRFIFBST0pFQ1QgRlJPTSBQUk9KRUNUUyBBUlJBWVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBtb2RhbEFjdGlvbiA9PT0gJ2RlbGV0ZScgJiZcbiAgICAgICFwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpXG4gICAgKSB7XG4gICAgICBwcm9qZWN0cy5kZWxldGVQcm9qZWN0KHByb2plY3RJbmRleCk7XG4gICAgICBtZW51TGlua0FsbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgICBhZGRUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAgICAgLy8gQUREIFRBU0sgVE8gQVJSQVlcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbW9kYWxBY3Rpb24gPT09ICdhZGQnICYmXG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJylcbiAgICApIHtcbiAgICAgIGxldCB0YXNrUHJpb3JpdHk7XG5cbiAgICAgIC8vIENIRUNLIFRBU0sgUFJJT1JJVFlcbiAgICAgIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdsb3cnKSB7XG4gICAgICAgIHRhc2tQcmlvcml0eSA9ICdsb3cnO1xuICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdtZWRpdW0nKSB7XG4gICAgICAgIHRhc2tQcmlvcml0eSA9ICdtZWRpdW0nO1xuICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdoaWdoJykge1xuICAgICAgICB0YXNrUHJpb3JpdHkgPSAnaGlnaCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXNrUHJpb3JpdHkgPSAnJztcbiAgICAgIH1cblxuICAgICAgdGFza3MuYWRkVGFzayhcbiAgICAgICAgbW9kYWxUaXRsZVRleHQsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgICAgdGFza0R1ZURhdGUudmFsdWUsXG4gICAgICAgIHRhc2tQcmlvcml0eSxcbiAgICAgICAgcHJvamVjdEluZGV4XG4gICAgICApO1xuICAgICAgZ2V0VGFza3MoJ3Byb2plY3QnLCBwcm9qZWN0SW5kZXgpO1xuXG4gICAgICAvLyBJRiBUQVNLIElTIEdPSU5HIFRPIEJFIEVESVRFRCBPUiBERUxFVEVEXG4gICAgfSBlbHNlIGlmIChtb2RhbEFjdGlvbiA9PT0gJ2VkaXQnIHx8XG4gICAgICBtb2RhbEFjdGlvbiA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgIGxldCBtZW51VGl0bGU7XG5cbiAgICAgIC8vIElGIFRBU0sgSVMgR09JTkcgVE8gQkUgRURJVEVEIE9SIERFTEVURUQgRlJPTSBDTElDS0VEIE1FTlUgTElOS1xuICAgICAgaWYgKGNsaWNrZWRMaW5rLmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJykpIHtcbiAgICAgICAgbWVudVRpdGxlID0gY2xpY2tlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyk7XG5cbiAgICAgICAgLy8gSUYgVEFTSyBJUyBHT0lORyBUTyBCRSBFRElURUQgT1IgREVMRVRFRCBGUk9NIENMSUNLRUQgUFJPSkVDVCBMSU5LXG4gICAgICB9IGVsc2UgaWYgKGNsaWNrZWRMaW5rLmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1saW5rJykpIHtcbiAgICAgICAgbWVudVRpdGxlID0gJ3Byb2plY3QnO1xuICAgICAgfVxuXG4gICAgICAvLyBFRElUIFRBU0sgSU4gVEFTS1MgQVJSQVlcbiAgICAgIGlmIChtb2RhbEFjdGlvbiA9PT0gJ2VkaXQnKSB7XG4gICAgICAgIGNvbnN0IHRhc2tOZXdUaXRsZSA9IG1vZGFsVGl0bGUudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tOZXdEZXNjcmlwdGlvbiA9IHRhc2tEZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza05ld0RhdGUgPSB0YXNrRHVlRGF0ZS52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza05ld1ByaW9yaXR5ID0gdGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlO1xuXG4gICAgICAgIHRhc2tzLmVkaXRUYXNrKFxuICAgICAgICAgIHRhc2tOZXdUaXRsZSxcbiAgICAgICAgICB0YXNrTmV3RGVzY3JpcHRpb24sXG4gICAgICAgICAgdGFza05ld0RhdGUsXG4gICAgICAgICAgdGFza05ld1ByaW9yaXR5LFxuICAgICAgICAgIHByb2plY3RJbmRleCxcbiAgICAgICAgICB0YXNrSW5kZXhcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBERUxFVEUgVEFTSyBGUk9NIFRBU0tTIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKG1vZGFsQWN0aW9uID09PSAnZGVsZXRlJykge1xuICAgICAgICB0YXNrcy5kZWxldGVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGdldFRhc2tzKG1lbnVUaXRsZSwgcHJvamVjdEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1jb3VudCcpO1xuXG4gICAgLy8gU0hPVyBOVU1CRVIgT0YgUFJPSkVDVFNcbiAgICBwcm9qZWN0c0NvdW50LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDtcbiAgICBwcm9qZWN0c0xpbmtzRGl2LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbkFuZFRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgY29uc3QgcHJvamVjdFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHByb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUcmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG5cblxuICAgICAgLy8gUFJPSkVDVCBJQ09OL1RFWFQgQU5EIERFRkFVTFQgSUNPTlMgRElWU1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnc2VsZWN0J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RJY29uQW5kVGV4dERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnc2VsZWN0J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RJY29uc0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIExJTktcbiAgICAgIHByb2plY3RMaW5rLmNsYXNzTGlzdC5hZGQoJ2xpbmsnLCAncHJvamVjdC1saW5rJywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcblxuICAgICAgLy8gUFJPSkVDVCBJQ09OXG4gICAgICBwcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLWZ3JyxcbiAgICAgICAgJ3Byb2plY3QtaWNvbicsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmljb25cbiAgICAgICk7XG4gICAgICBwcm9qZWN0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIFRFWFRcbiAgICAgIHByb2plY3RUZXh0LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGV4dCcsICdwcm9qZWN0JywgJ3NlbGVjdCcpO1xuICAgICAgcHJvamVjdFRleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGl0bGU7XG4gICAgICBwcm9qZWN0VGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIERFRkFVTFQgSUNPTlNcbiAgICAgIHByb2plY3RFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLWVkaXQnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdwcm9qZWN0LWljb24nLFxuICAgICAgICAnZWRpdC1wcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdzY2FsZS1lbGVtZW50JyxcbiAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICApO1xuICAgICAgcHJvamVjdEVkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0VHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtdHJhc2gtYWx0JyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAncHJvamVjdC1pY29uJyxcbiAgICAgICAgJ2RlbGV0ZS1wcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdzY2FsZS1lbGVtZW50J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcblxuICAgICAgLy8gQVBQRU5EU1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRyYXNoSWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUZXh0KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uQW5kVGV4dERpdik7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbnNEaXYpO1xuICAgICAgcHJvamVjdHNMaW5rc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgfVxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzcG9uc2l2ZU1lbnUsXG4gICAgdG9nZ2xlTWVudSxcbiAgICBzaG93TWFpblRpdGxlLFxuICAgIGNoYW5nZU1haW5UaXRsZSxcbiAgICBtYW5pcHVsYXRlTW9kYWwsXG4gICAgc2hvd1Rhc2tzLFxuICAgIGdldFRhc2tzLFxuICAgIHNlbGVjdExpbmssXG4gICAgdmFsaWRhdGVNb2RhbCxcbiAgICBzaG93UHJvamVjdHNcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBoYW5kbGVycyA9ICgoKSA9PiB7XG4gIC8vIFJFU0laRSBNRU5VIERFUEVORElORyBPTiBXSU5ET1cgU0laRVxuICBmdW5jdGlvbiByZXNpemVXaW5kb3coKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRvbS5yZXNwb25zaXZlTWVudSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5DbGlja3MoKSB7XG4gICAgLy8gVkFSSUFCTEVTIE5PVCBCRSBPVkVSV1JJVFRFTiBBRlRFUiBDTElDSyBFVkVOVFxuICAgIGxldCBwcm9qZWN0SW5kZXg7XG4gICAgbGV0IHRhc2tJbmRleDtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG4gICAgICBjb25zdCBtb2RhbE1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1tYWluLXRpdGxlJyk7XG4gICAgICBjb25zdCBzZWxlY3RlZExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuICAgICAgY29uc3QgbGlua0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JyksIDEwKTtcblxuICAgICAgLy8gVE9HR0xFIFNJREUgTUVOVVxuICAgICAgaWYgKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2dnbGUtbWVudScpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlci1saW5lJylcbiAgICAgICkge1xuICAgICAgICBkb20udG9nZ2xlTWVudSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBTVFlMRSBDTElDS0VEIExJTktcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QnKSkge1xuICAgICAgICBkb20uc2VsZWN0TGluayh0YXJnZXQsIGxpbmtJbmRleCk7XG4gICAgICAgIGRvbS5jaGFuZ2VNYWluVGl0bGUodGFyZ2V0LCBsaW5rSW5kZXgpOyAvLyBJbiB0aGUgbWFpbiBjb250ZW50IHNob3cgdGl0bGUgYWNjb3JkaW5nIHRvIHNlbGVjdGVkIGxpbmsgdGl0bGVcbiAgICAgIH1cblxuICAgICAgLy8gTU9EQUwgRk9SIEFERElORyBQUk9KRUNUXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBQcm9qZWN0JywgJ0FkZCcpO1xuXG4gICAgICAgIC8vIE1PREFMUyBGT1IgUFJPSkVDVCBFRElUSU5HIEFORCBERUxFVElOR1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnKSwgMTApO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBFRElUSU5HIFBST0pFQ1RcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRWRpdCBQcm9qZWN0JywgJ0VkaXQnLCBwcm9qZWN0SW5kZXgpO1xuXG4gICAgICAgICAgLy8gTU9EQUwgRk9SIERFTEVUSU5HIFBST0pFQ1RcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdEZWxldGUgUHJvamVjdCcsICdEZWxldGUnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1PREFMUyBGT1IgVEFTS1MgRURJVElORywgREVMRVRJTkcgQU5EIFdBVENISU5HIElORk9cbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLWljb24nKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSwgMTApO1xuICAgICAgICB0YXNrSW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSwgMTApO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBBRERJTkcgVEFTS1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2snKSkge1xuICAgICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnQWRkIFRhc2snLCAnQWRkJyk7XG5cbiAgICAgICAgICAvLyBNT0RBTCBGT1IgRURJVElORyBUQVNLXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC10YXNrJykpIHtcbiAgICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0VkaXQgVGFzaycsICdFZGl0JywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuXG4gICAgICAgICAgLy8gTU9EQUwgRk9SIERFTEVUSU5HIFRBU0tcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtdGFzaycpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdEZWxldGUgVGFzaycsICdEZWxldGUnLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG5cbiAgICAgICAgICAvLyBNT0RBTCBGT1IgV0FUQ0hJTkcgVEFTSyBJTkZPXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmEtaW5mby1jaXJjbGUnKSkge1xuICAgICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnVGFzayBJbmZvJywgJycsIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBWQUxJREFURSBNT0RBTFxuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tbW9kYWwnKSkge1xuXG4gICAgICAgIC8vIFZBTElEQVRFIE1PREFMIEZPUiBBRERJTkdcbiAgICAgICAgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0FkZCcpIHtcbiAgICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludChzZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnKSwgMTApO1xuICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdhZGQnLCBwcm9qZWN0SW5kZXgsICcnLCBzZWxlY3RlZExpbmspO1xuXG4gICAgICAgICAgLy8gVkFMSURBVEUgTU9EQUwgRk9SIEVESVRJTkdcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdFZGl0Jykge1xuXG4gICAgICAgICAgLy8gRURJVCBQUk9KRUNUXG4gICAgICAgICAgaWYgKG1vZGFsTWFpblRpdGxlLnRleHRDb250ZW50ID09PSAnRWRpdCBQcm9qZWN0Jykge1xuICAgICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2VkaXQnLCBwcm9qZWN0SW5kZXgsICcnLCBzZWxlY3RlZExpbmspO1xuXG4gICAgICAgICAgICAvLyBFRElUIFRBU0tcbiAgICAgICAgICB9IGVsc2UgaWYgKG1vZGFsTWFpblRpdGxlLnRleHRDb250ZW50ID09PSAnRWRpdCBUYXNrJykge1xuICAgICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2VkaXQnLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgc2VsZWN0ZWRMaW5rKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWQUxJREFURSBNT0RBTCBGT1IgREVMRVRJTkdcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdEZWxldGUnKSB7XG4gICAgICAgICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWRlbGV0aW9uLXRleHQnKTtcblxuICAgICAgICAgIC8vIERFTEVURSBQUk9KRUNUXG4gICAgICAgICAgaWYgKCFwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludChzZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2RlbGV0ZScsIHByb2plY3RJbmRleCwgJycsIHNlbGVjdGVkTGluayk7XG4gICAgICAgICAgICBkb20uY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgMCk7IC8vIEFmdGVyIGRlbGV0aW5nIGEgcHJvamVjdCAtIGNoYW5nZSBpY29uIHRvICdmYS1jYWxlbmRhci1hbHQnIChtZW51IGxpbmsgJ0FsbCcpXG4gICAgICAgICAgICBkb20uc2hvd01haW5UaXRsZSgwKTsgLy8gQWZ0ZXIgZGVsZXRpbmcgYSBwcm9qZWN0IC0gc2hvdyBtYWluIHRpdGxlIGFzICdBbGwnXG4gICAgICAgICAgICBkb20uZ2V0VGFza3MoJ2FsbCcpOyAvLyBBZnRlciBkZWxldGluZyBhIHByb2plY3QgLSBzaG93IGFsbCB0YXNrcyBmcm9tIGFsbCByZW1haW5pbmcgcHJvamVjdHNcblxuICAgICAgICAgICAgLy8gREVMRVRFIFRBU0tcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdkZWxldGUnLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgc2VsZWN0ZWRMaW5rKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ0xPU0UgTU9EQUxcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZScpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc2l6ZVdpbmRvdyxcbiAgICBsaXN0ZW5DbGlja3MsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVycztcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IFtdO1xuXG4gIGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKGljb24sIHRpdGxlKSB7XG4gICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFByb2plY3QoaWNvbiwgdGl0bGUpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoaWNvbiwgdGl0bGUpO1xuICAgIHByb2plY3RzTGlzdC5wdXNoKHByb2plY3QpO1xuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGljb24sIHRpdGxlLCBpbmRleCwgbGluaykge1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0uaWNvbiA9IGljb247XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgICBkb20uc2VsZWN0TGluayhsaW5rLCBpbmRleCwgJ2VkaXQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcHJvamVjdHNMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvamVjdHNMaXN0LFxuICAgIGFkZFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHRhc2tzID0gKCgpID0+IHtcbiAgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICB0aGlzLnByb2plY3RJbmRleCA9IHByb2plY3RJbmRleDtcbiAgICAgIHRoaXMudGFza0luZGV4ID0gdGFza0luZGV4O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzLnB1c2godGFzayk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0VGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGUgPSB0aXRsZTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kYXRlID0gZGF0ZTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgZG9tLmdldFRhc2tzKCdwcm9qZWN0JywgcHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBpZiAocHJvamVjdEluZGV4ID4gLTEpIHtcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzLnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICAgICAgZG9tLmdldFRhc2tzKCdhbGwnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRhc2ssXG4gICAgZWRpdFRhc2ssXG4gICAgZGVsZXRlVGFzayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2tzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBoYW5kbGVycyBmcm9tICcuL2hhbmRsZXJzJztcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuLy8gQUREIERFRkFVTFQgUFJPSkVDVCAoRVhBTVBMRSlcbnByb2plY3RzLmFkZFByb2plY3QoJ2ZhLXRvb2xzJywgJ0NyYWZ0IE5ldyBQcm9qZWN0Jyk7XG5wcm9qZWN0cy5hZGRQcm9qZWN0KCdmYS10b29scycsICdDcmFmdCBBbm90aGVyIFByb2plY3QnKTtcblxuLy8gQUREIERFRkFVTFQgVEFTSyAoRVhBTVBMRSlcbnRhc2tzLmFkZFRhc2soXG4gICdFbmpveSBteSB0ZWEgYXMgbXVjaCBhcyBteSBjb2RpbmchIPCfjbUnLFxuICAnTG9uZ2VyIGRlc2NyaXB0aW9uIG9mIG15IGRlbW8gdGFzaywganVzdCB0byBzaG93IHlvdSB0aGlzIHN1cnByaXNpbmdseSBuaWNlIHNjcm9sbGJhciBhbmQgYW1hemluZ2x5IGN1dGUga2l0dHkg4LiFKF7il4nhtKXil4leKeC4hScsXG4gICcyMDExLTExLTExJyxcbiAgJ2xvdycsXG4gIDAsXG4gIDBcbik7XG50YXNrcy5hZGRUYXNrKFxuICAnQ3JlYXRlIG1hZ2ljIHRocm91Z2ggbXkgbWluZCwgbXkgaGVhcnQgYW5kIG15IGtleWJvYXJkLi4g8J+RqfCfj7vigI3wn5K7JyxcbiAgJ0Fub3RoZXIgbG9uZ2VyIGRlc2NyaXB0aW9uIG9mIG15IGRlbW8gdGFzaywganVzdCB0byBzaG93IHlvdSB0aGlzIHN1cnByaXNpbmdseSBuaWNlIHNjcm9sbGJhciBhbmQgY3V0ZSBsaXR0bGUgYmlyZGllIM+1KCDigJjOmOKAmSApz7bimarimasnLFxuICAnMjAxMi0xMi0xMicsXG4gICdoaWdoJyxcbiAgMSxcbiAgMFxuKTtcblxuLy8gV0hFTiBQQUdFIElTIExPQURFRCAtIFNIT1cgVElUTEUgRlJPTSBNRU5VIExJTksgJ0FMTCdcbmRvbS5zaG93TWFpblRpdGxlKDApO1xuXG4vLyBXSEVOIFBBR0UgSVMgTE9BREVEIC0gU0hPVyBBTEwgVEFTS1MgRlJPTSBBTEwgUFJPSkVDVFNcbmRvbS5nZXRUYXNrcygnYWxsJyk7XG5cbmRvbS5yZXNwb25zaXZlTWVudSgpO1xuaGFuZGxlcnMucmVzaXplV2luZG93KCk7XG5oYW5kbGVycy5saXN0ZW5DbGlja3MoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==