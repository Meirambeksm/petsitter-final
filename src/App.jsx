import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";
import Testing from "./Pages/Testing";
import Video from "./Pages/Video";
import { useState } from "react";

export default function App() {
  const [personalData, setPersonalData] = useState({
    email: "",
    fullName: "",
    phone: "",
    pet: "",
  });

  const handleDataChange = (newData) => {
    setPersonalData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login handleDataChange={handleDataChange} />} />
        <Route
          path="testing"
          element={<Testing personalData={personalData} />}
        />
        <Route path="video" element={<Video />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
