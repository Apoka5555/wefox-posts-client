import { render } from "@testing-library/react";
import { ReactElement } from "react";
import App from "../App";

const renderWithContext = (ui: ReactElement) => {
  return render(ui, { wrapper: App });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
