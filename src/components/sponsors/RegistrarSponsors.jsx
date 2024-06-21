import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import { useState, useEffect } from "react";
import { sponsorsService } from "../../services/sponsors.service";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Await } from "react-router-dom";

const RegistrarSponsors = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sponsor, setSponsor] = useState(null);
    const [rubro, setRubro] = useState(null);

    async function buscarSponsor(id) {
        if (id) {
            const sponsor = await sponsorsService.buscarPorId(id);
            setSponsor(sponsor);
        }
    }

    async function buscarRubro() {
        let data = await sponsorsService.buscarRubro();
        setRubro(data);
    }

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await sponsorsService.grabar(data);
            navigate("/sponsors/consultar");
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
    } = useForm({ values: sponsor });

    useEffect(() => {
        console.log(id);
        buscarSponsor(id);
        buscarRubro();
    }, []);

    return (
        <>
            <Breadcrumbs />

            <FormCard title={id ? "Editar sponsor" : "Crear sponsor"}>
                <div className="divider"></div>
                <article class="prose text-black ml-auto mr-auto">
                    <h4>Detalles del Sponsor {id && " - Id:  " + id}</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="md:flex md:flex-row md:space-x-4">
                            <div className="w-full md:w-1/2">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Nombre del sponsor</span>
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
                                        <span className="label-text">Rubro</span>
                                        <span className="label-text-alt text-red-600 font-bold">
                                            *
                                        </span>
                                    </div>
                                    <select
                                        className={
                                            "select select-bordered select-sm " +
                                            (errors?.idRubro ? "select-error" : "")
                                        }
                                        {...register("idRubro", {
                                            required: {
                                                value: true,
                                                message: "Rubro es requerido",
                                            },
                                        })}
                                    >
                                        <option disabled selected key={-2} value="">
                                            click para seleccionar...
                                        </option>
                                        {rubro?.map((rubro) => (
                                            <option value={rubro.id} key={rubro.id}>
                                                {rubro.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="label">
                                        {errors?.idRubro && (
                                            <span className="label-text-alt text-red-600">
                                                {errors?.idRubro?.message}
                                            </span>
                                        )}
                                    </div>
                                </label>
                            </div>
                            <div className="w-full md:w-1/2">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Presupuesto Contribuido</span>
                                        <span className="label-text-alt text-red-600 font-bold">
                                            *
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        step="100"
                                        className={
                                            "input input-bordered w-full max-w-xs input-sm " +
                                            (errors?.presupuestoContribuido ? "input-error" : "")
                                        }
                                        {...register("presupuestoContribuido", {
                                            required: {
                                                value: true,
                                                message: "Presupuesto Contribuido es requerido",
                                            },
                                            min: 100,
                                        })}
                                    />
                                    <div className="label">
                                        {errors?.presupuestoContribuido && (
                                            <span className="label-text-alt text-red-600">
                                                {errors?.presupuestoContribuido?.message}
                                            </span>
                                        )}
                                    </div>
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Fecha de Contrato</span>
                                        <span className="label-text-alt text-red-600 font-bold">
                                            *
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        {...register("fechaContrato", {
                                            required: {
                                                value: true,
                                                message: "Fecha Contrato es requerido",
                                            },
                                        })}
                                        className={
                                            "input input-bordered w-full max-w-xs input-sm " +
                                            (errors?.fechaContrato ? "input-error" : "")
                                        }
                                    />
                                    <div className="label">
                                        {errors?.fechaContrato && (
                                            <span className="label-text-alt text-red-600">
                                                {errors?.fechaContrato?.message}
                                            </span>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>

                        {sponsor && (
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">
                                        Estado(activado/desactivado)
                                    </span>
                                    <input
                                        type="checkbox"
                                        disabled
                                        className="toggle !toggle-success"
                                        checked={sponsor.activo}
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

export default RegistrarSponsors;
