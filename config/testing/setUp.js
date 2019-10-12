import '@babel/polyfill';
import { act, fireEvent, render, waitForElement } from 'react-testing-library';

global.__rootdir = require('path').resolve(__dirname, '../../');
global.act = act;
global.fireEvent = fireEvent;
global.render = render;
global.waitForElement = waitForElement;
