import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import Home from "./pages";
import AddPost from "./pages/add-post/AddPost";
import DisplayPost from "./pages/display-post/DisplayPost";
import EditPost from "./pages/edit-post/EditPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/display-post/:id" element={<DisplayPost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/new-post" element={<AddPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
