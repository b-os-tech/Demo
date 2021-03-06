/* eslint-disable */

import events from './system/events.js';
import transport from './system/transport.js';
import store from './system/store.js';
import router from './system/router.js';
import dialogs from './system/dialogs.js';
import Tooltip from './system/tooltip.js';

import controllerTopHeader from './controllers/controller_topheader.js';
import controllerActivityBar from './controllers/controller_activitybar.js';
import controllerSideBar from './controllers/controller_sidebar.js';
import controllerMain from './controllers/controller_main.js';
import controllerJavascript from './controllers/controller_javascript.js';
import controllerMarkdown from './controllers/controller_markdown.js';
import controllerSql from './controllers/controller_sql.js';
import controllerJson from './controllers/controller_json.js';
import controllerCss from './controllers/controller_css.js';
import controllerHtml from './controllers/controller_html.js';
import controllerDiagram from './controllers/controller_diagram.js';
import controllerTable from './controllers/controller_table.js';

//  import css_themes from './system/css_themes.js';

//  const api = window.api;
const modules = { events, transport, store, router, dialogs };

const dm = {
  // mode:'textarea',
  modules,
  router,

  types: [
    // {text:'Form order of goods'},
    // {text:'Check availability'},
    // {text:'Payment for order' },
    // {text:'Notification: out of stock'},
    // {text:'Notification: successful payment'},
    // {text:'Transfer of goods from the warehouse for dispatch'},
    // {text:'Repeat payment'},
    // {text:'Sending by one of the ways'},
    // {text:'Notification: successful dispatch'},
    // {text:'Waiting for delivery'},
    // {text:'Notification: shipping problems'},
    // {text:'Return of goods to the warehouse'}
  ],

  elements: {},

  async init() {
    // this.initControls();

    dialogs.init();
    this.tooltip = new Tooltip();

    this.controllerTopHeader = new controllerTopHeader('top-header', modules);
    this.controllerActivityBar = new controllerActivityBar(
      'activity-bar',
      modules
    );
    this.controllerSideBar = new controllerSideBar('side-bar', modules);
    this.controllerMain = new controllerMain('main-view', modules);
    this.controllerJavascript = new controllerJavascript(
      'javascript-view',
      modules
    );
    this.controllerMarkdown = new controllerMarkdown('markdown-view', modules);
    this.controllerSql = new controllerSql('sql-view', modules);
    this.controllerJson = new controllerJson('json-view', modules);
    this.controllerCss = new controllerCss('css-view', modules);
    this.controllerHtml = new controllerHtml('html-view', modules);
    this.controllerDiagram = new controllerDiagram('diagram-view', modules);
    this.controllerTable = new controllerTable('table-view', modules);

    router.init();

    //   const parser = new NodeSQLParser.Parser();

    //   const sql1 = `CREATE TABLE "Account" (
    //     "accountId" bigint generated always as identity,
    //     "login" varchar(64) NOT NULL,
    //     "password" varchar NOT NULL
    //   );`
    //  const sql2 = "select id, name from students where age < 18";

    //   const ast = parser.astify(sql1.replaceAll('\n', ''))

    //   console.log(ast)
    //   const sql = parser.sqlify(ast)
    //   console.log(sql)
  },

  initTransport(api) {
    transport.init(api);
    this.controllerDiagram.loadData();

    //  this.loadData();
  },
};

window.addEventListener('load', async () => {
  window.dm = dm;
  dm.init();
});
