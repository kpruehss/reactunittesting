import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetch #1' }, { name: 'Fetched #2' }]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
  // Attempt to render the *entire* App
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );
  // find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click');
  // wait to allow reducers to update state
  // then expect to find a list of comments!
  setTimeout(() => {
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(2);
    done();
    wrapped.unmount();
  }, 100);
});