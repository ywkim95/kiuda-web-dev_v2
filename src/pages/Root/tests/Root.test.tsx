import RootPage from "../Root.tsx";
import routeRender from "../../../util/test/render.tsx";

test("renders RootPage with MainNavigation and Information", async () => {
  const { getByText, getByTestId } = await routeRender(<RootPage />);

  const MainNavigation = getByText(/Kiuda/i);

  expect(MainNavigation).toBeInTheDocument();

  const Information = getByTestId("information");

  expect(Information).toBeInTheDocument();
});
