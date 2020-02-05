import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { simpleCheckForValidColor, red } from '../../helpers/color';
import Alpha from './Alpha';
import AlphaPointer from './AlphaPointer';

test('Alpha renders correctly', () => {
  const tree = renderer.create(
    <Alpha {...red} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

 test('Alpha renders on server correctly', () => {
   const tree = renderer.create(
     <Alpha { ...red } />
   ).toJSON()
   expect(tree).toMatchSnapshot()
 })

test('Alpha renders vertically', () => {
  const tree = renderer.create(
    <Alpha {...red} width={20} height={200} direction="vertical" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

test('AlphaPointer renders correctly', () => {
  const tree = renderer.create(
    <AlphaPointer />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
})


test('Alpha onChange events correctly', () => {

  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy();
  })
  render(<Alpha {...red} width={20} height={200} onChange={changeSpy} />);
  expect(changeSpy).toHaveBeenCalledTimes(0);

  const event = new MouseEvent('mousedown', { bubbles: true });

  Object.defineProperty(event, 'pageX', {get: () => 100});
  Object.defineProperty(event, 'pageY', {get: () => 10});

  const root = document.querySelector("div");
  const alphaPointer = root.children[0].children[0].children[1];
  fireEvent(alphaPointer, event);
  expect(changeSpy).toHaveBeenCalled();
})