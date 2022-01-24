import dom from './dom';

const handlers = (() => {
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;
      const selectedLink = document.querySelector('.selected-link');
      let linkIndex = parseInt(target.getAttribute('data-link-index'), 10);

      // TOGGLE SIDE MENU
      if (
        target.classList.contains('toggle-menu') ||
        target.classList.contains('burger-line')
      ) {
        dom.toggleMenu();

        // STYLE CLICKED LINK
      } else if (target.classList.contains('select')) {
        dom.selectLink(target, linkIndex);
        dom.changeMainTitle(target, linkIndex); // In the main content show title according to link title

        // MODAL FOR EDITING A PROJECT
        if (target.classList.contains('edit-project')) {
          dom.manipulateModal('show', 'Edit Project', 'Edit');
          dom.editProject(linkIndex);

          // MODAL FOR DELETING A PROJECT
        } else if (target.classList.contains('delete-project')) {
          dom.manipulateModal('show', 'Delete Project', 'Delete', linkIndex);
        }
      }

      // MODAL FOR ADDING A PROJECT
      if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add Project', 'Add');

        // MODAL FOR ADDING A TASK
      } else if (target.classList.contains('add-task')) {
        dom.manipulateModal('show', 'Add Task', 'Add');

        // MODAL FOR DELETING A TASK
      } else if (target.classList.contains('delete-task')) {
        linkIndex = parseInt(target.getAttribute('data-project-index'), 10);
        const taskIndex = parseInt(target.getAttribute('data-task-index'), 10);

        dom.manipulateModal('show', 'Delete Task', 'Delete', linkIndex, taskIndex);

        // MODAL FOR WATCHING TASK INFO
      } else if (target.classList.contains('fa-info-circle')) {
        linkIndex = parseInt(target.getAttribute('data-project-index'), 10);
        const taskIndex = parseInt(target.getAttribute('data-task-index'), 10);

        dom.manipulateModal('show', 'Task Info', '', linkIndex, taskIndex);

        // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        linkIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);

        // VALIDATE MODAL FOR ADDING
        if (target.textContent === 'Add') {
          dom.validateModal('add');

          // VALIDATE MODAL FOR EDITING
        } else if (target.textContent === 'Edit') {
          dom.validateModal('edit', linkIndex);

          // VALIDATE MODAL FOR DELETING
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE A PROJECT
          if (!projectDeletionText.classList.contains('hide')) {
            dom.validateModal('delete', linkIndex);
            dom.changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            dom.showMainTitle(0); // After deleting a project - show main title as 'All'
            dom.getTasks('all'); // After deleting a project - show all tasks from all remaining projects

            // DELETE A TASK
          } else if (projectDeletionText.classList.contains('hide')) {
            console.log('Delete a task!');
          }
        }

        // CLOSE MODAL
      } else if (target.classList.contains('close')) {
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
