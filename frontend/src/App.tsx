import "./App.css";
import Login from "./auth/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./auth/Register";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<Layout />}>
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/signup" element={<Register />} />
    // </Route>
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} /></>
  
  )
);
function App() {
  return (
    <RouterProvider router={appRouter}>
    </RouterProvider>
  );
}

export default App;
