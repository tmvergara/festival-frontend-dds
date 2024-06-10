import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { newsletterServices } from "../../services/newsletter.service";
import { useParams } from "react-router-dom";
import root from "react-shadow";

const DetalleArticulo = () => {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);

  async function buscarArticulo(id) {
    const articulo = await newsletterServices.buscarPorId(id);
    setArticulo(articulo);
  }

  useEffect(() => {
    console.log(id);
    buscarArticulo(id);
  }, []);

  return (
    <>
      <Breadcrumbs />
      {articulo && (
        <FormCard title={""}>
          <article class="prose ">
            <h4>Detalles del Articulo</h4>
            <ul>
              <li>ID de Art: {articulo.id}</li>
              <li>
                Asunto del Articulo(titulo): <b>{articulo.titulo}</b>
              </li>
              <li>Tiempo de lectura: {articulo.tiempoLectura} minutos</li>
              <li>Fecha de publiacion: {articulo.fechaPublicacion}</li>
              <li>
                Estado:{" "}
                {articulo.activo ? (
                  <div className="badge badge-success badge-outline">
                    activo
                  </div>
                ) : (
                  <div className="badge badge-error badge-outline">
                    no activo
                  </div>
                )}
              </li>
            </ul>
            <h2 className="mb-5">Contenido del articulo</h2>
          </article>
          <div className="mockup-browser border bg-base-300 w-2/6 ml-auto mr-auto">
            <div className="mockup-browser-toolbar">
              <div className="input">https://festivally.com</div>
            </div>
            <root.div className="quote pl-5 pr-5 pb-5 pt-2 bg-base-200">
              <div dangerouslySetInnerHTML={{ __html: articulo.contenido }} />
            </root.div>
          </div>
        </FormCard>
      )}
    </>
  );
};

export default DetalleArticulo;
