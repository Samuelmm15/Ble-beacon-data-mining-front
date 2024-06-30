import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Home from '..';
import NavBar from 'src/components/NavBar';

describe('Home Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const mockSetGlobalUserName = jest.fn();
    wrapper = shallow(<Home setGlobalUserName={mockSetGlobalUserName} />);
  });

  test('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should render the NavBar component', () => {
    expect(wrapper.find(NavBar).length).toBe(1);
  });

  test('should display the correct title', () => {
    const titleText = wrapper.find('h1').text();
    expect(titleText).toContain('RTDT - Real Time Drone Tracking');
  });

});

export {};
