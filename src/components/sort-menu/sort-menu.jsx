import React from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../const';

const SortMenu = ({onSortClick, isHidden, sortType, onMenuClick, listRef}) => {

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onMenuClick}
      >
        {sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isHidden ? `` : `places__options--opened`}`}
        ref={listRef}
      >
        {Object.values(SortType).map((sort, index) => {
          return (
            <li
              key={sort + index}
              className="places__option"
              tabIndex={0}
              onClick={() => {
                onSortClick(sort);
              }}
            >
              {sort}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

SortMenu.propTypes = {
  onSortClick: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  sortType: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  listRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(HTMLUListElement)
    }),
  ])
};

export default SortMenu;
