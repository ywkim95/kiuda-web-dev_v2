import SettingHeader from "../../pages/Setting/components/SettingHeader.tsx";
import routeRender from "../../../../util/test/render.tsx";

test("SettingHeader 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const onSave = vi.fn();
  const onRollback = vi.fn();

  const { user, getByText } = await routeRender(
    <SettingHeader
      title="Test Title"
      onSave={onSave}
      onRollback={onRollback}
    />,
  );

  // Check if the title is rendered correctly
  const titleElement = getByText("Test Title");
  expect(titleElement).toBeInTheDocument();

  // Check if the "Save" button is rendered correctly and fires the onClick event
  const saveButton = getByText("저장");
  expect(saveButton).toBeInTheDocument();
  await user.click(saveButton);
  expect(onSave).toHaveBeenCalled();

  // Check if the "Rollback" button is rendered correctly and fires the onClick event
  const rollbackButton = getByText("되돌리기");
  expect(rollbackButton).toBeInTheDocument();
  await user.click(rollbackButton);
  expect(onRollback).toHaveBeenCalled();
});
