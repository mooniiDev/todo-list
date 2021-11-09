import dom from './dom';
import handlers from './handlers';
import projects from './projects';

// ADD AND SHOW DEFAULT PROJECT (EXAMPLE)
projects.addProject('fa-tools', 'Craft Example');
dom.showProjects();

// SHOW DEFAULT CONTENT
dom.showMainTitle(0);

dom.responsiveMenu();
handlers.resizeWindow();
handlers.listenClicks();
