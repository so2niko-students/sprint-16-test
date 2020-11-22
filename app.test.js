import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../components/app/app.js';

let container = null;

beforeEach(() => {
  container = document.createElement("div");
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Renders App without crashing', () => {
  container = document.createElement('div');
  ReactDOM.render(<App />, container);
});
