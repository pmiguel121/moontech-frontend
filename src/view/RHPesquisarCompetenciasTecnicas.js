import React from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const HerokuURL = "https://moontech-backend.herokuapp.com";
function searchingFor(term) {
    return function (x) {
        return x.nome.toLowerCase().includes(term.toLowerCase()) ||
            x.categoria.toLowerCase().includes(term.toLowerCase()) ||
            x.id_skill.toString().includes(term.toLowerCase()) ||
            !term;
    }
}

class RHPesquisarCompetenciasTecnicas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],

            utilizador: [],

            term: '',
        };

        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
        this.setState({ term: event.target.value })
    }

    componentWillMount() {
        fetch(HerokuURL + "/skill/listskilltipoTecnicas")
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    componentDidMount() {
        this.Load_skillsTecnicas()
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
    Load_skillsTecnicas() {
        const url = HerokuURL + "/skill/listskilltipoTecnicas";
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
        // const { data, value, nome, categoria, tipo } = this.state;


        return this.state.utilizador.map((data, index) => {
            return (
                <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                    <div className="row">
                        <div className="d-none d-xl-block  col-xl-2">
                            <div className="modal fade" id="exampleModalCenter2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenter2"
                                aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content1">
                                        <div className="modal-header bg-white ">
                                            <h5 className="modal-title" id="exampleModalCenter2">Remover Competência</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body pre-scrollable1">
                                            <div className="container-fluid">
                                                <p className="texto"> Deseja remover a competência Html?</p>
                                            </div>
                                        </div>
                                        <div className="modal-footer bg-white ">
                                            <button type="button" className="btnamarelonormal" data-dismiss="modal">Sim</button>
                                            <button type="button" className="btnoutlineamarelo" data-dismiss="modal">Não</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                            <h3 className="ml-4  titulos" > Competências</h3>
                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal">Pesquisar Competências Técnicas</h5>
                                    <hr />
                                    <form className="my-4 font-weight-light col-xl-12 texto" >
                                        <div className="row">
                                            <div className="col-xl-6 ">
                                                <div className="row mb-2">
                                                    <div className="col-xs-1 " >
                                                        <label >Pesquisar</label>
                                                    </div>
                                                    <div className="col mr-2">
                                                        <div className="input-group ">
                                                            <input type="text"
                                                                value={term}
                                                                onChange={this.searchHandler}
                                                                className="form-control form-control-sm my-0 py-1 "
                                                                name="PesquisarCompetenciasTecnicas"
                                                            />
                                                            <div className="input-group-append">
                                                                <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#FAAC19" }} ><img src="imagens/lupa.png" alt=""></img></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>


                                    <table className="table table-striped mt-3 font-weight-light texto mb-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">Competência</th>
                                                <th scope="col">Categoria</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Remover</th>
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
        return this.state.skills.filter(searchingFor(this.state.term)).map((data, index, index1, index2, index3) => {

            return (


                <tr>
                    <td key={index}>{data.nome}</td>
                    <td key={index1}> {data.categoria}</td>
                    <td key={index2}> {data.tipo === 1 ? "Competência Técnica" : "Competência Humana"}</td>
                    <td>
                        <button onClick={() => this.onDelete(data.id_skill)} type="button" className="botaoremover mt-2"> <img src="imagens/remover.png" alt="remover" /> </button>
                    </td>
                    <td key={index3} className="hide-text"> {data.id_skill}</td>


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
                this.Load_skillsTecnicas()
            }).catch(error => {
                alert("Error 325 ")
            })
    }
}



export default RHPesquisarCompetenciasTecnicas;