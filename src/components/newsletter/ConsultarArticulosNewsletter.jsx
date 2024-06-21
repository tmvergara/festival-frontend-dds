import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { newsletterServices } from "../../services/newsletter.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ConsultarArticulosNewsletter = () => {
  const navigate = useNavigate();
  const [articulos, setArticulos] = useState(null);
  const [tipoArticulos, setTipoArticulos] = useState(null);

  async function buscarTipoArticulos() {
    let data = await newsletterServices.buscarTipoArticulo();
    setTipoArticulos(data);
  }
  async function buscarArticulos() {
    let data = await newsletterServices.buscar();
    setArticulos(data);
  }

  useEffect(() => {
    buscarArticulos();
    buscarTipoArticulos();
  }, []);

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Está seguro que quiere " +
        (item.activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
      await newsletterServices.activarDesactivar(item);
      await buscarArticulos();
    }
  }

  function detalleArticulo(item) {
    navigate(`/newsletter/articulos/consultar/detalles/${item.id}`);
  }

  function editarArticulo(item) {
    navigate(`/newsletter/articulos/consultar/editar/${item.id}`);
  }

  return (
    <>
      <Breadcrumbs />
      <FormCard title={"Consultar Articulos"}>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Titulo</th>
                <th>Tipo de Art.</th>
                <th>Tiempo Lec.</th>
                <th>Fecha Publicacion</th>
                <th>Activo/Cancelado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {articulos &&
                articulos.map((articulo) => (
                  <tr className="hover" key={articulo.id}>
                    <th onClick={() => detalleArticulo(articulo)}>
                      {articulo.id}
                    </th>
                    <td
                      onClick={() => detalleArticulo(articulo)}
                      className="w-1/6"
                    >
                      {articulo.titulo}
                    </td>
                    <td
                      onClick={() => detalleArticulo(articulo)}
                      className="font-bold text-gray-700"
                    >
                      {tipoArticulos &&
                        tipoArticulos.find(
                          (tipoArt) => tipoArt.id == articulo.tipoArticulo_id
                        ).nombre}
                    </td>
                    <td onClick={() => detalleArticulo(articulo)}>
                      {articulo.tiempoLectura}min
                    </td>
                    <td onClick={() => detalleArticulo(articulo)}>
                      {moment(articulo.fechaPublicacion).format("DD/MM/YYYY")}
                    </td>
                    <td onClick={() => detalleArticulo(articulo)}>
                      {articulo.activo ? (
                        <div className="badge badge-success badge-outline">
                          activo
                        </div>
                      ) : (
                        <div className="badge badge-error badge-outline">
                          no activo
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => editarArticulo(articulo)}
                        className="btn btn-square btn-xs btn-outline mr-2"
                      >
                        <i className="fas fa-pen" />
                      </button>
                      {articulo.activo ? (
                        <button
                          className="btn btn-square btn-xs btn-error btn-outline"
                          onClick={() => ActivarDesactivar(articulo)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-square btn-xs btn-success btn-outline"
                          onClick={() => ActivarDesactivar(articulo)}
                        >
                          <i className="fas fa-thumbs-up" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </FormCard>
    </>
  );
};

export default ConsultarArticulosNewsletter;
