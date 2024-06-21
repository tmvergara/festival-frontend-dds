import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

const urlResource = "http://localhost:3000/api";

async function buscar() {
  const resp = await axios.get(urlResource + "/artistas");
  return resp.data;
}

async function buscarGenero() {
  const resp = await axios.get(urlResource + "/artistas/generos");
  return resp.data;
}

async function buscarPorId(id) {
  const resp = await axios.get(urlResource + "/artistas/" + id);
  resp.data.fechaOrigen = moment(resp.data.fechaOrigen).format("YYYY-MM-DD");
  return resp.data;
}

async function activarDesactivar(artista) {
  toast.promise(axios.delete(urlResource + "/artistas/" + artista.idArtista), {
    loading: "Actualizando...",
    success: "Estado actualizado!",
    error: "Se produjo un error.",
  });
}

async function grabar(artista) {
  if (!artista.idArtista) {
    toast.promise(axios.post(urlResource + "/artistas", artista), {
      loading: "Creando...",
      success: "Artista creado!",
      error: "Se produjo un error.",
    });
  } else {
    toast.promise(
      axios.put(urlResource + "/artistas/" + artista.idArtista, artista),
      {
        loading: "Actualizando...",
        success: "Artista actualizado!",
        error: "Se produjo un error.",
      }
    );
  }
}

export const artistasService = {
  buscar,
  buscarGenero,
  buscarPorId,
  activarDesactivar,
  grabar,
};
