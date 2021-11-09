import dom from './dom';
import handlers from './handlers';
import projects from './projects';

// ADD AND SHOW DEFAULT PROJECT (EXAMPLE)
projects.addProject('fa-tools', 'Craft Example');
projects.addProject('fa-volleyball-ball', 'Yoyo');
projects.addProject('fa-gift', 'Surprise!');
dom.showProjects();

// SHOW DEFAULT CONTENT
dom.showMainTitle(0);

dom.responsiveMenu();
handlers.resizeWindow();
handlers.listenClicks();
