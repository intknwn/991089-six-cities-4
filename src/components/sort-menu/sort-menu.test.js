import React from 'react';
import renderer from 'react-test-renderer';
import SortMenu from './sort-menu.jsx';
import {SortType} from '../../const.js';

it(`SortMenu render`, () => {
  const listRef = React.createRef();
  const component = renderer.create(
      <SortMenu
        listRef={listRef}
        isHidden={true}
        sortType={SortType.POPULAR}
        onMenuClick={()=>{}}
        onSortClick={()=>{}}
      />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
