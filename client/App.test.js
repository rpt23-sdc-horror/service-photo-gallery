import App from "./App.jsx";

const app = mount(<App />);

const photos = [
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg",
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/98-002.jpg",
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/31-001.jpg",
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-003.jpg",
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/72-003.jpg",
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/30-003.jpg",
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/66-002.jpg",
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/85-001.jpg",
  "https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/57-002.jpg"
];

beforeEach(() => {
  // clear component state
  app.unmount();
  app.mount();
});

describe("Component rendering", () => {
  it("should render Photo component and sub-components", () => {
    expect(app).toExist();
    expect(app).toContainMatchingElement("#gallery");
    expect(app).toContainMatchingElement("#photo-modal");
  });

  it("should render empty gallery view by default", () => {
    const gallery = app.find("#gallery");
    expect(gallery.children()).toHaveLength(0);
  });

  it("should hide photo modal by default", () => {
    expect(app.find("#photo-modal")).toHaveClassName("hidden");
  });
});

describe("Photo Gallery", () => {
  beforeEach(() => {
    app.setState({
      photos
    });
  });

  it('should render photos in gallery view', () => {
    const gallery = app.find("#gallery");
    expect(gallery.children()).toHaveLength(9);
  })

  it('should render a photo card with img url', () => {
    const gallery = app.find("#gallery");
    const card = gallery.find(".photo-card").first();
    expect(card).toHaveHTML(
      '<div class="photo-card"><img src="https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg" data-index="0" alt="this is a description"></div>'
    );
  })
})