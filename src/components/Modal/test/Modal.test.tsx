import Modal from "../Modal.tsx";
import routeRender from "../../../util/test/render.tsx";
import { useState } from "react";

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal open={isOpen} onClose={handleClose}>
        Test Modal
        <button onClick={handleClose}>Close</button>
      </Modal>
    </>
  );
};

test("Modal 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { user, queryByTestId, getByTestId, getByText } = await routeRender(
    <TestComponent />,
  );

  let modalElement = queryByTestId("dialog");
  expect(modalElement).not.toBeInTheDocument();

  const openButton = getByText("Open Modal");
  await user.click(openButton);

  modalElement = getByTestId("dialog");
  expect(modalElement).toBeInTheDocument();

  const closeButton = getByText("Close");
  await user.click(closeButton);
  modalElement = queryByTestId("dialog");
  expect(modalElement).not.toBeInTheDocument();
});
