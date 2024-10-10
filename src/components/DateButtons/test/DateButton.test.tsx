import routeRender from "../../../util/test/render.tsx";
import DateButton from "../DateButton.tsx";
import { screen } from "@testing-library/react";

const testDateButtonProps = {
  isActive: false,
  onClick: () => {},
  children: "test",
};

describe("DateButton", () => {
  it("DateButton", async () => {
    const { getByText } = await routeRender(
      <DateButton {...testDateButtonProps} />,
    );

    const button = getByText("test");
    expect(button).toBeInTheDocument();
  });

  it("DateButton onClick", async () => {
    const onClick = vi.fn();
    const { user, getByText } = await routeRender(
      <DateButton {...testDateButtonProps} onClick={onClick} />,
    );

    const button = getByText("test");
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("DateButton isActive", async () => {
    await routeRender(<DateButton {...testDateButtonProps} isActive={true} />);

    const button = screen.getByText("test");
    expect(button).toHaveClass("bg(--color-primary)");
  });
});
