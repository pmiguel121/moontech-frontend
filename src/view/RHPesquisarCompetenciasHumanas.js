import React from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';
import { Link } from "react-router-dom";

const HerokuURL = "https://moontech-backend.herokuapp.com";

function searchingFor(term) {
    return function (x) {
        return x.nome.toLowerCase().includes(term.toLowerCase()) ||
            x.categoria.toLowerCase().includes(term.toLowerCase()) ||
            x.id_skill.toString().includes(term.toLowerCase()) ||
            !term;
    }
}

class RHPesquisarCompetenciasHumanas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            term: '',

            utilizador: [],

        };
        this.searchHandler = this.searchHandler.bind(this);
    }

    componentDidMount() {
        this.Load_skillshumanas()
        this.Load_foto()
    }


    Load_foto() {
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

    searchHandler(event) {
        this.setState({ term: event.target.value })
    }

    Load_skillshumanas() {
        const url = HerokuURL + "/skill/listskilltipoHumanas";
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ skills: data });
            } else {
                alert("Error Web Service!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }

    render() {
        const { term } = this.state;

        return this.state.utilizador.map((data, index) => {
            return (
                <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                    <div className="row">
                        <div className="d-none d-xl-block  col-xl-2">
                            <nav id="sidebar">
                                <div className="sidebar-header">
                                    <div className="intro">
                                        <div className="text-center"> <img src="imagens/bizdirectLOGO.png" alt=""
                                            className="img-fluid w-50 text-center" /> </div>
                                        <Link to="/RHDashboard"> <div className="profile-img mb-xl-4 "> <img className="profile-img maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /> </div></Link>
                                        <h3 className="profile-usertitle-name mt-0">{JSON.parse(localStorage.getItem('Utilizador')).nome}</h3>
                                        <h4 className="profile-usertitle-job ">Recursos Humanos</h4>
                                    </div>

                                </div>
                                <hr />
                                <ul className="list-unstyled components">
                                    <li>
                                        <Link to="/RHDashboard" className="p-3">
                                            {" "}
                                            <img src="imagens/dashboard.svg" width="24px" alt="" />
                                            <span className="pl-3">Dashboard</span></Link>
                                    </li>
                                    <li>
                                        <a href="#pageSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false">
                                            {" "}
                                            <img
                                                src="imagens/developer.svg" width="24px" alt="" /><span className="pl-3">Developers</span></a>

                                        <ul className="collapse list-unstyled" id="pageSubmenu">
                                            <li>
                                                <Link to="/RHAdicionarDev">Adicionar Developer</Link></li>
                                            <li><Link to="/RHPesquisarDev">Pesquisar Developer</Link></li>
                                            <li><Link to="/RHatribuirPapeisTL">Atribuir papéis</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#CompSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false"> <img
                                            src="imagens/competencias.svg" alt="" width="24px" /><span
                                                className="pl-3">Competências</span></a>
                                        <ul className="collapse list-unstyled" id="CompSubmenu">
                                            <li><Link to="/RHPesquisarCompetenciasTecnicas">Competências Técnicas</Link></li>
                                            <li><Link to="/RHPesquisarCompetenciasHumanas">Competências Humanas</Link></li>
                                            <li><Link to="/RHAdicionarCompetencias">Adicionar Competências</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#homeSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false"><img
                                            className="prj_icon" src="imagens/projetos.svg" alt="" width="24px" />
                                            <span className="pl-3">Projetos</span></a>
                                        <ul className="collapse list-unstyled" id="homeSubmenu">
                                            <li><Link to="/RHCriarProjetos">Criar Projetos</Link></li>
                                            <li><Link to="/RHPesquisarProjetos">Pesquisar Projetos</Link></li>
                                        </ul>
                                    </li>

                                </ul>

                                <ul>
                                    <li className="mt-5 pt-5">
                                        <Link to="/Logout"><img src="imagens/sair.svg" alt="" width="24px" /><span
                                            className="pl-3 fixed_bottom">Sair</span></Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>


                        <div className="col-xl-10">
                            <div className=" my-5">

                                <div className="container-fluid d-xl-none p-3 text-right">
                                    <div className="dropdown">
                                        <button type="button" className="btn btn-primary" data-toggle="dropdown" id="sidebarCollapse"></button>
                                        <div className="dropdown-menu">
                                            <div className="dropdown-header"></div>
                                            <Link to="/RHDashboard" className="dropdown-item" ><img className="pr-1" src="imagens/dashboard.svg" width="24px"
                                                alt="" />Dashboard</Link>
                                            <div className="dropdown-divider"></div>
                                            <h5 className="dropdown-header"><img className="pr-1" src="imagens/developer.svg" width="24px"
                                                alt="" />Developers</h5>
                                            <Link to="/RHAdicionarDev" className="dropdown-item" >Adicionar developer</Link>
                                            <Link to="/RHPesquisarDev" className="dropdown-item" >Pesquisar developer</Link>
                                            <Link to="/RHatribuirPapeisTL" className="dropdown-item" >Atribuir papéis</Link>
                                            <div className="dropdown-divider"></div>
                                            <h5 className="dropdown-header"><img className="pr-1" src="imagens/competencias.svg" width="24px"
                                                alt="/" />Competências</h5>
                                            <Link to="/RHPesquisarCompetenciasTecnicas" className="dropdown-item" >Competências técnicas</Link>
                                            <Link to="/RHPesquisarCompetenciasHumanas" className="dropdown-item" >Competências humanas</Link>
                                            <Link to="/RHAdicionarCompetencias" className="dropdown-item" >Adicionar competências</Link>
                                            <div className="dropdown-divider "></div>
                                            <h5 className="dropdown-header"><img className="pr-1" src="imagens/projetos.svg" width="24px"
                                                alt="" />Projetos</h5>

                                            <Link to="/RHCriarProjetos" className="dropdown-item" >Criar projetos</Link>
                                            <Link to="/RHPesquisarProjetos" className="dropdown-item" >Pesquisar projetos</Link>

                                            <div className="dropdown-divider"></div>
                                            <Link to="/Logout"><img src="imagens/sair.svg" alt="" width="24px" /><span
                                                className="pl-3 fixed_bottom">Sair</span></Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="ml-4 mt-5 titulos"> Competências</h3>





                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">


                                    <h5 className="pb-1 titulos font-weight-normal">Pesquisar Competências Humanas</h5>

                                    <hr />


                                    <form className="my-4 font-weight-light col-xl-12 texto">
                                        <div className="row">
                                            <div className="col-xl-6 ">
                                                <div className="row">
                                                    <div className="col-xs-1 mb-2">
                                                        <label>Pesquisar</label>
                                                    </div>
                                                    <div className="col mr-2">

                                                        <div className="input-group ">
                                                            <input className="form-control form-control-sm my-0 py-1 red-border"
                                                                value={term}
                                                                onChange={this.searchHandler}
                                                                type="text"
                                                                name="PesquisarCompetenciasHumanas"
                                                                aria-label="Search" />
                                                            <div className="input-group-append">
                                                                <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#FAAC19" }} ><img src="imagens/lupa.png" alt=""></img></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <table className="table table-striped mt-3 font-weight-light texto mb-2" id="myTable">
                                        <thead>
                                            <tr>
                                                <th>Competência</th>
                                                <th>Tipo</th>
                                                <th>Remover</th>
                                                <th scope="col" className="hide-text">id</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.loadFillData()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        });
    }



    loadFillData() {

        //enquanto houver, preenche
        return this.state.skills.filter(searchingFor(this.state.term)).map((data, index, index1, index2) => {
            return (

                <tr >
                    <td key={index}>{data.nome}</td>

                    <td key={index1}> {data.tipo === 2 ? "Competência Humana" : "Competência Técnica"}</td>
                    <td>
                        <button onClick={() => this.onDelete(data.id_skill)} type="button" className="botaoremover mt-2"> <img src="imagens/remover.png" alt="remover"/> </button>
                    </td>

                    <td key={index2} className="hide-text"> {data.id_skill}</td>

                </tr>

            )
        });
    }

    onDelete(id_skill) {
        Swal.fire({
            title: 'Tem a certeza que quer apagar?',
            text: 'Não irá conseguir recuperar novamente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, Apagar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.sendDelete(id_skill)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Competência não apagada',
                    'Erro'
                )
            }

        })
    }

    sendDelete(userId) {
        //url de backend
        const Url = HerokuURL + "/skill/delete/" + userId;

        axios.post(Url)
            //alert("Alerta " + userId)
            .then(response => {

                if (response.data.success) {
                    Swal.fire(
                        'Apagado',
                        'A competência foi apagada.',
                        'Apagado com sucesso!'
                    )
                }
                this.Load_skillshumanas()
            }).catch(error => {
                alert("Error 325 ")
            })
    }
}

export default RHPesquisarCompetenciasHumanas;