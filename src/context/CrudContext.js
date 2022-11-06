import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const CrudContext = createContext();

const CrudProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "http://localhost:5555/personajes";

  useEffect(() => {
    setLoading(true);
    //helpHttp().get(url)
    api.get(url).then((res) => {
      if (!res.error) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        // console.log(res);
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);

  const createData = (data) => {
    data.id = Date.now();
    // console.log(data);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.error) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
    setDb([...db, data]);
  };
  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      console.log(res);
      if (!res.error) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb([...db, res]);
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };
  const deleteData = (id, name) => {
    let isDelete = window.confirm(`¿Estás seguro de eliminar "${name}"?`);

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
      api.del(endpoint, options).then((res) => {
        if (!res.error) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  const data = {
    db,
    error,
    loading,
    createData,
    updateData,
    setDataToEdit,
    dataToEdit,
    deleteData,
  };

  return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider };
export default CrudContext;
