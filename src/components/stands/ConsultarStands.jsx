import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { standsService } from "../../services/stands.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ConsultarStands = () => {
    const navigate = useNavigate();
    const [stands, setStands] = useState(null);
    const [tipologiaStands, setTipologiaStands] = useState(null);

    async function buscarTipologiaStands() {
        let data = await standsService.buscarTipologiaStand();
        setTipologiaStands(data);
    }

    async function buscarStands() {
        let data = await standsService.buscar();
        setStands(data);
    }

    useEffect(() => {
        buscarTipologiaStands();
        buscarStands();
    }, []);

    async function activarDesactivar(stand) {
        const resp = window.confirm(
            "Está seguro de que quiere " +
            (stand.activo ? "desactivar" : "activar") +
            " el registro?"
        );
        if (resp) {
            await standsService.activarDesactivar(stand);
            await buscarStands();
        }
    }

    function editarStand(stand) {
        navigate(`/stands/consultar/editar/${stand.id}`);
    }

    return (
        <>
            <Breadcrumbs />
            <FormCard title={"Consultar Stands"}>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Tipologia</th>
                                <th>Largo en metros</th>
                                <th>Ancho en metros</th>
                                <th>Descripcion</th>
                                <th>Fecha Instalacion</th>
                                <th>Activo/No activo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {stands &&
                                stands.map((stand) => (
                                    <tr className="hover" key={stand.id}>
                                        <td></td>
                                        <td>{stand.nombre}</td>
                                        <td>{tipologiaStands && tipologiaStands.find(
                                            (tipologiaStand) => tipologiaStand.id == stand.tipologiaStand_id
                                        ).nombre}</td>
                                        <td>{stand.largo}</td>
                                        <td>{stand.ancho}</td>
                                        <td>{stand.descripcion}</td>
                                        <td>{moment(stand.fechaInstalacion).format("DD/MM/YYYY")}</td>
                                        <td>{stand.activo ? "Activo" : "No activo"}</td>
                                        <td>
                                            <button
                                                onClick={() => editarStand(stand)}
                                                className="btn btn-square btn-xs btn-outline mr-2"
                                            >
                                                <i className="fas fa-pen" />
                                            </button>
                                            {stand.activo ? (
                                                <button
                                                    className="btn btn-square btn-xs btn-error btn-outline"
                                                    onClick={() => activarDesactivar(stand)}
                                                >
                                                    <i className="fas fa-trash" />
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-square btn-xs btn-success btn-outline"
                                                    onClick={() => activarDesactivar(stand)}
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

}

export default ConsultarStands;