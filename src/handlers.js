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
      if (target.classList.contains('toggle-menu') || target.classList.contains('burger-line')) {
        dom.toggleMenu();

        // STYLE MENU LINK
      } else if (target.classList.contains('select')) {
        index = parseInt(target.getAttribute('data-index'), 10);
        dom.selectMenuLink(target, index);
        dom.changeMainTitle(target, index);

        // MODAL TO ADD A PROJECT
      } else if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add Project', 'Add');

        // MODAL TO EDIT A PROJECT
      } else if (target.classList.contains('edit-project')) {
        index = parseInt(target.getAttribute('data-index'), 10);
        dom.selectMenuLink(target, index);
        dom.manipulateModal('show', 'Edit Project', 'Edit');
        dom.editProject(index);

        // MODAL TO DELETE A PROJECT
      } else if (target.classList.contains('delete-project')) {
        index = parseInt(target.getAttribute('data-index'), 10);
        dom.selectMenuLink(target, index);
        dom.manipulateModal('show', 'Delete Project', 'Delete', index);

        // MODAL TO ADD A TASK
      } else if (target.classList.contains('add-task')) {
        dom.manipulateModal('show', 'Add Task', 'Add');

        // MODAL TO DELETE A TASK
      } else if (target.classList.contains('delete-task')) {
        const taskIndex = parseInt(target.getAttribute('data-index'), 10);
        dom.manipulateModal('show', 'Delete Task', 'Delete', 0, taskIndex);

        // MODAL TO WATCH TASK INFO
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

          // FOR PROJECT DELETION
          if (!projectDeletionText.classList.contains('hide')) {
            const projectIndex = parseInt(selectedProject.getAttribute('data-index'), 10);
            dom.validateModal('delete', projectIndex);

            // FOR TASK DELETION
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
