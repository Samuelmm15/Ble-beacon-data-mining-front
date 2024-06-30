import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableData from '..';

configure({ adapter: new Adapter() });

describe('TableData Component', () => {
  it('debería renderizarse sin lanzar errores', () => {
    const wrapper = shallow(<TableData userName="Usuario de prueba" />);
    expect(wrapper.exists()).toBe(true);
  });

  // it('debería tener el estado inicial correcto', () => {
  //   const wrapper = shallow(<TableData userName="Usuario de prueba" />);
  //   expect(wrapper.state('isLoggedIn')).toBe(false);
  //   expect(wrapper.state('beaconId')).toBe('1');
  // });

  // it('debería actualizar el estado al cambiar el valor de un input (ejemplo)', () => {
  //   const wrapper = shallow(<TableData userName="Usuario de prueba" />);
  //   wrapper.find('input#beaconId').simulate('change', { target: { value: '2' } });
  //   expect(wrapper.state('beaconId')).toBe('2');
  // });
});