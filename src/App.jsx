import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import ConsultarArtistas from "./components/artistas/ConsultarArtistas";
import ConsultarArticulosNewsletter from "./components/newsletter/ConsultarArticulosNewsletter";
import DetalleArticulo from "./components/newsletter/DetalleArticulo";
import RegistarArticulo from "./components/newsletter/RegistarArticulo";
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
            <Route path="/artistas/consultar" element={<ConsultarArtistas />} />
            <Route
              path="/newsletter/articulos/consultar"
              element={<ConsultarArticulosNewsletter />}
            />
            <Route
              path="/newsletter/articulos/consultar/detalles/:id"
              element={<DetalleArticulo />}
            />
            <Route
              path="/newsletter/articulos/consultar/editar/:id"
              element={<RegistarArticulo />}
            />
            <Route
              path="/newsletter/articulos/consultar/registrar"
              element={<RegistarArticulo />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
