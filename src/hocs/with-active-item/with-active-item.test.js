import React from "react";
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item.jsx";

const MockComponent = () => (
  <div></div>
);

const MockComponentWrapped = withActiveItem(MockComponent);

it(`withActiveItem render`, () => {
  const tree = renderer.create((
    <MockComponentWrapped onActiveItemSet={() => {}} />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
