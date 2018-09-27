import React from 'react';
import ConnectedApp, {App} from './App';
import {shallow} from 'enzyme'

describe('>>> A P P .js --- Shallow Render REACT COMPONENTS',()=>{
  let wrapper

  beforeEach(()=>{
    wrapper = shallow(<App/>)
  })

  it('+++ render the DUMB component', () => {
    expect(wrapper.length).toEqual(1)
  })

})
