import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

test("Displays all fields and submit button", async () => {
  const user = userEvent.setup();
  render(<App />);

  const createPostButton = screen.getByRole("button", {
    name: /create new post/i,
  });
  await user.click(createPostButton);

  const titleTextBox = screen.getByRole("textbox", { name: /title/i });
  expect(titleTextBox).toBeInTheDocument();

  const contentTextBox = screen.getByRole("textbox", { name: /content/i });
  expect(contentTextBox).toBeInTheDocument();

  const imageUrlTextBox = screen.getByRole("textbox", { name: /imageUrl/i });
  expect(imageUrlTextBox).toBeInTheDocument();

  const latitudeTextBox = screen.getByRole("textbox", { name: /latitude/i });
  expect(latitudeTextBox).toBeInTheDocument();

  const longitudeTextBox = screen.getByRole("textbox", { name: /longitude/i });
  expect(longitudeTextBox).toBeInTheDocument();

  const submitButton = screen.getByRole("button", {
    name: /create post/i,
  });

  expect(submitButton).toBeInTheDocument();
});

test("Show errors that title and content are required fields", async () => {
  const user = userEvent.setup();
  render(<App />);

  const titleTextBox = screen.getByRole("textbox", { name: /title/i });
  const contentTextBox = screen.getByRole("textbox", { name: /content/i });

  const submitButton = screen.getByRole("button", {
    name: /create post/i,
  });

  await user.clear(titleTextBox);
  await user.clear(contentTextBox);

  await user.click(submitButton);

  const errorMessages = await screen.findAllByText("This field is required", {
    exact: false,
  });

  expect(errorMessages).toHaveLength(2);

  await user.type(titleTextBox, "Test title");
  await user.type(contentTextBox, "Test content");

  const nonErrorMessages = screen.queryAllByText("This field is required");
  expect(nonErrorMessages).toHaveLength(0);
});

test("Show errors of invalid format in Long and Lat fields", async () => {
  const user = userEvent.setup();
  render(<App />);

  const latitudeTextBox = screen.getByRole("textbox", { name: /latitude/i });
  const longitudeTextBox = screen.getByRole("textbox", { name: /longitude/i });

  const submitButton = screen.getByRole("button", {
    name: /create post/i,
  });

  await user.clear(latitudeTextBox);
  await user.clear(longitudeTextBox);

  await user.type(latitudeTextBox, "text value");
  await user.type(longitudeTextBox, "text value");

  await user.click(submitButton);

  const invalidFormatMessages = await screen.findAllByText("Invalid format", {
    exact: false,
  });

  expect(invalidFormatMessages).toHaveLength(2);

  await user.clear(latitudeTextBox);
  await user.clear(longitudeTextBox);

  await user.type(latitudeTextBox, "0.5");
  await user.type(longitudeTextBox, "-0.4");

  const nonInvalidFormatMessages = screen.queryAllByText("Invalid format", {
    exact: false,
  });

  expect(nonInvalidFormatMessages).toHaveLength(0);
});
