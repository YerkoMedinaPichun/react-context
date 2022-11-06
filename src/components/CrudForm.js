import React, { useState, useEffect, useContext } from "react";
import CrudContext from "../context/CrudContext";

const initialForm = {
  id: null,
  name: "",
  house: "",
};

const CrudForm = () => {
  const [form, setForm] = useState(initialForm);
  const { createData, updateData, dataToEdit, setDataToEdit } =
    useContext(CrudContext);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.house) {
      alert("Datos Incompletos");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
        />
        <input
          onChange={handleChange}
          type="text"
          name="house"
          placeholder="Casa"
          value={form.house}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
};

export default CrudForm;
