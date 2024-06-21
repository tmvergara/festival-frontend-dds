import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

const urlResource = "http://localhost:3000/api";

async function buscar() {
    const resp = await axios.get(urlResource + '/stands');
    return resp.data
};

async function buscarTipologiaStand() {
    const resp = await axios.get(urlResource + '/stands/tipologia');
    return resp.data
};

async function buscarPorId(id) {
    const resp = await axios.get(urlResource + '/stands/' + id);
    resp.data.fechaInstalacion = moment(resp.data.fechaInstalacion).format(
        "YYYY-MM-DD"
    );
    return resp.data
};

async function activarDesactivar(stand) {
    toast.promise(axios.delete(urlResource + '/stands/' + stand.id), {
        loading: "Actualizando...",
        success: "Estado actualizado!",
        error: "Se produjo un error.",
    });
};

async function grabar(stand) {
    console.log(stand);
    if (!stand.id) {
        toast.promise(axios.post(urlResource + '/stands', stand), {
            loading: "Actualizando...",
            success: "Estado actualizado!",
            error: "Se produjo un error.",
        });
    }
    else {
        toast.promise(axios.put(urlResource + '/stands/' + stand.id, stand), {
            loading: "Actualizando...",
            success: "Estado actualizado!",
            error: "Se produjo un error.",
        });
    }
};

export const standsService = {
    buscar,
    buscarTipologiaStand,
    buscarPorId,
    activarDesactivar,
    grabar
};