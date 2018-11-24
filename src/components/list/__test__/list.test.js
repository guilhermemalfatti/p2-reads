import React from 'react';
import List from '../index';
import renderer from 'react-test-renderer';

test('List render snapshot - comment', () => {
    var item = {
        id: 1,
        voteScore: 5,
        timestamp: 465798
    };

    const component = renderer.create(
        <List
            items={[item]}
            type="comment"
            vote={()=>{}}
            color={()=>{}}
            editComment={()=>{}}
            onDeleteComment={()=>{}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
