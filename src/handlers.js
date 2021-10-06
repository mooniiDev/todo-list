import dom from './dom';

const handlers = (() => {
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;
      // SIDE MENU TOGGLE
      if (target.classList.contains('toggle-menu') || target.classList.contains('burger-line')) {
        dom.toggleMenu();
      // STYLE TASK LINK
      } else if (target.classList.contains('task-link')
                || target.classList.contains('task-icon')
                || target.classList.contains('task-text')) {
        dom.selectTask(target);
      // STYLE PROJECT LINK
      } else if (target.classList.contains('project-link')
                || target.classList.contains('project-icon')
                || target.classList.contains('project-text')) {
        dom.selectProject(target);
      // MODAL TO ADD PROJECT
      } else if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add New Project', 'Add');
        // MODAL TO EDIT PROJECT
      } else if (target.classList.contains('edit-project')) {
        dom.manipulateModal('show', 'Edit Your Project', 'Edit');
      // MODAL TO DELETE PROJECT
      } else if (target.classList.contains('delete-project')) {
        dom.manipulateModal('show', 'Delete Your Project', 'Delete');
      // // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        if (target.textContent === 'Add') {
          dom.validateModal('add');
        } else if (target.textContent === 'Edit') {
          dom.validateModal('edit');
        } else if (target.textContent === 'Delete') {
          dom.validateModal('delete');
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
