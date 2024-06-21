import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { standsService } from "../../services/stands.service";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const RegistrarStands = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stand, setStand] = useState(null);
    const [tipologiaStand, setTipologiaStand] = useState(null);

    async function buscarStand(id) {
        if (id) {
            const stand = await standsService.buscarPorId(id);
            setStand(stand);
        }
    }

    async function buscarTipologiaStand() {
        let data = await standsService.buscarTipologiaStand();
        setTipologiaStand(data);
    }

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await standsService.grabar(data);
            navigate("/stands/consultar");
        } catch (error) {
            alert(error?.response?.data?.message ?? error.toString());
            return;
        }
    };

    const { register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
        watch,
        setValue,
    } = useForm({ values: stand });

    useEffect(() => {
        console.log(id);
        buscarStand(id);
        buscarTipologiaStand();
    }, []);

    return (
        <>
            <Breadcrumbs />

            <FormCard title={id ? "Editar stand" : "Crear stand"}>
                <div className="divider"></div>
                <article class="prose text-black ml-auto mr-auto">
                    <h4>Detalles del Stand {id && " - Id:  " + id}</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="md:flex md:flex-row md:space-x-4">
                            <div className="w-full md:w-1/2">
                                {/*Nombre del stand*/}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Nombre del stand</span>
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
                                                value: 1,
                                                message: "Nombre debe tener como mínimo 1 caracter",
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "Nombre debe tener como máximo 100 caracteres",
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
                                {/*Tipología del stand*/}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Tipología del Stand</span>
                                        <span className="label-text-alt text-red-600 font-bold">
                                            *
                                        </span>
                                    </div>
                                    <select
                                        className={
                                            "select select-bordered select-sm " +
                                            (errors?.tipologiaStandId ? "select-error" : "")
                                        }
                                        {...register("tipologiaStand_id", {
                                            required: {
                                                value: true,
                                                message: "Tipología Stand es requerido",
                                            },
                                        })}
                                    >
                                        <option disabled selected key={-2} value="">
                                            click para seleccionar...
                                        </option>
                                        {tipologiaStand?.map((tipologiaStand) => (
                                            <option value={tipologiaStand.id} key={tipologiaStand.id}>
                                                {tipologiaStand.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="label">
                                        {errors?.tipologiaStandId && (
                                            <span className="label-text-alt text-red-600">
                                                {errors?.tipologiaStandId?.message}
                                            </span>
                                        )}
                                    </div>
                                </label>
                            </div>
                            <div className="w-full md:w-1/2">
                                {/*Largo en metros*/}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Largo en metros</span>
                                        <span className="label-text-alt text-red-600 font-bold">
                                            *
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        className={
                                            "input input-bordered w-full max-w-xs input-sm " +
                                            (errors?.largo ? "input-error" : "")
                                        }
                                        {...register("largo", {
                                            required: {
                                                value: true,
                                                message: "Largo es requerido",
                                            },
                                            min: {
                                                value: 1,
                                                message: "Largo debe tener como mínimo 1 caracter",
                                            },
                                            max: {
                                                value: 30,
                                                message: "Largo debe tener como máximo 30 caracteres",
                                            },
                                        })}
                                    />
                                    <div className="label">
                                        {errors?.largo && (
                                            <span className="label-text-alt text-red-600">
                                                {errors?.largo?.message}
                                            </span>
                                        )}
                                    </div>
                                </label>
                                {/*Ancho en metros*/}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Ancho en metros</span>
                                        <span className="label-text-alt text-red-600 font-bold">
                                            *
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        className={
                                            "input input-bordered w-full max-w-xs input-sm " +
                                            (errors?.ancho ? "input-error" : "")
                                        }
                                        {...register("ancho", {
                                            required: {
                                                value: true,
                                                message: "Ancho es requerido",
                                            },
                                            min: {
                                                value: 1,
                                                message: "Ancho debe tener como mínimo 1 caracter",
                                            },
                                            max: {
                                                value: 30,
                                                message: "Ancho debe tener como máximo 30 caracteres",
                                            },
                                        })}
                                    />
                                    <div className="label">
                                        {errors?.ancho && (
                                            <span className="label-text-alt text-red-600">
                                                {errors?.ancho?.message}
                                            </span>
                                        )}
                                    </div>
                                </label>
                                {/*Descripción del stand*/}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Descripción</span>
                                        <span className="label-text-alt text-red-600 font-bold">
                                            *
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className={
                                            "input input-bordered w-full max-w-xs input-sm " +
                                            (errors?.descripcion ? "input-error" : "")
                                        }
                                        {...register("descripcion", {
                                            required: { value: true, message: "Descripcion es requerido" },
                                            maxLength: {
                                                value: 1000,
                                                message: "Descripcion debe tener como máximo 1000 caracteres",
                                            },
                                        })}
                                    />
                                    <div className="label">
                                        {errors?.descripcion && (
                                            <span className="label-text-alt text-red-600">
                                                {errors?.descripcion?.message}
                                            </span>
                                        )}
                                    </div>
                                </label>
                                {/*Fecha de instalación del stand*/}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Fecha de Instalación</span>
                                        <span className="label-text-alt text-red-600 font-bold">
                                            *
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        {...register("fechaInstalacion", {
                                            required: {
                                                value: true,
                                                message: "Fecha Instalacion es requerido",
                                            },
                                        })}
                                        className={
                                            "input input-bordered w-full max-w-xs input-sm " +
                                            (errors?.fechaInstalacion ? "input-error" : "")
                                        }
                                    />
                                    <div className="label">
                                        {errors?.fechaInstalacion && (
                                            <span className="label-text-alt text-red-600">
                                                {errors?.fechaInstalacion?.message}
                                            </span>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>
                        {stand && (
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">
                                        Estado del stand
                                    </span>
                                    <input
                                        type="checkbox"
                                        disabled
                                        className="toggle !toggle-success"
                                        checked={stand.activo}
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
}

export default RegistrarStands;