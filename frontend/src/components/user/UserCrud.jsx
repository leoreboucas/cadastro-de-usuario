import React from "react";
import Main from "../template/Main";
import axios from "axios";
import { useState } from "react";
import { useWillMount } from "../../main/useWillMount";
import "./usercrud.css";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir!",
};

const initialState = {
  user: { name: "", email: "" },
  list: [],
};

const BASE_URL = "http://localhost:3003/api/crud";

function UserCrud(props) {
  const [crud, setCrud] = useState(initialState);

  useWillMount(() => {
    axios.get(BASE_URL).then((resp) => setCrud({ ...crud, list: resp.data }));
  });

  const clear = () => {
    const user = { name: "", email: "" };
    setCrud({ ...crud, user });
  };

  const save = (id) => {
    const user = crud.user;
    const method = user._id ? "put" : "post";
    const url = user._id ? `${BASE_URL}/${user._id}` : BASE_URL;

    axios[method](url, { users: user }).then((resp) => {
      const list = getUpdatedList(resp.data);
      setCrud({ ...crud, user: initialState.user, list });
    });
  };

  const getUpdatedList = (user) => {
    const list = crud.list.filter((u) => u._id !== user._id);
    list.unshift(user);
    return list;
  };

  const updateField = (event) => {
    const user = crud.user;
    user[event.target.name] = event.target.value;
    setCrud({ ...crud, user });
  };

  const renderForm = () => {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={crud.user.name}
                onChange={(e) => updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={crud.user.email}
                onChange={(e) => updateField(e)}
                placeholder="Digite o email..."
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={(e) => clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const load = (user) => {
    const { name, email } = user.users[0];

    setCrud({ ...crud, user: { name, email, _id: user._id } });
  };

  const remove = (user) => {
    axios.delete(`${BASE_URL}/${user._id}`).then((resp) => {
      const list = crud.list.filter((u) => u._id !== user._id);
      setCrud({ ...crud, list });
    });
  };

  const renderTable = () => {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th className="custom-th">Ações</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    );
  };

  const renderRows = () => {
    return crud.list.map((user) => (
      <tr key={user._id}>
        <td>{user.users[0].name}</td>
        <td>{user.users[0].email}</td>
        <td>
          <button className="btn btn-warning" onClick={() => load(user)}>
            <i className="fa fa-pencil"></i>
          </button>
          <button className="btn btn-danger ml-2" onClick={() => remove(user)}>
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <Main {...headerProps}>
      {renderForm()}
      {renderTable()}
    </Main>
  );
}

export default UserCrud;
