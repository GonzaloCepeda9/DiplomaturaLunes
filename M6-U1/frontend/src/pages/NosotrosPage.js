import React, { useState, useEffect } from "react";
import axios from "axios";
import NosotrosItem from "../components/nosotros/NosotrosItem";

const NosotrosPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [nosotros, setNosotros] = useState([]);

  useEffect(() => {
    const cargarNosotros = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/nosotros");
      setNosotros(response.data);
      setLoading(false);
    };

    cargarNosotros();
  }, []);

  return (
    <main className="holder">
      <div className="historia">
        <h2>Historia</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugit
          quisquam eaque vel rerum porro ea debitis quibusdam distinctio atque
          culpa in, corrupti dolorem a, numquam cumque maiores impedit magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugit
          quisquam eaque vel rerum porro ea debitis quibusdam distinctio atque
          culpa in, corrupti dolorem a, numquam cumque maiores impedit magni.
        </p>
      </div>
      <div className="personas">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        nosotros.map((item) => (
          <NosotrosItem
            key={item.id_staff}
            imagen={item.imagen}
            name={item.nombre}
            surname={item.apellido}
            marketStall={item.puesto}
            description={item.descripcion}
            // body={item.body}
          />
        ))
      )}
      </div>
    </main>
  );
};

export default NosotrosPage;
