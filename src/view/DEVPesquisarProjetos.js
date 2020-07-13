import React from 'react';
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";
import axios from 'axios';

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

class DEVPesquisarProjetos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            projeto: [],
            utilizador: [],

            //chips
            inputTagValue: '',
            inputTagValue1: '',

            //campos
            nome: "",
            sigla: "",
            data_inicio: "2020-01-24",
            data_fim: "2020-12-28",
            nr_elementos: null,
            disponibilidade: false,
            hora_extra: false,
            reunircliente: false,
            estado_projeto: null,
            descricao: "",
            id:"",

            GraficoTecnicas: [],
            GraficoHumanas: [],
    
            term: '',
        };
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
        this.setState({ term: event.target.value })
    }

    componentDidMount() {
        this.Load_pesquisarprojetos();
        this.Load_foto();
        this.Load_graficosHumanos()
        this.Load_graficosTecnicos()
    }


    Load_pesquisarprojetos() {

        const url = HerokuURL + "/projeto/list2";

       
        axios.get(url).then(res => {

            if (res.data.success) {
                const data = res.data.data;
                this.setState({ projeto: data });



            } else {
                alert("Erro no Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
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
    render() {
        const { term } = this.state;
       
        return this.state.utilizador.map((data, index) => {
            return (
            <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                <div>
                    <div className="row no-gutters">

                        <div className="d-none d-xl-block  col-xl-2">
                            <nav id="sidebar">
                                <div className="sidebar-header">
                                    <div className="intro">
                                        <div className="text-center"><img src="imagens/bizdirectLOGO.png" alt=""
                                            className="img-fluid w-50 text-center" /></div>
                                           <Link to="/DEVPerfil"><div className="profile-img mb-xl-4 "> <img className="profile-img maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /> </div></Link>
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
                                        <Link to="/DEVCompetenciasEditar" className="p-3"><img src="imagens/competencias.svg" width="24px" alt="" /><span
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
                                        <Link to="/DEVCompetenciasEditar" className="dropdown-item" ><img className="pr-1" src="imagens/competencias.svg" width="24px"
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
                            <h3 className="ml-4 mt-5  titulos text-left" > Projetos</h3>
                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal text-left">Pesquisar Projetos</h5>
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

                                    <table className="table table-striped mt-3 font-weight-light texto mb-2" id="myTable">
                                        <thead>

                                            <tr>
                                                <th scope="col">Sigla</th>
                                                <th scope="col" >Título</th>
                                                <th scope="col">Líder</th>

                                                <th className="d-none d-lg-table-cell" scope="col" >Equipa do Projeto</th>
                                                <th className="d-none d-lg-table-cell" scope="col" >Ativo</th>


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
            </div>
            );
        });
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


        return this.state.projeto.filter(searchingFor(this.state.term)).map((data, index, index1, index2, index3, index4) => {

            return (

                <tr >
                <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index} >{data.sigla}</td>
                <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index1}>   {data.nome}</td>

                <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index2} >
                    {data.nome_lider.map(function (nome_lider) {
                        return (
                            <div>
                                {nome_lider.nome}
                            </div>
                        );
                    })}
                </td>

                <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index3} className="d-none d-lg-table-cell">
                    {data.fotos_equipa.map(function (fotos_equipa) {
                        return (

                            <img className="maxphotoperfilpequenacomequipa" src={fotos_equipa.fotourl} alt="Foto de Perfil do utilizador" ></img>

                        );
                    })}
                </td>
                <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index4} className="d-none d-lg-table-cell">

                    {(data.estado_projeto === 2 ? (<img src="imagens/ativo.png" alt="estado do projeto" />) : <img src="imagens/desativo.png" alt="estado do projeto" />)}

                </td>

                {/* PRIMEIRO MODAL */}
                <div className="modal fade mt-1" id={'exampleModalCenterabrir' + index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content1">
                            <div className="modal-header bg-white ">
                                <h5 className="modal-title" id="exampleModalLabel">Projeto #67J21</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pre-scrollable1">
                                <div className="container-fluid">

                                    <div className="row justify-content-md-center">

                                        <div className="col-lg-11 col-md-11  my-4 pr-5 pl-5 pt-4 pb-4   bg-white  ">
                                            <h5 className="pb-1 titulos font-weight-normal text-left">Informações Gerais</h5>

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
                                                                {data.nome_lider.map(function (nome_lider) {
                                                                    return (
                                                                        <div className="col ">

                                                                            <label> {nome_lider.nome}</label>
                                                                        </div>
                                                                    );
                                                                })}
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
                                                                    <label> {data.sigla}</label>
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
                                                                <div className="col">
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

                                                            <label className="semheight" >Disponibilidade</label>



                                                        </div>

                                                        <div className="col-xl-12  pr-0 pl-0">
                                                            <div className="custom-control custom-switch">


                                                                {(data.disponibilidade === 1 ?
                                                                    (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}

                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customSwitch1"
                                                                >
                                                                    Para Viajar
</label>
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
                                                                    Para reunir com cliente
                </label>
                                                            </div>



                                                        </div>
                                                        <div className="col-xl-12  col-md-3 pl-0 pr-0 ">
                                                            <div className="custom-control custom-switch">
                                                                {(data.estado_projeto === 2 ?
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
                                                    <div className="row ">
                                                        <div className=" col-lg-12 mt-2 mb-2  pr-3 text-right">

                                                            {/* <button type="button" className="btnverdenormal" data-toggle="modal" data-target={"#exampleModalCenterabrir1"} data-dismiss="modal" onClick={this.loadFillData1()} >Editar</button> */}
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

                {/* PRIMEIRO MODAL */}
            </tr>

            )
        });
    }

}

export default DEVPesquisarProjetos;