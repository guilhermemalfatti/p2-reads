import React from 'react';
import Loading from '../index';
import renderer from 'react-test-renderer';

test('Loading render snapshot', () => {
    const component = renderer.create(
        <Loading ></Loading>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});