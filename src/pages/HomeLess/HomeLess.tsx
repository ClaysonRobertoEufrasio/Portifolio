import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { GrEdit, GrNext, GrPrevious } from "react-icons/gr";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

import { ContainerHome } from "../Home/styles";
import {
  BodyHomeLess,
  BodyMissing,
  BtnEditDelete,
  CardHomeLess,
  DirectionsBottom,
  DirectionsTop,
  HeaderSearchHomeLess,
  Main,
  Search,
} from "./styles";
import Header from "../../components/Header/Header";
import imgTeste from "../../img/people01.jpg";
import Footer from "../../components/Footer/Footer";
import ResetPage from "../../components/AboutTeam/ResetPage";
import AnimatedPage from "../../components/AnimatedPage";
import ModalEditHomeless from "../../components/ModalEditHomeless/ModalEditHomeless";

export default function HomeLess() {
  const {
    homeLess,
    isNextDisabled,
    isGoBackDisabled,
    isEdit,

    setEdit,
    setDel,
    setIsEdit,
    search,
    setSearchFor,
    next,
    goBack,
    deleteHomeless
  } = useContext(AuthContext);

  return (
    <ContainerHome>
      {
        isEdit
          ?
          <ModalEditHomeless />
          :
          <></>
      }
      <Header />
      <AnimatedPage>
        <Main>
          <BodyHomeLess>
            <HeaderSearchHomeLess>
              <Search>
                <input
                  type="text"
                  placeholder="Digite sua pesquisa aqui"
                  onChange={(event) => setSearchFor(event.target.value)}
                />

                <button onClick={() => search()}>
                  <BsSearch />
                </button>
              </Search>

              <DirectionsTop>
                <button disabled={isGoBackDisabled} onClick={() => goBack()}>
                  <GrPrevious />
                </button>

                <button disabled={isNextDisabled} onClick={() => next()}>
                  <GrNext />
                </button>
              </DirectionsTop>
            </HeaderSearchHomeLess>
            <BodyMissing>
              {homeLess.map((data) => (
                <CardHomeLess key={data.id}>
                  <Link to="#">
                    <figure>
                      <img src={imgTeste} alt="Foto do usuario" />
                      <figcaption>
                        <ul>
                          <li>
                            {" "}
                            <span> Nome: </span> {data.name}
                          </li>
                          <li>
                            {" "}
                            <span> Idade: </span> {data.age}
                          </li>
                          <li>
                            {" "}
                            <span> Descrição física: </span> {data.description}
                          </li>
                          <li>
                            {" "}
                            <span> Local de registro: </span> {data.location}
                          </li>
                          <li>
                            {" "}
                            <span> Voluntário: </span> {data.volunteer}
                          </li>
                          <li>
                            {" "}
                            <span> Email: </span> {data.user.email}
                          </li>
                          <li>
                            {" "}
                            <span> Data: </span> {data.date}
                          </li>
                          <BtnEditDelete>
                            <button onClick={() => {
                              setEdit(data)
                              setIsEdit(true)
                              }}>{<GrEdit />}
                            </button>
                          
                            <button onClick={() => {
                              setDel(data) 
                              deleteHomeless(data)
                            }}>{<BiTrash />}
                            </button>
                          </BtnEditDelete>
                        </ul>
                      </figcaption>
                    </figure>
                  </Link>
                </CardHomeLess>
              ))}
            </BodyMissing>

            <DirectionsBottom>
              <button disabled={isGoBackDisabled} onClick={() => goBack()}>
                <GrPrevious />
              </button>

              <button disabled={isNextDisabled} onClick={() => next()}>
                <GrNext />
              </button>
            </DirectionsBottom>
          </BodyHomeLess>
        </Main>
        <Footer color={"#435664"} />
        <ResetPage />
      </AnimatedPage>
    </ContainerHome>
  );
}
