import dom from './dom';
import handlers from './handlers';

// WHEN PAGE IS LOADED - SHOW TITLE FROM MENU LINK 'ALL'
dom.showMainTitle(0);

// WHEN PAGE IS LOADED - SHOW ALL DEFAULT PROJECTS
dom.showProjects();

// WHEN PAGE IS LOADED - SHOW ALL TASKS FROM ALL DEFAULT PROJECTS
dom.getTasks('all');

dom.responsiveMenu();
handlers.resizeWindow();
handlers.listenClicks();
