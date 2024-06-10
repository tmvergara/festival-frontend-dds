import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { newsletterServices } from "../../services/newsletter.service";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const RegistarArticulo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [articulo, setArticulo] = useState(null);
  const [tipoArticulos, setTipoArticulos] = useState(null);

  async function buscarArticulo(id) {
    if (id) {
      const articulo = await newsletterServices.buscarPorId(id);
      setArticulo(articulo);
    }
  }

  async function buscarTipoArticulos() {
    let data = await newsletterServices.buscarTipoArticulo();
    setTipoArticulos(data);
  }

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await newsletterServices.grabar(data);
      navigate("/newsletter/articulos/consultar");
    } catch (error) {
      alert(error?.response?.data?.message ?? error.toString());
      return;
    }
  };

  useEffect(() => {
    console.log(id);
    buscarArticulo(id);
    buscarTipoArticulos();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: articulo });

  return (
    <>
      <Breadcrumbs />

      <FormCard title={"Editar Articulo"}>
        <div className="divider"></div>
        <article class="prose text-black">
          <h4>Detalles del Articulo</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Titulo del articulo</span>
                <span className="label-text-alt text-red-600 font-bold">*</span>
              </div>
              <input
                type="text"
                placeholder="descuento especial en merchandising"
                className={
                  "input input-bordered w-full max-w-xs input-sm " +
                  (errors?.titulo ? "input-error" : "")
                }
                {...register("titulo", {
                  required: { value: true, message: "Titulo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Titulo debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Titulo debe tener como máximo 55 caracteres",
                  },
                })}
              />
              <div className="label">
                {errors?.titulo && (
                  <span className="label-text-alt text-red-600">
                    {errors?.titulo?.message}
                  </span>
                )}
              </div>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Tipo de Articulo</span>
                <span className="label-text-alt text-red-600 font-bold">*</span>
              </div>
              <select
                className={
                  "select select-bordered select-sm " +
                  (errors?.tipoArticulo_id ? "select-error" : "")
                }
                {...register("tipoArticulo_id", {
                  required: {
                    value: true,
                    message: "Tipo articulo es requerido",
                  },
                })}
              >
                <option disabled selected key={-2} value="">
                  click para seleccionar...
                </option>
                {tipoArticulos?.map((tipoArticulo) => (
                  <option value={tipoArticulo.id} key={tipoArticulo.id}>
                    {tipoArticulo.nombre}
                  </option>
                ))}
              </select>
              <div className="label">
                {errors?.tipoArticulo_id && (
                  <span className="label-text-alt text-red-600">
                    {errors?.tipoArticulo_id?.message}
                  </span>
                )}
              </div>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Contenido</span>
                <span className="label-text-alt text-red-600 font-bold">*</span>
              </div>
              <textarea
                {...register("contenido", {
                  required: {
                    value: true,
                    message: "Contenido es requerido",
                  },
                })}
                className="textarea textarea-bordered h-24"
                placeholder="Bio"
              ></textarea>
              <div className="label">
                {errors?.contenido && (
                  <span className="label-text-alt text-red-600">
                    {errors?.contenido?.message}
                  </span>
                )}
              </div>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Tiempo de Lectura(min)</span>
                <span className="label-text-alt text-red-600 font-bold">*</span>
              </div>
              <input
                type="number"
                className={
                  "input input-bordered w-full max-w-xs input-sm " +
                  (errors?.tiempoLectura ? "input-error" : "")
                }
                {...register("tiempoLectura", {
                  required: {
                    value: true,
                    message: "Tiempo de lectura es requerido",
                  },
                  min: 1,
                })}
              />
              <div className="label">
                {errors?.tiempoLectura && (
                  <span className="label-text-alt text-red-600">
                    {errors?.tiempoLectura?.message}
                  </span>
                )}
              </div>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Fecha de Publicacion</span>
                <span className="label-text-alt text-red-600 font-bold">*</span>
              </div>
              <input
                type="date"
                {...register("fechaPublicacion", {
                  required: {
                    value: true,
                    message: "Fecha Publicacion es requerido",
                  },
                })}
                className={
                  "input input-bordered w-full max-w-xs input-sm " +
                  (errors?.fechaPublicacion ? "input-error" : "")
                }
              />
              <div className="label">
                {errors?.fechaPublicacion && (
                  <span className="label-text-alt text-red-600">
                    {errors?.fechaPublicacion?.message}
                  </span>
                )}
              </div>
            </label>
            {articulo && (
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Estado(activado/desactivado)
                  </span>
                  <input
                    type="checkbox"
                    disabled
                    className="toggle !toggle-success"
                    checked={articulo.activo}
                  />
                </label>
              </div>
            )}
            <div className="divider"></div>
            <button type="submit" className="btn ml-auto">
              <i className="fa fa-check"></i> Grabar
            </button>
          </form>
        </article>
      </FormCard>
    </>
  );
};

export default RegistarArticulo;
