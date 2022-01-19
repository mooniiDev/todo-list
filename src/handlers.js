import dom from './dom';

const handlers = (() => {
  let index = 0;

  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const selectedLink = document.querySelector('.selected-link');

      let { target } = event;

      index = parseInt(target.getAttribute('data-index'), 10); // Get and index of clicked link

      // TOGGLE SIDE MENU
      if (
        target.classList.contains('toggle-menu') ||
        target.classList.contains('burger-line')
      ) {
        dom.toggleMenu();

        // STYLE CLICKED LINK
      } else if (target.classList.contains('select')) {

        dom.selectLink(target, index);

        // IN THE MAIN CONTENT SHOW MENU TITLE ACCORDINGLY
        dom.changeMainTitle(target, index);

        // MODAL FOR EDITING A PROJECT
        if (target.classList.contains('edit-project')) {
          dom.manipulateModal('show', 'Edit Project', 'Edit');
          dom.editProject(index);

          // MODAL FOR DELETING A PROJECT
        } else if (target.classList.contains('delete-project')) {
          dom.manipulateModal('show', 'Delete Project', 'Delete', index);
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
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        dom.manipulateModal('show', 'Delete Task', 'Delete', 0, taskIndex);

        // MODAL FOR WATCHING TASK INFO
      } else if (target.classList.contains('fa-info-circle')) {

        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        const projectIndex = parseInt(selectedLink.getAttribute('data-index'), 10);

        dom.manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);

        // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {

        // VALIDATE MODAL FOR ADDING
        if (target.textContent === 'Add') {
          dom.validateModal('add');

          // VALIDATE MODAL FOR EDITING
        } else if (target.textContent === 'Edit') {
          index = parseInt(selectedLink.getAttribute('data-index'), 10);
          dom.validateModal('edit', index);

          // VALIDATE MODAL FOR DELETING
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE A PROJECT
          if (!projectDeletionText.classList.contains('hide')) { // If deletion text is shown
            const projectIndex = parseInt(selectedLink.getAttribute('data-index'), 10);

            dom.validateModal('delete', projectIndex);
            dom.changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            dom.showMainTitle(0) // After deleting a project - show main title as 'All'
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
