import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import 'sweetalert2/src/sweetalert2.scss'
import { Link } from "react-router-dom";

const HerokuURL = "https://moontech-backend.herokuapp.com";

function searchingFor(term) {
    return function (x) {
        return x.nome.toLowerCase().includes(term.toLowerCase()) ||
            x.sigla.toLowerCase().includes(term.toLowerCase()) ||
            x.id_projeto.toString().includes(term.toLowerCase()) ||

            !term;
    }
}


class TLContinuarProjeto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projetos: [],
            term: '',

            utilizador: [],

            nome: "",
            sigla: "",

        };

        this.searchHandler = this.searchHandler.bind(this);
    }



    searchHandler(event) {
        this.setState({ term: event.target.value })
    }


    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    componentDidMount() {
        this.Load_projetos()
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

    Load_projetos() {
        const url = HerokuURL + "/projeto/listProjetosTL/" + JSON.parse(localStorage.getItem('Utilizador')).nrUser;
        axios.get(url).then(res => {

            if (res.data.success) {
                const data = res.data.data;
                this.setState({ projetos: data });
            } else {
                alert("Erro no servidor web!");
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
                    <div className="row no-gutters">
                        <div className="d-none d-xl-block  col-xl-2">
                            <nav id="sidebar">
                                <div className="sidebar-header">
                                    <div className="intro">
                                        <div className="text-center"><img src="imagens/bizdirectLOGO.png" alt=""
                                            className="img-fluid w-50 text-center" /></div>
                                        <div className="profile-img mb-xl-4"><img className="profile-img maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /> </div>
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
                                        <Link to="/DEVCompetenciasEditar" className="dropdown-item" ><img className="pr-1" src="imagens/decorrer.png" width="24px"
                                            alt="" />Competências</Link>



                                        {JSON.parse(localStorage.getItem('Utilizador')).tipoUser === 2 ?

                                            <div>
                                                <div className="dropdown-divider"></div>
                                                <Link to="/TLContinuarProjeto" className="dropdown-item" ><img className="pr-1" src="imagens/Competencias.svg" width="24px"
                                                    alt="" />Criação de Equipa</Link>

                                            </div>

                                            : ""}

                                        <div className="dropdown-divider"></div>
                                        <Link to="/Logout"><img src="imagens/sair.svg" alt="" width="24px" /><span
                                            className="pl-3 fixed_bottom">Sair</span></Link>


                                    </div>
                                </div>
                            </div>
                            <h3 className="ml-4 mt-5  titulos"> Criação de Equipa</h3>
                            <div className="row justify-content-center">
                                <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal">Projetos sem equipa</h5>
                                    <hr />
                                    <form className="my-4 font-weight-light col-xl-12 texto">
                                        <div className="row">
                                            <div className="col-xl-6 ">
                                                <div className="row ">

                                                    <label>Pesquisar</label>
                                                    <div className="col mr-2">
                                                        <div className="input-group ">
                                                            <input type="text"
                                                                value={term}
                                                                onChange={this.searchHandler}
                                                                className="form-control form-control-sm my-0 py-1 "
                                                                name="TLPesquisarProjetos"
                                                            />
                                                            <div className="input-group-append">
                                                                <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#59cabc" }} ><img src="imagens/lupa.png" alt ="Ícone de procura"></img></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <table className="table table-striped mt-3 font-weight-light texto mb-2 ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Sigla</th>
                                                <th scope="col">Título</th>
                                                <th scope="col">Ações</th>
                                                <th className="hide-text" scope="col"></th>
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
        return this.state.projetos.filter(searchingFor(this.state.term)).map((data, index) => {
            //console.log(data.id_projeto)
            return (
                <tr >
                    <td key={index}>{data.sigla}</td>
                    <td key={index}> {data.nome}</td>
                    <td>
                        <Link to={{ pathname: "/TLCriarProjeto/" + data.id_projeto }} type="button" className="btnverdenormal" > Criar Equipa </Link>
                    </td>
                    
                    <td key={index} className="hide-text"> {data.id_projeto}</td>
                </tr>
            )

        });

    }


}

export default TLContinuarProjeto;