import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { artistasService } from "../../services/artistas.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

const ConsultarArtistas = () => {
  const navigate = useNavigate();
  const [artistas, setArtistas] = useState(null);
  const [generos, setGeneros] = useState(null);

  async function buscarGeneros() {
    let data = await artistasService.buscarGenero();
    setGeneros(data);
  }

  async function buscarArtistas() {
    let data = await artistasService.buscar();
    setArtistas(data);
  }

  useEffect(() => {
    buscarGeneros(), buscarArtistas();
  }, []);

  function editarArtista(artista) {
    navigate(`/artistas/consultar/editar/${artista.idArtista}`);
  }

  async function ActivarDesactivar(item) {
    const result = await openModal();
    if (result) {
      console.log("El usuario aceptó");
      await artistasService.activarDesactivar(item);
      await buscarArtistas();
    } else {
      console.log("El usuario canceló");
    }
  }

  const { openModal, modal } = useModal({
    children: (
      <div>
        <h2 className="text-2xl font-bold mb-1">Atencion!</h2>
        <p>¿Estás seguro de que deseas modificar el estado de este articulo?</p>
      </div>
    ),
    modalBoxClassName: "custom-modal-class",
    onModalClose: () => console.log("Modal cerrado"),
    onModalOpen: () => console.log("Modal abierto"),
  });

  return (
    <>
      <Breadcrumbs />
      {modal} {/*.  <---- rendering the modal component*/}
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
                    <td>
                      {generos &&
                        generos.find((gen) => gen.id == artista.generoId)
                          .nombre}
                    </td>
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
                          onClick={() => ActivarDesactivar(artista)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-square btn-xs btn-success btn-outline"
                          onClick={() => ActivarDesactivar(artista)}
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
