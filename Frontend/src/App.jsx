import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import PeopleDirectory from "./pages/PeopleDirectory";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/people" element={<PeopleDirectory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
