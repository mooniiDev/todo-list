import dom from './dom';

const handlers = (() => {
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
  }

  function listenClicks() {
    // VARIABLES NOT BE OVERWRITTEN AFTER CLICK EVENT
    let project;
    let task;

    document.addEventListener('click', (event) => {
      const { target } = event;
      const modalMainTitle = document.querySelector('.modal-main-title');
      const allProjectsLinks = document.querySelectorAll('.project-link');
      const selectedLink = document.querySelector('.selected-link');
      let linkIndex = parseInt(target.getAttribute('data-link-index'), 10);

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
        dom.changeMainTitle(target, linkIndex); // In the main content show title according to link title
      }

      // MODAL FOR ADDING PROJECT
      if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add Project', 'Add');

        // MODAL FOR EDITING PROJECT
      } else if (target.classList.contains('edit-project')) {
        dom.manipulateModal('show', 'Edit Project', 'Edit', linkIndex);

        // MODAL FOR DELETING PROJECT
      } else if (target.classList.contains('delete-project')) {
        dom.manipulateModal('show', 'Delete Project', 'Delete', linkIndex);
      }

      // MODALS FOR TASKS EDITING, DELETING AND WATCHING INFO
      if (target.classList.contains('task-icon')) {
        project = parseInt(target.getAttribute('data-project-index'), 10);
        task = parseInt(target.getAttribute('data-task-index'), 10);

        // MODAL FOR ADDING TASK
        if (target.classList.contains('add-task')) {
          dom.manipulateModal('show', 'Add Task', 'Add');

          // MODAL FOR EDITING TASK
        } else if (target.classList.contains('edit-task')) {
          dom.manipulateModal('show', 'Edit Task', 'Edit', project, task);

          // MODAL FOR DELETING TASK
        } else if (target.classList.contains('delete-task')) {
          dom.manipulateModal('show', 'Delete Task', 'Delete', project, task);

          // MODAL FOR WATCHING TASK INFO
        } else if (target.classList.contains('fa-info-circle')) {
          dom.manipulateModal('show', 'Task Info', '', project, task);
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
            linkIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
            project = allProjectsLinks[linkIndex];
            dom.validateModal('edit', linkIndex, '', project);

            // EDIT TASK
          } else if (modalMainTitle.textContent === 'Edit Task') {
            dom.validateModal('edit', project, task);
          }

          // VALIDATE MODAL FOR DELETING
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE PROJECT
          if (!projectDeletionText.classList.contains('hide')) {
            linkIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
            dom.validateModal('delete', linkIndex);
            dom.changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            dom.showMainTitle(0); // After deleting a project - show main title as 'All'
            dom.getTasks('all'); // After deleting a project - show all tasks from all remaining projects

            // DELETE TASK
          } else if (projectDeletionText.classList.contains('hide')) {
            dom.validateModal('delete', project, task);
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
