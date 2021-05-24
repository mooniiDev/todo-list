import projects from './projects';

const dom = (() => {
  const menuIcon = document.querySelector('.toggle-menu');
  const sidebarMenu = document.querySelector('#sidebar-menu');
  const mainContent = document.querySelector('#main');
  const modal = document.querySelector('#modal');
  const modalName = document.querySelector('.modal-name');
  const modalTask = document.querySelector('.modal-task');

  function responsiveMenu() {
    if (window.innerWidth <= 1000) {
      menuIcon.classList.remove('active');
      sidebarMenu.classList.remove('show-sidebar');
      sidebarMenu.classList.add('hide-sidebar');
      mainContent.classList.remove('contract-main');
      mainContent.classList.add('expand-main');
    } else {
      sidebarMenu.classList.remove('hide-sidebar');
      sidebarMenu.classList.add('show-sidebar');
      mainContent.classList.remove('expand-main');
      mainContent.classList.add('contract-main');
      mainContent.classList.remove('darker-backround');
    }
  }

  function toggleMenu() {
    menuIcon.classList.toggle('active');
    if (sidebarMenu.classList.contains('hide-sidebar')) {
      sidebarMenu.classList.remove('hide-sidebar');
      sidebarMenu.classList.add('show-sidebar');
      mainContent.classList.add('darker-backround');
    } else if (sidebarMenu.classList.contains('show-sidebar')) {
      sidebarMenu.classList.remove('show-sidebar');
      sidebarMenu.classList.add('hide-sidebar');
      mainContent.classList.remove('darker-backround');
    }
  }

  function manipulateModal(state, name, task) {
    const form = document.querySelector('#form');
    form.reset();
    if (state === 'show') {
      modal.classList.remove('display-none');
      modal.classList.add('display-block');
      modalName.textContent = name;
      modalTask.textContent = task;
    } else if (state === 'close') {
      modal.classList.remove('display-block');
      modal.classList.add('display-none');
    }
  }

  function validateModal() {
    const title = document.querySelector('#title');
    const titleError = document.querySelector('.title-error');
    const { icon } = document.forms.form;
    if (title.value === '') {
      titleError.classList.remove('display-none');
      titleError.classList.add('display-block');
    } else {
      projects.addProject(title.value, icon.value);
    }
  }

  return {
    responsiveMenu,
    toggleMenu,
    manipulateModal,
    validateModal,
  };
})();

export default dom;
