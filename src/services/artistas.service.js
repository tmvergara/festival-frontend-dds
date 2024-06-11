import axios from "axios";
import moment from "moment";
const urlResource = "http://localhost:3000/api";

async function buscar() {
    const resp = await axios.get(urlResource + '/artistas');
    return resp.data
};

async function buscarGenero() {
    const resp = await axios.get(urlResource + '/artistas/generos');
    return resp.data
};

async function buscarPorId(id) {
    const resp = await axios.get(urlResource + '/artistas/' + id);
    return resp.data
};

async function activarDesactivar(artista) {
    await axios.delete(urlResource + '/artistas/' + artista.idArtista);
};

async function grabar(artista) {
    if (!artista.idArtista) {
        await axios.post(urlResource + '/artistas', artista);
    }
    else {
        await axios.put(urlResource + '/artistas/' + artista.idArtista, artista)
    }
};

export const artistasService = {
    buscar,
    buscarGenero,
    buscarPorId,
    activarDesactivar,
    grabar
};