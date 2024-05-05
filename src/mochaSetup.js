import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<div id="app"></div>');

global.window = window;
global.document = window.document;
global.Node = window.Node;
global.MouseEvent = window.MouseEvent;
