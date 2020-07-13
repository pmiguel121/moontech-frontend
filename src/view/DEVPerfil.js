import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
//import AuthService from "./auth.service";
const HerokuURL = "https://moontech-backend.herokuapp.com";

class DEVPerfil extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      utilizador: []

    }

  }

  componentDidMount() {
    this.Load_devs()
  }

  Load_devs() {
    let id_utilizador = JSON.parse(localStorage.getItem('Utilizador')).nrUser

    console.log(id_utilizador)
    const url = HerokuURL + "/utilizador/get/" + id_utilizador
    axios.get(url)

      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          this.setState({ utilizador: data });

        } else {
          alert("Erro no Servidor Web!");
        }
      })
      .catch(error => {
        alert(error)
      });
  }

  render() {
    return this.state.utilizador.map((data, index) => {
      return (
        <div className="row no-gutters">
          <div className="d-none d-xl-block  col-xl-2">
            <nav id="sidebar">
              <div className="sidebar-header">
                <div className="intro">
                  <div className="text-center"><img src="imagens/bizdirectLOGO.png" alt=""
                    className="img-fluid w-50 text-center" /></div>
                  <div className="profile-img mb-xl-4 "> <img className="profile-img maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /> </div>
                  <h3 className="profile-usertitle-name mt-0">{JSON.parse(localStorage.getItem('Utilizador')).nome}</h3>
                  <h4 className="profile-usertitle-job ">
                    {JSON.parse(localStorage.getItem('Utilizador')).tipoUser === 2 ?
                      "Team Leader" : "Developer"}
                  </h4>
                </div>
              </div>

              <hr />
              <ul className="list-unstyled components">
                <li>
                  <Link to="/DEVPesquisarProjetos" className="p-3"> <img src="imagens/projetos.svg" width="24px" alt="" />
                    <span className="pl-3">Projetos</span></Link>
                </li>
                <li>
                  <Link to="/DEVCompetenciasEditar" className="p-3"><img src="imagens/Competencias.svg" width="24px" alt="" /> <span
                    className="pl-3">Competências</span></Link>
                </li>
                {JSON.parse(localStorage.getItem('Utilizador')).tipoUser === 2 ?
                  <li>
                    <Link to="/TLContinuarProjeto" className="p-3"><img src="imagens/decorrer.png" width="24px" alt="" /> <span
                      className="pl-3">Criação de Equipa</span></Link>
                  </li>
                  : ""}

              </ul>

              <ul>
                <li className="mt-5 pt-5">
                  <Link to="/Logout" ><img src="imagens/sair.svg" alt="" width="24px" /><span
                    className="pl-3 fixed_bottom">Sair</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-xl-10">
            <div className="container-fluid d-xl-none p-3 text-right">
              <div className="dropdown">
                <button type="button" className="btn btn-primary" data-toggle="dropdown" id="sidebarCollapse"></button>
                <div className="dropdown-menu">
                  <div className="dropdown-header"></div>
                  <Link to="/DEVPesquisarProjetos" className="dropdown-item" ><img className="pr-1" src="imagens/projetos.svg" width="24px"
                    alt="" />Projetos</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/DEVCompetenciasEditar" className="dropdown-item" ><img className="pr-1" src="imagens/Competencias.svg" width="24px"
                    alt="" />Competências</Link>

                  {JSON.parse(localStorage.getItem('Utilizador')).tipoUser === 2 ?

                    <div>
                      <div className="dropdown-divider"></div>
                      <Link to="/TLContinuarProjeto" className="dropdown-item" ><img className="pr-1" src="imagens/decorrer.png" width="24px"
                        alt="" />Criação de Equipa</Link>

                    </div>

                    : ""}

                  <div className="dropdown-divider"></div>
                  <Link to="/Logout"><img src="imagens/sair.svg" alt="" width="24px" /><span
                    className="pl-3 fixed_bottom">Sair</span></Link>

                </div>
              </div>
            </div>

            <h3 className="ml-4  col-xl-10 titulos text-left mt-5 " > Perfil</h3>
            <div className="row no-gutters justify-content-center">

              <div className="col-lg-11 col-12 col-sm-11     my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">

                <h5 className="pb-1 titulos font-weight-normal text-left">
                  Informações pessoais
                  </h5>
                <hr />

                <div>
                  {this.loadFillData()}
                </div>

              </div>

              <div className="row no-gutters justify-content-center">
                <div className="col-lg-7 col-12 col-sm-11    my-4 pr-5 pl-5 pt-4 pb-4 mr-lg-5 mr-sm-0 bg-white">
                  <h5 className="pb-1 titulos font-weight-normal text-left">Avaliações</h5>
                  <hr />
                  <div className="my-4">
                    <div className="row font-weight-light">
                      <div className="col-lg-1 col-1 ">
                        <img
                          src="imagens/teste.png"
                          className="maxphotoavaliacoes"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-5 col-11 ">
                        <div className="comentario  ml-4">
                          "Excelente editor com grandes capacidades para entrar em
                          futuros projetos."
                          </div>
                        <div className="comentario small ml-5">
                          {" "}
                            Bruno Fernandes, Team Leader
                          </div>
                      </div>

                      <div className="col-lg-1 col-1 ">
                        <img
                          src="imagens/teste.png"
                          className="maxphotoavaliacoes"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-5 col-11 ">
                        <div className="comentario ml-4">
                          Excelente editor com grandes capacidades para entrar em
                          futuros projetos."
                          </div>
                        <div className="comentario small ml-5">
                          {" "}
                            Bruno Fernandes, Team Leader
                          </div>
                      </div>
                    </div>

                    <div className="row font-weight-light mt-4">
                      <div className="col-lg-1 col-1 ">
                        <img
                          src="imagens/teste.png"
                          className="maxphotoavaliacoes"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-5 col-11 ">
                        <div className="comentario  ml-4">
                          "Excelente editor com grandes capacidades para entrar em
                          futuros projetos."
                          </div>
                        <div className="comentario small ml-5">
                          {" "}
                            Bruno Fernandes, Team Leader
                          </div>
                      </div>

                      <div className="col-lg-1 col-1 ">
                        <img
                          src="imagens/teste.png"
                          className="maxphotoavaliacoes"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-5 col-11 ">
                        <div className="comentario ml-4">
                          Excelente editor com grandes capacidades para entrar em
                          futuros projetos."
                          </div>
                        <div className="comentario small ml-5">
                          {" "}
                            Bruno Fernandes, Team Leader
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12 col-sm-11  my-4 pr-5 pl-5 pt-4 pb-4 ml-sm-0  ml-lg-5 bg-white ">
                  <h5 className="pb-1 titulos font-weight-normal text-left">
                    Recomendações
                    </h5>
                  <hr />
                  <div className="row mt-2">
                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                      <span className="my-4 font-weight-light"> Photoshop</span>
                    </div>
                    <div className="col xl-12">
                      <span className="my-4 font-weight-light">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                      <span className="my-4 font-weight-light"> Illustrator</span>
                    </div>
                    <div className="col xl-12">
                      <span className="my-4 font-weight-light">
                        <div className="progress">
                          <div
                            className="progress-bar bg-warning"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                      <span className="my-4 font-weight-light"> Premiere</span>
                    </div>
                    <div className="col xl-12">
                      <span className="my-4 font-weight-light">
                        <div className="progress">
                          <div
                            className="progress-bar bg-info"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                      <span className="my-4 font-weight-light">
                        {" "}
                          AfterEffects
                        </span>
                    </div>
                    <div className="col xl-12">
                      <span className="my-4 font-weight-light">
                        <div className="progress">
                          <div
                            className="progress-bar bg-danger"
                            style={{ width: "96%" }}
                          ></div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                      <span className="my-4 font-weight-light"> HTML</span>
                    </div>
                    <div className="col xl-12">
                      <span className="my-4 font-weight-light">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                      <span className="my-4 font-weight-light"> Illustrator</span>
                    </div>
                    <div className="col xl-12">
                      <span className="my-4 font-weight-light">
                        <div className="progress">
                          <div
                            className="progress-bar bg-warning"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  loadFillData() {

    return this.state.utilizador.map((data, index) => {
      return (
        <form>
          <div className="row">
            <div className="col-xs-2">
              <div className="col-xs-2">
                <div className="row ">
                  <div className="col-sm">
                    <div className="col-md-4  ">
                      <div className="file-field">
                        <div>
                          <img
                           src={data.fotourl}
                            className="maxphotoperfil
                            ml-4"
                            alt="Avatar"
                            style={{ margintop: "30px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="container-fluid ">
                <div className="row">
                  <div className="col-md-4 ">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="my-1 font-weight-light">

                          <label>Nome: {data.nome}</label>
                        </div>

                        <div className="my-1 font-weight-light">

                          <label>ID: {data.id_utilizador}</label>
                        </div>
                        <div className="my-1 font-weight-light">

                          <label>Telemovel: {data.telemovel}</label>
                        </div>
                        <div className="my-1 font-weight-light">

                          <label>Email: {data.email}</label>
                        </div>
                        <div className="my-1 font-weight-light">

                          <label>Data de Nascimento: {data.datanascimento}</label>
                        </div>
                        <div className="my-1 font-weight-light">

                          <label>Formação: {data.formacao}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="my-1 font-weight-light">

                          <label>Numero Contribuinte: {data.nr_contribuinte}</label>
                        </div>
                        <div className="my-1 font-weight-light">

                          <label>Morada: {data.morada}</label>
                        </div>
                        <div className="my-1 font-weight-light">

                          <label>Localidade: {data.localidade}</label>
                        </div>
                        <div className="my-1 font-weight-light">

                          <label>Código Postal: {data.codigopostal}</label>
                        </div>
                        <div className="my-1 font-weight-light">

                          <label>Interesses: {data.interesses}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <div className="row font-weight-light">
                      <div className="row ">
                        <div className="col-xs-2 mt-1">
                          <label>Disponibilidade:</label>
                        </div>
                      </div>
                    </div>


                    <div className="row">
                      <div className="col">
                        <div className="custom-control custom-switch">


                          {(data.viajar === true ?
                            (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}

                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch1"
                          >
                            Para Viajar
                    </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="custom-control custom-switch">
                          {(data.horasextra === true ?
                            (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch2"
                          >
                            Horas Extra
                    </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="custom-control custom-switch">
                          {(data.reunircliente === true ?
                            (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch3"
                          >
                            Para reunir com cliente
                    </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="custom-control custom-switch">
                          {(data.estado === true ?
                            (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch4"
                          >
                            Ativo
                    </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-gutters justify-content-end col-lg-12 mt-2 mb-2  pr-3 float-right">
              <Link to={'/DevEditarPerfil'}
                type="button" className="btnlaranjanormal ">
                Editar
              </Link>
            </div>
          </div>
        </form>
      )
    });
  }
}






export default DEVPerfil;
