import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import ReactTestUtils from "react-dom/test-utils";

import Input from '../components/input/input.js';

let container = null;

beforeEach(() => {
  container = document.createElement("div");
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

//? Test on crash
it('Renders Input without crashing', () => {
    container = document.createElement('div');
    ReactDOM.render(<Input />, container);
});


//? Test right input operators
const operators = [
  ['Kyivstar', 67, 68, 96, 97, 98],
  ['Vodafone', 50, 66, 95, 99],
  ['Lifecell', 63, 73, 93],
  ['3mob', 91],
  ['People.net', 92],
  ['intertelecom', 89, 94]
];

operators.forEach(oper => {
  const operatorName = oper.shift();
  oper.forEach(num => {
    it(`Enter ${ num }-, expect ${ operatorName }`, () => {
      const tree = ReactTestUtils.renderIntoDocument(<Input />);
      const inp = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'operator-input');
      const operatorNameContainer = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'operator-name');
      ReactTestUtils.Simulate.input(inp, { target : { value : `${num}` } });
    
      expect(operatorNameContainer.textContent.trim()).toBe(operatorName);
    });
  })
});

//? Test wrong input operators
const operatorsWrong = [
  ['Unknown', 12, 13, 14, 15, 65, 77, 57, 90, '6udemy5', 'super 34 test'],
  ['', 2, 3, 1, 5, 6, 7, 8, 9, 'fe', 'text', '1rt', 'r3', 'aslkfvise eivas e'],
  ['Kyivstar', '67', '68', '96', '97', '98','e67', 'f68', 'd96', 's97', '__98'],
  ['Vodafone', '50', '66', '95', '99','50we', '66dd', '95sd', '99tt'],
  ['Lifecell', '63', '73', '93','6+3', '7==3', '9()3'],
  ['3mob', '91','#91@'],
  ['People.net', '92', 'ee92'],
  ['intertelecom', '89', '94', '89-', '94]<']
];

operatorsWrong.forEach(oper => {
  const operatorName = oper.shift();
  oper.forEach(num => {
    it(`Enter ${ num }-, expect ${ operatorName }`, () => {
      const tree = ReactTestUtils.renderIntoDocument(<Input />);
      const inp = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'operator-input');
      const operatorNameContainer = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'operator-name');
      ReactTestUtils.Simulate.input(inp, { target : { value : `${num}` } });
    
      expect(operatorNameContainer.textContent.trim()).toBe(operatorName);
    });
  })
});

//? Test both input operators and phone
const operatorsBoth = [
  {
    expectCheck : '✔️',
    operators : [12, 13, 14, 15, 65, 77, 57, 90, '6udemy5', 'super 34 test'],
    phone : [1234567, 1334654, '6udemy53487yyy7', 'su23per 34 te23st__0'],
  },
  {
    expectCheck : '✔️',
    operators : ['67', '68', '96', '97', '98','e67', 'f68', 'd96', 's97', '__98'],
    phone : [1234567, 1334654, '6udemy53487yyy7', 'su23per 34 te23st__0'],
  },
  {
    expectCheck : '-',
    operators : [2, 3, 1, 5, 6, 7, 8, 9, 'fe', 'text', '1rt', 'r3', 'aslkfvise eivas e'],
    phone : [1234567, 1334654, '6udemy53487yyy7', 'su23per 34 te23st__0'],
  }
];

operatorsBoth.forEach(({ 
  expectCheck,
  operators,
  phone
 }) => {
  phone.forEach(numPhone => {
    operators.forEach(numOperator => {
    
      it(`Enter ${ numOperator }-${ numPhone }, expect ${ expectCheck }`, () => {
        const tree = ReactTestUtils.renderIntoDocument(<Input />);
        const inp = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'operator-input');
        const inpPhone = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'phone-input');
        const checkIconContainer = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'check-icon');
        ReactTestUtils.Simulate.input(inp, { target : { value : `${numOperator}` } });
        ReactTestUtils.Simulate.input(inpPhone, { target : { value : `${numPhone}` } });
      
        expect(checkIconContainer.textContent.trim()).toBe(expectCheck);
      });
    });
  })
});