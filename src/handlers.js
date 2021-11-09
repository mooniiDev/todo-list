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
        index = target.getAttribute('data-index');
        dom.selectMenuLink(target);
        dom.changeMainTitle(target, index);

      // MODAL TO ADD A PROJECT
      } else if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add Project', 'Add');

      // MODAL TO EDIT A PROJECT
      } else if (target.classList.contains('edit-project')) {
        index = target.getAttribute('data-index');
        dom.selectMenuLink(target);
        dom.manipulateModal('show', 'Edit Project', 'Edit');
        dom.editProject(index);

      // MODAL TO DELETE A PROJECT
      } else if (target.classList.contains('delete-project')) {
        index = target.getAttribute('data-index');
        dom.selectMenuLink(target);
        dom.manipulateModal('show', 'Delete Project', 'Delete', index);

      // MODAL TO ADD A TASK
      } else if (target.classList.contains('add-task')) {
        dom.manipulateModal('show', 'Add Task', 'Add');

      // VALIDATE MODAL
      } else if (target.classList.contains('confirm-modal')) {
        if (target.textContent === 'Add') {
          dom.validateModal('add');
        } else if (target.textContent === 'Edit') {
          dom.validateModal('edit', index);
        } else if (target.textContent === 'Delete') {
          dom.validateModal('delete', index);
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
