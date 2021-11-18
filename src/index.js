import dom from './dom';
import handlers from './handlers';
import projects from './projects';
import tasks from './tasks';

// ADD DEFAULT PROJECT (EXAMPLE)
projects.addProject('fa-tools', 'Craft Example');

// ADD DEFAULT TASK (EXAMPLE)
tasks.addTask(0, 'Show Task Demo', 'Longer description of my demo task, just to show this amazingly nice and surprisingly cute scrollbar ... ฅ(^◉ᴥ◉^)ฅ ...', '2011-11-11', 'low');

// SHOW DEFAULT CONTENT
dom.showMainTitle(0);

dom.responsiveMenu();
handlers.resizeWindow();
handlers.listenClicks();
