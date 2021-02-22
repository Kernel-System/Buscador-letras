import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";
import axios from "axios";

function App() {
  const [busLetra, setBusLetra] = useState({});

  const [letra, setLetra] = useState("");
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (Object.keys(busLetra).length === 0) return;

    const consultarApiLetra = async () => {
      const url_letra = `https://api.lyrics.ovh/v1/${busLetra.artista}/${busLetra.cancion}`;
      const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${busLetra.artista}`;

      const [letraRes, infoRes] = await Promise.all([
        axios.get(url_letra),
        axios.get(url_info),
      ]);
      setLetra(letraRes.data.lyrics);
      setInfo(infoRes.data.artists[0]);

      setBusLetra({});
    };

    consultarApiLetra();
  }, [busLetra, info]);

  return (
    <>
      <Formulario setBusLetra={setBusLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
