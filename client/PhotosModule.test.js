import React from 'react';
import PhotosModule from './PhotosModule.jsx';

const app = mount(<PhotosModule />);

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

beforeEach(async () => {
  // clear component state and reset window width
  global.innerWidth = 1024;
  await app.unmount();
  await app.mount();
});

describe('Component rendering (default 1024px width)', () => {
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

describe('Responsive Breakpoints', () => {
  beforeEach(() => {
    app.setState({
      photos,
    });
  });

  it('should render gallery view at width >= 640px', () => {
    global.innerWidth = 640;
    global.dispatchEvent(new Event('resize'));
    app.update();
    expect(app.find('#gallery')).toExist();
    expect(app.find('#photo-carousel')).not.toExist();
  });

  it('should render carousel view at width < 640px', () => {
    global.innerWidth = 639;
    global.dispatchEvent(new Event('resize'));
    app.update();
    expect(app.find('#gallery')).not.toExist();
    expect(app.find('#photo-carousel')).toExist();
  });
});

// Future tests:
// test for css sizes and styling
// test for actually VISIBLE dom components (not just classes and styles)
