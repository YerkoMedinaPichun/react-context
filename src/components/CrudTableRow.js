import React, { useContext } from "react";
import CrudContext from "../context/CrudContext";

export const CrudTableRow = ({ el }) => {
  const { setDataToEdit, deleteData } = useContext(CrudContext);

  let { name, house, id } = el;

  return (
    <tr>
      <td>{name}</td>
      <td>{house}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id, name)}>Eliminar</button>
      </td>
    </tr>
  );
};
