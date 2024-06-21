import axios from "axios";
import moment from "moment";
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
    await axios.delete(urlResource + '/stands/' + stand.id);
};

async function grabar(stand) {
    console.log(stand);
    if (!stand.id) {
        await axios.post(urlResource + '/stands', stand);
    }
    else {
        await axios.put(urlResource + '/stands/' + stand.id, stand)
    }
};

export const standsService = {
    buscar,
    buscarTipologiaStand,
    buscarPorId,
    activarDesactivar,
    grabar
};