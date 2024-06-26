import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { sponsorsService } from "../../services/sponsors.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

const ConsultarSponsors = () => {
  const navigate = useNavigate();
  const [sponsors, setSponsors] = useState(null);
  const [rubros, setRubros] = useState(null);

  async function buscarRubros() {
    let data = await sponsorsService.buscarRubro();
    setRubros(data);
  }

  async function buscarSponsors() {
    let data = await sponsorsService.buscar();
    setSponsors(data);
  }

  useEffect(() => {
    buscarRubros(), buscarSponsors();
  }, []);

  function editarSponsor(sponsor) {
    navigate(`/sponsors/consultar/editar/${sponsor.idSponsor}`);
  }

  async function ActivarDesactivar(item) {
    const result = await openModal();
    if (result) {
      console.log("El usuario aceptó");
      await sponsorsService.activarDesactivar(item);
      await buscarSponsors();
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
      <FormCard title={"Consultar Sponsors"}>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Rubro</th>
                <th>Fecha contrato</th>
                <th>Presupuesto contribuido</th>
                <th>Activo/Cancelado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {sponsors &&
                sponsors.map((sponsor) => (
                  <tr className="hover" key={sponsor.idSponsor}>
                    <td></td>
                    <td>{sponsor.nombre}</td>
                    <td>
                      {rubros &&
                        rubros.find((rub) => rub.id == sponsor.idRubro).nombre}
                    </td>
                    <td>
                      {moment(sponsor.fechaContrato).format("DD/MM/YYYY")}
                    </td>
                    <td>{sponsor.presupuestoContribuido}</td>
                    <td>{sponsor.activo ? "Activo" : "Cancelado"}</td>
                    <td>
                      <button
                        onClick={() => editarSponsor(sponsor)}
                        className="btn btn-square btn-xs btn-outline mr-2"
                      >
                        <i className="fas fa-pen" />
                      </button>
                      {sponsor.activo ? (
                        <button
                          className="btn btn-square btn-xs btn-error btn-outline"
                          onClick={() => ActivarDesactivar(sponsor)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-square btn-xs btn-success btn-outline"
                          onClick={() => ActivarDesactivar(sponsor)}
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

export default ConsultarSponsors;
