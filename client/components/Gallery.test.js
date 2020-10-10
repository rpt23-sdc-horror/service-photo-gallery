import React from 'react';
import Gallery from './Gallery.jsx';

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

const gallery = mount(<Gallery />);

beforeEach(async () => {
  // clear component state
  await gallery.unmount();
  await gallery.mount();
  gallery.setProps({
    photos,
  });
});

describe('Component rendering', () => {
  it('should render photos in gallery view', () => {
    const galleryCards = gallery.find('#gallery');
    console.log(galleryCards.children().debug());
    expect(galleryCards.children()).toHaveLength(9);
  });

  it('should render a photo card with img url', () => {
    const image = gallery.find('.photo-card img').first();
    console.log(image.props());
    expect(image.prop('src')).toEqual('https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg');
    expect(image.prop('data-index')).toEqual(0);
  });
});

describe('Gallery Modal', () => {
  it('should render photos into photo modal', () => {
    const modal = gallery.find('#photo-modal');
    expect(modal.children()).toHaveLength(10);
  });

  it('should render a photo card with img url', () => {
    const modal = gallery.find('#photo-modal');
    const image = modal.find('.photo-card img').at(0);
    expect(image.prop('src')).toEqual('https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg');
    expect(image.prop('data-index')).toEqual(0);
    expect(card).toHaveHTML(
      '<div class="photo-card showing" role="button"><img src="https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg" data-index="0" alt="this is a description"></div>',
    );
  });

  it('should open the photo modal on clicking on a gallery card and scroll to right height', () => {
    const galleryCard = gallery.find('#gallery .photo-card').first();
    galleryCard.simulate('click', { target: { dataset: { index: 5 } } });
    expect(gallery.find('#photo-modal')).toHaveClassName('active');
    expect(gallery.state('modalScroll')).toEqual(6440);
  });

  it('should close the photo modal when close btn is clicked', () => {
    gallery.setState({
      activeModal: true,
    });
    expect(gallery.find('#photo-modal')).toHaveClassName('active');
    const closeBtn = gallery.find('#close-btn');
    closeBtn.simulate('click');
    expect(gallery.find('#photo-modal')).toHaveClassName('hidden');
  });
});
