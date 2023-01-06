import { render, screen } from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import DataTable from "../DataTable";

test("displays row for each post from server", async () => {
  render(<DataTable />);

  const rows = await screen.findAllByRole("row");

  // length of rows is 4 (not 3) because table header also contains row
  expect(rows).toHaveLength(4);
});

test("displays image for each post from server", async () => {
  render(<DataTable />);

  const scoopImages = await screen.findAllByRole("img", { name: /post$/i });
  expect(scoopImages).toHaveLength(3);
});

test("Redirect to edit-post page when click on edit icon", async () => {
  const user = userEvent.setup();
  render(<DataTable />);

  const nonTitleTextBox = screen.queryByRole("textbox", { name: /title/i });
  expect(nonTitleTextBox).not.toBeInTheDocument();

  const editIcons = await screen.findAllByTitle("edit post");
  expect(editIcons).toHaveLength(3);

  await user.click(editIcons[0]);

  const titleTextBox = await screen.findByRole("textbox", { name: /title/i });
  expect(titleTextBox).toBeInTheDocument();
});

test("Redirect to Home page when click on 'Home' text in navigation bar", async () => {
  const user = userEvent.setup();

  render(<DataTable />);

  const homeButton = screen.getByRole("link", { name: /home/i });

  await user.click(homeButton);

  const createPostButton = await screen.findByRole("button", {
    name: /create new post/i,
  });

  expect(createPostButton).toBeInTheDocument();
});

test("Redirect to add-post page when click on Create new post button", async () => {
  const user = userEvent.setup();
  render(<DataTable />);

  const nonTitleTextBox = screen.queryByRole("textbox", { name: /title/i });
  expect(nonTitleTextBox).not.toBeInTheDocument();

  const createPostButton = await screen.findByRole("button", {
    name: /create new post/i,
  });
  await user.click(createPostButton);

  const titleTextBox = await screen.findByRole("textbox", { name: /title/i });
  expect(titleTextBox).toBeInTheDocument();
});
