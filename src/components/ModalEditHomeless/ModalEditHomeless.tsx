import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai"

import { DivBackEdit } from "../../pages/Login/styles";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { IHomeless } from "../../pages/DashBoard/DashBoard";

function ModalEditHomeless() {

  const { setIsEdit, editHomeless } = useContext(AuthContext)
  const { register, handleSubmit } = useForm<IHomeless>({});

  return (
    <DivBackEdit>

      <form onSubmit={handleSubmit(editHomeless)}>

        <h3>Editar <button onClick={() => setIsEdit(false)}>{<AiOutlineClose />}</button></h3>

        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Nome a ser alterado"
            {...register("name")}
          />
        </div>

        <div className="input-container">
          <label htmlFor="age">Idade</label>
          <input
            id="age"
            type="number"
            placeholder="Idade a ser alterada"
            {...register("age")}
          />
        </div>

        <div className="input-container">
          <label htmlFor="description">Descrição</label>
          <input
            id="description"
            type="text"
            placeholder="Descrição a ser alterada"
            {...register("description")}
          />
        </div>

        <div className="input-container">
          <label htmlFor="location">Local</label>
          <input
            id="location"
            type="text"
            placeholder="Localização a ser alterada"
            {...register("location")}
          />
        </div>

        <div className="input-container">
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            placeholder="Data a ser alterada"
            {...register("date")}
          />
        </div>

        <div className="input-container">
          <label htmlFor="volunter">Voluntário</label>
          <input
            id="volunteer"
            type="text"
            placeholder="Voluntário a ser alterada"
            {...register("volunteer")}
          />
        </div>

        <button type="submit" className="register">
          Editar
        </button>
      </form>
      <ToastContainer />
    </DivBackEdit>

  )
}

export default ModalEditHomeless