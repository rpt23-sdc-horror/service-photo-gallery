import App from "./App.jsx";

const app = mount(<App />);

beforeEach(() => {
  // clear component state
  app.unmount();
  app.mount();
});

describe("Component rendering", () => {
  test("Photo component should render correctly", () => {
    expect(app).toExist();
    expect(app).toContainMatchingElement("#gallery");
    expect(app).toContainMatchingElement("#photo-modal");
  });

  test("Photo component should render gallery view by default", () => {
    expect(app.find("#photo-modal")).toHaveClassName("hidden");
  });
});