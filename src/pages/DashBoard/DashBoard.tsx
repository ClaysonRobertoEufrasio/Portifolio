import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Header from "../../components/Header/Header";
import { Container } from "./style";
import api from "../../server/api";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/AboutTeam/ResetPage";
import { toast } from "react-toastify";
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import { IRegisterPerson } from "../../components/ModalRegister/ModalRegister";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";

export interface IHomeless {
  id: number;
  name: string;
  age: number;
  description: string;
  location: string;
  date: string;
  volunteer: string;
  image?: string;
  email: string;
  userId: number;
  user: IRegisterPerson;
}

export default function DashBoard() {
  
  const { onSubmit } = useContext(AuthContext)

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    age: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório").max(70),
    location: yup.string().required("Campo obrigatório"),
    date: yup.string().required("Campo obrigatório"),
    volunteer: yup.string().required("Campo obrigatório"),
    image: yup.string(),
    email: yup.string().email().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHomeless>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Header />
      <AnimatedPage>
        <Container>
          <section className="text">
            <CardUsuario />
          </section>
          <div className="form-container">
            <div className="form-header">
              <h1>Registre uma nova pessoa</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-container">
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Digite o nome"
                  {...register("name")}
                />
                <p className="error-message">{errors.name?.message}</p>
              </div>
              <div className="input-container">
                <label htmlFor="age">Idade</label>
                <input
                  id="age"
                  type="text"
                  placeholder="Digite a idade"
                  {...register("age")}
                />
                <p className="error-message">{errors.age?.message}</p>
              </div>
              <div className="input-container">
                <label htmlFor="description">Descrição física</label>
                <input
                  id="description"
                  type="text"
                  placeholder="Descreva a aparência"
                  {...register("description")}
                />
                <p className="error-message">{errors.description?.message}</p>
              </div>
              <div className="input-container">
                <label htmlFor="location">Instituição de registro</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Identifique o local de registro"
                  {...register("location")}
                />
                <p className="error-message">{errors.location?.message}</p>
              </div>
              <div className="input-container">
                <label htmlFor="date">Data de registro</label>
                <input
                  id="date" 
                  type="date" 
                  {...register("date")} 
                  />
                <p className="error-message">{errors.date?.message}</p>
              </div>

              <div className="input-container">
                <label htmlFor="volunteer">Voluntário</label>
                <input
                  id="volunteer"
                  type="text"
                  placeholder="Nome do voluntário registrando"
                  {...register("volunteer")}
                />
                <p className="error-message">{errors.volunteer?.message}</p>
              </div>
              <div className="input-container">
                <label htmlFor="imagem">Imagem</label>
                <input
                  id="imagem"
                  type="text"
                  placeholder="Link para a imagem"
                  {...register("image")}
                />
              </div>
              <div className="input-container">
                <label htmlFor="email">Contato da instituição</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email da instituição"
                  {...register("email")}
                />
                <p className="error-message">{errors.email?.message}</p>
              </div>

              <button>Cadastrar</button>
            </form>
          </div>
        </Container>
        <Footer color={"#354A59"} />
        <ResetPage />
      </AnimatedPage>
    </>
  );
}
