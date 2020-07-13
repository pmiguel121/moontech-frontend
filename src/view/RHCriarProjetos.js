import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
//import Chip from '@material-ui/core/Chip';

const HerokuURL = "https://moontech-backend.herokuapp.com";

function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className='error'>{props.message}</div>
        )
    }
    return null;
}
//FIM VALIDAÇÃO


var Chart = require("react-google-charts").Chart;

class RHCriarProjetos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sel1: 0,

            projeto: [],
            Lideres: [],

            //chips
            inputTagValue: '',
            inputTagValue1: '',


            utilizador: [],

            //validações
            nome: '', nomeValid: false,
            sigla: '', siglaValid: false,
            descricao: '', descricaoValid: false,
            elementos: 0, elementosValid: false,
            formValid: false,
            errorMsg: {},

            // sel1:0,

            //campos

            data_inicio: "2020-10-10", data_inicioValid: false,
            data_fim: "2020-10-10", data_fimValid: false,
            nr_elementos: "null",
            disponibilidade: false,
            hora_extra: false,
            reunircliente: false,
            estado_projeto: null,
            id_teamleader: 0,

            GraficoTecnicas: [],
            GraficoHumanas: [],
        };

        this.tags = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleInsertTag = this.handleInsertTag.bind(this);

    }


    componentDidMount() {

        this.Load_criarprojetos();
        this.Load_NomeLideres()
        this.Load_foto()
        this.Load_graficosHumanos()
        this.Load_graficosTecnicos()
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
    Load_criarprojetos() {
        const url = HerokuURL + "/projeto/projetosrecentes";
        axios.get(url).then(res => {

            if (res.data.success) {
                const data = res.data.data;
                this.setState({ projeto: data });



            } else {
                alert("Erro ao criar projeto!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }


    Load_NomeLideres() {
        const url = HerokuURL + "/utilizador/BuscaNomeLideres";
        axios.get(url).then(res => {

            if (res.data.success) {
                const data = res.data.data;
                this.setState({ Lideres: data });



            } else {
                alert("Erro no TL!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }


    handleChange(event) {
        this.setState({ inputTagValue: event.target.value });

    }

    handleDelete(index) {
        delete this.tags[index];
        this.forceUpdate();

    };

    handleInsertTag(index) {
        this.tags.push(this.state.inputTagValue);
        this.setState({ inputTagValue: '' });

    };

    updateInputValue(evt) {
        this.setState({ inputValue: evt.target.value });
    }

    //VALIDAÇÕES 

    validateForm = () => {
        const { nomeValid, siglaValid, data_inicioValid, data_fimValid, descricaoValid } = this.state;
        this.setState({
            formValid: nomeValid && siglaValid &&
                data_inicioValid &&
                data_fimValid &&
                descricaoValid
        })
    }


    // nome
    updateNome = (nome) => {
        this.setState({ nome }, this.validatenome)
    }


    validatenome = () => {
        const { nome } = this.state;
        let nomeValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (nome.length < 3) {
            nomeValid = false;
            errorMsg.nome = 'Introduza o nome do projeto com pelo menos 3 caracteres'
        }

        this.setState({ nomeValid, errorMsg }, this.validateForm)
    }

    // sigla
    updateSigla = (sigla) => {
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

    // nr elementos
    updateelementos = (nr_elementos) => {
        this.setState({ nr_elementos }, this.validateelementos)
    }


    validateelementos = () => {
        const { nr_elementos } = this.state;
        let elementosValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (nr_elementos === null) {
            elementosValid = false;
            errorMsg.nr_elementos = 'Preencha este campo'
        }

        this.setState({ elementosValid, errorMsg }, this.validateForm)
    }


    //Validar data de inicio pattern: ([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))
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
    //FIM Validar data inicio

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

    //FIM VALIDAÇÕES

    render() {



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
                                    <li >
                                        <a href="#pageSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false">
                                            {" "} <img src="imagens/developer.svg" width="24px" alt="" /><span className="pl-3">Developers</span></a>

                                        <ul className="collapse list-unstyled" id="pageSubmenu">
                                            <li > <Link to="/RHAdicionarDev" >Adicionar Developer</Link></li>
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
                            <h3 className="ml-4  titulos" > Projetos</h3>
                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11   my-4 pr-5  col-sm-11 pl-5 pt-4  pb-4 bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal">Criar Projeto</h5>

                                    <hr />

                                    <form className="my-4 font-weight-light col-xl-12 texto" >
                                        <div className="row ">
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <div className="col-xs-2  mr-sm-0 mb-2">
                                                        <label>Título</label>
                                                    </div>
                                                    <div className="col ">



                                                        <input className="form-control form-control-sm" type='text' name='nome' id='nome' value={this.state.nome} onChange={(e) => this.updateNome(e.target.value)} />
                                                        < ValidationMessage className="error" valid={this.state.nomeValid} message={this.state.errorMsg.nome} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row mb-2">
                                                    <div className="col-xs-1">
                                                        <label >Sigla</label>
                                                    </div>
                                                    <div className="col">

                                                        <input className="form-control form-control-sm" maxLength="5" type='text' name='sigla' id='sigla' value={this.state.sigla} onChange={(e) => this.updateSigla(e.target.value)} />

                                                        < ValidationMessage className="error" valid={this.state.siglaValid} message={this.state.errorMsg.sigla} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-xl-8">
                                                <div className="row mb-2">
                                                    <div className="col-xs-1">
                                                        <label >Líder da Equipa</label>
                                                    </div>
                                                    <div className="col">

                                                        <select type="" value={this.state.id_teamleader} onChange={(value) => this.setState({ id_teamleader: value.target.value })} className="form-control form-control-sm">

                                                            <option value="0"> Selecione um líder...</option>

                                                            {
                                                                this.state.Lideres.map((data, index) => (

                                                                    <option key={index} value={data.id_utilizador}>  {data.nome} </option>
                                                                ))}

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4">
                                                <div className="row mb-2">
                                                    <div className="col-xs-3">
                                                        <label >Número de elementos</label>
                                                    </div>
                                                    <div className="col">


                                                        <select value={this.state.nr_elementos} required onChange={(e) => this.updateelementos(e.target.value)} className="form-control form-control-sm required" id="sel1">

                                                            {/* <option value="1" disabled="disabled">Escolha o número de elementos</option>  */}
                                                            <option value="1" ></option>

                                                            <option value="2" >2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>


                                                        </select>

                                                        < ValidationMessage className="error" message={this.state.errorMsg.nr_elementos} />




                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="row ">

                                            <div className="col-xl-6">
                                                <div className="row mb-1">
                                                    <div className="col-xs-1">
                                                        <label >Data início</label>
                                                    </div>
                                                    <div className=" col">
                                                        <input value={this.state.data_inicio} onChange={(e) => this.updatedata_inicio(e.target.value)} type="date" className="form-control form-control-sm mb-2" id="datainicio"
                                                            name="datainicio" />
                                                        < ValidationMessage className="error" valid={this.state.data_inicioValid} message={this.state.errorMsg.data_inicio} />

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-6">
                                                <div className="row mb-1">
                                                    <div className="col-xs-1">
                                                        <label >Data fim</label>
                                                    </div>
                                                    <div className=" col">
                                                        <input value={this.state.data_fim} onChange={(e) => this.updatedata_fim(e.target.value)} type="date" className="form-control form-control-sm mb-2" id="datafim"
                                                            name="datafim" />
                                                        < ValidationMessage className="error" valid={this.state.data_fimValid} message={this.state.errorMsg.data_fim} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="row mb-2 ">
                                            <div className="col-md-12">
                                                <div className="row ">
                                                    <div className="col-xs-3 mr-3 mb-1">

                                                        <label className="semheight" >Disponibilidade </label>

                                                    </div>

                                                    <div className="col-xl-12  pr-0 pl-0">
                                                        <div className="custom-control custom-switch ">
                                                            <input value={this.state.disponibilidade} onChange={(value) => this.setState({ disponibilidade: !this.state.disponibilidade })} type="checkbox" className="custom-control-input  " id="customSwitch1" />
                                                            <label className=" custom-control-label " htmlFor="customSwitch1">Viajar
                                                {/* <input className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa */}
                                                            </label>
                                                        </div>


                                                    </div>
                                                    <div className="col-xl-12  pl-0">
                                                        <div className="custom-control custom-switch">
                                                            <input value={this.state.hora_extra} onChange={(value) => this.setState({ hora_extra: !this.state.hora_extra })} type="checkbox" className="custom-control-input  " id="customSwitch2" />
                                                            <label className=" custom-control-label  " htmlFor="customSwitch2">Horas extra
                                                {/* <input className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa */}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12  col-md-3 pl-0 pr-0 ">


                                                        <div className="custom-control custom-switch">
                                                            <input value={this.state.reunircliente} onChange={(value) => this.setState({ reunircliente: !this.state.reunircliente })} type="checkbox" className="custom-control-input  " id="customSwitch3" />
                                                            <label className=" custom-control-label  " htmlFor="customSwitch3">Cliente
                                                {/* <input className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa */}
                                                            </label>
                                                        </div>



                                                    </div>


                                                </div>
                                            </div>

                                        </div>


                                        <div className="row">
                                            <div className="col pl-0 pr-0">
                                                <div className="form-group">
                                                    <label className="pb-2" htmlFor="exampleFormControlTextarea1">Descrição do projeto</label>
                                                    <textarea defaultValue={this.state.descricao} onChange={(e) => this.updatedescricao(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                                                    <ValidationMessage className="error" valid={this.state.descricaoValid} message={this.state.errorMsg.descricao} />


                                                </div>
                                            </div>

                                        </div>
                                        <div className="row ">

                                            <div className="col-lg-12 mt-3 mb-2  pr-0 text-right">

                                                <button type="reset" className="btnoutlineverde ">Limpar</button>




                                                <button
                                                    onClick={() => this.sendSave()} className='btnverde' disabled={!this.state.formValid}>Criar</button>










                                            </div>
                                        </div>
                                    </form>

                                </div>

                            </div>



                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11  my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal">Projetos criados recentemente</h5>

                                    <table className="table table-striped mt-3 font-weight-light texto mb-2 ">
                                        <thead>

                                            <tr>
                                                <th scope="col">Sigla</th>
                                                <th scope="col " >Título</th>
                                                <th scope="col " >Líder</th>

                                                <th className="d-none  d-lg-table-cell" scope="col" >Equipa do Projeto</th>
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




        // enquanto houver, preenche

        return this.state.projeto.map((data, index, index1, index2, index3, index4) => {
            // {alert("yoyoyoy")};
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

                                <img className="maxphotoperfilpequenacomequipa" alt="" src={fotos_equipa.fotourl} ></img>

                            );
                        })}
                    </td>
                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index4} className="d-none d-lg-table-cell">

                        {(data.estado_projeto === 2 ? (<img src="imagens/ativo.png" alt="Ícone com o significado de ativo" />) : <img src="imagens/desativo.png" alt="Ícone com o significado de inativo" />)}

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

    loadFillData1() {
        return this.state.projeto.map((data, cucu) => {
            return (

                <div className="modal fade mt-1" id={'exampleModalCenterabrir1' + cucu} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
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
                                                                    <input value={this.state.nome} onChange={(value) => this.setState({ nome: value.target.value })} type="text" className="form-control form-control-sm" id="titulo"
                                                                        name="titulo" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="row mb-2">
                                                                <div className="col-xs-1">
                                                                    <label >Sigla</label>
                                                                </div>
                                                                <div className="col">
                                                                    <input value={this.state.sigla} onChange={(value) => this.setState({ sigla: value.target.value })} type="text" className="form-control form-control-sm" id="Sigla"
                                                                        name="Sigla" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row ">
                                                        <div className="col-xl-8">
                                                            <div className="row mb-2">
                                                                <div className="col-xs-1">
                                                                    <label >Líder da Equipa</label>
                                                                </div>
                                                                <div className="col">
                                                                    <select id="Liderequipa" className="form-control form-control-sm">
                                                                        <option value="Nome">Escolha o nome...</option>
                                                                        <option value="Nome1">Tiago Almeida Nome Nome Nome</option>
                                                                        <option value="Nome2">Rodrigo Santos</option>
                                                                        <option value="Nome3">Gonçalo Reis</option>
                                                                        <option value="Nome4">Joana Silva</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4">
                                                            <div className="row mb-2">
                                                                <div className="col-xs-3">
                                                                    <label >Número de elementos</label>
                                                                </div>
                                                                <div className="col">
                                                                    <input value={this.state.nr_elementos} onChange={(value) => this.setState({ nr_elementos: value.target.value })} type="number" className="form-control form-control-sm"
                                                                        name="number" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row ">
                                                        <div className="col-xl-6">
                                                            <div className="row mb-1">
                                                                <div className="col-xs-1">
                                                                    <label >Data início</label>
                                                                </div>
                                                                <div className=" col">
                                                                    <input value={this.state.data_inicio} onChange={(value) => this.setState({ data_inicio: value.target.value })} type="date" className="form-control form-control-sm mb-2" id="datainicio"
                                                                        name="datainicio" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-xl-6">
                                                            <div className="row mb-1">
                                                                <div className="col-xs-1">
                                                                    <label >Data início</label>
                                                                </div>
                                                                <div className=" col">
                                                                    <input value={this.state.data_fim} onChange={(value) => this.setState({ data_fim: value.target.value })} type="date" className="form-control form-control-sm mb-2" id="datainicio"
                                                                        name="datainicio" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-2 ">
                                                        <div className="col-md-12">
                                                            <div className="row ">
                                                                <div className="col-xs-3 mr-3 mb-1">
                                                                    <label className="semheight" >Disponibilidade </label>
                                                                </div>

                                                                <div className="col-xl-12  pr-0 pl-0">
                                                                    <div className="custom-control custom-switch ">
                                                                        <input value={this.state.disponibilidade} onChange={(value) => this.setState({ disponibilidade: !this.state.reunircliente })} type="checkbox" className="custom-control-input  " id="customSwitch1" />
                                                                        <label className=" custom-control-label " htmlFor="customSwitch1">Viajar
                        {/* <input className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa */}
                                                                        </label>
                                                                    </div>


                                                                </div>
                                                                <div className="col-xl-12  pl-0">
                                                                    <div className="custom-control custom-switch">
                                                                        <input value={this.state.hora_extra} onChange={(value) => this.setState({ hora_extra: !this.state.hora_extra })} type="checkbox" className="custom-control-input  " id="customSwitch2" />
                                                                        <label className=" custom-control-label  " htmlFor="customSwitch2">Horas extra
                        {/* <input className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa */}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-12  col-md-3 pl-0 pr-0 ">
                                                                    <div className="custom-control custom-switch">
                                                                        <input value={this.state.reunircliente} onChange={(value) => this.setState({ reunircliente: !this.state.reunircliente })} type="checkbox" className="custom-control-input  " id="customSwitch3" />
                                                                        <label className=" custom-control-label  " htmlFor="customSwitch3">Cliente
                        {/* <input className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa */}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-12  col-md-3 pl-0 pr-0 ">
                                                                    <div className="custom-control custom-switch">
                                                                        <input value={this.state.estado_projeto} onChange={(value) => this.setState({ estado_projeto: !this.state.estado_projeto })} type="checkbox" className="custom-control-input  " id="customSwitch3" />
                                                                        <label className=" custom-control-label  " htmlFor="customSwitch3">Ativo
                        {/* <input className=" ml-2 alturacheck" type="checkbox" value="" />  */}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col pl-0 pr-0">
                                                            <div className="form-group">
                                                                <label className="pb-2" htmlFor="exampleFormControlTextarea1">Descrição do projeto</label>
                                                                <textarea className="form-control" id="exampleFormControlTextarea1"
                                                                    rows="3"></textarea>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-end ">
                                                        <div className=" col-lg-12 mt-3 mb-2  pr-0 text-right">
                                                            <button type="button" className="btnoutlineverde ">Cancelar</button>
                                                            <button type="button " className="btnverdenormal">Salvar</button>
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


                                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                    <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>
                                                        <h4 className="profile-usertitle-job ">Líder</h4>
                                                    </div>
                                                </div>

                                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                    <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                    </div>
                                                </div>

                                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                    <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                    </div>
                                                </div>

                                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                    <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                    </div>
                                                </div>

                                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                    <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                    </div>
                                                </div>

                                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                    <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                    </div>
                                                </div>

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

                                                        data={[
                                                            ['Task', 'Hours per Day'],
                                                            ['Html', 10],
                                                            ['Photoshop', 8],
                                                            ['ReactJS', 7],
                                                            ['Illustrator', 11],
                                                            ['NodeJS', 9],
                                                        ]}

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

                                                        data={[
                                                            ['Task', 'Hours per Day'],
                                                            ['Cooperação', 11],
                                                            ['Ética', 4],
                                                            ['Organização', 8],
                                                            ['Trabalho em Equipa', 8],

                                                            ['Criatividade', 9]
                                                        ]}

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

            )
        });
    }


    sendSave() {

        const Url = HerokuURL + "/projeto/create"

        const datapost = {


            nome: this.state.nome,
            sigla: this.state.sigla,
            data_inicio: this.state.data_inicio,
            data_fim: this.state.data_fim,
            nr_elementos: this.state.nr_elementos,
            disponibilidade: this.state.disponibilidade,
            hora_extra: this.state.hora_extra,
            reunircliente: this.state.reunircliente,
            descricao: this.state.descricao,
            id_teamleader: this.state.id_teamleader,
            elementos: this.state.elementos,
            estado_projeto: this.state.estado_projeto,

        }

        {
            this.state.id_teamleader === 0 ?
                alert("Escolha um líder")
                : axios.post(Url, datapost)
                    .then(response => {
                        if (response.data.success === true) {

                            alert(response.data.message)
                            // this.props.history.push("/listarfilme");

                            this.Load_criarprojetos();
                        }

                        else {
                            alert(response.data.message)

                        }
                    }).catch(error => {
                        alert("Erroo!" + error)

                    })
        }






    }
}


export default RHCriarProjetos;