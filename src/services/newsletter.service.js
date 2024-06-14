import axios from "axios";
import moment from "moment";
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
  await axios.delete(urlResource + "/articulos-newsletter/" + item.id);
}

async function grabar(item) {
  if (!item.id) {
    await axios.post(urlResource + "/articulos-newsletter", item);
  } else {
    console.log("Actaulziando: " + item);
    await axios.put(urlResource + "/articulos-newsletter/" + item.id, item);
  }
}
export const newsletterServices = {
  buscar,
  buscarTipoArticulo,
  buscarPorId,
  activarDesactivar,
  grabar,
};
