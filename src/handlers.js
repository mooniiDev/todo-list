import dom from './dom';

const handlers = (() => {
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
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
        dom.toggleMenu();
      }

      // STYLE CLICKED LINK
      if (target.classList.contains('select')) {
        dom.selectLink(target, linkIndex);
        dom.changeMainTitle(target, linkIndex); // In the main content show title according to selected link title
      }

      // MODAL FOR ADDING PROJECT
      if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add Project', 'Add');

        // MODALS FOR PROJECT EDITING AND DELETING
      } else if (target.classList.contains('project-icon')) {
        projectIndex = parseInt(target.getAttribute('data-link-index'), 10);

        // MODAL FOR EDITING PROJECT
        if (target.classList.contains('edit-project')) {
        dom.manipulateModal('show', 'Edit Project', 'Edit', projectIndex);

          // MODAL FOR DELETING PROJECT
        } else if (target.classList.contains('delete-project')) {
          dom.manipulateModal('show', 'Delete Project', 'Delete', projectIndex);
        }
      }

      // MODALS FOR TASKS EDITING, DELETING AND WATCHING INFO
      if (target.classList.contains('task-icon')) {
        projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
        taskIndex = parseInt(target.getAttribute('data-task-index'), 10);

        // MODAL FOR ADDING TASK
        if (target.classList.contains('add-task')) {
          dom.manipulateModal('show', 'Add Task', 'Add');

          // MODAL FOR EDITING TASK
        } else if (target.classList.contains('edit-task')) {
          dom.manipulateModal('show', 'Edit Task', 'Edit', projectIndex, taskIndex);

          // MODAL FOR DELETING TASK
        } else if (target.classList.contains('delete-task')) {
          dom.manipulateModal('show', 'Delete Task', 'Delete', projectIndex, taskIndex);

          // MODAL FOR WATCHING TASK INFO
        } else if (target.classList.contains('fa-info-circle')) {
          dom.manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);
        }
      }

      // VALIDATE MODAL
      if (target.classList.contains('confirm-modal')) {

        // VALIDATE MODAL FOR ADDING
        if (target.textContent === 'Add') {
          dom.validateModal('add');

          // VALIDATE MODAL FOR EDITING
        } else if (target.textContent === 'Edit') {

          // EDIT PROJECT
          if (modalMainTitle.textContent === 'Edit Project') {
            dom.validateModal('edit', projectIndex, '', selectedLink);

            // EDIT TASK
          } else if (modalMainTitle.textContent === 'Edit Task') {
            dom.validateModal('edit', projectIndex, taskIndex, selectedLink);
          }

          // VALIDATE MODAL FOR DELETING
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE PROJECT
          if (!projectDeletionText.classList.contains('hide')) {
            projectIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
            dom.validateModal('delete', projectIndex, '', selectedLink);
            dom.changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            dom.showMainTitle(0); // After deleting a project - show main title as 'All'
            dom.getTasks('all'); // After deleting a project - show all tasks from all remaining projects

            // DELETE TASK
          } else if (projectDeletionText.classList.contains('hide')) {
            dom.validateModal('delete', projectIndex, taskIndex, selectedLink);
          }
        }
      }

      // CLOSE MODAL
      if (target.classList.contains('close')) {
        dom.manipulateModal('close');
      }
    });
  }

  return {
    resizeWindow,
    listenClicks,
  };
})();

export default handlers;
