import dom from './dom';

const handlers = (() => {
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      const { target } = event;
      if (target.classList.contains('toggle-menu') || event.target.classList.contains('burger-line')) {
        dom.toggleMenu();
      } else if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add New Project', 'Add');
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
