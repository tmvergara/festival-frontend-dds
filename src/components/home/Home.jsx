import Breadcrumbs from "../Breadcrumbs";
import FormCard from "../FormCard";
import er from "../../assets/er.png";

function Home() {
  return (
    <>
      <Breadcrumbs />
      <FormCard>
        <article className="prose ml-auto mr-auto">
          <h1>Bienvendio a Festivally!</h1>
          <p>
            A continaucion presentamos nuestra implementacion de una pequeña app
            web que permite gestionar los artistas, sponsors, stands y la
            newsletter para festivales de musica.
            <h4>Integrantes del Grupo</h4>
            <ul>
              <li>Dalmagro Lucas - (seccion stands)</li>
              <li>Sacco Rey Juan - (seccion sponsors)</li>
              <li>Vergara Tomas Ignacio - 94197 (seccion newsletter)</li>
              <li>Yorlano Pedro - 95197 (seccion artistas)</li>
            </ul>
          </p>
          <h2>Estructura de Datos</h2>
          <p>
            Se presenta el diagrama de Entidad Relacion de la Base de Datos
            relacional que utiliza nuestro proyecto.
          </p>
          <img
            src={er}
            alt="Imagen del modelo er"
            className="w-4/5 ml-auto mr-auto"
          />
          <h2>La Implementacion</h2>
          <p>
            Encontras el codigo del proyecto en dos repsositorios:{" "}
            <code>
              <a
                target="blank_"
                href="https://github.com/tmvergara/festival-backend-dds"
              >
                festival-backend-dds
              </a>
            </code>
            que contiene el codigo del servidor Express que corre el backend de
            esta aplicacion, y{" "}
            <code>
              <a
                target="blank_"
                href="https://github.com/tmvergara/festival-frontend-dds"
              >
                festival-frontend-dds
              </a>
            </code>{" "}
            que contiene <u>esta</u> app de React con la que estas interactuando
            ahora.
          </p>
        </article>
      </FormCard>
    </>
  );
}
export default Home;
