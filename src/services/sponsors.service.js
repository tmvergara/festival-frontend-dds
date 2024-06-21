import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
const urlResource = "http://localhost:3000/api";

async function buscar() {
    const resp = await axios.get(urlResource + '/sponsors');
    return resp.data
};

async function buscarRubro() {
    const resp = await axios.get(urlResource + '/sponsors/rubros');
    return resp.data
};

async function buscarPorId(id) {
    const resp = await axios.get(urlResource + '/sponsors/' + id);
    resp.data.fechaContrato = moment(resp.data.fechaContrato).format(
        "YYYY-MM-DD"
    );
    return resp.data
};

async function activarDesactivar(sponsor) {
    toast.promise(axios.delete(urlResource + "/sponsors/" + sponsor.idSponsor), {
        loading: "Actualizando...",
        success: "Estado actualizado!",
        error: "Se produjo un error.",
    })
};

async function grabar(sponsor) {
    if (!sponsor.idSponsor) {
        toast.promise(axios.post(urlResource + "/sponsors/", sponsor), {
            loading: "Actualizando...",
            success: "Estado actualizado!",
            error: "Se produjo un error.",
        });
    }
    else {
        toast.promise(
            axios.put(urlResource + "/sponsors/" + sponsor.idSponsor, sponsor),
            {
                loading: "Actualizando...",
                success: "Artista actualizado!",
                error: "Se produjo un error.",
            }
        );
    }
}

export const sponsorsService = {
    buscar,
    buscarRubro,
    buscarPorId,
    activarDesactivar,
    grabar
};