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
  const form = document.querySelector('#form');
  const modalTitle = document.querySelector('#modal-title');
  const modalTitleError = document.querySelector('.modal-title-error');
  const mainContent = document.querySelector('#main');
  const mainTitleIcon = document.querySelector('.main-title-icon');
  const mainTitleText = document.querySelector('.main-title-text');
  const projectsLinksDiv = document.querySelector('.projects-links-div');
  const tasksCount = document.querySelector('.tasks-count');
  const tasksList = document.querySelector('.tasks-list');

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

  function manipulateModal(state, title, modalTask, projectIndex, taskIndex) {
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

    if (state === 'show') {
      const modalIconsDiv = modal.querySelector('.radio-form');
      const modalTasksDiv = modal.querySelector('.modal-tasks-div');

      modal.classList.remove('hide');
      modalMainTitle.textContent = title;
      modalTaskButton.textContent = modalTask;
      modalIconsDiv.classList.remove('hide');
      modalIconsDiv.classList.add('show');
      modalTasksDiv.classList.add('hide');

      // IF MODAL IS FOR ADDING TASK
      if (title === 'Add Task') {
        modalIconsDiv.classList.remove('show');
        modalIconsDiv.classList.add('hide');
        modalTasksDiv.classList.remove('hide');

        // IF MODAL IS FOR WATCHING TASK INFO
      } else if (title === 'Task Info') {
        form.classList.add('hide');
        confirmButton.classList.add('hide');
        taskInfoDiv.classList.remove('hide');
        watchTaskInfo(projectIndex, taskIndex);
      }

      // TO CLOSE THE MODAL
    } else if (state === 'close') {
      modal.classList.add('hide');
    }

    // DELETION MODAL CONTENT
    if (modalTask === 'Delete') {
      modalHeader.classList.add('deletion-modal-header');
      form.classList.add('hide');
      cancelButton.classList.add('cancel-deletion');
      confirmButton.classList.add('confirm-deletion');

      // PROJECT DELETION
      if (title === 'Delete Project') {
        const projectDeletionTitle = document.querySelector('.project-deletion-title');

        projectDeletionText.classList.remove('hide');
        projectDeletionTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;

        // TASK DELETION
      } else if (title === 'Delete Task') {
        const taskDeletionTitle = document.querySelector('.task-deletion-title');

        taskDeletionText.classList.remove('hide');
        taskDeletionTitle.textContent =
          _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;
      }
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
        const taskDueDate = document.createElement('p');
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
        taskDueDate.classList.add('due-date', 'padding-right');
        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].date !== undefined) {
          taskDueDate.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].date;
        } else {
          taskDueDate.textContent = '';
        }

        // TASK DEFAULT ICONS
        taskEditIcon.classList.add(
          'fal',
          'fa-edit',
          'edit-task',
          'scale-element',
          'padding-right'
        );
        taskEditIcon.setAttribute('data-project-index', i);
        taskEditIcon.setAttribute('data-task-index', j);
        taskTrashIcon.classList.add(
          'fal',
          'fa-trash-alt',
          'delete-task',
          'scale-element',
          'padding-right'
        );
        taskTrashIcon.setAttribute('data-project-index', i);
        taskTrashIcon.setAttribute('data-task-index', j);

        taskInfoIcon.classList.add('fal', 'scale-element', 'fa-info-circle');
        taskInfoIcon.setAttribute('data-project-index', i);
        taskInfoIcon.setAttribute('data-task-index', j);

        // APPENDS
        taskIconAndTextDiv.appendChild(taskIcon);
        taskIconAndTextDiv.appendChild(taskText);
        taskInfo.appendChild(taskDueDate);
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
    if (menuTitle === '' && !Number.isNaN(projectIndex)) {
      // If number of index exists - project was clicked
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

  function selectLink(target, index) {
    const allLinks = document.querySelectorAll('.link');
    const menuTitle = target.getAttribute('data-title');
    const addTaskButton = document.querySelector('.add-task');

    addTaskButton.classList.add('hide'); // By default 'Add Task' button is hidden

    allLinks.forEach((link) => {
      link.classList.remove('selected-link');
    });

    // IF CLICKED DIRECTLY ON LINK (BOTH - MENU OR PROJECT)
    if (target.classList.contains('link')) {
      target.classList.add('selected-link');

      // IF CLICKED ON MENU LINK ICON OR TEXT
    } else if (
      target.classList.contains('menu-link-icon') ||
      target.classList.contains('menu-link-text')
    ) {
      target.parentElement.classList.add('selected-link');
    }

    // IF CLICKED SOMEWHERE ON PROJECT LINK
    if (target.classList.contains('project')) {
      // SHOW BUTTON TO ADD TASK FOR SELECTED PROJECT
      addTaskButton.classList.remove('hide');
      getTasks('', index);

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

  function validateModal(modalTask, projectIndex, taskIndex) {
    const { projectFormIcon } = document.forms.form;
    const selectedLink = document.querySelector('.selected-link');
    const projectDomIcon = projectFormIcon.value;
    const projectIconsDiv = modal.querySelector('.radio-form');
    const modalTitleText = modalTitle.value;
    const projectDeletionText = document.querySelector('.project-deletion-text');

    if (modalTask === 'add' || modalTask === 'edit') {
      if (modalTitleText === '') {
        modalTitleError.classList.remove('hide');
        modalTitleError.classList.add('show');

        // ADD PROJECT TO ARRAY
      } else if (
        modalTask === 'add' &&
        projectIconsDiv.classList.contains('show')
      ) {
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectDomIcon, modalTitleText);

        // KEEP NEWLY ADDED PROJECT VISUALLY SELECTED IN DOM
        const lastProject = projectsLinksDiv.lastChild;
        const lastProjectIndex = projectsLinksDiv.lastChild.getAttribute('data-link-index');

        selectLink(lastProject, lastProjectIndex);
        changeMainTitle(lastProject, lastProjectIndex);

        // EDIT PROJECT FROM ARRAY
      } else if (modalTask === 'edit') {
        const allProjectsLinks = document.querySelectorAll('.project-link');
        const editedProject = allProjectsLinks[projectIndex];

        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(projectDomIcon, modalTitleText, projectIndex);
        selectLink(editedProject, projectIndex); // // Keep project visually selected in dom after editing
        changeMainTitle(selectedLink, projectIndex);

        // ADD TASK TO ARRAY
      } else if (
        modalTask === 'add' &&
        projectIconsDiv.classList.contains('hide')
      ) {
        const selectedProject = selectedLink.getAttribute('data-link-index');
        const taskDescription = document.querySelector('.task-description').value;
        const taskDueDate = document.querySelector('#dueDate').value;
        const taskPrioritySelection = document.querySelector('.task-priority');
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
          taskDescription,
          taskDueDate,
          taskPriority
        );
      }

      // DELETE PROJECT FROM ARRAY
    } else if (
      modalTask === 'delete' &&
      !projectDeletionText.classList.contains('hide')
    ) {
      const allTasksLink = document.querySelector('.link:first-child');

      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(projectIndex);
      allTasksLink.classList.add('selected-link');

      // DELETE TASK FROM ARRAY
    } else if (
      modalTask === 'delete' &&
      projectDeletionText.classList.contains('hide')
    ) {
      _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTask(projectIndex, taskIndex);
    }
  }

  function editProject(projectIndex) {
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
    editProject,
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
    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_0__["default"].responsiveMenu);
  }

  function listenClicks() {
    // VARIABLES NOT BE OVERWRITTEN AFTER CLICK EVENT
    let project;
    let task;

    document.addEventListener('click', (event) => {
      const { target } = event;
      const selectedLink = document.querySelector('.selected-link');
      const modalMainTitle = document.querySelector('.modal-main-title');
      let linkIndex = parseInt(target.getAttribute('data-link-index'), 10);
      let taskIndex;

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
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMainTitle(target, linkIndex); // In the main content show title according to link title
      }

      // MODAL FOR ADDING A PROJECT
      if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Project', 'Add');

        // MODAL FOR EDITING A PROJECT
      } else if (target.classList.contains('edit-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Edit Project', 'Edit');
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(linkIndex);

        // MODAL FOR DELETING A PROJECT
      } else if (target.classList.contains('delete-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Project', 'Delete', linkIndex);

        // MODAL FOR ADDING A TASK
      } else if (target.classList.contains('add-task')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Task', 'Add');

        // MODAL FOR EDITING A TASK
      } else if (target.classList.contains('edit-task')) {
        console.log('Task editing.');

        // MODAL FOR DELETING A TASK
      } else if (target.classList.contains('delete-task')) {
        project = parseInt(target.getAttribute('data-project-index'), 10);
        task = parseInt(target.getAttribute('data-task-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Task', 'Delete', project, task);

        // MODAL FOR WATCHING TASK INFO
      } else if (target.classList.contains('fa-info-circle')) {
        linkIndex = parseInt(target.getAttribute('data-project-index'), 10);
        taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Task Info', '', linkIndex, taskIndex);
      }

      // VALIDATE MODAL
      if (target.classList.contains('confirm-modal')) {
        // VALIDATE MODAL FOR ADDING
        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('add');

          // VALIDATE MODAL FOR EDITING
        } else if (target.textContent === 'Edit') {
          // EDIT A PROJECT
          if (modalMainTitle.textContent === 'Edit Project') {
            linkIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('edit', linkIndex);

            // EDIT A TASK
          } else if (modalMainTitle.textContent === 'Edit Task') {
            console.log('Edit a task!');
          }

          // VALIDATE MODAL FOR DELETING
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE PROJECT
          if (!projectDeletionText.classList.contains('hide')) {
            linkIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('delete', linkIndex);
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showMainTitle(0); // After deleting a project - show main title as 'All'
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getTasks('all'); // After deleting a project - show all tasks from all remaining projects

            // DELETE TASK
          } else if (projectDeletionText.classList.contains('hide')) {
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('delete', project, task);
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

  function editProject(icon, title, index) {
    projectsList[index].icon = icon;
    projectsList[index].title = title;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showProjects();
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
    console.log('Add a task!');
  }

  function deleteTask(projectIndex, taskIndex) {
    if (projectIndex > -1) {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.splice(taskIndex, 1);
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showTasks('', projectIndex, _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length);
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getTasks('all');
    }
  }

  return {
    addTask,
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
  'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ047O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw4REFBcUI7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDhEQUFxQjtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSw4REFBcUI7O0FBRTNCO0FBQ0E7QUFDQSxNQUFNLDhEQUFxQjs7QUFFM0I7QUFDQTtBQUNBLE1BQU0sOERBQXFCOztBQUUzQjtBQUNBO0FBQ0EsTUFBTSw4REFBcUI7QUFDM0I7QUFDQTtBQUNBLE1BQU07QUFDTixNQUFNLDhEQUFxQjtBQUMzQjtBQUNBO0FBQ0EsTUFBTTtBQUNOLE1BQU0sOERBQXFCO0FBQzNCO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyw4REFBcUI7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsOERBQXFCOztBQUVoRTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsVUFBVSw4REFBcUI7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxxQkFBcUI7QUFDekQsc0JBQXNCLElBQUksOERBQXFCLGtCQUFrQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDhEQUFxQjtBQUMvQjtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLDhEQUFxQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFNBQVMsOERBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUyw4REFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IsOERBQXFCOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLDhEQUFxQjtBQUNqQyxvQ0FBb0MsOERBQXFCO0FBQ3pELFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSw4REFBcUI7QUFDL0I7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBLHdCQUF3QixxRUFBNEI7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLGtCQUFrQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNERBQW1COztBQUUzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBLFFBQVEsNkRBQW9CO0FBQzVCLGlEQUFpRDtBQUNqRDs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLFFBQVEsc0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSwrREFBc0I7QUFDNUI7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTSx5REFBZ0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLDhEQUFxQjs7QUFFN0M7QUFDQSx1QkFBdUIsOERBQXFCOztBQUU1QztBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLHFFQUE0QjtBQUM1RDs7QUFFQSxvQkFBb0IsSUFBSSxxRUFBNEIsRUFBRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4REFBcUI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLDhEQUFxQjtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxHQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwbkJLOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsMkRBQWtCO0FBQ3hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFjO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHVEQUFjO0FBQ3RCLFFBQVEsNERBQW1CLHFCQUFxQjtBQUNoRDs7QUFFQTtBQUNBO0FBQ0EsUUFBUSw0REFBbUI7O0FBRTNCO0FBQ0EsUUFBUTtBQUNSLFFBQVEsNERBQW1CO0FBQzNCLFFBQVEsd0RBQWU7O0FBRXZCO0FBQ0EsUUFBUTtBQUNSLFFBQVEsNERBQW1COztBQUUzQjtBQUNBLFFBQVE7QUFDUixRQUFRLDREQUFtQjs7QUFFM0I7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVEsNERBQW1COztBQUUzQjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUSw0REFBbUI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDBEQUFpQjs7QUFFM0I7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBaUI7O0FBRTdCO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBaUI7QUFDN0IsWUFBWSw0REFBbUIsYUFBYTtBQUM1QyxZQUFZLDBEQUFpQixLQUFLO0FBQ2xDLFlBQVkscURBQVksU0FBUzs7QUFFakM7QUFDQSxZQUFZO0FBQ1osWUFBWSwwREFBaUI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLDREQUFtQjtBQUMzQjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEhBOztBQUV4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQWdCO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQWdCO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBZ0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeENVO0FBQ1Y7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksOERBQXFCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sOERBQXFCO0FBQzNCLE1BQU0sc0RBQWEsbUJBQW1CLHFFQUE0QjtBQUNsRSxNQUFNLHFEQUFZO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLEtBQUssRUFBQzs7Ozs7OztVQ25DckI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ053QjtBQUNVO0FBQ0E7QUFDTjs7QUFFNUI7QUFDQSw0REFBbUI7QUFDbkIsNERBQW1COztBQUVuQjtBQUNBLHNEQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUFpQjs7QUFFakI7QUFDQSxxREFBWTs7QUFFWiwyREFBa0I7QUFDbEIsOERBQXFCO0FBQ3JCLDhEQUFxQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2hhbmRsZXJzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgdG9nZ2xlTWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLW1lbnUnKTtcbiAgY29uc3Qgc2lkZWJhck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhci1tZW51Jyk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsJyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXRpdGxlJyk7XG4gIGNvbnN0IG1vZGFsVGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZS1lcnJvcicpO1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluJyk7XG4gIGNvbnN0IG1haW5UaXRsZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10aXRsZS1pY29uJyk7XG4gIGNvbnN0IG1haW5UaXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10aXRsZS10ZXh0Jyk7XG4gIGNvbnN0IHByb2plY3RzTGlua3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtbGlua3MtZGl2Jyk7XG4gIGNvbnN0IHRhc2tzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MtY291bnQnKTtcbiAgY29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWxpc3QnKTtcblxuICBmdW5jdGlvbiByZXNwb25zaXZlTWVudSgpIHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gMTAwMCkge1xuICAgICAgdG9nZ2xlTWVudUljb24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgIC8vIEhJREUgU0lERUJBUiBBTkQgTUFLRSBJVCBPUEFRVUVcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdhZGQtei1pbmRleCcpO1xuXG4gICAgICAvLyBFWFBBTkQgTUFJTiBDT05URU5UXG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdleHBhbmQtbWFpbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTSE9XIFNJREVCQVIgQU5EIE1BS0UgSVQgQSBCSVQgVFJBTlNQQVJFTlRcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhZGQtei1pbmRleCcpO1xuXG4gICAgICAvLyBDT05UUkFDVCBNQUlOIENPTlRFTlQgQU5EIE1BS0UgSVQgT1BBUVVFXG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmQtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udHJhY3QtbWFpbicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUtbWFpbicpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICAgdG9nZ2xlTWVudUljb24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG5cbiAgICAvLyBTSE9XIFNJREVCQVIgQU5EIE1BS0UgTUFJTiBDT05URU5UIEEgQklUIFRSQU5TUEFSRU5UXG4gICAgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnaGlkZS1zaWRlYmFyJykpIHtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZS1tYWluJyk7XG5cbiAgICAgIC8vIEhJREUgU0lERUJBUiBBTkQgTUFLRSBNQUlOIENPTlRFTlQgT1BBUVVFXG4gICAgfSBlbHNlIGlmIChzaWRlYmFyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctc2lkZWJhcicpKSB7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2lkZWJhcicpO1xuICAgICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUtbWFpbicpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1BSU4gQ09OVEVOVCBUSVRMRVxuICBmdW5jdGlvbiBzaG93TWFpblRpdGxlKGluZGV4KSB7XG4gICAgY29uc3QgYWxsTWVudUljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtbGluay1pY29uJyk7XG4gICAgY29uc3QgbWVudUljb24gPSBhbGxNZW51SWNvbnNbaW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1pY29uJyk7XG4gICAgY29uc3QgbWVudVRleHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtbGluay10ZXh0Jyk7XG5cbiAgICBtYWluVGl0bGVJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAnZmFsJyxcbiAgICAgICdmYS1mdycsXG4gICAgICAnbWFpbi10aXRsZS1pY29uJyxcbiAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgIG1lbnVJY29uXG4gICAgKTtcbiAgICBtYWluVGl0bGVUZXh0LnRleHRDb250ZW50ID0gbWVudVRleHRzW2luZGV4XS50ZXh0Q29udGVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGluZGV4KSB7XG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc05hbWUgPSAnJztcblxuICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gVEhFIE1FTlVcbiAgICBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmsnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgc2hvd01haW5UaXRsZShpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gVElUTEUgT0YgVEFTS1MgRlJPTSBQUk9KRUNUU1xuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnKVxuICAgICkge1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG5cbiAgICAgIG1haW5UaXRsZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ2ZhbCcsXG4gICAgICAgICdmYS1mdycsXG4gICAgICAgICdtYWluLXRpdGxlLWljb24nLFxuICAgICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICAgIHByb2plY3RJY29uXG4gICAgICApO1xuICAgICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2F0Y2hUYXNrSW5mbyhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IGluZm9UYXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXRpdGxlJyk7XG4gICAgY29uc3QgaW5mb1Rhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBpbmZvVGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLWR1ZS1kYXRlJyk7XG4gICAgY29uc3QgaW5mb1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXRhc2stcHJpb3JpdHknKTtcbiAgICBjb25zdCBpbmZvVGFza1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXByb2plY3QnKTtcblxuICAgIC8vIFRBU0sgVElUTEVcbiAgICBpbmZvVGFza1RpdGxlLnRleHRDb250ZW50ID1cbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG5cbiAgICAvLyBUQVNLIERFU0NSSVBUSU9OXG4gICAgaW5mb1Rhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2NyaXB0aW9uO1xuXG4gICAgLy8gVEFTSyBEVUUgREFURVxuICAgIGluZm9UYXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRhdGU7XG5cbiAgICAvLyBUQVNLIFBSSU9SSVRZXG4gICAgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2xvdydcbiAgICApIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSSBjYW4gZG8gaXQgbGF0ZXIgb3IgbmV2ZXIgYXQgYWxsLi4g8J+YtCc7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPT09ICdtZWRpdW0nXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgc3RheSBzb21ld2hlcmUgYmV0d2VlbiByZWxheGF0aW9uIGFuZCBmb2N1cyDwn5iFJztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ2hpZ2gnXG4gICAgKSB7XG4gICAgICBpbmZvVGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0kgbXVzdCBkbyBpdCAtIHNvb25lciBvciBsYXRlciEg8J+Ysic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG5cbiAgICAvLyBUQVNLIFBST0pFQ1RcbiAgICBpbmZvVGFza1Byb2plY3QudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hbmlwdWxhdGVNb2RhbChzdGF0ZSwgdGl0bGUsIG1vZGFsVGFzaywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBjb25zdCBtb2RhbEhlYWRlciA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcbiAgICBjb25zdCBtb2RhbE1haW5UaXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1tYWluLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxUYXNrQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRhc2stYnV0dG9uJyk7XG4gICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGV4dCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWRlbGV0aW9uLXRleHQnKTtcbiAgICBjb25zdCB0YXNrRGVsZXRpb25UZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnRhc2stZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IHRhc2tJbmZvRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmluZm8tZGl2Jyk7XG4gICAgY29uc3QgY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLW1vZGFsJyk7XG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNhbmNlbC1tb2RhbCcpO1xuXG4gICAgbW9kYWxIZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRpb24tbW9kYWwtaGVhZGVyJyk7XG4gICAgZm9ybS5yZXNldCgpO1xuICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHRhc2tJbmZvRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBtb2RhbFRpdGxlRXJyb3IuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIHRhc2tEZWxldGlvblRleHQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjYW5jZWwtZGVsZXRpb24nKTtcbiAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbmZpcm0tZGVsZXRpb24nLCAnaGlkZScpO1xuXG4gICAgaWYgKHN0YXRlID09PSAnc2hvdycpIHtcbiAgICAgIGNvbnN0IG1vZGFsSWNvbnNEaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcucmFkaW8tZm9ybScpO1xuICAgICAgY29uc3QgbW9kYWxUYXNrc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10YXNrcy1kaXYnKTtcblxuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxNYWluVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgIG1vZGFsVGFza0J1dHRvbi50ZXh0Q29udGVudCA9IG1vZGFsVGFzaztcbiAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAgICAgLy8gSUYgTU9EQUwgSVMgRk9SIEFERElORyBUQVNLXG4gICAgICBpZiAodGl0bGUgPT09ICdBZGQgVGFzaycpIHtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgIG1vZGFsSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBtb2RhbFRhc2tzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICAvLyBJRiBNT0RBTCBJUyBGT1IgV0FUQ0hJTkcgVEFTSyBJTkZPXG4gICAgICB9IGVsc2UgaWYgKHRpdGxlID09PSAnVGFzayBJbmZvJykge1xuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIHRhc2tJbmZvRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgd2F0Y2hUYXNrSW5mbyhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPIENMT1NFIFRIRSBNT0RBTFxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdjbG9zZScpIHtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG5cbiAgICAvLyBERUxFVElPTiBNT0RBTCBDT05URU5UXG4gICAgaWYgKG1vZGFsVGFzayA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgIG1vZGFsSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2RlbGV0aW9uLW1vZGFsLWhlYWRlcicpO1xuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBjYW5jZWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2FuY2VsLWRlbGV0aW9uJyk7XG4gICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tZGVsZXRpb24nKTtcblxuICAgICAgLy8gUFJPSkVDVCBERUxFVElPTlxuICAgICAgaWYgKHRpdGxlID09PSAnRGVsZXRlIFByb2plY3QnKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REZWxldGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGl0bGUnKTtcblxuICAgICAgICBwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcHJvamVjdERlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcblxuICAgICAgICAvLyBUQVNLIERFTEVUSU9OXG4gICAgICB9IGVsc2UgaWYgKHRpdGxlID09PSAnRGVsZXRlIFRhc2snKSB7XG4gICAgICAgIGNvbnN0IHRhc2tEZWxldGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZGVsZXRpb24tdGl0bGUnKTtcblxuICAgICAgICB0YXNrRGVsZXRpb25UZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgdGFza0RlbGV0aW9uVGl0bGUudGV4dENvbnRlbnQgPVxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Rhc2tzKG1lbnVUaXRsZSwgcHJvamVjdEluZGV4U3RhcnQsIHByb2plY3RJbmRleEVuZCkge1xuICAgIGxldCB0YXNrc051bWJlciA9IDA7XG5cbiAgICB0YXNrc0NvdW50LnRleHRDb250ZW50ID0gMDtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcblxuICAgIC8vIEdFTkVSQVRFIFRBU0tTIExJU1RcbiAgICBmb3IgKGxldCBpID0gcHJvamVjdEluZGV4U3RhcnQ7IGkgPCBwcm9qZWN0SW5kZXhFbmQ7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3MubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ0lNUE9SVEFOVCcgLSBGSUxURVIgTk9UIElNUE9SVEFOVCBUQVNLU1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbWVudVRpdGxlID09PSAnaW1wb3J0YW50JyAmJlxuICAgICAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSAhPT0gJ2hpZ2gnXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnRpbnVlOyAvLyBJZiB0YXNrIGlzbid0IGltcG9ydGFudCAtIHNraXAgaXRcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdUT0RBWSdcbiAgICAgICAgfSBlbHNlIGlmIChtZW51VGl0bGUgPT09ICd0b2RheScpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnVGFza3MgZm9yIHRvZGF5Li4nKTtcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdXRUVLJ1xuICAgICAgICB9IGVsc2UgaWYgKG1lbnVUaXRsZSA9PT0gJ3dlZWsnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2tzIG9mIHRoZSB3ZWVrLi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0ljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHRhc2tFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY29uc3QgdGFza1RyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY29uc3QgdGFza0luZm9JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAgIC8vIFNIT1cgTlVNQkVSIE9GIFRBU0tTXG4gICAgICAgIHRhc2tzTnVtYmVyICs9IDE7XG4gICAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSB0YXNrc051bWJlcjtcblxuICAgICAgICAvLyBUQVNLIFBSSU9SSVRZLCBURVhUIEFORCBJVFMgRElWXG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kaXYnLCAnaG92ZXItZWxlbWVudCcpO1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xuXG4gICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgPT09ICdsb3cnKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICAgJ2ZhLWNpcmNsZScsXG4gICAgICAgICAgICAnbG93LXByaW9yaXR5JyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ID09PSAnbWVkaXVtJykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAgICdmYS1jaXJjbGUnLFxuICAgICAgICAgICAgJ21pZC1wcmlvcml0eScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICAgJ2ZhLWNpcmNsZScsXG4gICAgICAgICAgICAnaGlnaC1wcmlvcml0eScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdmYS1jaXJjbGUnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFza1RleHQuY2xhc3NMaXN0LmFkZCgndGFzay10ZXh0Jyk7XG4gICAgICAgIHRhc2tUZXh0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnRpdGxlO1xuXG4gICAgICAgIC8vIFRBU0sgSU5GTyBESVZcbiAgICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xuXG4gICAgICAgIC8vIFRBU0tTIERVRSBEQVRFXG4gICAgICAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2R1ZS1kYXRlJywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5kYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5kYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUQVNLIERFRkFVTFQgSUNPTlNcbiAgICAgICAgdGFza0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgJ2ZhLWVkaXQnLFxuICAgICAgICAgICdlZGl0LXRhc2snLFxuICAgICAgICAgICdzY2FsZS1lbGVtZW50JyxcbiAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgKTtcbiAgICAgICAgdGFza0VkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JywgaSk7XG4gICAgICAgIHRhc2tFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcsIGopO1xuICAgICAgICB0YXNrVHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ2ZhbCcsXG4gICAgICAgICAgJ2ZhLXRyYXNoLWFsdCcsXG4gICAgICAgICAgJ2RlbGV0ZS10YXNrJyxcbiAgICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza1RyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcsIGopO1xuXG4gICAgICAgIHRhc2tJbmZvSWNvbi5jbGFzc0xpc3QuYWRkKCdmYWwnLCAnc2NhbGUtZWxlbWVudCcsICdmYS1pbmZvLWNpcmNsZScpO1xuICAgICAgICB0YXNrSW5mb0ljb24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza0luZm9JY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG5cbiAgICAgICAgLy8gQVBQRU5EU1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza0ljb24pO1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQodGFza1RleHQpO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tFZGl0SWNvbik7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tUcmFzaEljb24pO1xuICAgICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrSW5mb0ljb24pO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tJY29uQW5kVGV4dERpdik7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0luZm8pO1xuICAgICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgICB9XG4gICAgfVxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRhc2tzKG1lbnVUaXRsZSwgcHJvamVjdEluZGV4KSB7XG4gICAgbGV0IHByb2plY3RJbmRleFN0YXJ0O1xuICAgIGxldCBwcm9qZWN0SW5kZXhFbmQ7XG5cbiAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgTElOS1xuICAgIGlmIChtZW51VGl0bGUgPT09ICcnICYmICFOdW1iZXIuaXNOYU4ocHJvamVjdEluZGV4KSkge1xuICAgICAgLy8gSWYgbnVtYmVyIG9mIGluZGV4IGV4aXN0cyAtIHByb2plY3Qgd2FzIGNsaWNrZWRcbiAgICAgIHByb2plY3RJbmRleFN0YXJ0ID0gcHJvamVjdEluZGV4O1xuICAgICAgcHJvamVjdEluZGV4RW5kID0gcHJvamVjdEluZGV4ICsgMTtcblxuICAgICAgLy8gSUYgUFJPSkVDVCBET0VTTidUIEhBVkUgQU5ZIFRBU0tTXG4gICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSAwO1xuICAgICAgfVxuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOS1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9qZWN0SW5kZXhTdGFydCA9IDA7XG4gICAgICBwcm9qZWN0SW5kZXhFbmQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoO1xuICAgIH1cbiAgICBzaG93VGFza3MobWVudVRpdGxlLCBwcm9qZWN0SW5kZXhTdGFydCwgcHJvamVjdEluZGV4RW5kKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdExpbmsodGFyZ2V0LCBpbmRleCkge1xuICAgIGNvbnN0IGFsbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpbmsnKTtcbiAgICBjb25zdCBtZW51VGl0bGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyk7XG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzaycpO1xuXG4gICAgYWRkVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7IC8vIEJ5IGRlZmF1bHQgJ0FkZCBUYXNrJyBidXR0b24gaXMgaGlkZGVuXG5cbiAgICBhbGxMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWxpbmsnKTtcbiAgICB9KTtcblxuICAgIC8vIElGIENMSUNLRUQgRElSRUNUTFkgT04gTElOSyAoQk9USCAtIE1FTlUgT1IgUFJPSkVDVClcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluaycpKSB7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOSyBJQ09OIE9SIFRFWFRcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLWljb24nKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rLXRleHQnKVxuICAgICkge1xuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH1cblxuICAgIC8vIElGIENMSUNLRUQgU09NRVdIRVJFIE9OIFBST0pFQ1QgTElOS1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0JykpIHtcbiAgICAgIC8vIFNIT1cgQlVUVE9OIFRPIEFERCBUQVNLIEZPUiBTRUxFQ1RFRCBQUk9KRUNUXG4gICAgICBhZGRUYXNrQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIGdldFRhc2tzKCcnLCBpbmRleCk7XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBJQ09OIE9SIFRFWFQgT1IgRURJVC9ERUxFVEUgSUNPTlNcbiAgICAgIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC10ZXh0JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKVxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAgIC8vIElGIENMSUNLRUQgT04gUFJPSkVDVCBFTEVNRU5UUyBESVZTXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24tYW5kLXRleHQtZGl2JykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWZhdWx0LWljb25zLWRpdicpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElGIENMSUNLRUQgU09NRVdIRVJFIE9OIE1FTlUgTElOS1xuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluaycpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpXG4gICAgKSB7XG4gICAgICBnZXRUYXNrcyhtZW51VGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlTW9kYWwobW9kYWxUYXNrLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IHsgcHJvamVjdEZvcm1JY29uIH0gPSBkb2N1bWVudC5mb3Jtcy5mb3JtO1xuICAgIGNvbnN0IHNlbGVjdGVkTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saW5rJyk7XG4gICAgY29uc3QgcHJvamVjdERvbUljb24gPSBwcm9qZWN0Rm9ybUljb24udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnJhZGlvLWZvcm0nKTtcbiAgICBjb25zdCBtb2RhbFRpdGxlVGV4dCA9IG1vZGFsVGl0bGUudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWRlbGV0aW9uLXRleHQnKTtcblxuICAgIGlmIChtb2RhbFRhc2sgPT09ICdhZGQnIHx8IG1vZGFsVGFzayA9PT0gJ2VkaXQnKSB7XG4gICAgICBpZiAobW9kYWxUaXRsZVRleHQgPT09ICcnKSB7XG4gICAgICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gQUREIFBST0pFQ1QgVE8gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG1vZGFsVGFzayA9PT0gJ2FkZCcgJiZcbiAgICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpXG4gICAgICApIHtcbiAgICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQpO1xuXG4gICAgICAgIC8vIEtFRVAgTkVXTFkgQURERUQgUFJPSkVDVCBWSVNVQUxMWSBTRUxFQ1RFRCBJTiBET01cbiAgICAgICAgY29uc3QgbGFzdFByb2plY3QgPSBwcm9qZWN0c0xpbmtzRGl2Lmxhc3RDaGlsZDtcbiAgICAgICAgY29uc3QgbGFzdFByb2plY3RJbmRleCA9IHByb2plY3RzTGlua3NEaXYubGFzdENoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4Jyk7XG5cbiAgICAgICAgc2VsZWN0TGluayhsYXN0UHJvamVjdCwgbGFzdFByb2plY3RJbmRleCk7XG4gICAgICAgIGNoYW5nZU1haW5UaXRsZShsYXN0UHJvamVjdCwgbGFzdFByb2plY3RJbmRleCk7XG5cbiAgICAgICAgLy8gRURJVCBQUk9KRUNUIEZST00gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAobW9kYWxUYXNrID09PSAnZWRpdCcpIHtcbiAgICAgICAgY29uc3QgYWxsUHJvamVjdHNMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LWxpbmsnKTtcbiAgICAgICAgY29uc3QgZWRpdGVkUHJvamVjdCA9IGFsbFByb2plY3RzTGlua3NbcHJvamVjdEluZGV4XTtcblxuICAgICAgICBwcm9qZWN0cy5lZGl0UHJvamVjdChwcm9qZWN0RG9tSWNvbiwgbW9kYWxUaXRsZVRleHQsIHByb2plY3RJbmRleCk7XG4gICAgICAgIHNlbGVjdExpbmsoZWRpdGVkUHJvamVjdCwgcHJvamVjdEluZGV4KTsgLy8gLy8gS2VlcCBwcm9qZWN0IHZpc3VhbGx5IHNlbGVjdGVkIGluIGRvbSBhZnRlciBlZGl0aW5nXG4gICAgICAgIGNoYW5nZU1haW5UaXRsZShzZWxlY3RlZExpbmssIHByb2plY3RJbmRleCk7XG5cbiAgICAgICAgLy8gQUREIFRBU0sgVE8gQVJSQVlcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG1vZGFsVGFzayA9PT0gJ2FkZCcgJiZcbiAgICAgICAgcHJvamVjdEljb25zRGl2LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5U2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stcHJpb3JpdHknKTtcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eTtcblxuICAgICAgICAvLyBDSEVDSyBUQVNLIFBSSU9SSVRZXG4gICAgICAgIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdsb3cnKSB7XG4gICAgICAgICAgdGFza1ByaW9yaXR5ID0gJ2xvdyc7XG4gICAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbWVkaXVtJykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdtZWRpdW0nO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgdGFza1ByaW9yaXR5ID0gJ2hpZ2gnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFza3MuYWRkVGFzayhcbiAgICAgICAgICBzZWxlY3RlZFByb2plY3QsXG4gICAgICAgICAgbW9kYWxUaXRsZVRleHQsXG4gICAgICAgICAgdGFza0Rlc2NyaXB0aW9uLFxuICAgICAgICAgIHRhc2tEdWVEYXRlLFxuICAgICAgICAgIHRhc2tQcmlvcml0eVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBERUxFVEUgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG1vZGFsVGFzayA9PT0gJ2RlbGV0ZScgJiZcbiAgICAgICFwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpXG4gICAgKSB7XG4gICAgICBjb25zdCBhbGxUYXNrc0xpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluazpmaXJzdC1jaGlsZCcpO1xuXG4gICAgICBwcm9qZWN0cy5kZWxldGVQcm9qZWN0KHByb2plY3RJbmRleCk7XG4gICAgICBhbGxUYXNrc0xpbmsuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuXG4gICAgICAvLyBERUxFVEUgVEFTSyBGUk9NIEFSUkFZXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG1vZGFsVGFzayA9PT0gJ2RlbGV0ZScgJiZcbiAgICAgIHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJylcbiAgICApIHtcbiAgICAgIHRhc2tzLmRlbGV0ZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KHByb2plY3RJbmRleCkge1xuICAgIGNvbnN0IGFsbFByb2plY3RJY29ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJyk7XG4gICAgY29uc3QgcHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS5pY29uO1xuXG4gICAgLy8gU0hPVyBFRElUQUJMRSBQUk9KRUNUIFRJVExFXG4gICAgbW9kYWxUaXRsZS52YWx1ZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuXG4gICAgLy8gU0VMRUNUIEVESVRBQkxFIFBST0pFQ1QgSUNPTlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdEljb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxsUHJvamVjdEljb25zW2ldLnZhbHVlID09PSBwcm9qZWN0SWNvbikge1xuICAgICAgICBhbGxQcm9qZWN0SWNvbnNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY291bnQnKTtcblxuICAgIC8vIFNIT1cgTlVNQkVSIE9GIFBST0pFQ1RTXG4gICAgcHJvamVjdHNDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgcHJvamVjdHNMaW5rc0Rpdi50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT04vVEVYVCBBTkQgREVGQVVMVCBJQ09OUyBESVZTXG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb25zRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgTElOS1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnbGluaycsICdwcm9qZWN0LWxpbmsnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT05cbiAgICAgIHByb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZncnLFxuICAgICAgICAncHJvamVjdC1pY29uJyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0uaWNvblxuICAgICAgKTtcbiAgICAgIHByb2plY3RJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgVEVYVFxuICAgICAgcHJvamVjdFRleHQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10ZXh0JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0VGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50aXRsZTtcbiAgICAgIHByb2plY3RUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgREVGQVVMVCBJQ09OU1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZWRpdCcsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ2VkaXQtcHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLXRyYXNoLWFsdCcsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ2RlbGV0ZS1wcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdzY2FsZS1lbGVtZW50J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcblxuICAgICAgLy8gQVBQRU5EU1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRyYXNoSWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUZXh0KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uQW5kVGV4dERpdik7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbnNEaXYpO1xuICAgICAgcHJvamVjdHNMaW5rc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgfVxuICAgIG1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzcG9uc2l2ZU1lbnUsXG4gICAgdG9nZ2xlTWVudSxcbiAgICBzaG93TWFpblRpdGxlLFxuICAgIGNoYW5nZU1haW5UaXRsZSxcbiAgICBtYW5pcHVsYXRlTW9kYWwsXG4gICAgc2hvd1Rhc2tzLFxuICAgIGdldFRhc2tzLFxuICAgIHNlbGVjdExpbmssXG4gICAgdmFsaWRhdGVNb2RhbCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBzaG93UHJvamVjdHMsXG5cbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBoYW5kbGVycyA9ICgoKSA9PiB7XG4gIC8vIFJFU0laRSBNRU5VIERFUEVORElORyBPTiBXSU5ET1cgU0laRVxuICBmdW5jdGlvbiByZXNpemVXaW5kb3coKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRvbS5yZXNwb25zaXZlTWVudSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5DbGlja3MoKSB7XG4gICAgLy8gVkFSSUFCTEVTIE5PVCBCRSBPVkVSV1JJVFRFTiBBRlRFUiBDTElDSyBFVkVOVFxuICAgIGxldCBwcm9qZWN0O1xuICAgIGxldCB0YXNrO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcbiAgICAgIGNvbnN0IHNlbGVjdGVkTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saW5rJyk7XG4gICAgICBjb25zdCBtb2RhbE1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1tYWluLXRpdGxlJyk7XG4gICAgICBsZXQgbGlua0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JyksIDEwKTtcbiAgICAgIGxldCB0YXNrSW5kZXg7XG5cbiAgICAgIC8vIFRPR0dMRSBTSURFIE1FTlVcbiAgICAgIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLW1lbnUnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpXG4gICAgICApIHtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gU1RZTEUgQ0xJQ0tFRCBMSU5LXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0JykpIHtcbiAgICAgICAgZG9tLnNlbGVjdExpbmsodGFyZ2V0LCBsaW5rSW5kZXgpO1xuICAgICAgICBkb20uY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgbGlua0luZGV4KTsgLy8gSW4gdGhlIG1haW4gY29udGVudCBzaG93IHRpdGxlIGFjY29yZGluZyB0byBsaW5rIHRpdGxlXG4gICAgICB9XG5cbiAgICAgIC8vIE1PREFMIEZPUiBBRERJTkcgQSBQUk9KRUNUXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBQcm9qZWN0JywgJ0FkZCcpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBFRElUSU5HIEEgUFJPSkVDVFxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0VkaXQgUHJvamVjdCcsICdFZGl0Jyk7XG4gICAgICAgIGRvbS5lZGl0UHJvamVjdChsaW5rSW5kZXgpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBERUxFVElORyBBIFBST0pFQ1RcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0RlbGV0ZSBQcm9qZWN0JywgJ0RlbGV0ZScsIGxpbmtJbmRleCk7XG5cbiAgICAgICAgLy8gTU9EQUwgRk9SIEFERElORyBBIFRBU0tcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2snKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBUYXNrJywgJ0FkZCcpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBFRElUSU5HIEEgVEFTS1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhc2snKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnVGFzayBlZGl0aW5nLicpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBERUxFVElORyBBIFRBU0tcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXRhc2snKSkge1xuICAgICAgICBwcm9qZWN0ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JyksIDEwKTtcbiAgICAgICAgdGFzayA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRGVsZXRlIFRhc2snLCAnRGVsZXRlJywgcHJvamVjdCwgdGFzayk7XG5cbiAgICAgICAgLy8gTU9EQUwgRk9SIFdBVENISU5HIFRBU0sgSU5GT1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1pbmZvLWNpcmNsZScpKSB7XG4gICAgICAgIGxpbmtJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpLCAxMCk7XG4gICAgICAgIHRhc2tJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnVGFzayBJbmZvJywgJycsIGxpbmtJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIH1cblxuICAgICAgLy8gVkFMSURBVEUgTU9EQUxcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLW1vZGFsJykpIHtcbiAgICAgICAgLy8gVkFMSURBVEUgTU9EQUwgRk9SIEFERElOR1xuICAgICAgICBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnQWRkJykge1xuICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdhZGQnKTtcblxuICAgICAgICAgIC8vIFZBTElEQVRFIE1PREFMIEZPUiBFRElUSU5HXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSAnRWRpdCcpIHtcbiAgICAgICAgICAvLyBFRElUIEEgUFJPSkVDVFxuICAgICAgICAgIGlmIChtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9PT0gJ0VkaXQgUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGxpbmtJbmRleCA9IHBhcnNlSW50KHNlbGVjdGVkTGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZWRpdCcsIGxpbmtJbmRleCk7XG5cbiAgICAgICAgICAgIC8vIEVESVQgQSBUQVNLXG4gICAgICAgICAgfSBlbHNlIGlmIChtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9PT0gJ0VkaXQgVGFzaycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFZGl0IGEgdGFzayEnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWQUxJREFURSBNT0RBTCBGT1IgREVMRVRJTkdcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdEZWxldGUnKSB7XG4gICAgICAgICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWRlbGV0aW9uLXRleHQnKTtcblxuICAgICAgICAgIC8vIERFTEVURSBQUk9KRUNUXG4gICAgICAgICAgaWYgKCFwcm9qZWN0RGVsZXRpb25UZXh0LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgICAgICBsaW5rSW5kZXggPSBwYXJzZUludChzZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2RlbGV0ZScsIGxpbmtJbmRleCk7XG4gICAgICAgICAgICBkb20uY2hhbmdlTWFpblRpdGxlKHRhcmdldCwgMCk7IC8vIEFmdGVyIGRlbGV0aW5nIGEgcHJvamVjdCAtIGNoYW5nZSBpY29uIHRvICdmYS1jYWxlbmRhci1hbHQnIChtZW51IGxpbmsgJ0FsbCcpXG4gICAgICAgICAgICBkb20uc2hvd01haW5UaXRsZSgwKTsgLy8gQWZ0ZXIgZGVsZXRpbmcgYSBwcm9qZWN0IC0gc2hvdyBtYWluIHRpdGxlIGFzICdBbGwnXG4gICAgICAgICAgICBkb20uZ2V0VGFza3MoJ2FsbCcpOyAvLyBBZnRlciBkZWxldGluZyBhIHByb2plY3QgLSBzaG93IGFsbCB0YXNrcyBmcm9tIGFsbCByZW1haW5pbmcgcHJvamVjdHNcblxuICAgICAgICAgICAgLy8gREVMRVRFIFRBU0tcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdkZWxldGUnLCBwcm9qZWN0LCB0YXNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ0xPU0UgTU9EQUxcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZScpKSB7XG4gICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ2Nsb3NlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc2l6ZVdpbmRvdyxcbiAgICBsaXN0ZW5DbGlja3MsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVycztcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IFtdO1xuXG4gIGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKGljb24sIHRpdGxlKSB7XG4gICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFByb2plY3QoaWNvbiwgdGl0bGUpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoaWNvbiwgdGl0bGUpO1xuICAgIHByb2plY3RzTGlzdC5wdXNoKHByb2plY3QpO1xuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGljb24sIHRpdGxlLCBpbmRleCkge1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0uaWNvbiA9IGljb247XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcHJvamVjdHNMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGRvbS5zaG93UHJvamVjdHMoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvamVjdHNMaXN0LFxuICAgIGFkZFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHRhc2tzID0gKCgpID0+IHtcbiAgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICB0aGlzLnByb2plY3RJbmRleCA9IHByb2plY3RJbmRleDtcbiAgICAgIHRoaXMudGFza0luZGV4ID0gdGFza0luZGV4O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzLnB1c2godGFzayk7XG4gICAgY29uc29sZS5sb2coJ0FkZCBhIHRhc2shJyk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgaWYgKHByb2plY3RJbmRleCA+IC0xKSB7XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrcy5zcGxpY2UodGFza0luZGV4LCAxKTtcbiAgICAgIGRvbS5zaG93VGFza3MoJycsIHByb2plY3RJbmRleCwgcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aCk7XG4gICAgICBkb20uZ2V0VGFza3MoJ2FsbCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkVGFzayxcbiAgICBkZWxldGVUYXNrLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza3M7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuXG4vLyBBREQgREVGQVVMVCBQUk9KRUNUIChFWEFNUExFKVxucHJvamVjdHMuYWRkUHJvamVjdCgnZmEtdG9vbHMnLCAnQ3JhZnQgTmV3IFByb2plY3QnKTtcbnByb2plY3RzLmFkZFByb2plY3QoJ2ZhLXRvb2xzJywgJ0NyYWZ0IEFub3RoZXIgUHJvamVjdCcpO1xuXG4vLyBBREQgREVGQVVMVCBUQVNLIChFWEFNUExFKVxudGFza3MuYWRkVGFzayhcbiAgJ0Vuam95IG15IHRlYSBhcyBtdWNoIGFzIG15IGNvZGluZyEg8J+NtScsXG4gICdMb25nZXIgZGVzY3JpcHRpb24gb2YgbXkgZGVtbyB0YXNrLCBqdXN0IHRvIHNob3cgeW91IHRoaXMgc3VycHJpc2luZ2x5IG5pY2Ugc2Nyb2xsYmFyIGFuZCBhbWF6aW5nbHkgY3V0ZSBraXR0eSDguIUoXuKXieG0peKXiV4p4LiFJyxcbiAgJzIwMTEtMTEtMTEnLFxuICAnbG93JyxcbiAgMCxcbiAgMFxuKTtcblxudGFza3MuYWRkVGFzayhcbiAgJ0NyZWF0ZSBtYWdpYyB0aHJvdWdoIG15IG1pbmQsIG15IGhlYXJ0IGFuZCBteSBrZXlib2FyZC4uIPCfkanwn4+74oCN8J+SuycsXG4gICdMb25nZXIgZGVzY3JpcHRpb24gb2YgbXkgZGVtbyB0YXNrLCBqdXN0IHRvIHNob3cgeW91IHRoaXMgc3VycHJpc2luZ2x5IG5pY2Ugc2Nyb2xsYmFyIGFuZCBhbWF6aW5nbHkgY3V0ZSBraXR0eSDguIUoXuKXieG0peKXiV4p4LiFJyxcbiAgJzIwMTItMTItMTInLFxuICAnaGlnaCcsXG4gIDEsXG4gIDBcbik7XG5cbi8vIFdIRU4gUEFHRSBJUyBMT0FERUQgLSBTSE9XIFRJVExFIEZST00gTUVOVSBMSU5LICdBTEwnXG5kb20uc2hvd01haW5UaXRsZSgwKTtcblxuLy8gV0hFTiBQQUdFIElTIExPQURFRCAtIFNIT1cgQUxMIFRBU0tTIEZST00gQUxMIFBST0pFQ1RTXG5kb20uZ2V0VGFza3MoJ2FsbCcpO1xuXG5kb20ucmVzcG9uc2l2ZU1lbnUoKTtcbmhhbmRsZXJzLnJlc2l6ZVdpbmRvdygpO1xuaGFuZGxlcnMubGlzdGVuQ2xpY2tzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=