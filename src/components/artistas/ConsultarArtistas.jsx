import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { artistasService } from "../../services/artistas.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ConsultarArtistas = () => {
  const navigate = useNavigate();
  const [ artistas, setArtistas ] = useState(null);
  const [ generos, setGeneros ] = useState(null);

  async function buscarGeneros() {
    let data = await artistasService.buscarGenero();
    setGeneros(data);
  };

  async function buscarArtistas() {
    let data = await artistasService.buscar();
    setArtistas(data)
  };

  useEffect(() => {
    buscarGeneros(),
    buscarArtistas()
  }, []);

  async function activarDesactivar(artista) {
    const resp = window.confirm(
      "Está seguro de que quiere " +
      (artista.activo ? "desactivar" : "activar" ) +
      " el registro?"
     );
     if (resp) {
      await artistasService.activarDesactivar(artista);
      await buscarArtistas()
     };
  };

  function editarArtista(artista) {
    navigate(`/artistas/consultar/editar/${artista.idArtista}`);
  }

  return (
    <>
      <Breadcrumbs />
      <FormCard title={"Consultar Artistas"}>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Oyentes</th>
                <th>Fecha origen</th>
                <th>Género</th>
                <th>Activo/Cancelado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {artistas &&
              artistas.map((artista) => (
                <tr className="hover" key={artista.idArtista}>
                  <td></td>
                  <td>{artista.nombre}</td>
                  <td>{artista.oyentesMensuales}</td>
                  <td>{moment(artista.fechaOrigen).format("DD/MM/YYYY")}</td>
                  <td>{generos && generos.find(
                    (gen) => gen.id == artista.generoId
                  ).nombre}</td>
                  <td>{artista.activo ? "Activo" : "Cancelado"}</td>
                  <td>
                      <button
                        onClick={() => editarArtista(artista)}
                        className="btn btn-square btn-xs btn-outline mr-2"
                      >
                        <i className="fas fa-pen" />
                      </button>
                      {artista.activo ? (
                        <button
                          className="btn btn-square btn-xs btn-error btn-outline"
                          onClick={() => activarDesactivar(artista)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-square btn-xs btn-success btn-outline"
                          onClick={() => activarDesactivar(artista)}
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

export default ConsultarArtistas;
