import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import ConsultarArtistas from "./components/artistas/ConsultarArtistas";
import RegistrarArtistas from "./components/artistas/RegistrarArtistas";
import ConsultarStands from "./components/stands/ConsultarStands";
import RegistrarStands from "./components/stands/RegistrarStands";
import ConsultarArticulosNewsletter from "./components/newsletter/ConsultarArticulosNewsletter";
import DetalleArticulo from "./components/newsletter/DetalleArticulo";
import RegistarArticulo from "./components/newsletter/RegistarArticulo";
import ConsultarSponsors from "./components/sponsors/ConsultarSponsors";
import RegistrarSponsors from "./components/sponsors/RegistrarSponsors";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/artistas/consultar" element={<ConsultarArtistas />} />
            <Route path="/artistas/registrar" element={<RegistrarArtistas />} />
            <Route
              path="/artistas/consultar/editar/:id"
              element={<RegistrarArtistas />}
            />

            <Route path="/sponsors/consultar" element={<ConsultarSponsors />} />
            <Route path="/sponsors/registrar" element={<RegistrarSponsors />} />
            <Route path="/sponsors/consultar/editar/:id" element={<RegistrarSponsors />} />

            <Route path="/stands/consultar" element={<ConsultarStands />} />
            <Route path="/stands/registrar" element={<RegistrarStands />} />
            <Route
              path="/stands/consultar/editar/:id"
              element={<RegistrarStands />}
            />
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
              path="/newsletter/articulos/registrar"
              element={<RegistarArticulo />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
