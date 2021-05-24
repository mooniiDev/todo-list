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
