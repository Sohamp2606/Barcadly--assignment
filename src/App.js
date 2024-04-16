import Form from "./Form";

import NextPage from "./nextPage";
import { Routes, Route } from 'react-router-dom';


// -->>  App component
export default function App() {
  return (
    <div>
       
      <Routes>
      
        <Route path="/" exact element={<Form />} />
        <Route path="/nextPage" element={<NextPage />} />
      </Routes>
    </div>
  );
}


