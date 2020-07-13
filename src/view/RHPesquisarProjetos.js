import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const HerokuURL = "https://moontech-backend.herokuapp.com";

var Chart = require("react-google-charts").Chart;

function searchingFor(term) {
    return function (x) {
        return x.nome.toLowerCase().includes(term.toLowerCase()) ||
            x.sigla.toLowerCase().includes(term.toLowerCase()) ||
            x.id_projeto.toString().includes(term.toLowerCase()) ||
            !term;
    }
}

function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className='error'>{props.message}</div>
        )
    }
    return null;
}
//FIM VALIDAÇÃO

//let id_utilizadorr = 1;

class RHPesquisarProjetos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projetos: [],
            id_projetovalor: 1,
            term: '',

            utilizador: [],

            nome: "", nomeValid: false,
            sigla: "", siglaValid: false,
            data_inicio: "2020-10-10", data_inicioValid: false,
            data_fim: "2020-10-10", data_fimValid: false,
            nr_elementos: null,
            disponibilidade: 0,
            hora_extra: false,
            reunircliente: false,
            estado_projeto: null,
            descricao: "", descricaoValid: false,

            CompEmGraficosHum: [],
            CompEmGraficosTec: [],

            GraficoTecnicas: [],
            GraficoHumanas: [],

            formValid: false,
            errorMsg: {},

        };
        this.searchHandler = this.searchHandler.bind(this);
    }


    //VALIDAÇÕES 

    validateForm = () => {
        const { nomeValid, siglaValid, data_inicioValid, data_fimValid, descricaoValid } = this.state;
        this.setState({
            formValid: nomeValid && siglaValid && data_inicioValid && data_fimValid && descricaoValid
        })
    }

    // nome
    updatenome = (nome) => {
        this.setState({ nome }, this.validatenome)
    }


    validatenome = () => {
        const { nome } = this.state;
        let nomeValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (nome.length < 3) {
            nomeValid = false;
            errorMsg.nome = 'Introduza o título do projeto'
        }
        this.setState({ nomeValid, errorMsg }, this.validateForm)
    }


    // sigla
    updatesigla = (sigla) => {
        this.setState({ sigla }, this.validatesigla)
    }


    validatesigla = () => {
        const { sigla } = this.state;
        let siglaValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (!/[A-Z]$/.test(sigla)) {
            siglaValid = false;
            errorMsg.sigla = 'Introduza apenas maiúsculas'
        }

        this.setState({ siglaValid, errorMsg }, this.validateForm)
    }


    //DATA INICIO
    updatedata_inicio = (data_inicio) => {
        this.setState({ data_inicio }, this.validatedata_inicio)
    }

    validatedata_inicio = () => {
        const { data_inicio } = this.state;
        let data_inicioValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(data_inicio)) {
            data_inicioValid = false;
            errorMsg.data_inicio = 'Coloque ou digite uma data válida.'
        }

        this.setState({ data_inicioValid, errorMsg }, this.validateForm)
    }

    //DATA FIM
    updatedata_fim = (data_fim) => {
        this.setState({ data_fim }, this.validatedata_fim)
    }

    validatedata_fim = () => {
        const { data_fim } = this.state;
        let data_fimValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(data_fim)) {
            data_fimValid = false;
            errorMsg.data_fim = 'Coloque ou digite uma data válida.'
        }

        this.setState({ data_fimValid, errorMsg }, this.validateForm)
    }


    // descricao
    updatedescricao = (descricao) => {
        this.setState({ descricao }, this.validatedescricao)
    }

    validatedescricao = () => {
        const { descricao } = this.state;
        let descricaoValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (!/[A-Za-z]$/.test(descricao)) {
            descricaoValid = false;
            errorMsg.descricao = 'Preencha este campo'
        }

        this.setState({ descricaoValid, errorMsg }, this.validateForm)
    }



    searchHandler(event) {
        this.setState({ term: event.target.value })
    }

    componentDidMount() {
        this.Load_projetos()
        this.Load_foto()
        this.Load_graficosTecnicos()
        this.Load_graficosHumanos()


    }

    onClickButton(event) {
        event.preventDefault();
    }

    Load_graficosHumanos() {
        const url = HerokuURL + "/skill/CompMaisUsadasHumanas";
        axios.get(url).then(res => {
            if (res.data.success) {
                const data = res.data.data;
                this.setState({ GraficoHumanas: data });
            } else {
                alert("Error Web Service!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }

    Load_graficosTecnicos() {
        const url = HerokuURL + "/skill/CompMaisUsadasTecnicas";
        axios.get(url).then(res => {
            if (res.data.success) {
                const data = res.data.data;
                this.setState({ GraficoTecnicas: data });
            } else {
                alert("Error Web Service!");
            }
        })
            .catch(error => {
                alert(error)
            });
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
        const url = HerokuURL + "/projeto/list2";
        axios.get(url).then(res => {
            if (res.data.success) {
                const data = res.data.data;
                this.setState({ projetos: data });
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


                            <h3 className="ml-4 mt-5  titulos" > Projetos</h3>
                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11  my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal">Pesquisar Projetos</h5>
                                    <hr />

                                    <form className="my-4 font-weight-light col-xl-12 texto" >
                                        <div className="row">
                                            <div className="col-xl-6 ">
                                                <div className="row mb-2">
                                                    <div className="col-xs-1" >
                                                        <label >Pesquisar</label>
                                                    </div>
                                                    <div className="col mr-2">
                                                        <div className="input-group ">

                                                            <input type="text" className="form-control form-control-sm my-0 py-1 "
                                                                value={term}
                                                                onChange={this.searchHandler}
                                                                name="PesquisarProj" />

                                                            <div className="input-group-append">
                                                                <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "rgb(253, 125, 74)" }} ><img src="imagens/lupa.png" alt=""></img></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <table className="table table-striped mt-3 font-weight-light texto mb-2 " id="myTable">
                                        <thead>

                                            <tr>
                                                <th scope="col">Sigla</th>
                                                <th scope="col">Título</th>
                                                <th scope="col">Líder</th>
                                                <th className="d-none d-lg-table-cell" scope="col" >Equipa do Projeto</th>
                                                <th className="d-none d-lg-table-cell" scope="col" >Ativo</th>
                                                <th scope="col" ></th>
                                                <th scope="col" className="hide-text">ID</th>

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


            )
        })
    }

    loadFillData() {


        //DADOS GRAFICOS TECNICAS DECLARADOS
        let outputTecnicas = [['Competência', 'Nível']]



        for (let x in this.state.GraficoTecnicas) {
            const ColunaTec = Object.values(this.state.GraficoTecnicas[x])

            outputTecnicas.push([ColunaTec[0], Number(ColunaTec[1])])
        }


        //FIM DADOS GRAFICOS TECNICAS DECLARADOS


        //DADOS GRAFICOS HUMANOS DECLARADOS


        let output = [['Competência', 'Nível']]


        for (let i in this.state.GraficoHumanas) {

            // o backend devolve objetos, e eu não quero as keys, apenas os values, então vou apenas buscar os values diretamente! (pensa em dicionários)
            const Coluna = Object.values(this.state.GraficoHumanas[i])

            output.push([Coluna[0], Number(Coluna[1])])
        }
        //FIM DADOS GRAFICOS HUMANOS DECLARADOS
        //enquanto houver, preenche
        return this.state.projetos.filter(searchingFor(this.state.term)).map((data, index) => {
            return (


                <tr >
                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#basicExampleModal8' + index}>{data.sigla}</td>
                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#basicExampleModal8' + index}> {data.nome}</td>

                    {/* para ir buscar o nome do líder, visto que está dentro do vetor nome_lider que está dentro do vetor projetos nos dados que retorna */}
                    <td style={{ cursor: 'pointer' }} data-toggle_="modal" data-target_={'#basicExampleModal8' + index}>
                        {data.nome_lider.map(function (nome_lider) {
                            return (
                                <div>{nome_lider.nome}</div>
                            );
                        }
                        )
                        }
                    </td>
                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#basicExampleModal8' + index} className="d-none d-lg-table-cell">
                        {data.fotos_equipa.map(function (fotos_equipa) {
                            return (
                                <img className="maxphotoperfilpequenacomequipa" alt="" src={fotos_equipa.fotourl} ></img>
                            );
                        })}
                    </td>
                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#basicExampleModal8' + index} className="d-none d-lg-table-cell" >
                        {(data.estado_projeto === 2 ? (<img src="imagens/ativo.png" alt="" />) : <img src="imagens/desativo.png" alt="" />)}
                    </td>


                    <td key={index} className="hide-text"> {data.id_projeto}</td>

                    <td >  <button onClick={(value) => this.setState({ nome: data.nome, sigla: data.sigla, data_inicio: data.data_inicio, data_fim: data.data_fim, descricao: data.descricao, estado_projeto: data.estado_projeto })} data-toggle="modal" data-target={'#ModalAbreEditarProjeto' + index} type="button"> <img className="botaoeditarevisualizar" src="imagens/editar.png" alt="" /> </button> </td>



                    {/* PRIMEIRO MODAL */}

                    <div className="modal fade mt-1" id={'basicExampleModal8' + index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">


                        {/* {this.state.id_projetovalor = data.id_projeto}
                        {this.GetProjetoEspecifico()}
 */}

                        <div className="modal-dialog modal-xl">
                            <div className="modal-content1">
                                <div className="modal-header bg-white ">
                                    <h5 className="modal-title" id="exampleModalLabel">Projeto {data.sigla}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body pre-scrollable1">
                                    <div className="container-fluid">



                                        <div className="row justify-content-md-center">

                                            <div className="col-lg-11 col-md-11  my-4 pr-5 pl-5 pt-4 pb-4   bg-white  ">
                                                <h5 className="pb-1 titulos font-weight-normal">Informações Gerais</h5>


                                                <hr />

                                                <div className="my-4 font-weight-light">
                                                    <form className="my-4 font-weight-light col-xl-12 texto">
                                                        <div className="row">
                                                            <div className="col-xl-12 ">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 " >
                                                                        <label className="font-weight-normal  ">Título:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label> {data.nome}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">

                                                            <div className="col-xl-12 col-md-12">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 ">

                                                                        <label className="font-weight-normal ">Líder da Equipa:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        {data.nome_lider.map(function (nome_lider) {
                                                                            return (
                                                                                <label> {nome_lider.nome} </label>


                                                                            );
                                                                        })}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-xl-6 ">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 " >
                                                                        <label className="font-weight-normal  ">Sigla:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label>{data.sigla} </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 ">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 " >
                                                                        <label className="font-weight-normal  ">Nº de elementos:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label> {data.nr_elementos}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xl-6 col-md-12">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 " >
                                                                        <label className="font-weight-normal">Data de início:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label> {data.data_inicio}</label>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="col-xl-6 col-md-12">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 mb-0">
                                                                        <label className="font-weight-normal ">Data de fim:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label> {data.data_fim}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div className="row ">

                                                            <div className="col-xs-3 mr-3 mb-1">
                                                                <div className="custom-control custom-switch">

                                                                    {(data.disponibilidade === 1 ?
                                                                        (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}

                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customSwitch1"
                                                                    >
                                                                        Disponibilidade </label>
                                                                </div>
                                                            </div>



                                                            <div className="col-xl-12  pl-0">
                                                                <div className="custom-control custom-switch">
                                                                    {(data.hora_extra === 1 ?
                                                                        (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customSwitch2"
                                                                    >
                                                                        Horas Extra
</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-12  col-md-3 pl-0 pr-0 ">
                                                                <div className="custom-control custom-switch">
                                                                    {(data.reunircliente === 1 ?
                                                                        (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customSwitch3"
                                                                    >
                                                                        Cliente
</label>
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="col-xl-12 pl-0 pr-0 ">
                                                                <div className="custom-control custom-switch">
                                                                    {(data.estado_projeto === 1 ?
                                                                        (<input type="checkbox" disabled value={false} className="custom-control-input" id="customSwitch1" />)

                                                                        :

                                                                        (<input type="checkbox" checked disabled
                                                                            value={this.state.checked=true} className="custom-control-input" id="customSwitch1" />))}
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customSwitch4"
                                                                    >
                                                                        Ativo
</label>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="row">
                                                            <div className="col pl-0 pr-0 col-md-12">

                                                                <label className="font-weight-normal mt-3" htmlFor="exampleFormControlTextarea1">Descrição do projeto:</label>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col pl-0 pr-0 col-md-12">

                                                                <label className="font-weight-light ">{data.descricao} </label>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>

                                            </div>



                                        </div>

                                        <div className="row justify-content-center">

                                            <div className="col-lg-11  col-md-11  my-4 pr-5 pl-5 pt-4 pb-4  bg-white">

                                                <h5 className="pb-1 titulos font-weight-normal">Elementos da Equipa</h5>

                                                <hr />

                                                <div className="row justify-content-center">


                                                    {data.fotos_equipa.map(function (fotos_equipa) {
                                                        return (
                                                            <div>

                                                                <div className="col-xl-10  col-lg-10 col-md-10  col-sm-10  col-xs-10 mt-3 ml-3" >
                                                                    <div className="profile-img "><img className="rounded-pill maxphotoperfilmodal " src={fotos_equipa.fotourl} alt="" />
                                                                        <div className="align-middle ">
                                                                            <h3 className="profile-usertitle-name text-xs-center  font-weight-normal mt-2 ">{fotos_equipa.nome}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        );
                                                    })}






                                                </div>


                                                <div className="row">
                                                    <div className="col-xs-12 col-xl-6 ">
                                                        <h5 className="pb-1 titulos font-weight-normal pt-5 pb-3">Competências Técnicas</h5>


                                                        <div id="donutchartTecnicas"></div>

                                                        <Chart
                                                            width={'300px'}
                                                            height={'300px'}
                                                            chartType="PieChart"
                                                            backgroundColor={'white'}
                                                            loader={<div>Loading Chart</div>}

                                                            data={outputTecnicas}

                                                            options={{
                                                                pieHole: 0.4,
                                                                chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                                                colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                                                fontSize: "17",
                                                                fontName: "Helvetica",
                                                                legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                                                pieSliceText: "none",
                                                                tooltip: { isHtml: true },
                                                                backgroundColor: 'transparent',
                                                            }}
                                                            rootProps={{ 'data-testid': '3' }}

                                                        />
                                                    </div>
                                                    <div className="col-xs-12 col-xl-6 ">
                                                        <h5 className="pb-1 titulos font-weight-normal pt-5 pb-3">Competências Humanas</h5>

                                                        <Chart
                                                            width={'300px'}
                                                            height={'300px'}
                                                            chartType="PieChart"
                                                            backgroundColor={'white'}
                                                            loader={<div>Loading Chart</div>}

                                                            data={output}

                                                            options={{
                                                                pieHole: 0.4,
                                                                chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                                                colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                                                fontSize: "17",
                                                                fontName: "Helvetica",
                                                                legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                                                pieSliceText: "none",
                                                                tooltip: { isHtml: true },
                                                                backgroundColor: 'transparent',
                                                            }}
                                                            rootProps={{ 'data-testid': '3' }}

                                                        />



                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer bg-white ">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>




                    {/* FIM PRIMEIRO MODAL */}


                    {/* SEGUNDO MODAL */}

                    <div className="modal fade mt-1" id={'ModalAbreEditarProjeto' + index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content1">
                                <div className="modal-header bg-white ">
                                    <h5 className="modal-title" id="exampleModalLabel">Projeto {data.sigla}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body pre-scrollable1">
                                    <div className="container-fluid">
                                        <div className="row justify-content-md-center">
                                            <div className="col-lg-11 col-md-11  my-4 pr-5 pl-5 pt-4 pb-4   bg-white  ">
                                                <h5 className="pb-1 titulos font-weight-normal">Informações Gerais</h5>
                                                <hr />
                                                <div className="my-4 font-weight-light">
                                                    <form className="my-4 font-weight-light col-xl-12 texto">
                                                        <div className="row ">
                                                            <div className="col-md-8">
                                                                <div className="row">
                                                                    <div className="col-xs-2  mr-sm-0 mb-2">
                                                                        <label>Título</label>
                                                                    </div>
                                                                    <div className="col ">






                                                                        <input value={this.state.nome}
                                                                            onChange={(e) => this.updatenome(e.target.value)} type="text" className="form-control form-control-sm" id="titulo"
                                                                            name="titulo" maxLength={55} />
                                                                    </div>

                                                                </div>
                                                                <ValidationMessage className="error" valid={this.state.nomeValid} message={this.state.errorMsg.nome} />

                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="row mb-2">
                                                                    <div className="col-xs-1">
                                                                        <label >Sigla</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <input value={this.state.sigla}
                                                                            onChange={(e) => this.updatesigla(e.target.value)} maxLength={5}
                                                                            type="text" className="form-control form-control-sm" id="Sigla"
                                                                            name="Sigla" />
                                                                    </div>
                                                                </div>
                                                                <ValidationMessage className="error" maxLength={5} valid={this.state.siglaValid} message={this.state.errorMsg.sigla} />

                                                            </div>
                                                        </div>


                                                        <div className="row ">
                                                            <div className="col-xl-6">
                                                                <div className="row mb-1">
                                                                    <div className="col-xs-1">
                                                                        <label >Data início</label>
                                                                    </div>
                                                                    <div className=" col">
                                                                        <input value={this.state.data_inicio}
                                                                            onChange={(e) => this.updatedata_inicio(e.target.value)}
                                                                            type="date" className="form-control form-control-sm mb-2" id="datainicio"
                                                                            name="datainicio" />
                                                                    </div>
                                                                    <ValidationMessage className="error" valid={this.state.data_inicioValid} message={this.state.errorMsg.data_inicio} />

                                                                </div>
                                                            </div>

                                                            <div className="col-xl-6">
                                                                <div className="row mb-1">
                                                                    <div className="col-xs-1">
                                                                        <label >Data fim</label>
                                                                    </div>
                                                                    <div className=" col">
                                                                        <input value={this.state.data_fim}
                                                                            onChange={(e) => this.updatedata_fim(e.target.value)}
                                                                            type="date" className="form-control form-control-sm mb-2" id="data_fim"
                                                                            name="data_fim" />
                                                                    </div>
                                                                    <ValidationMessage className="error" valid={this.state.data_fimValid} message={this.state.errorMsg.data_fim} />

                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div className="row">
                                                            <div className="col pl-0 pr-0">
                                                                <div className="form-group">
                                                                    <label className="pb-2" htmlFor="exampleFormControlTextarea1">Descrição do projeto</label>
                                                                    <textarea value={this.state.descricao}
                                                                        onChange={(e) => this.updatedescricao(e.target.value)} maxLength="255" className="form-control" id="exampleFormControlTextarea1"
                                                                        rows="3"></textarea>
                                                                </div>
                                                                <ValidationMessage className="error" valid={this.state.descricaoValid} message={this.state.errorMsg.descricao} />

                                                            </div>
                                                        </div>
                                                        <div className="col-md-2 pl-0">
                                                            <div
                                                                className="custom-control custom-switch justify-content-center">

                                                                {console.log(" ESTADO " + this.state.estado_projeto)}

                                                                {console.log(" ESTADO sem this " + data.estado_projeto)}

                                                                {(data.estado_projeto === 1 ?
                                                                    (<input value={this.state.checked = false} onChange={(value, e) => this.setState({ estado_projeto: 2, checked: false })}
                                                                        type="checkbox" className="custom-control-input" id={"customSwitch5" + index} />)

                                                                    :

                                                                    (<input value={this.state.checked = true}
                                                                        onChange={(value, e) => this.setState({ estado_projeto: 1, checked: false })}
                                                                        type="checkbox" className="custom-control-input" id={"customSwitch5" + index} />))}

                                                                <label className="custom-control-label " htmlFor={"customSwitch5" + index}> Ativo </label>

                                                            </div>
                                                        </div>
                                                        <div className="row justify-content-end ">
                                                            <div className=" col-lg-12 mt-3 mb-2  pr-0 text-right">
                                                                {/* <button type="button" className="btnoutlineverde ">Cancelar</button> */}

                                                                <button onClick={() => this.sendUpdate(data.id_projeto)}
                                                                    data-dismiss="modal"
                                                                    // vai buscar o outro modal
                                                                    data-toggle="modal"
                                                                    type="button " className="btnverdenormal" >Salvar</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer bg-white ">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FIM SEGUNDO MODAL */}

                </tr>
            )

        });
    }

    sendUpdate(id) {


        const url = HerokuURL + "/projeto/update/" + id
        // parametros de datos post

        const datapost = {

            nome: this.state.nome,
            sigla: this.state.sigla,
            data_inicio: this.state.data_inicio,
            data_fim: this.state.data_fim,
            nr_elementos: this.state.nr_elementos,
            estado_projeto: this.state.estado_projeto,

            descricao: this.state.descricao,


        }

        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {

                    alert(response.data.message)
                    this.Load_projetos();

                    // this.props.history.push("/DEVPe");
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Erro ao guardar os seus dados." + error)
            })
    }

    loadFillDataTecnicas() {

        return this.state.skills_utilizador_tecnicas.map((comp, index) => {
            return (

                <div>
                    {comp.skills_utilizadores_skills.map(function (skill) {
                        return (
                            <div>
                                <Chart
                                    // width={'300px'}
                                    // height={'300px'}
                                    // chartType="PieChart"
                                    // backgroundColor={'white'}
                                    // loader={<div>Loading Chart</div>}

                                    data={[
                                        ['Nome', 'Nível'],
                                        [skill.nome, skill.utilizador_skills.nivel],


                                    ]}

                                // options={{
                                //     pieHole: 0.4,
                                //     chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                //     colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                //     fontSize: "17",
                                //     fontName: "Helvetica",
                                //     legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                //     pieSliceText: "none",
                                //     tooltip: { isHtml: true },
                                //     backgroundColor: 'transparent',

                                // }}
                                // rootProps={{ 'data-testid': '3' }}

                                />
                            </div>



                        );
                    })
                    }
                </div>


            )
        })

    }
}


export default RHPesquisarProjetos;