import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { artistasService } from "../../services/artistas.service";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Await } from "react-router-dom";

const RegistrarArtistas = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artista, setArtista] = useState(null);
  const [generos, setGenero] = useState(null);

  async function buscarArtista(id) {
    if (id) {
      const artista = await artistasService.buscarPorId(id);
      setArtista(artista);
    }
  }

  async function buscarGeneros() {
    let data = await artistasService.buscarGenero();
    setGenero(data);
  }

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await artistasService.grabar(data);
      navigate("/artistas/consultar");
    } catch (error) {
      alert(error?.response?.data?.message ?? error.toString());
      return;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
    watch,
    setValue,
  } = useForm({ values: artista });

  useEffect(() => {
    console.log(id);
    buscarArtista(id);
    buscarGeneros();
  }, []);

  return (
    <>
      <Breadcrumbs />

      <FormCard title={id ? "Editar artista" : "Crear artista"}>
        <div className="divider"></div>
        <article class="prose text-black ml-auto mr-auto">
          <h4>Detalles del Artista {id && " - Id:  " + id}</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nombre del artista</span>
                    <span className="label-text-alt text-red-600 font-bold">
                      *
                    </span>
                  </div>
                  <input
                    type="text"
                    className={
                      "input input-bordered w-full max-w-xs input-sm " +
                      (errors?.nombre ? "input-error" : "")
                    }
                    {...register("nombre", {
                      required: { value: true, message: "Nombre es requerido" },
                      minLength: {
                        value: 4,
                        message: "Nombre debe tener al menos 4 caracteres",
                      },
                      maxLength: {
                        value: 55,
                        message: "Nombre debe tener como máximo 55 caracteres",
                      },
                    })}
                  />
                  <div className="label">
                    {errors?.nombre && (
                      <span className="label-text-alt text-red-600">
                        {errors?.nombre?.message}
                      </span>
                    )}
                  </div>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Género</span>
                    <span className="label-text-alt text-red-600 font-bold">
                      *
                    </span>
                  </div>
                  <select
                    className={
                      "select select-bordered select-sm " +
                      (errors?.generoId ? "select-error" : "")
                    }
                    {...register("generoId", {
                      required: {
                        value: true,
                        message: "Género es requerido",
                      },
                    })}
                  >
                    <option disabled selected key={-2} value="">
                      click para seleccionar...
                    </option>
                    {generos?.map((genero) => (
                      <option value={genero.id} key={genero.id}>
                        {genero.nombre}
                      </option>
                    ))}
                  </select>
                  <div className="label">
                    {errors?.generoId && (
                      <span className="label-text-alt text-red-600">
                        {errors?.generoId?.message}
                      </span>
                    )}
                  </div>
                </label>
              </div>
              <div className="w-full md:w-1/2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Oyentes mensuales</span>
                    <span className="label-text-alt text-red-600 font-bold">
                      *
                    </span>
                  </div>
                  <input
                    type="number"
                    step="100"
                    className={
                      "input input-bordered w-full max-w-xs input-sm " +
                      (errors?.oyentesMensuales ? "input-error" : "")
                    }
                    {...register("oyentesMensuales", {
                      required: {
                        value: true,
                        message: "Oyentes mensuales es requerido",
                      },
                      min: 100,
                    })}
                  />
                  <div className="label">
                    {errors?.oyentesMensuales && (
                      <span className="label-text-alt text-red-600">
                        {errors?.oyentesMensuales?.message}
                      </span>
                    )}
                  </div>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Fecha de Formación</span>
                    <span className="label-text-alt text-red-600 font-bold">
                      *
                    </span>
                  </div>
                  <input
                    type="date"
                    {...register("fechaOrigen", {
                      required: {
                        value: true,
                        message: "Fecha Origen es requerido",
                      },
                    })}
                    className={
                      "input input-bordered w-full max-w-xs input-sm " +
                      (errors?.fechaOrigen ? "input-error" : "")
                    }
                  />
                  <div className="label">
                    {errors?.fechaOrigen && (
                      <span className="label-text-alt text-red-600">
                        {errors?.fechaOrigen?.message}
                      </span>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {artista && (
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Estado(activado/desactivado)
                  </span>
                  <input
                    type="checkbox"
                    disabled
                    className="toggle !toggle-success"
                    checked={artista.activo}
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

export default RegistrarArtistas;
