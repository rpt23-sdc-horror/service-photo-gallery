import App from "./App.jsx";

const app = mount(<App />);

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