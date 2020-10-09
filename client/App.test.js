import React from 'react';
import App from './App.jsx';

const app = mount(<App />);

const photos = [
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg',
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/98-002.jpg',
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/31-001.jpg',
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-003.jpg',
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/72-003.jpg',
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/30-003.jpg',
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/66-002.jpg',
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/85-001.jpg',
  'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/57-002.jpg',
];

beforeEach(() => {
  // clear component state
  app.unmount();
  app.mount();
});

describe('Component rendering', () => {
  it('should render Photo component and sub-components', () => {
    expect(app).toExist();
    expect(app).toContainMatchingElement('#gallery');
    expect(app).toContainMatchingElement('#photo-modal');
  });

  it('should render empty gallery view by default', () => {
    const gallery = app.find('#gallery');
    expect(gallery.children()).toHaveLength(0);
  });

  it('should hide photo modal by default', () => {
    expect(app.find('#photo-modal')).toHaveClassName('hidden');
  });
});

describe('Photo Gallery', () => {
  beforeEach(() => {
    app.setState({
      photos,
    });
  });

  it('should render photos in gallery view', () => {
    const gallery = app.find('#gallery');
    expect(gallery.children()).toHaveLength(9);
  });

  it('should render a photo card with img url', () => {
    const gallery = app.find('#gallery');
    const card = gallery.find('.photo-card').first();
    expect(card).toHaveHTML(
      '<div class="photo-card"><img src="https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg" data-index="0" alt="this is a description"></div>',
    );
  });
});

describe('Photo Modal', () => {
  beforeEach(() => {
    app.setState({
      photos,
    });
  });

  it('should render photos into photo modal', () => {
    const modal = app.find('#photo-modal');
    expect(modal.children()).toHaveLength(10);
  });

  it('should render a photo card with img url', () => {
    const modal = app.find('#photo-modal');
    const card = modal.find('.photo-card').at(0);
    expect(card).toHaveHTML(
      '<div class="photo-card"><img src="https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg" data-index="0" alt="this is a description"></div>',
    );
  });

  it('should open the photo modal on clicking on a gallery card and scroll to right height', () => {
    const galleryCard = app.find('#gallery .photo-card').first();
    galleryCard.simulate('click', { target: { dataset: { index: 5 } } });
    expect(app.find('#photo-modal')).toHaveClassName('active');
    expect(app.state('modalScroll')).toEqual(6440);
  });

  it('should close the photo modal when close btn is clicked', () => {
    app.setState({
      modalShow: true,
    });
    expect(app.find('#photo-modal')).toHaveClassName('active');
    const closeBtn = app.find('#close-btn');
    closeBtn.simulate('click');
    expect(app.find('#photo-modal')).toHaveClassName('hidden');
  });
});

// test for css sizes and styling, responsiveness
