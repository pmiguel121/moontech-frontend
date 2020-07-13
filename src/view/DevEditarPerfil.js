import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
const HerokuURL = "https://moontech-backend.herokuapp.com";
function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className='error' >{props.message}</div>
        )
    }
    return null;
}

class DevEditarPerfil extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},

            //campos

            estado: 0,
            tipo: 0,
            foto: "",
            viajar: false,
            horasextra: 0,
            reunircliente: 0,
            anos_experiencia: null,
            interesses: "",
            genero: null,
            utilizador: [],

            //validações
            nome: '', nomeValid: false,
            nr_contribuinte: '', nrContribuinteValid: false,
            email: '', emailValid: false,
            codigopostal: '', codigopostalValid: false,
            morada: '', moradaValid: false,
            formacao: '', formacaoValid: false,
            localidade: '', localidadeValid: false,
            telemovel: '', telemovelValid: false,
            datanascimento: '', datanascimentoValid: false,
            formValid: false,
            errorMsg: {},
        }

    }

    //VALIDAÇÕES

    validateForm = () => {
        //formacao: '', formacaoValid: false,
        const { nomeValid, nrContribuinteValid, emailValid, codigopostalValid, moradaValid, telemovelValid, formacaoValid, datanascimentoValid } = this.state;
        this.setState({
            formValid: nomeValid && nrContribuinteValid && emailValid && codigopostalValid && moradaValid && telemovelValid && formacaoValid && datanascimentoValid
        })
    }

    //validar o nome
    updateNome = (nome) => {
        this.setState({ nome }, this.validatenome)
    }

    validatenome = () => {
        const { nome } = this.state;

        let nomeValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (!/^[aA-zZ\u00C0-\u017F]+ [aA-zZ\u00C0-\u017F]\S+$/.test(nome)) {
            nomeValid = false;
            errorMsg.nome = 'Introduza o seu primeiro e último nome.'
        }
        this.setState({ nomeValid, errorMsg }, this.validateForm)
    }
    // FIM validar o nome

    //Validar Contribuinte
    updatecontribuiente = (nr_contribuinte) => {
        this.setState({ nr_contribuinte }, this.validateContribuinte)
    }

    validateContribuinte = () => {
        const { nr_contribuinte } = this.state;
        let nrContribuinteValid = true;
        let errorMsg = { ...this.state.erroMsg }

        if (!/^[0-9]\d{8}/.test(nr_contribuinte)) {
            nrContribuinteValid = false;
            errorMsg.nr_contribuinte = 'Insira o número de contribuinte.'

        }

        this.setState({ nrContribuinteValid, errorMsg }, this.validateForm)
    }
    // FIM Validar Contribuinte

    //Validar Nr Telemovel
    updatetelemovel = (telemovel) => {
        this.setState({ telemovel }, this.validatetelemovel)
    }

    validatetelemovel = () => {
        const { telemovel } = this.state;
        let telemovelValid = true;
        let errorMsg = { ...this.state.erroMsg }

        if (!/[0-9]{9}$/.test(telemovel)) {
            telemovelValid = false;
            errorMsg.telemovel = 'Introduza apenas números.'

        }
        this.setState({ telemovelValid, errorMsg }, this.validateForm)
    }
    //FIM Validar Nr Telemovel

    //Validar Email
    updateemail = (email) => {
        this.setState({ email }, this.validateemail)
    }

    validateemail = () => {
        const { email } = this.state;
        let emailValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailValid = false;
            errorMsg.email = 'exemplo@dominio.com'
        }
        this.setState({ emailValid, errorMsg }, this.validateForm)
    }
    //FIM Validar Email

    //Validar Morada
    updateMorada = (morada) => {
        this.setState({ morada }, this.validateMorada)
    }

    validateMorada = () => {
        const { morada } = this.state;
        let moradaValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (!/[0-9]$/.test(morada) && !/[aA-zZ]$/.test(morada)) {
            moradaValid = false;
            errorMsg.morada = 'Introduza a sua morada.'
        }
        this.setState({ moradaValid, errorMsg }, this.validateForm)
    }
    //FIM Validar Morada

    //Validar Localidade

    updateLocalidade = (localidade) => {
        this.setState({ localidade })
    }

    //validatelocalidade = () => {
    //const { localidade } = this.state;

    //let localidadeValid = true;
    //let errorMsg = { ...this.state.errorMsg }

    //if (localidade.option == "") {
    // localidadeValid = false;
    // errorMsg.localidade = 'Selecione uma localidade.'
    //}
    //this.setState({ localidadeValid, errorMsg }, this.validateForm)
    //}
    //FIM Validar Localidade

    //Validar codigo postal
    updatecodigopostal = (codigopostal) => {
        this.setState({ codigopostal }, this.validatecodigopostal)
    }

    validatecodigopostal = () => {
        const { codigopostal } = this.state;
        let codigopostalValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (!/^\d{4}-\d{3}?$/.test(codigopostal)) {
            codigopostalValid = false;
            errorMsg.codigopostal = 'Introduza apenas números ex: 1111-111'
        }

        this.setState({ codigopostalValid, errorMsg }, this.validateForm)
    }
    //FIM Validar codigo postal

    //Validar data de nascimento pattern: ([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))
    updatedatanascimento = (datanascimento) => {
        this.setState({ datanascimento }, this.validatedatanascimento)
    }

    validatedatanascimento = () => {
        const { datanascimento } = this.state;
        let datanascimentoValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(datanascimento)) {
            datanascimentoValid = false;
            errorMsg.datanascimento = 'Coloque ou digite uma data válida.'
        }

        this.setState({ datanascimentoValid, errorMsg }, this.validateForm)
    }
    //FIM Validar data de nascimento

    //Validar Formação
    updateformacao = (formacao) => {
        this.setState({ formacao }, this.validateformacao)
    }

    validateformacao = () => {
        const { formacao } = this.state;

        let formacaoValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (!/[aA-zZ\u00C0-\u017F\s]+$/.test(formacao)) {
            formacaoValid = false;
            errorMsg.formacao = 'Introduza a sua formação.'
        }
        this.setState({ formacaoValid, errorMsg }, this.validateForm)
    }
    //FIM Validar Formação

    //Validar interesses
    //updateinteresses = (interesses) => {
    //this.setState({ interesses }, this.validateinteresses)
    //}

    //validateinteresses = () => {
    //const { interesses } = this.state;

    //let interessesValid = true;
    //let errorMsg = { ...this.state.errorMsg }

    //if (interesses.length = " ") {
    //interessesValid = false;
    //errorMsg.interesses = 'Digite algo aqui...'
    //}
    //this.setState({ interessesValid, errorMsg }, this.validateForm)
    //}
    //FIM Validar interesses

    componentWillMount() {
        let id_utilizador = JSON.parse(localStorage.getItem('Utilizador')).nrUser

        const url = HerokuURL + "/utilizador/get/" + id_utilizador
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0]


                    this.setState({
                        data: data,

                        //foto: data.foto,
                        nome: data.nome,
                        nr_contribuinte: data.nr_contribuinte,
                        telemovel: data.telemovel,
                        email: data.email,
                        morada: data.morada,
                        localidade: data.localidade,
                        codigopostal: data.codigopostal,
                        datanascimento: data.datanascimento,
                        formacao: data.formacao,
                        horasextra: data.horasextra,
                        reunircliente: data.reunircliente,
                        viajar: data.viajar,
                        interesses: data.interesses,


                    })
                }
                else {
                    alert("Ocorreu um erro ao editar")
                }
            }).catch(error => {
                alert("Erro no servidor: " + error)
            })
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
                <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                    <div className="row no-gutters">
                        <div className="d-none d-xl-block  col-xl-2">
                            <nav id="sidebar">
                                <div className="sidebar-header">
                                    <div className="intro">
                                        <div className="text-center"><img src="imagens/bizdirectLOGO.png" alt=""
                                            className="img-fluid w-50 text-center" /></div>
                                        <Link to="/DEVPerfil"><div className="profile-img mb-xl-4 "><img className="profile-img maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /></div></Link>
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

                            <h3 className="ml-4 mt-5 titulos text-left"> Perfil</h3>

                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11     my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal text-left">Informações pessoais</h5>
                                    <hr />
                                    <form>
                                        <div className="row font-weight-light texto">

                                            <div className="col-md-2 justify-content-center">
                                                <div className="row" >
                                                    <div className="col-lg-12 col-xs-1">
                                                        <div className="file-field">
                                                            <img src={data.fotourl} className="  maxphotoperfil ml-4"
                                                                alt="Avatar" style={{ marginTop: "30px" }} />

                                                        </div>
                                                    </div>

                                                    <div className="col-lg-0 col-xs-2">

                                                    {/* <button className="btnamarelonormal font-weight-normal btn-sm mb-3"
                                                                htmlFor="my-file-selector">
                                                                <input type="file" value={this.state.foto} onChange={(value) =>
                                                                    this.setState({ foto: value.target.value })} className="d-none" />
                                              Alterar
                                          </button> */}

                                                    </div>

                                                    <div className="justify-content-center col-md-0 col-xs-0  mt-2 ml-5 pl-2  ">
                                                        <div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm pl-5">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="row mb-1">
                                                            <div className="col-xs-1 mr-4">
                                                                <label>Nome</label>
                                                            </div>
                                                            <div className="col">

                                                                <input className="form-control form-control-sm" type='text' maxLength="55" value={this.state.nome} onChange={(e) => this.updateNome(e.target.value)} />
                                                                < ValidationMessage className="error" valid={this.state.nomeValid} message={this.state.errorMsg.nome} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-xs-1">
                                                                <label>Número de Contribuinte</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control form-control-sm" maxLength="9" type='text' value={this.state.nr_contribuinte} onChange={(e) => this.updatecontribuiente(e.target.value)} />
                                                                < ValidationMessage className="error" valid={this.state.nrContribuinteValid} message={this.state.errorMsg.nr_contribuinte} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-xs-1">
                                                                <label>Telemóvel</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control form-control-sm" type='text' maxLength="9" value={this.state.telemovel} onChange={(e) => this.updatetelemovel(e.target.value)} />
                                                                < ValidationMessage className="error" valid={this.state.telemovelValid} message={this.state.errorMsg.telemovel} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-xs-1">
                                                                <label>Email</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control form-control-sm" maxLength="55" type='text' value={this.state.email} onChange={(e) => this.updateemail(e.target.value)} />
                                                                < ValidationMessage className="error" valid={this.state.emailValid} message={this.state.errorMsg.email} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-xs-2 mr-3">
                                                                <label>Morada</label>
                                                            </div>
                                                            <div className="col ">
                                                                <input className="form-control form-control-sm" maxLength="70" type='text' value={this.state.morada} onChange={(e) => this.updateMorada(e.target.value)} />
                                                                < ValidationMessage className="error" valid={this.state.moradaValid} message={this.state.errorMsg.morada} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 ">
                                                        <div className="row mb-1">
                                                            <div className="col-xs-1">
                                                                <label>localidade</label>
                                                            </div>
                                                            <div className="col">
                                                                <select className="form-control form-control-sm" id="sel1" onChange={(e) => this.updateLocalidade(e.target.value)}>
                                                                    < ValidationMessage className="error" valid={this.state.localidadeValid} message={this.state.errorMsg.localidade} />
                                                                    <option>{this.state.localidade}</option>
                                                                    <option >Viana do Castelo</option>
                                                                    <option >Vila Real</option>
                                                                    <option>Bragança</option>
                                                                    <option>Porto</option>
                                                                    <option >Aveiro</option>
                                                                    <option >Viseu</option>
                                                                    <option >Guarda</option>
                                                                    <option >Coimbra</option>
                                                                    <option >Castelo Branco</option>
                                                                    <option >Leiria</option>
                                                                    <option >Lisboa</option>
                                                                    <option >Santarém</option>
                                                                    <option >Portalegre</option>
                                                                    <option >Setúbal</option>
                                                                    <option >Évora</option>
                                                                    <option >Beja</option>
                                                                    <option>Faro</option>
                                                                    <option>Não aplicável</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-xs-2">
                                                                <label className="col-xs-1">Código Postal</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control form-control-sm" maxLength="8" type='text' value={this.state.codigopostal} onChange={(e) => this.updatecodigopostal(e.target.value)} />
                                                                < ValidationMessage className="error" valid={this.state.codigopostalValid} message={this.state.errorMsg.codigopostal} />
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="row mb-1">
                                                            <div className="col-xs-1 mr-2">
                                                                <label>Data de nascimento</label>
                                                            </div>

                                                            <div className="col">
                                                                <input className="form-control form-control-sm" type='date' value={this.state.datanascimento} onChange={(e) => this.updatedatanascimento(e.target.value)} />
                                                                < ValidationMessage className="error" valid={this.state.datanascimentoValid} message={this.state.errorMsg.datanascimento} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-xs-1">
                                                                <label>Formação</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control form-control-sm" maxLength="55" type='text' value={this.state.formacao} onChange={(e) => this.updateformacao(e.target.value)} />
                                                                < ValidationMessage className="error" valid={this.state.formacaoValid} message={this.state.errorMsg.formacao} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row  mt-2  ">
                                                    <div className="col-lg-12 ">
                                                        <div className="row ">
                                                            <div className="col-xs-3 mr-2">
                                                                <label className="semheight">Disponibilidade </label>
                                                            </div>
                                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                                <div className="custom-control custom-switch">
                                                                    {(this.state.viajar === true ?
                                                                        (<input value={this.state.viajar} onChange={(value) =>
                                                                            this.setState({ viajar: !this.state.viajar })} type="checkbox" checked className="custom-control-input" id="customSwitchviajar" />) : (<input value={this.state.viajar} onChange={(value) =>
                                                                                this.setState({ viajar: !this.state.viajar })} type="checkbox" className="custom-control-input" id="customSwitchviajar" />))}


                                                                    <label className="custom-control-label" htmlFor="customSwitchviajar">Para
                                                      Viajar</label>

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-12">
                                                                <div className="custom-control custom-switch">
                                                                    {(this.state.horasextra === true ?
                                                                        (<input value={this.state.horasextra} onChange={(value) =>
                                                                            this.setState({ horasextra: !this.state.horasextra })} type="checkbox" checked className="custom-control-input" id="customSwitchhoras" />) : (<input value={this.state.horasextra} onChange={(value) =>
                                                                                this.setState({ horasextra: !this.state.horasextra })} type="checkbox" className="custom-control-input" id="customSwitchhoras" />))}
                                                                    <label className="custom-control-label" htmlFor="customSwitchhoras">Horas
                                                      Extra</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-12">
                                                                <div className="custom-control custom-switch">

                                                                    {(this.state.reunircliente === true ?
                                                                        (<input value={this.state.reunircliente} onChange={(value) =>
                                                                            this.setState({ reunircliente: !this.state.reunircliente })} type="checkbox" checked className="custom-control-input" id="customSwitchcliente" />) : (<input value={this.state.reunircliente} onChange={(value) =>
                                                                                this.setState({ reunircliente: !this.state.reunircliente })} type="checkbox" className="custom-control-input" id="customSwitchcliente" />))}

                                                                    <label className="custom-control-label " htmlFor="customSwitchcliente">Para reunir
                                                                    com
                                                      cliente</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col pl-0">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleFormControlTextarea1">Interesses</label>
                                                            <textarea type="checkbox" maxLength="255" rows="3" value={this.state.interesses} onChange={(value) =>
                                                                this.setState({ interesses: value.target.value })} className="form-control">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end col-lg-12 mt-2 mb-2  pr-3 float-right">

                                            <Link to="/DEVPerfil" className="btnoutlinelaranja mr-2" type="button"  >Cancelar</Link>

                                            <button onClick={() => this.sendUpdate()} className='btnlaranjanormal' type='submit' to="/DEVPerfil" >Salvar</button>

                                        </div>
                                    </form>
                                </div>

                            </div>

                            <div className="row justify-content-center">
                                <div className="col-lg-7 col-12 col-sm-11    my-4 pr-5 pl-5 pt-4 pb-4 mr-lg-5  mr-sm-0 bg-white">
                                    <h5 className="pb-1 titulos font-weight-normal text-left">Avaliações</h5>
                                    <hr />
                                    <div className="my-4">
                                        <div className="row font-weight-light">

                                            <div className="col-lg-1 col-1 ">
                                                <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                            </div>
                                            <div className="col-lg-5 col-11 ">
                                                <div className="comentario  ml-4">"Excelente editor com grandes capacidades para entrar em
                                                futuros
                                  projetos."</div>
                                                <div className="comentario small ml-5"> Bruno Fernandes, Team Leader</div>
                                            </div>


                                            <div className="col-lg-1 col-1 ">
                                                <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                            </div>
                                            <div className="col-lg-5 col-11 ">
                                                <div className="comentario ml-4">Excelente editor com grandes capacidades para entrar em
                                                futuros
                                  projetos."</div>
                                                <div className="comentario small ml-5"> Bruno Fernandes, Team Leader</div>
                                            </div>
                                        </div>

                                        <div className="row font-weight-light mt-4">

                                            <div className="col-lg-1 col-1 ">
                                                <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                            </div>
                                            <div className="col-lg-5 col-11 ">
                                                <div className="comentario  ml-4">"Excelente editor com grandes capacidades para entrar em
                                                futuros
                                  projetos."</div>
                                                <div className="comentario small ml-5"> Bruno Fernandes, Team Leader</div>
                                            </div>


                                            <div className="col-lg-1 col-1 ">
                                                <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                            </div>
                                            <div className="col-lg-5 col-11 ">
                                                <div className="comentario ml-4">Excelente editor com grandes capacidades para entrar em
                                                futuros
                                  projetos."</div>
                                                <div className="comentario small ml-5"> Bruno Fernandes, Team Leader</div>
                                            </div>
                                        </div>






                                    </div>

                                </div>
                                <div className="col-lg-3 col-12 col-sm-11  my-4 pr-5 pl-5 pt-4 pb-4 ml-lg-5 ml-sm-0 bg-white ">

                                    <h5 className="pb-1 titulos font-weight-normal text-left">Recomendações</h5>
                                    <hr />

                                    <div className="row mt-2 text-left">
                                        <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <span className="my-4 font-weight-light text-left"> Photoshop</span>
                                        </div>
                                        <div className="col xl-12">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: "85%" }}></div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt-2 text-left">
                                        <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <span className="my-4 font-weight-light text-left"> Illustrator</span>
                                        </div>
                                        <div className="col xl-12">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">
                                                    <div className="progress-bar bg-warning" style={{ width: "85%" }}></div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt-2 text-left">
                                        <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <span className="my-4 font-weight-light text-left"> Premiere</span>
                                        </div>
                                        <div className="col xl-12">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">
                                                    <div className="progress-bar bg-info" style={{ width: "85%" }}></div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt-2 text-left">
                                        <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <span className="my-4 font-weight-light text-left"> AfterEffects</span>
                                        </div>
                                        <div className="col xl-12">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">
                                                    <div className="progress-bar bg-danger" style={{ width: "96%" }}></div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt-2 text-left">
                                        <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <span className="my-4 font-weight-light text-left"> HTML</span>
                                        </div>
                                        <div className="col xl-12">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: "75%" }}></div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt-2 text-left">
                                        <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <span className="my-4 font-weight-light text-left"> Illustrator</span>
                                        </div>
                                        <div className="col xl-12">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">
                                                    <div className="progress-bar bg-warning" style={{ width: "85%" }}></div>
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

    sendUpdate() {
        // get parameter id
        // url de backend
        if (this.state.nome === "") {
            alert("Insira o nome.");
        }
        else if (this.state.nr_contribuinte === "") {
            alert("Coloque o número de contribuinte.");
        }
        else if (this.state.telemovel === "") {
            alert("Coloque um número de telémovel.");
        }
        else if (this.state.email === "") {
            alert("Coloque um email.");
        }
        else if (this.state.morada === "") {
            alert("Coloque a sua morada.");
        }
        else if (this.state.localidade === "") {
            alert("Coloque a sua localidade.");
        }
        else if (this.state.codigopostal === "") {
            alert("Insira o Código Postal.");
        }
        else if (this.state.datanascimento === "") {
            alert("Insira a sua data de nascimento.");
        }
        else if (this.state.formacao === "") {
            alert("Insira a sua formação.");
        }
        else if (this.state.interesses === "") {
            alert("Preencha o campo de interesses.");
        }
        else {
            let id_utilizador = JSON.parse(localStorage.getItem('Utilizador')).nrUser;
            const url = HerokuURL + "/utilizador/update/" + id_utilizador
            // parametros de datos post

            const datapost = {

                //foto: this.state.foto,
                nome: this.state.nome,
                nr_contribuinte: this.state.nr_contribuinte,
                telemovel: this.state.telemovel,
                email: this.state.email,
                morada: this.state.morada,
                localidade: this.state.localidade,
                codigopostal: this.state.codigopostal,
                datanascimento: this.state.datanascimento,
                formacao: this.state.formacao,
                horasextra: this.state.horasextra,
                reunircliente: this.state.reunircliente,
                viajar: this.state.viajar,
                interesses: this.state.interesses,
            }

            axios.put(url, datapost)

                .then(response => {
                    console.log(response)

                    if (response.data.success === true) {


                        // alert(response.data.message)


                    }
                    else {


                    }
                }).catch(error => {
                    alert("Erro ao guardar os seus dados." + error)
                })

            this.props.history.push("/DEVPerfil");
            window.location.reload();
        }

    }
}
export default DevEditarPerfil;
