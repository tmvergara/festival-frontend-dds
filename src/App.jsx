import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import ConsultarArtistas from "./components/artistas/ConsultarArtistas";
// import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      {/* <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
      /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="artistas/consultar" element={<ConsultarArtistas />} />
            <Route path="bodegas/actualizar-remoto-summary" element={""} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
