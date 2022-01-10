import dom from './dom';

const handlers = (() => {
  let index = 0;

  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;

      // TOGGLE SIDE MENU
      if (
        target.classList.contains('toggle-menu') ||
        target.classList.contains('burger-line')
      ) {
        dom.toggleMenu();

        // STYLE CLICKED LINK
      } else if (target.classList.contains('select')) {
        dom.selectLink(target);

        // IN THE MAIN CONTENT SHOW LINK TITLE ACCORDINGLY
        index = parseInt(target.getAttribute('data-index'), 10);
        dom.changeMainTitle(target, index);

        // MODAL FOR PROJECT EDITION
        if (target.classList.contains('edit-project')) {
          index = parseInt(target.getAttribute('data-index'), 10);
          dom.manipulateModal('show', 'Edit Project', 'Edit');
          dom.editProject(index);

          // MODAL FOR PROJECT DELETION
        } else if (target.classList.contains('delete-project')) {
          index = parseInt(target.getAttribute('data-index'), 10);
          dom.manipulateModal('show', 'Delete Project', 'Delete', index);
        }
      }

      // MODAL FOR PROJECT ADDITION
      if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add Project', 'Add');

        // MODAL FOR TASK ADDITION
      } else if (target.classList.contains('add-task')) {
        dom.manipulateModal('show', 'Add Task', 'Add');

        // MODAL FOR TASK DELETION
      } else if (target.classList.contains('delete-task')) {
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        dom.manipulateModal('show', 'Delete Task', 'Delete', 0, taskIndex);

        // MODAL FOR WATCHING TASK INFO
      } else if (target.classList.contains('fa-info-circle')) {
        const selectedProject = document.querySelector('.selected-link');
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        const projectIndex = parseInt(selectedProject.getAttribute('data-index'), 10);

        dom.manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);

        // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        const selectedProject = document.querySelector('.selected-link');

        if (target.textContent === 'Add') {
          dom.validateModal('add');
        } else if (target.textContent === 'Edit') {
          index = parseInt(selectedProject.getAttribute('data-index'), 10);
          dom.validateModal('edit', index);

          // DELETION MODAL
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector('.project-deletion-text');

          // DELETE A PROJECT
          // IF DELETION TEXT IS SHOWN
          if (!projectDeletionText.classList.contains('hide')) {
            const projectIndex = parseInt(selectedProject.getAttribute('data-index'), 10);

            dom.validateModal('delete', projectIndex);

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
