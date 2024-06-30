import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import LogIn from '..';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => jest.fn(),
}));

describe('LogIn Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<LogIn />);
  });

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have an email input', () => {
    expect(wrapper.find('input[type="email"]').length).toEqual(1);
  });

  it('should have a password input', () => {
    expect(wrapper.find('input[type="password"]').length).toEqual(1);
  });

  it('should have a submit button', () => {
    expect(wrapper.find('button[type="submit"]').length).toEqual(1);
  });
});