import React from 'react';
import Carousel from './Carousel.jsx';

const carousel = mount(<Carousel />);

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
  // clear component state and set props
  carousel.unmount();
  carousel.mount();
  carousel.setProps({
    photos,
  });
});

describe('Component rendering', () => {
  it('should render photos into photo carousel', () => {
    const slider = carousel.find('#slider');
    expect(slider.children()).toHaveLength(9);
  });

  it('should only display one photo', () => {
    const visibleCard = carousel.find('#slider .photo-card.active');
    expect(visibleCard).toHaveLength(1);
  });

  it('should render the first photo by default', () => {
    const card = carousel.find('#slider .photo-card').at(0);
    expect(card).toHaveClassName('active');
  });
});

describe('Previous and next buttons', () => {
  it('should render the next photos upon next btn click', () => {
    const nextBtn = carousel.find('.next-btn');
    nextBtn.simulate('click');
    let visibleImg = carousel.find('#slider .active > img:first-child');
    expect(visibleImg.prop('data-index')).toEqual(1);
    nextBtn.simulate('click');
    visibleImg = carousel.find('#slider .active > img:first-child');
    expect(visibleImg.prop('data-index')).toEqual(2);
  });

  it('should render the last photos upon prev btn click', () => {
    carousel.setState({
      selectedIndex: 8,
    });
    let visibleImg = carousel.find('#slider .active > img:first-child');
    expect(visibleImg.prop('data-index')).toEqual(8);
    const prevBtn = carousel.find('.prev-btn');
    prevBtn.simulate('click');
    visibleImg = carousel.find('#carousel .active > img:first-child');
    expect(visibleImg.prop('data-index')).toEqual(7);
  });
});

describe('Carousel modal', () => {
  it('should render current index photo into modal', () => {
    carousel.setState({
      selectedIndex: 4,
    });
    const image = carousel.find('#carousel-modal img');
    expect(image.prop('src')).toBe('https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/72-003.jpg');
  });

  it('should open the photo modal when clicking on a carousel img', () => {
    expect(carousel.find('#carousel-modal')).toHaveClassName('hidden');
    const card = carousel.find('#slider .photo-card.active');
    card.simulate('click');
    expect(carousel.find('#carousel-modal')).toHaveClassName('active');
  });

  it('should close the photo modal when close btn is clicked', () => {
    carousel.setState({
      modalActive: true,
    });
    expect(carousel.find('#carousel-modal')).toHaveClassName('active');
    const closeBtn = carousel.find('.close-btn');
    closeBtn.simulate('click');
    expect(carousel.find('#carousel-modal')).toHaveClassName('hidden');
  });
});
