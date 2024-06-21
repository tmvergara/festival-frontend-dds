import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
const urlResource = "http://localhost:3000/api";

async function buscar() {
  const resp = await axios.get(urlResource + "/articulos-newsletter");
  return resp.data;
}

async function buscarTipoArticulo() {
  const resp = await axios.get(urlResource + "/articulos-newsletter/tipos");
  return resp.data;
}

async function buscarPorId(id) {
  const resp = await axios.get(urlResource + "/articulos-newsletter/" + id);
  resp.data.fechaPublicacion = moment(resp.data.fechaPublicacion).format(
    "YYYY-MM-DD"
  );
  return resp.data;
}

async function activarDesactivar(item) {
  toast.promise(
    axios.delete(urlResource + "/articulos-newsletter/" + item.id),
    {
      loading: "Actualizando...",
      success: "Estado actualizado!",
      error: "Se produjo un error.",
    }
  );
}

async function grabar(item) {
  if (!item.id) {
    toast.promise(axios.post(urlResource + "/articulos-newsletter", item), {
      loading: "Creando...",
      success: "Articulo creado!",
      error: "Se produjo un error.",
    });
  } else {
    console.log("Actaulziando: " + item);
    toast.promise(
      axios.put(urlResource + "/articulos-newsletter/" + item.id, item),
      {
        loading: "Actualizando...",
        success: "Articulo actualizado!",
        error: "Se produjo un error.",
      }
    );
  }
}
export const newsletterServices = {
  buscar,
  buscarTipoArticulo,
  buscarPorId,
  activarDesactivar,
  grabar,
};
