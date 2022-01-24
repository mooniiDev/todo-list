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

  // TASKS
  function showTasks(menuTitle, projectIndexStart, projectIndexEnd) {
    let tasksNumber = 0;

    tasksCount.textContent = 0;
    tasksList.textContent = '';

    // GENERATE TASKS LIST
    for (let i = projectIndexStart; i < projectIndexEnd; i += 1) {
      for (let j = 0; j < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks.length; j += 1) {

        // IF CLICKED ON MENU LINK 'IMPORTANT' - FILTER NOT IMPORTANT TASKS
        if (menuTitle === 'important' && _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].tasks[j].priority !== 'high') {
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
  }

  function getTasks(menuTitle, index) {
    let projectIndexStart;
    let projectIndexEnd;

    // IF CLICKED ON PROJECT LINK
    if (menuTitle === '' && !Number.isNaN(index)) { // If number of index exists - project was clicked
      projectIndexStart = index;
      projectIndexEnd = index + 1

      // IF PROJECT DOESN'T HAVE ANY TASKS
      if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].tasks.length === 0) {
        tasksCount.textContent = 0;
      }

      // IF CLICKED ON MENU LINK
    } else {
      projectIndexStart = 0;
      projectIndexEnd = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length;
    }

    showTasks(menuTitle, projectIndexStart, projectIndexEnd);
  }

  // LINK SELECTION
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


  // MODAL FUNCTIONALITY
  function watchTaskInfo(projectIndex, taskIndex) {
    const infoTaskTitle = document.querySelector('.info-task-title');
    const infoTaskDescription = document.querySelector('.info-task-description');
    const infoTaskDueDate = document.querySelector('.info-task-due-date');
    const infoTaskPriority = document.querySelector('.info-task-priority');
    const infoTaskProject = document.querySelector('.info-task-project');

    // TASK TITLE
    const infoTaskTitleText = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;
    infoTaskTitle.textContent = infoTaskTitleText;

    // TASK DESCRIPTION
    const infoTaskDescriptionText = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].description;
    infoTaskDescription.textContent = infoTaskDescriptionText;

    // TASK DUE DATE
    const infoTaskDueDateText = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].date;
    infoTaskDueDate.textContent = infoTaskDueDateText;

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
        const projectDeletionTitle = document.querySelector(
          '.project-deletion-title'
        );

        projectDeletionText.classList.remove('hide');
        projectDeletionTitle.textContent =
          _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;

        // TASK DELETION
      } else if (title === 'Delete Task') {
        const taskDeletionTitle = document.querySelector(
          '.task-deletion-title'
        );

        taskDeletionText.classList.remove('hide');
        taskDeletionTitle.textContent =
          _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;
      }
    }
  }

  function validateModal(modalTask, index) {
    const { projectFormIcon } = document.forms.form;
    const selectedLink = document.querySelector('.selected-link');
    const projectDomIcon = projectFormIcon.value;
    const projectIconsDiv = modal.querySelector('.radio-form');
    const modalTitleText = modalTitle.value;

    if (modalTask === 'add' || modalTask === 'edit') {
      if (modalTitleText === '') {
        modalTitleError.classList.remove('hide');
        modalTitleError.classList.add('show');

        // ADD PROJECT TO ARRAY
      } else if (modalTask === 'add' && projectIconsDiv.classList.contains('show')) {
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectDomIcon, modalTitleText);

        // KEEP NEWLY ADDED PROJECT VISUALLY SELECTED IN DOM
        const lastProject = projectsLinksDiv.lastChild;
        const lastProjectIndex = projectsLinksDiv.lastChild.getAttribute('data-link-index');

        selectLink(lastProject, lastProjectIndex)
        changeMainTitle(lastProject, lastProjectIndex);

        // EDIT PROJECT FROM ARRAY
      } else if (modalTask === 'edit') {
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(projectDomIcon, modalTitleText, index);

        // KEEP PROJECT VISUALLY SELECTED IN DOM AFTER EDITING
        const allProjectsLinks = document.querySelectorAll('.project-link');
        const editedProject = allProjectsLinks[index];

        selectLink(editedProject, index);
        changeMainTitle(selectedLink, index);

        // ADD TASK TO ARRAY
      } else if (modalTask === 'add' && projectIconsDiv.classList.contains('hide')) {

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
    } else if (modalTask === 'delete') {
      const allTasksLink = document.querySelector('.link:first-child');

      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(index);
      allTasksLink.classList.add('selected-link');
    }
  }

  // PROJECTS
  function editProject(index) {
    const allProjectIcons = modal.querySelectorAll('.icon');
    const projectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].icon;

    // SHOW EDITABLE PROJECT TITLE
    modalTitle.value = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].title;

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
    getTasks,
    selectLink,
    manipulateModal,
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
  let linkIndex = 0;

  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_0__["default"].responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;
      const selectedLink = document.querySelector('.selected-link');

      linkIndex = parseInt(target.getAttribute('data-link-index'), 10); // Get and index of clicked link

      // TOGGLE SIDE MENU
      if (
        target.classList.contains('toggle-menu') ||
        target.classList.contains('burger-line')
      ) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].toggleMenu();

        // STYLE CLICKED LINK
      } else if (target.classList.contains('select')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].selectLink(target, linkIndex);

        // IN THE MAIN CONTENT SHOW MENU TITLE ACCORDINGLY
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMainTitle(target, linkIndex);

        // MODAL FOR EDITING A PROJECT
        if (target.classList.contains('edit-project')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Edit Project', 'Edit');
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(linkIndex);

          // MODAL FOR DELETING A PROJECT
        } else if (target.classList.contains('delete-project')) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Project', 'Delete', linkIndex);
        }
      }

      // MODAL FOR ADDING A PROJECT
      if (target.classList.contains('add-project')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Project', 'Add');

        // MODAL FOR ADDING A TASK
      } else if (target.classList.contains('add-task')) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Add Task', 'Add');

        // MODAL FOR DELETING A TASK
      } else if (target.classList.contains('delete-task')) {
        const taskIndex = parseInt(target.getAttribute('data-task-index'), 10);

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Delete Task', 'Delete', 0, taskIndex);

        // MODAL FOR WATCHING TASK INFO
      } else if (target.classList.contains('fa-info-circle')) {
        const projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
        const taskIndex = parseInt(target.getAttribute('data-task-index'), 10);

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);

        // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        // VALIDATE MODAL FOR ADDING
        if (target.textContent === 'Add') {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('add');

          // VALIDATE MODAL FOR EDITING
        } else if (target.textContent === 'Edit') {
          linkIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);

          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('edit', linkIndex);

          // VALIDATE MODAL FOR DELETING
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE A PROJECT
          if (!projectDeletionText.classList.contains('hide')) {
            // If deletion text is shown
            const projectIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);

            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].validateModal('delete', projectIndex);
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showMainTitle(0); // After deleting a project - show main title as 'All'
            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getTasks('all'); // After deleting a project - show all tasks from all remaining projects

            // DELETE A TASK
          } else if (projectDeletionText.classList.contains('hide')) {
            console.log('Delete a task!');
          }
        }

        // CLOSE MODAL
      } else if (target.classList.contains('close')) {
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

  return {
    addTask,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7O0FBRUQsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDeENVOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLDhEQUFxQjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7O1VDekJyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ1U7QUFDQTtBQUNOOztBQUU1QjtBQUNBLDREQUFtQjtBQUNuQiw0REFBbUI7O0FBRW5CO0FBQ0Esc0RBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMERBQWlCOztBQUVqQjtBQUNBLHFEQUFZOztBQUVaLDJEQUFrQjtBQUNsQiw4REFBcUI7QUFDckIsOERBQXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCB0b2dnbGVNZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtbWVudScpO1xuICBjb25zdCBzaWRlYmFyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLW1lbnUnKTtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwnKTtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG4gIGNvbnN0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtdGl0bGUnKTtcbiAgY29uc3QgbW9kYWxUaXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXRpdGxlLWVycm9yJyk7XG4gIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4nKTtcbiAgY29uc3QgbWFpblRpdGxlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlLWljb24nKTtcbiAgY29uc3QgbWFpblRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlLXRleHQnKTtcbiAgY29uc3QgcHJvamVjdHNMaW5rc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1saW5rcy1kaXYnKTtcbiAgY29uc3QgdGFza3NDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb3VudCcpO1xuICBjb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MtbGlzdCcpO1xuXG4gIGZ1bmN0aW9uIHJlc3BvbnNpdmVNZW51KCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMDAwKSB7XG4gICAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIElUIE9QQVFVRVxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRlLXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5hZGQoJ2FkZC16LWluZGV4Jyk7XG5cbiAgICAgIC8vIEVYUEFORCBNQUlOIENPTlRFTlRcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyYWN0LW1haW4nKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZC1tYWluJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBJVCBBIEJJVCBUUkFOU1BBUkVOVFxuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC16LWluZGV4Jyk7XG5cbiAgICAgIC8vIENPTlRSQUNUIE1BSU4gQ09OVEVOVCBBTkQgTUFLRSBJVCBPUEFRVUVcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250cmFjdC1tYWluJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgICB0b2dnbGVNZW51SWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblxuICAgIC8vIFNIT1cgU0lERUJBUiBBTkQgTUFLRSBNQUlOIENPTlRFTlQgQSBCSVQgVFJBTlNQQVJFTlRcbiAgICBpZiAoc2lkZWJhck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlLXNpZGViYXInKSkge1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBzaWRlYmFyTWVudS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGViYXInKTtcbiAgICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlLW1haW4nKTtcblxuICAgICAgLy8gSElERSBTSURFQkFSIEFORCBNQUtFIE1BSU4gQ09OVEVOVCBPUEFRVUVcbiAgICB9IGVsc2UgaWYgKHNpZGViYXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1zaWRlYmFyJykpIHtcbiAgICAgIHNpZGViYXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgc2lkZWJhck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZS1zaWRlYmFyJyk7XG4gICAgICBtYWluQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZS1tYWluJyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBNQUlOIENPTlRFTlQgVElUTEVcbiAgZnVuY3Rpb24gc2hvd01haW5UaXRsZShpbmRleCkge1xuICAgIGNvbnN0IGFsbE1lbnVJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmstaWNvbicpO1xuICAgIGNvbnN0IG1lbnVJY29uID0gYWxsTWVudUljb25zW2luZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWNvbicpO1xuICAgIGNvbnN0IG1lbnVUZXh0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmstdGV4dCcpO1xuXG4gICAgbWFpblRpdGxlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgJ2ZhbCcsXG4gICAgICAnZmEtZncnLFxuICAgICAgJ21haW4tdGl0bGUtaWNvbicsXG4gICAgICAncGFkZGluZy1yaWdodCcsXG4gICAgICBtZW51SWNvblxuICAgICk7XG4gICAgbWFpblRpdGxlVGV4dC50ZXh0Q29udGVudCA9IG1lbnVUZXh0c1tpbmRleF0udGV4dENvbnRlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VNYWluVGl0bGUodGFyZ2V0LCBpbmRleCkge1xuICAgIG1haW5UaXRsZUljb24uY2xhc3NOYW1lID0gJyc7XG5cbiAgICAvLyBUSVRMRSBPRiBUQVNLUyBGUk9NIFRIRSBNRU5VXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JylcbiAgICApIHtcbiAgICAgIHNob3dNYWluVGl0bGUoaW5kZXgpO1xuICAgIH1cblxuICAgIC8vIFRJVExFIE9GIFRBU0tTIEZST00gUFJPSkVDVFNcbiAgICBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWxpbmsnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtdGV4dCcpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1pY29uLWFuZC10ZXh0LWRpdicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JylcbiAgICApIHtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5pY29uO1xuXG4gICAgICBtYWluVGl0bGVJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZncnLFxuICAgICAgICAnbWFpbi10aXRsZS1pY29uJyxcbiAgICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgICBwcm9qZWN0SWNvblxuICAgICAgKTtcbiAgICAgIG1haW5UaXRsZVRleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRBU0tTXG4gIGZ1bmN0aW9uIHNob3dUYXNrcyhtZW51VGl0bGUsIHByb2plY3RJbmRleFN0YXJ0LCBwcm9qZWN0SW5kZXhFbmQpIHtcbiAgICBsZXQgdGFza3NOdW1iZXIgPSAwO1xuXG4gICAgdGFza3NDb3VudC50ZXh0Q29udGVudCA9IDA7XG4gICAgdGFza3NMaXN0LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICAvLyBHRU5FUkFURSBUQVNLUyBMSVNUXG4gICAgZm9yIChsZXQgaSA9IHByb2plY3RJbmRleFN0YXJ0OyBpIDwgcHJvamVjdEluZGV4RW5kOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzLmxlbmd0aDsgaiArPSAxKSB7XG5cbiAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBNRU5VIExJTksgJ0lNUE9SVEFOVCcgLSBGSUxURVIgTk9UIElNUE9SVEFOVCBUQVNLU1xuICAgICAgICBpZiAobWVudVRpdGxlID09PSAnaW1wb3J0YW50JyAmJiBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgIT09ICdoaWdoJykge1xuICAgICAgICAgIGNvbnRpbnVlOyAvLyBJZiB0YXNrIGlzbid0IGltcG9ydGFudCAtIHNraXAgaXRcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdUT0RBWSdcbiAgICAgICAgfSBlbHNlIGlmIChtZW51VGl0bGUgPT09ICd0b2RheScpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnVGFza3MgZm9yIHRvZGF5Li4nKTtcblxuICAgICAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LICdXRUVLJ1xuICAgICAgICB9IGVsc2UgaWYgKG1lbnVUaXRsZSA9PT0gJ3dlZWsnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2tzIG9mIHRoZSB3ZWVrLi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0ljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjb25zdCB0YXNrVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHRhc2tFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY29uc3QgdGFza1RyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY29uc3QgdGFza0luZm9JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAgIC8vIFNIT1cgTlVNQkVSIE9GIFRBU0tTXG4gICAgICAgIHRhc2tzTnVtYmVyICs9IDE7XG4gICAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSB0YXNrc051bWJlcjtcblxuICAgICAgICAvLyBUQVNLIFBSSU9SSVRZLCBURVhUIEFORCBJVFMgRElWXG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kaXYnLCAnaG92ZXItZWxlbWVudCcpO1xuICAgICAgICB0YXNrSWNvbkFuZFRleHREaXYuY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xuXG4gICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0ucHJpb3JpdHkgPT09ICdsb3cnKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICAgJ2ZhLWNpcmNsZScsXG4gICAgICAgICAgICAnbG93LXByaW9yaXR5JyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLnByaW9yaXR5ID09PSAnbWVkaXVtJykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAgICdmYS1jaXJjbGUnLFxuICAgICAgICAgICAgJ21pZC1wcmlvcml0eScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50YXNrc1tqXS5wcmlvcml0eSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICdmYWwnLFxuICAgICAgICAgICAgJ2ZhLWNpcmNsZScsXG4gICAgICAgICAgICAnaGlnaC1wcmlvcml0eScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgICApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmFsJywgJ2ZhLWNpcmNsZScsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXNrVGV4dC5jbGFzc0xpc3QuYWRkKCd0YXNrLXRleHQnKTtcbiAgICAgICAgdGFza1RleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGFza3Nbal0udGl0bGU7XG5cbiAgICAgICAgLy8gVEFTSyBJTkZPIERJVlxuICAgICAgICB0YXNrSW5mby5jbGFzc0xpc3QuYWRkKCdmbGV4Jyk7XG5cbiAgICAgICAgLy8gVEFTS1MgRFVFIERBVEVcbiAgICAgICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlLWRhdGUnLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLmRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRhc2tzW2pdLmRhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRBU0sgREVGQVVMVCBJQ09OU1xuICAgICAgICB0YXNrRWRpdEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAnZmEtZWRpdCcsXG4gICAgICAgICAgJ2VkaXQtdGFzaycsXG4gICAgICAgICAgJ3NjYWxlLWVsZW1lbnQnLFxuICAgICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgICApO1xuICAgICAgICB0YXNrRWRpdEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpKTtcbiAgICAgICAgdGFza0VkaXRJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG4gICAgICAgIHRhc2tUcmFzaEljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAnZmFsJyxcbiAgICAgICAgICAnZmEtdHJhc2gtYWx0JyxcbiAgICAgICAgICAnZGVsZXRlLXRhc2snLFxuICAgICAgICAgICdzY2FsZS1lbGVtZW50JyxcbiAgICAgICAgICAncGFkZGluZy1yaWdodCdcbiAgICAgICAgKTtcbiAgICAgICAgdGFza1RyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrVHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jywgaik7XG5cbiAgICAgICAgdGFza0luZm9JY29uLmNsYXNzTGlzdC5hZGQoJ2ZhbCcsICdzY2FsZS1lbGVtZW50JywgJ2ZhLWluZm8tY2lyY2xlJyk7XG4gICAgICAgIHRhc2tJbmZvSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrSW5mb0ljb24uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnLCBqKTtcblxuICAgICAgICAvLyBBUFBFTkRTXG4gICAgICAgIHRhc2tJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZCh0YXNrSWNvbik7XG4gICAgICAgIHRhc2tJY29uQW5kVGV4dERpdi5hcHBlbmRDaGlsZCh0YXNrVGV4dCk7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza0VkaXRJY29uKTtcbiAgICAgICAgdGFza0luZm8uYXBwZW5kQ2hpbGQodGFza1RyYXNoSWNvbik7XG4gICAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tJbmZvSWNvbik7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0ljb25BbmRUZXh0RGl2KTtcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrSW5mbyk7XG4gICAgICAgIHRhc2tzTGlzdC5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYXNrcyhtZW51VGl0bGUsIGluZGV4KSB7XG4gICAgbGV0IHByb2plY3RJbmRleFN0YXJ0O1xuICAgIGxldCBwcm9qZWN0SW5kZXhFbmQ7XG5cbiAgICAvLyBJRiBDTElDS0VEIE9OIFBST0pFQ1QgTElOS1xuICAgIGlmIChtZW51VGl0bGUgPT09ICcnICYmICFOdW1iZXIuaXNOYU4oaW5kZXgpKSB7IC8vIElmIG51bWJlciBvZiBpbmRleCBleGlzdHMgLSBwcm9qZWN0IHdhcyBjbGlja2VkXG4gICAgICBwcm9qZWN0SW5kZXhTdGFydCA9IGluZGV4O1xuICAgICAgcHJvamVjdEluZGV4RW5kID0gaW5kZXggKyAxXG5cbiAgICAgIC8vIElGIFBST0pFQ1QgRE9FU04nVCBIQVZFIEFOWSBUQVNLU1xuICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRhc2tzQ291bnQudGV4dENvbnRlbnQgPSAwO1xuICAgICAgfVxuXG4gICAgICAvLyBJRiBDTElDS0VEIE9OIE1FTlUgTElOS1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9qZWN0SW5kZXhTdGFydCA9IDA7XG4gICAgICBwcm9qZWN0SW5kZXhFbmQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoO1xuICAgIH1cblxuICAgIHNob3dUYXNrcyhtZW51VGl0bGUsIHByb2plY3RJbmRleFN0YXJ0LCBwcm9qZWN0SW5kZXhFbmQpO1xuICB9XG5cbiAgLy8gTElOSyBTRUxFQ1RJT05cbiAgZnVuY3Rpb24gc2VsZWN0TGluayh0YXJnZXQsIGluZGV4KSB7XG4gICAgY29uc3QgYWxsTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGluaycpO1xuICAgIGNvbnN0IG1lbnVUaXRsZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKTtcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrJyk7XG5cbiAgICBhZGRUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTsgLy8gQnkgZGVmYXVsdCAnQWRkIFRhc2snIGJ1dHRvbiBpcyBoaWRkZW5cblxuICAgIGFsbExpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH0pO1xuXG4gICAgLy8gSUYgQ0xJQ0tFRCBESVJFQ1RMWSBPTiBMSU5LIChCT1RIIC0gTUVOVSBPUiBQUk9KRUNUKVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rJykpIHtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgIC8vIElGIENMSUNLRUQgT04gTUVOVSBMSU5LIElDT04gT1IgVEVYVFxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstaWNvbicpIHx8XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWxpbmstdGV4dCcpXG4gICAgKSB7XG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgfVxuXG4gICAgLy8gSUYgQ0xJQ0tFRCBTT01FV0hFUkUgT04gUFJPSkVDVCBMSU5LXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QnKSkge1xuICAgICAgLy8gU0hPVyBCVVRUT04gVE8gQUREIFRBU0sgRk9SIFNFTEVDVEVEIFBST0pFQ1RcbiAgICAgIGFkZFRhc2tCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgZ2V0VGFza3MoJycsIGluZGV4KTtcblxuICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIElDT04gT1IgVEVYVCBPUiBFRElUL0RFTEVURSBJQ09OU1xuICAgICAgaWYgKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWljb24nKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LXRleHQnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG5cbiAgICAgICAgLy8gSUYgQ0xJQ0tFRCBPTiBQUk9KRUNUIEVMRU1FTlRTIERJVlNcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LWRlZmF1bHQtaWNvbnMtZGl2JylcbiAgICAgICkge1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1saW5rJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSUYgQ0xJQ0tFRCBTT01FV0hFUkUgT04gTUVOVSBMSU5LXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1saW5rJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay1pY29uJykgfHxcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtbGluay10ZXh0JylcbiAgICApIHtcbiAgICAgIGdldFRhc2tzKG1lbnVUaXRsZSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBNT0RBTCBGVU5DVElPTkFMSVRZXG4gIGZ1bmN0aW9uIHdhdGNoVGFza0luZm8ocHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBjb25zdCBpbmZvVGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay10aXRsZScpO1xuICAgIGNvbnN0IGluZm9UYXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLWRlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgaW5mb1Rhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1kdWUtZGF0ZScpO1xuICAgIGNvbnN0IGluZm9UYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby10YXNrLXByaW9yaXR5Jyk7XG4gICAgY29uc3QgaW5mb1Rhc2tQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tdGFzay1wcm9qZWN0Jyk7XG5cbiAgICAvLyBUQVNLIFRJVExFXG4gICAgY29uc3QgaW5mb1Rhc2tUaXRsZVRleHQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnRpdGxlO1xuICAgIGluZm9UYXNrVGl0bGUudGV4dENvbnRlbnQgPSBpbmZvVGFza1RpdGxlVGV4dDtcblxuICAgIC8vIFRBU0sgREVTQ1JJUFRJT05cbiAgICBjb25zdCBpbmZvVGFza0Rlc2NyaXB0aW9uVGV4dCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZGVzY3JpcHRpb247XG4gICAgaW5mb1Rhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGluZm9UYXNrRGVzY3JpcHRpb25UZXh0O1xuXG4gICAgLy8gVEFTSyBEVUUgREFURVxuICAgIGNvbnN0IGluZm9UYXNrRHVlRGF0ZVRleHQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRhdGU7XG4gICAgaW5mb1Rhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gaW5mb1Rhc2tEdWVEYXRlVGV4dDtcblxuICAgIC8vIFRBU0sgUFJJT1JJVFlcbiAgICBpZiAoXG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID09PSAnbG93J1xuICAgICkge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICdJIGNhbiBkbyBpdCBsYXRlciBvciBuZXZlciBhdCBhbGwuLiDwn5i0JztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9PT0gJ21lZGl1bSdcbiAgICApIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSSBzdGF5IHNvbWV3aGVyZSBiZXR3ZWVuIHJlbGF4YXRpb24gYW5kIGZvY3VzIPCfmIUnO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID09PSAnaGlnaCdcbiAgICApIHtcbiAgICAgIGluZm9UYXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSSBtdXN0IGRvIGl0IC0gc29vbmVyIG9yIGxhdGVyISDwn5iyJztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5mb1Rhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cblxuICAgIC8vIFRBU0sgUFJPSkVDVFxuICAgIGluZm9UYXNrUHJvamVjdC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFuaXB1bGF0ZU1vZGFsKHN0YXRlLCB0aXRsZSwgbW9kYWxUYXNrLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuICAgIGNvbnN0IG1vZGFsTWFpblRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLW1haW4tdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFRhc2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGFzay1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVsZXRpb24tdGV4dCcpO1xuICAgIGNvbnN0IHRhc2tEZWxldGlvblRleHQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZWxldGlvbi10ZXh0Jyk7XG4gICAgY29uc3QgdGFza0luZm9EaXYgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuaW5mby1kaXYnKTtcbiAgICBjb25zdCBjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW1vZGFsJyk7XG5cbiAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIG1vZGFsVGl0bGVFcnJvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgcHJvamVjdERlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgdGFza0RlbGV0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY29uZmlybS1kZWxldGlvbicsICdoaWRlJyk7XG5cbiAgICBpZiAoc3RhdGUgPT09ICdzaG93Jykge1xuICAgICAgY29uc3QgbW9kYWxJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgICBjb25zdCBtb2RhbFRhc2tzRGl2ID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLXRhc2tzLWRpdicpO1xuXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbE1haW5UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgbW9kYWxUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gbW9kYWxUYXNrO1xuICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXG4gICAgICAvLyBJRiBNT0RBTCBJUyBGT1IgQURESU5HIFRBU0tcbiAgICAgIGlmICh0aXRsZSA9PT0gJ0FkZCBUYXNrJykge1xuICAgICAgICBtb2RhbEljb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgbW9kYWxJY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIG1vZGFsVGFza3NEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIC8vIElGIE1PREFMIElTIEZPUiBXQVRDSElORyBUQVNLIElORk9cbiAgICAgIH0gZWxzZSBpZiAodGl0bGUgPT09ICdUYXNrIEluZm8nKSB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBjb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgdGFza0luZm9EaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIHdhdGNoVGFza0luZm8ocHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgfVxuXG4gICAgICAvLyBUTyBDTE9TRSBUSEUgTU9EQUxcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgLy8gREVMRVRJT04gTU9EQUwgQ09OVEVOVFxuICAgIGlmIChtb2RhbFRhc2sgPT09ICdEZWxldGUnKSB7XG4gICAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QuYWRkKCdkZWxldGlvbi1tb2RhbC1oZWFkZXInKTtcbiAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbC1kZWxldGlvbicpO1xuICAgICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb25maXJtLWRlbGV0aW9uJyk7XG5cbiAgICAgIC8vIFBST0pFQ1QgREVMRVRJT05cbiAgICAgIGlmICh0aXRsZSA9PT0gJ0RlbGV0ZSBQcm9qZWN0Jykge1xuICAgICAgICBjb25zdCBwcm9qZWN0RGVsZXRpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgJy5wcm9qZWN0LWRlbGV0aW9uLXRpdGxlJ1xuICAgICAgICApO1xuXG4gICAgICAgIHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBwcm9qZWN0RGVsZXRpb25UaXRsZS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG5cbiAgICAgICAgLy8gVEFTSyBERUxFVElPTlxuICAgICAgfSBlbHNlIGlmICh0aXRsZSA9PT0gJ0RlbGV0ZSBUYXNrJykge1xuICAgICAgICBjb25zdCB0YXNrRGVsZXRpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgJy50YXNrLWRlbGV0aW9uLXRpdGxlJ1xuICAgICAgICApO1xuXG4gICAgICAgIHRhc2tEZWxldGlvblRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB0YXNrRGVsZXRpb25UaXRsZS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKG1vZGFsVGFzaywgaW5kZXgpIHtcbiAgICBjb25zdCB7IHByb2plY3RGb3JtSWNvbiB9ID0gZG9jdW1lbnQuZm9ybXMuZm9ybTtcbiAgICBjb25zdCBzZWxlY3RlZExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGluaycpO1xuICAgIGNvbnN0IHByb2plY3REb21JY29uID0gcHJvamVjdEZvcm1JY29uLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uc0RpdiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpby1mb3JtJyk7XG4gICAgY29uc3QgbW9kYWxUaXRsZVRleHQgPSBtb2RhbFRpdGxlLnZhbHVlO1xuXG4gICAgaWYgKG1vZGFsVGFzayA9PT0gJ2FkZCcgfHwgbW9kYWxUYXNrID09PSAnZWRpdCcpIHtcbiAgICAgIGlmIChtb2RhbFRpdGxlVGV4dCA9PT0gJycpIHtcbiAgICAgICAgbW9kYWxUaXRsZUVycm9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgbW9kYWxUaXRsZUVycm9yLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblxuICAgICAgICAvLyBBREQgUFJPSkVDVCBUTyBBUlJBWVxuICAgICAgfSBlbHNlIGlmIChtb2RhbFRhc2sgPT09ICdhZGQnICYmIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xuICAgICAgICBwcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3REb21JY29uLCBtb2RhbFRpdGxlVGV4dCk7XG5cbiAgICAgICAgLy8gS0VFUCBORVdMWSBBRERFRCBQUk9KRUNUIFZJU1VBTExZIFNFTEVDVEVEIElOIERPTVxuICAgICAgICBjb25zdCBsYXN0UHJvamVjdCA9IHByb2plY3RzTGlua3NEaXYubGFzdENoaWxkO1xuICAgICAgICBjb25zdCBsYXN0UHJvamVjdEluZGV4ID0gcHJvamVjdHNMaW5rc0Rpdi5sYXN0Q2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnKTtcblxuICAgICAgICBzZWxlY3RMaW5rKGxhc3RQcm9qZWN0LCBsYXN0UHJvamVjdEluZGV4KVxuICAgICAgICBjaGFuZ2VNYWluVGl0bGUobGFzdFByb2plY3QsIGxhc3RQcm9qZWN0SW5kZXgpO1xuXG4gICAgICAgIC8vIEVESVQgUFJPSkVDVCBGUk9NIEFSUkFZXG4gICAgICB9IGVsc2UgaWYgKG1vZGFsVGFzayA9PT0gJ2VkaXQnKSB7XG4gICAgICAgIHByb2plY3RzLmVkaXRQcm9qZWN0KHByb2plY3REb21JY29uLCBtb2RhbFRpdGxlVGV4dCwgaW5kZXgpO1xuXG4gICAgICAgIC8vIEtFRVAgUFJPSkVDVCBWSVNVQUxMWSBTRUxFQ1RFRCBJTiBET00gQUZURVIgRURJVElOR1xuICAgICAgICBjb25zdCBhbGxQcm9qZWN0c0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtbGluaycpO1xuICAgICAgICBjb25zdCBlZGl0ZWRQcm9qZWN0ID0gYWxsUHJvamVjdHNMaW5rc1tpbmRleF07XG5cbiAgICAgICAgc2VsZWN0TGluayhlZGl0ZWRQcm9qZWN0LCBpbmRleCk7XG4gICAgICAgIGNoYW5nZU1haW5UaXRsZShzZWxlY3RlZExpbmssIGluZGV4KTtcblxuICAgICAgICAvLyBBREQgVEFTSyBUTyBBUlJBWVxuICAgICAgfSBlbHNlIGlmIChtb2RhbFRhc2sgPT09ICdhZGQnICYmIHByb2plY3RJY29uc0Rpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHNlbGVjdGVkTGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcpO1xuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eVNlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXByaW9yaXR5Jyk7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHk7XG5cbiAgICAgICAgLy8gQ0hFQ0sgVEFTSyBQUklPUklUWVxuICAgICAgICBpZiAodGFza1ByaW9yaXR5U2VsZWN0aW9uLnZhbHVlID09PSAnbG93Jykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdsb3cnO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eVNlbGVjdGlvbi52YWx1ZSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnbWVkaXVtJztcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHlTZWxlY3Rpb24udmFsdWUgPT09ICdoaWdoJykge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9ICdoaWdoJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRhc2tzLmFkZFRhc2soXG4gICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0LFxuICAgICAgICAgIG1vZGFsVGl0bGVUZXh0LFxuICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbixcbiAgICAgICAgICB0YXNrRHVlRGF0ZSxcbiAgICAgICAgICB0YXNrUHJpb3JpdHlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gREVMRVRFIFBST0pFQ1QgRlJPTSBBUlJBWVxuICAgIH0gZWxzZSBpZiAobW9kYWxUYXNrID09PSAnZGVsZXRlJykge1xuICAgICAgY29uc3QgYWxsVGFza3NMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbms6Zmlyc3QtY2hpbGQnKTtcblxuICAgICAgcHJvamVjdHMuZGVsZXRlUHJvamVjdChpbmRleCk7XG4gICAgICBhbGxUYXNrc0xpbmsuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtbGluaycpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBST0pFQ1RTXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGluZGV4KSB7XG4gICAgY29uc3QgYWxsUHJvamVjdEljb25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbCgnLmljb24nKTtcbiAgICBjb25zdCBwcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcblxuICAgIC8vIFNIT1cgRURJVEFCTEUgUFJPSkVDVCBUSVRMRVxuICAgIG1vZGFsVGl0bGUudmFsdWUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuXG4gICAgLy8gU0VMRUNUIEVESVRBQkxFIFBST0pFQ1QgSUNPTlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdEljb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxsUHJvamVjdEljb25zW2ldLnZhbHVlID09PSBwcm9qZWN0SWNvbikge1xuICAgICAgICBhbGxQcm9qZWN0SWNvbnNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY291bnQnKTtcblxuICAgIC8vIFNIT1cgTlVNQkVSIE9GIFBST0pFQ1RTXG4gICAgcHJvamVjdHNDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgcHJvamVjdHNMaW5rc0Rpdi50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25BbmRUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIGNvbnN0IHByb2plY3RUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY29uc3QgcHJvamVjdEljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBjb25zdCBwcm9qZWN0VHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT04vVEVYVCBBTkQgREVGQVVMVCBJQ09OUyBESVZTXG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3Byb2plY3QtaWNvbi1hbmQtdGV4dC1kaXYnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3Byb2plY3QtZGVmYXVsdC1pY29ucy1kaXYnLFxuICAgICAgICAncHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgICApO1xuICAgICAgcHJvamVjdEljb25zRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgTElOS1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnbGluaycsICdwcm9qZWN0LWxpbmsnLCAncHJvamVjdCcsICdzZWxlY3QnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuXG4gICAgICAvLyBQUk9KRUNUIElDT05cbiAgICAgIHByb2plY3RJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZncnLFxuICAgICAgICAncHJvamVjdC1pY29uJyxcbiAgICAgICAgJ3Byb2plY3QnLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0uaWNvblxuICAgICAgKTtcbiAgICAgIHByb2plY3RJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgVEVYVFxuICAgICAgcHJvamVjdFRleHQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10ZXh0JywgJ3Byb2plY3QnLCAnc2VsZWN0Jyk7XG4gICAgICBwcm9qZWN0VGV4dC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50aXRsZTtcbiAgICAgIHByb2plY3RUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JywgaSk7XG5cbiAgICAgIC8vIFBST0pFQ1QgREVGQVVMVCBJQ09OU1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdmYWwnLFxuICAgICAgICAnZmEtZWRpdCcsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ2VkaXQtcHJvamVjdCcsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAnc2NhbGUtZWxlbWVudCcsXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcsIGkpO1xuICAgICAgcHJvamVjdFRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAnZmFsJyxcbiAgICAgICAgJ2ZhLXRyYXNoLWFsdCcsXG4gICAgICAgICdwcm9qZWN0JyxcbiAgICAgICAgJ2RlbGV0ZS1wcm9qZWN0JyxcbiAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICdzY2FsZS1lbGVtZW50J1xuICAgICAgKTtcbiAgICAgIHByb2plY3RUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaW5kZXgnLCBpKTtcblxuICAgICAgLy8gQVBQRU5EU1xuICAgICAgcHJvamVjdEljb25zRGl2LmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgICBwcm9qZWN0SWNvbnNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRyYXNoSWNvbik7XG4gICAgICBwcm9qZWN0SWNvbkFuZFRleHREaXYuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgcHJvamVjdEljb25BbmRUZXh0RGl2LmFwcGVuZENoaWxkKHByb2plY3RUZXh0KTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RJY29uQW5kVGV4dERpdik7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbnNEaXYpO1xuICAgICAgcHJvamVjdHNMaW5rc0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgfVxuXG4gICAgbWFuaXB1bGF0ZU1vZGFsKCdjbG9zZScpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNwb25zaXZlTWVudSxcbiAgICB0b2dnbGVNZW51LFxuICAgIHNob3dNYWluVGl0bGUsXG4gICAgY2hhbmdlTWFpblRpdGxlLFxuICAgIGdldFRhc2tzLFxuICAgIHNlbGVjdExpbmssXG4gICAgbWFuaXB1bGF0ZU1vZGFsLFxuICAgIHZhbGlkYXRlTW9kYWwsXG4gICAgZWRpdFByb2plY3QsXG4gICAgc2hvd1Byb2plY3RzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgbGV0IGxpbmtJbmRleCA9IDA7XG5cbiAgLy8gUkVTSVpFIE1FTlUgREVQRU5ESU5HIE9OIFdJTkRPVyBTSVpFXG4gIGZ1bmN0aW9uIHJlc2l6ZVdpbmRvdygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZG9tLnJlc3BvbnNpdmVNZW51KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbkNsaWNrcygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpbmsnKTtcblxuICAgICAgbGlua0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWluZGV4JyksIDEwKTsgLy8gR2V0IGFuZCBpbmRleCBvZiBjbGlja2VkIGxpbmtcblxuICAgICAgLy8gVE9HR0xFIFNJREUgTUVOVVxuICAgICAgaWYgKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2dnbGUtbWVudScpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlci1saW5lJylcbiAgICAgICkge1xuICAgICAgICBkb20udG9nZ2xlTWVudSgpO1xuXG4gICAgICAgIC8vIFNUWUxFIENMSUNLRUQgTElOS1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QnKSkge1xuICAgICAgICBkb20uc2VsZWN0TGluayh0YXJnZXQsIGxpbmtJbmRleCk7XG5cbiAgICAgICAgLy8gSU4gVEhFIE1BSU4gQ09OVEVOVCBTSE9XIE1FTlUgVElUTEUgQUNDT1JESU5HTFlcbiAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIGxpbmtJbmRleCk7XG5cbiAgICAgICAgLy8gTU9EQUwgRk9SIEVESVRJTkcgQSBQUk9KRUNUXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSkge1xuICAgICAgICAgIGRvbS5tYW5pcHVsYXRlTW9kYWwoJ3Nob3cnLCAnRWRpdCBQcm9qZWN0JywgJ0VkaXQnKTtcbiAgICAgICAgICBkb20uZWRpdFByb2plY3QobGlua0luZGV4KTtcblxuICAgICAgICAgIC8vIE1PREFMIEZPUiBERUxFVElORyBBIFBST0pFQ1RcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdCcpKSB7XG4gICAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdEZWxldGUgUHJvamVjdCcsICdEZWxldGUnLCBsaW5rSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1PREFMIEZPUiBBRERJTkcgQSBQUk9KRUNUXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0FkZCBQcm9qZWN0JywgJ0FkZCcpO1xuXG4gICAgICAgIC8vIE1PREFMIEZPUiBBRERJTkcgQSBUQVNLXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10YXNrJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdBZGQgVGFzaycsICdBZGQnKTtcblxuICAgICAgICAvLyBNT0RBTCBGT1IgREVMRVRJTkcgQSBUQVNLXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS10YXNrJykpIHtcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JyksIDEwKTtcblxuICAgICAgICBkb20ubWFuaXB1bGF0ZU1vZGFsKCdzaG93JywgJ0RlbGV0ZSBUYXNrJywgJ0RlbGV0ZScsIDAsIHRhc2tJbmRleCk7XG5cbiAgICAgICAgLy8gTU9EQUwgRk9SIFdBVENISU5HIFRBU0sgSU5GT1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1pbmZvLWNpcmNsZScpKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnc2hvdycsICdUYXNrIEluZm8nLCAnJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuXG4gICAgICAgIC8vIFZBTElEQVRFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tbW9kYWwnKSkge1xuICAgICAgICAvLyBWQUxJREFURSBNT0RBTCBGT1IgQURESU5HXG4gICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdBZGQnKSB7XG4gICAgICAgICAgZG9tLnZhbGlkYXRlTW9kYWwoJ2FkZCcpO1xuXG4gICAgICAgICAgLy8gVkFMSURBVEUgTU9EQUwgRk9SIEVESVRJTkdcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdFZGl0Jykge1xuICAgICAgICAgIGxpbmtJbmRleCA9IHBhcnNlSW50KHNlbGVjdGVkTGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgICBkb20udmFsaWRhdGVNb2RhbCgnZWRpdCcsIGxpbmtJbmRleCk7XG5cbiAgICAgICAgICAvLyBWQUxJREFURSBNT0RBTCBGT1IgREVMRVRJTkdcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09ICdEZWxldGUnKSB7XG4gICAgICAgICAgY29uc3QgcHJvamVjdERlbGV0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWRlbGV0aW9uLXRleHQnKTtcblxuICAgICAgICAgIC8vIERFTEVURSBBIFBST0pFQ1RcbiAgICAgICAgICBpZiAoIXByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIC8vIElmIGRlbGV0aW9uIHRleHQgaXMgc2hvd25cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHBhcnNlSW50KHNlbGVjdGVkTGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgICAgIGRvbS52YWxpZGF0ZU1vZGFsKCdkZWxldGUnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgICAgICAgZG9tLmNoYW5nZU1haW5UaXRsZSh0YXJnZXQsIDApOyAvLyBBZnRlciBkZWxldGluZyBhIHByb2plY3QgLSBjaGFuZ2UgaWNvbiB0byAnZmEtY2FsZW5kYXItYWx0JyAobWVudSBsaW5rICdBbGwnKVxuICAgICAgICAgICAgZG9tLnNob3dNYWluVGl0bGUoMCk7IC8vIEFmdGVyIGRlbGV0aW5nIGEgcHJvamVjdCAtIHNob3cgbWFpbiB0aXRsZSBhcyAnQWxsJ1xuICAgICAgICAgICAgZG9tLmdldFRhc2tzKCdhbGwnKTsgLy8gQWZ0ZXIgZGVsZXRpbmcgYSBwcm9qZWN0IC0gc2hvdyBhbGwgdGFza3MgZnJvbSBhbGwgcmVtYWluaW5nIHByb2plY3RzXG5cbiAgICAgICAgICAgIC8vIERFTEVURSBBIFRBU0tcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3REZWxldGlvblRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZWxldGUgYSB0YXNrIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENMT1NFIE1PREFMXG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlJykpIHtcbiAgICAgICAgZG9tLm1hbmlwdWxhdGVNb2RhbCgnY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzaXplV2luZG93LFxuICAgIGxpc3RlbkNsaWNrcyxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gW107XG5cbiAgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWNvbiwgdGl0bGUpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJvamVjdChpY29uLCB0aXRsZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChpY29uLCB0aXRsZSk7XG4gICAgcHJvamVjdHNMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaWNvbiwgdGl0bGUsIGluZGV4KSB7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5pY29uID0gaWNvbjtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpbmRleCkge1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBwcm9qZWN0c0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgZG9tLnNob3dQcm9qZWN0cygpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0c0xpc3QsXG4gICAgYWRkUHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBkZWxldGVQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHM7XG4iLCJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IHRhc2tzID0gKCgpID0+IHtcbiAgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICB0aGlzLnByb2plY3RJbmRleCA9IHByb2plY3RJbmRleDtcbiAgICAgIHRoaXMudGFza0luZGV4ID0gdGFza0luZGV4O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzLnB1c2godGFzayk7XG4gICAgY29uc29sZS5sb2coJ0FkZCBhIHRhc2shJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9oYW5kbGVycyc7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbi8vIEFERCBERUZBVUxUIFBST0pFQ1QgKEVYQU1QTEUpXG5wcm9qZWN0cy5hZGRQcm9qZWN0KCdmYS10b29scycsICdDcmFmdCBOZXcgUHJvamVjdCcpO1xucHJvamVjdHMuYWRkUHJvamVjdCgnZmEtdG9vbHMnLCAnQ3JhZnQgQW5vdGhlciBQcm9qZWN0Jyk7XG5cbi8vIEFERCBERUZBVUxUIFRBU0sgKEVYQU1QTEUpXG50YXNrcy5hZGRUYXNrKFxuICAnRW5qb3kgbXkgdGVhIGFzIG11Y2ggYXMgbXkgY29kaW5nISDwn421JyxcbiAgJ0xvbmdlciBkZXNjcmlwdGlvbiBvZiBteSBkZW1vIHRhc2ssIGp1c3QgdG8gc2hvdyB5b3UgdGhpcyBzdXJwcmlzaW5nbHkgbmljZSBzY3JvbGxiYXIgYW5kIGFtYXppbmdseSBjdXRlIGtpdHR5IOC4hShe4peJ4bSl4peJXinguIUnLFxuICAnMjAxMS0xMS0xMScsXG4gICdsb3cnLFxuICAwLFxuICAwXG4pO1xuXG50YXNrcy5hZGRUYXNrKFxuICAnQ3JlYXRlIG1hZ2ljIHRocm91Z2ggbXkgbWluZCwgbXkgaGVhcnQgYW5kIG15IGtleWJvYXJkLi4g8J+RqfCfj7vigI3wn5K7JyxcbiAgJ0xvbmdlciBkZXNjcmlwdGlvbiBvZiBteSBkZW1vIHRhc2ssIGp1c3QgdG8gc2hvdyB5b3UgdGhpcyBzdXJwcmlzaW5nbHkgbmljZSBzY3JvbGxiYXIgYW5kIGFtYXppbmdseSBjdXRlIGtpdHR5IOC4hShe4peJ4bSl4peJXinguIUnLFxuICAnMjAxMi0xMi0xMicsXG4gICdoaWdoJyxcbiAgMSxcbiAgMFxuKTtcblxuLy8gV0hFTiBQQUdFIElTIExPQURFRCAtIFNIT1cgVElUTEUgRlJPTSBNRU5VIExJTksgJ0FMTCdcbmRvbS5zaG93TWFpblRpdGxlKDApO1xuXG4vLyBXSEVOIFBBR0UgSVMgTE9BREVEIC0gU0hPVyBBTEwgVEFTS1MgRlJPTSBBTEwgUFJPSkVDVFNcbmRvbS5nZXRUYXNrcygnYWxsJyk7XG5cbmRvbS5yZXNwb25zaXZlTWVudSgpO1xuaGFuZGxlcnMucmVzaXplV2luZG93KCk7XG5oYW5kbGVycy5saXN0ZW5DbGlja3MoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==