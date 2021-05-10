import dom from './dom';

const handler = (() => {
  // RESIZE MENU DEPENDING ON WINDOW SIZE
  function resizeWindow() {
    window.addEventListener('resize', dom.responsiveMenu);
  }

  function listenClicks() {
    document.addEventListener('click', (event) => {
      // TOGGLE MENU WITH BUTTON PUSH
      if (event.target.classList.contains('toggle-menu') || event.target.classList.contains('burger-line')) {
        dom.toggleMenu();
      }
    });
  }

  return {
    resizeWindow,
    listenClicks,
  };
})();

export default handler;
