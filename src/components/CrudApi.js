import React, { useContext } from "react";

import CrudContext from "../context/CrudContext";

import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { Loader } from "./Loader";
import Message from "./Message";

export const CrudApi = () => {
  const { loading, error, db } = useContext(CrudContext);
  return (
    <>
      <h2>CRUD API con Context API</h2>
      <article className="grid-1-2">
        <CrudForm />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}

        {db && <CrudTable />}
      </article>
    </>
  );
};
