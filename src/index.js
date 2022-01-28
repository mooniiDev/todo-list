import dom from './dom';
import handlers from './handlers';
import projects from './projects';
import tasks from './tasks';

// ADD DEFAULT PROJECT (EXAMPLE)
projects.addProject('fa-tools', 'Craft New Project');
projects.addProject('fa-tools', 'Craft Another Project');

// ADD DEFAULT TASK (EXAMPLE)
tasks.addTask(
  'Enjoy my tea as much as my coding! 🍵',
  'Longer description of my demo task, just to show you this surprisingly nice scrollbar and amazingly cute kitty ฅ(^◉ᴥ◉^)ฅ',
  '2011-11-11',
  'low',
  0,
  0
);
tasks.addTask(
  'Create magic through my mind, my heart and my keyboard.. 👩🏻‍💻',
  'Another longer description of my demo task, just to show you this surprisingly nice scrollbar and cute little birdie ϵ( ‘Θ’ )϶♪♫',
  '2012-12-12',
  'high',
  1,
  0
);

// WHEN PAGE IS LOADED - SHOW TITLE FROM MENU LINK 'ALL'
dom.showMainTitle(0);

// WHEN PAGE IS LOADED - SHOW ALL TASKS FROM ALL PROJECTS
dom.getTasks('all');

dom.responsiveMenu();
handlers.resizeWindow();
handlers.listenClicks();
