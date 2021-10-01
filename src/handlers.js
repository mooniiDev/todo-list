import dom from './dom';

const handlers = (() => {
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;

      if (target.classList.contains('toggle-menu') || target.classList.contains('burger-line')) {
        // SIDE MENU TOGGLE
        dom.toggleMenu();
      } else if (target.classList.contains('task-link')
                || target.classList.contains('task-icon')
                || target.classList.contains('task-text')) {
        // STYLE TASK LINK
        dom.selectTask(target);
      } else if (target.classList.contains('project-link')
                || target.classList.contains('project-icon')
                || target.classList.contains('project-text')) {
        // STYLE PROJECT LINK
        dom.selectProject(target);
      } else if (target.classList.contains('add-project')) {
        // ADD PROJECT MODAL
        dom.manipulateModal('show', 'Add New Project', 'Add');
      } else if (target.classList.contains('confirm-modal')) {
        // VALIDATE MODAL INFORMATION
        dom.validateModal();
      } else if (target.classList.contains('close')) {
        // CLOSE MODAL
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
