import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from 'axios';
import authHeader from './auth-header';

//IMPORT CHIPS
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



function searchingFor(term) {
    return function (x) {
        return x.nome.toLowerCase().includes(term.toLowerCase()) ||
            x.id_utilizador.toString().includes(term.toLowerCase()) ||

            !term;

    }
}

class RHPesquisarDev extends React.Component {

    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
        suggestions1: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: [],
        suggestions1: []
    };


    constructor(props) {
        super(props);
        this.state = {
            utilizador: [],
            skills_utilizador_tecnicas: [],
            skills_utilizador_humanas: [],
            term: '',

            //chips
            inputTagValue: '',
            inputTagValue1: '',
            activeSuggestion: 0,
            activeSuggestion1: 0,
            filteredSuggestions: [],
            filteredSuggestions1: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            showSuggestions1: false,


            //validações
            formValid: false,
            errorMsg: {},

            //campos
            nome: "", nomeValid: false,
            email: "", emailValid: false,
            estado: 0,
            tipo: 0,
            morada: "", moradaValid: false,
            codigopostal: 0, codigopostalValid: false,
            telemovel: "", telemovelValid: false,
            fotourl: "",
            datanascimento: "1999-10-10",
            viajar: false,
            horasextra: 0,
            reunircliente: 0,
            anos_experiencia: "",
            interesses: "", interessesValid: false,
            nr_contribuinte: "", nr_contribuinteValid: false,
            formacao: "",
            localidade: "",
            genero: "",

            SkillsTec: [],
            SkillsHum: [],

            utilizador1: [],
            valorescompetencia: [],
            valorescompetencia1: [],


        }
        this.searchHandler = this.searchHandler.bind(this);
        this.tagsTec = [];
        this.tagsHum = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleInsertTag = this.handleInsertTag.bind(this);
        this.handleInsertTag1 = this.handleInsertTag1.bind(this);


        this.handleChange1 = this.handleChange1.bind(this);
        this.handleInsertTag1 = this.handleInsertTag1.bind(this);
        // this.tags = [];
        // this.tags1 = [];


    }

    handleChange(event) {
        this.setState({ inputTagValue: event.target.value });
    }
    handleChange1(event) {
        this.setState({ inputTagValue1: event.target.value });
    }
    handleDelete(index) {
        delete this.tagsTec[index];
        this.forceUpdate();
    };
    handleDelete1(index1) {
        delete this.tagsHum[index1];
        this.forceUpdate();
    };
    handleInsertTag(index) {
        this.tagsTec.push(this.state.inputTagValue);
        this.setState({ inputTagValue: '' });
    };
    handleInsertTag1(index1) {
        this.tagsHum.push(this.state.inputTagValue1);
        this.setState({ inputTagValue1: '' });
    };
    updateInputValue(evt) {
        this.setState({ inputValue: evt.target.value });
    }
    updateInputValue1(evt) {
        this.setState({ inputValue1: evt.target.value1 });
    }
    carregadatadaschipstecnicas() {

        const { suggestions } = this.props;
        return this.state.SkillsTec.map((data, index) => {
            suggestions.push(data.nome)
        })
    }
    carregadatadaschipsHumanas() {

        const { suggestions1 } = this.props;
        return this.state.SkillsHum.map((data, index) => {
            suggestions1.push(data.nome)
        })
    }
    searchHandler(event) {
        this.setState({ term: event.target.value })
    }


    componentDidMount() {
        this.Load_devs()
        this.Load_skillshumanas()
        this.Load_skillsTecnicas()
        this.Load_skills_utilizador_Tecnicas()
        this.Load_skills_utilizador_Humanas()
        this.carregadatadaschipstecnicas()
        this.carregadatadaschipsHumanas()
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
                    this.setState({ utilizador1: data });

                } else {
                    alert("Erro no Servidor Web!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }


    Load_skills_utilizador_Tecnicas() {
        let id_utilizador = 1;
        const url = HerokuURL + "/utilizador/BuscaSkillsEspcTecnicas/" + id_utilizador
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ skills_utilizador_tecnicas: data });


            } else {
                alert("Erro do Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }

    Load_skills_utilizador_Humanas() {
        let id_utilizador = 1;
        const url = HerokuURL + "/utilizador/BuscaSkillsEspcHumanas/" + id_utilizador
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ skills_utilizador_humanas: data });


            } else {
                alert("Erro do Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }

    Load_skillshumanas() {
        const url = HerokuURL + "/skill/listskilltipoHumanas";
        axios.get(url).then(res => {

            if (res.data.success) {
                const data = res.data.data;
                this.setState({ SkillsHum: data });



            } else {
                alert("Erro no servidor web!");
            }
            this.carregadatadaschipsHumanas()
        })
            .catch(error => {
                alert(error)
            });
    }
    Load_skillsTecnicas() {
        const url = HerokuURL + "/skill/listskilltipoTecnicas";
        axios.get(url)

            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;

                    this.setState({ SkillsTec: data });


                } else {


                    alert("Erro no servidor web!");
                }

                this.carregadatadaschipstecnicas()
            })
            .catch(error => {
                alert(error)
            });
    }

    Load_devs() {
        const url = HerokuURL + "/utilizador/list";
        axios.get(url, { headers: authHeader() }).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ utilizador: data });


            } else {
                alert("Erro do Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }


    //VALIDAÇÕES 

    validateForm = () => {
        const { nomeValid, emailValid, nr_contribuinteValid, codigopostalValid, formacaoValid, telemovelValid, moradaValid, interessesValid } = this.state;
        this.setState({
            formValid: nomeValid && emailValid
                && codigopostalValid
                && nr_contribuinteValid
                && formacaoValid
                && moradaValid
                && telemovelValid
                && interessesValid

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

        if (!/^[aA-zZ\u00C0-\u017F]+ [aA-zZ\u00C0-\u017F]\S+$/.test(nome)) {
            nomeValid = false;
            errorMsg.nome = 'Introduza o seu primeiro e último nome'
        }



        this.setState({ nomeValid, errorMsg }, this.validateForm)
    }
    // ^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$

    // email
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


    // nr_contribuinte
    updatenr_contribuinte = (nr_contribuinte) => {
        this.setState({ nr_contribuinte }, this.validatenr_contribuinte)
    }

    validatenr_contribuinte = () => {
        const { nr_contribuinte } = this.state;
        let nr_contribuinteValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (!/[0-9]{9,9}$/.test(nr_contribuinte)) {
            nr_contribuinteValid = false;
            errorMsg.nr_contribuinte = 'Insira o número de contribuinte'
        }

        this.setState({ nr_contribuinteValid, errorMsg }, this.validateForm)
    }


    // telemovel
    updatetelemovel = (telemovel) => {
        this.setState({ telemovel }, this.validatetelemovel)
    }

    validatetelemovel = () => {
        const { telemovel } = this.state;
        let telemovelValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (!/[0-9]$/.test(telemovel)) {
            telemovelValid = false;
            errorMsg.telemovel = 'Introduza apenas números'
        }

        this.setState({ telemovelValid, errorMsg }, this.validateForm)
    }


    // codigo postal
    updatecodigopostal = (codigopostal) => {
        this.setState({ codigopostal }, this.validatecodigopostal)
    }

    validatecodigopostal = () => {
        const { codigopostal } = this.state;
        let codigopostalValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (!/[0-9]{4}[-]?[0-9]{3}/.test(codigopostal)) {
            codigopostalValid = false;
            errorMsg.codigopostal = 'Introduza apenas números ex: 1111-111'
        }

        this.setState({ codigopostalValid, errorMsg }, this.validateForm)
    }

    // morada
    updatemorada = (morada) => {
        this.setState({ morada }, this.validatemorada)
    }


    validatemorada = () => {
        const { morada } = this.state;
        let moradaValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (morada.length < 3) {
            moradaValid = false;
            errorMsg.morada = 'Introduza a sua morada'
        }

        this.setState({ moradaValid, errorMsg }, this.validateForm)
    }


    // formacao
    updateformacao = (formacao) => {
        this.setState({ formacao }, this.validateformacao)
    }


    validateformacao = () => {
        const { formacao } = this.state;
        let formacaoValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (formacao.length < 3) {
            formacaoValid = false;
            errorMsg.formacao = 'Introduza a sua formação'
        }

        this.setState({ formacaoValid, errorMsg }, this.validateForm)
    }

    // interesses
    updateinteresses = (interesses) => {
        this.setState({ interesses }, this.validateinteresses)
    }

    validateinteresses = () => {
        const { interesses } = this.state;
        let interessesValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (!/[A-Za-z]$/.test(interesses)) {
            interessesValid = false;
            errorMsg.interesses = 'Preencha este campo'
        }

        this.setState({ interessesValid, errorMsg }, this.validateForm)
    }

    // Event fired when the input value is changed
    // Event fired when the input value is changed
    onChange = e => {
        const { suggestions } = this.props;
        const inputTagValue = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(inputTagValue.toLowerCase()) > -1
        );

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            inputTagValue: e.currentTarget.value
        });
    };

    // Event fired when the user clicks on a suggestion
    onClick = e => {
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            inputTagValue: e.currentTarget.innerText
        });
    };

    onClick1 = e => {
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion1: 0,
            filteredSuggestions1: [],
            showSuggestions1: false,
            inputTagValue1: e.currentTarget.innerText
        });
    };

    // Event fired when the user presses a key down
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                inputTagValue: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    onChange1 = e => {
        const { suggestions1 } = this.props;
        const inputTagValue1 = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions1 = suggestions1.filter(
            suggestion1 =>
                suggestion1.toLowerCase().indexOf(inputTagValue1.toLowerCase()) > -1
        );

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion1: 0,
            filteredSuggestions1,
            showSuggestions1: true,
            inputTagValue1: e.currentTarget.value
        });
    };

    onKeyDown1 = e => {
        const { activeSuggestion1, filteredSuggestions1 } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion1: 0,
                showSuggestions1: false,
                inputTagValue1: filteredSuggestions1[activeSuggestion1]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion1 === 0) {
                return;
            }

            this.setState({ activeSuggestion1: activeSuggestion1 - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion1 - 1 === filteredSuggestions1.length) {
                return;
            }

            this.setState({ activeSuggestion1: activeSuggestion1 + 1 });
        }
    };


    render() {

        const { term } = this.state;


        return this.state.utilizador1.map((data, index) => {
            return (


                <div>
                    <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                        <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                            <div className="row">
                                <div className="d-none d-xl-block col-xl-2">

                                    <nav id="sidebar">
                                        <div className="sidebar-header">
                                            <div className="intro">
                                                <div className="text-center"> <img src="imagens/bizdirectLOGO.png" alt=""
                                                    className="img-fluid w-50 text-center" /> </div>
                                                <Link to="/RHDashboard"> <div className="profile-img mb-xl-4"> <img className="profile-img  maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /></div></Link>
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
                                    <h3 className="ml-4 mt-5  titulos"> Developers</h3>
                                    <div className="row justify-content-center">

                                        <div className="col-lg-11 col-12 col-sm-11  my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                            <h5 className="pb-1 titulos font-weight-normal">Pesquisar Developers</h5>
                                            <hr />

                                            <form className="my-4 font-weight-light col-xl-12 texto">
                                                <div className="row">
                                                    <div className="col-xl-6 ">
                                                        <div className="row">
                                                            <div className="col-xs-1 mb-2 ">
                                                                <label>Pesquisar</label>
                                                            </div>
                                                            <div className="col mr-2">



                                                                <div className="input-group ">


                                                                    <input type="text" className="form-control form-control-sm my-0 py-1 " id="PesqDev"
                                                                        value={term}
                                                                        onChange={this.searchHandler} name="PesquisarDev" />

                                                                    <div className="input-group-append">
                                                                        <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#fd7d4a" }} ><img src="imagens/lupa.png" alt=""></img></button>
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
                                                        <th scope="col">Foto</th>
                                                        <th scope="col">Nome</th>
                                                        <th scope="col">Projetos Atuais</th>
                                                        <th scope="col">Estado</th>
                                                        <th scope="col" className="hide-text"></th>
                                                        <th scope="col" ></th>

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
                </div>

            );
        });
    }



    //     );

    // }

    loadFillData() {
        const {
            onChange,
            onChange1,
            onClick,
            onClick1,
            onKeyDown,
            onKeyDown1,
            state: {
                activeSuggestion,
                activeSuggestion1,
                filteredSuggestions,
                filteredSuggestions1,
                showSuggestions,
                showSuggestions1,
                inputTagValue,
                inputTagValue1,
            }
        } = this;


        let suggestionsListComponent;
        let suggestionsListComponent1;

        if (showSuggestions && inputTagValue) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>Sem resultados</em>
                    </div>
                );
            }
        }

        if (showSuggestions1 && inputTagValue1) {
            if (filteredSuggestions1.length) {
                suggestionsListComponent1 = (
                    <ul className="suggestions">
                        {filteredSuggestions1.map((suggestion1, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion1) {
                                className = "suggestion-active";
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion1}
                                    onClick={onClick1}
                                >
                                    {suggestion1}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent1 = (
                    <div className="no-suggestions">
                        <em>Sem resultados</em>
                    </div>
                );
            }
        }

        //enquanto houver, preenche
        return this.state.utilizador.filter(searchingFor(this.state.term)).map((data, index, index1, index2, index3, index4) => {
            return (
                <tr >
                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index} ><img className="maxphotoperfil " src={data.fotourl} alt="" ></img></td>

                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index1}> {data.nome}</td>

                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index2} > {data.n_projetos_utilizador} </td>

                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#exampleModalCenterabrir' + index} key={index3} >

                        {(data.estado === true ? (<img src="imagens/ativo.png" alt="" />) : <img src="imagens/desativo.png" alt="" />)}</td>

                    <td key={index4} className="hide-text"> {data.id_utilizador}</td>

                    <td >  <button onClick={(value) => this.setState({ nome: data.nome, telemovel: data.telemovel, nr_contribuinte: data.nr_contribuinte, localidade: data.localidade, email: data.email, codigopostal: data.codigopostal, morada: data.morada, formacao: data.formacao, interesses: data.interesses, viajar: data.viajar, reunircliente: data.reunircliente, horasextra: data.horasextra, estado: data.estado })} data-toggle="modal" data-target={'#ModalAbreEditarProjeto' + index} type="button"> <img className="botaoeditarevisualizar" alt="" src="imagens/editar.png" /> </button> </td>




                    <div className="modal fade mt-1" id={'exampleModalCenterabrir' + index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content1">
                                <div className="modal-header bg-white ">
                                    <h5 className="modal-title" id="exampleModalLabel">Detalhes do utilizador {data.nome}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body pre-scrollable1 ">
                                    <div className="container-fluid">
                                        <div className="row justify-content-md-center">
                                            <div className="col-xl-11  my-4 pr-5 pl-5 pt-2 pb-2 bg-white  ">
                                                <h5 className="pb-1 mt-3 titulos font-weight-normal text-left">Informações Gerais</h5>
                                                <hr />


                                                <form>
                                                    <div className="row font-weight-light texto ">
                                                        <div className="col-lg-2  justify-content-center">
                                                            <div className="row">
                                                                <div className="col-lg-12  mb-4">
                                                                    <img className="maxphotoperfilaberto" src={data.fotourl} alt="" ></img>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm pl-5">
                                                            <div className="row ">

                                                                <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                                    <div className="row">
                                                                        <div className="col-xs-2 mr-3 font-weight-normal">
                                                                            <label> Nome: </label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.nome}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                                    <div className="row">
                                                                        <div className="col-xs-2 mr-3 font-weight-normal">
                                                                            <label> Numero de Contribuinte:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.nr_contribuinte}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="row ">

                                                                <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                                    <div className="row">
                                                                        <div className="col-xs-2 mr-3 font-weight-normal">
                                                                            <label> Telemovel: </label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.telemovel}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                                    <div className="row">
                                                                        <div className="col-xs-2 mr-3 font-weight-normal">
                                                                            <label> Email:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.email}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>






                                                            <div className="row ">

                                                                <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                                    <div className="row">
                                                                        <div className="col-xs-2 mr-3 font-weight-normal">
                                                                            <label> Data de nascimento: </label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.datanascimento}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                                    <div className="row">
                                                                        <div className="col-xs-2 mr-3 font-weight-normal">
                                                                            <label> Formação:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.formacao}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-xl-12 col-lg-11 ml-lg-3 ml-xl-0 ">
                                                                    <div className="row ">
                                                                        <div
                                                                            className="col-xs-1  mr-md-1 pl-lg-0  pl-md-0    font-weight-normal">
                                                                            <label>Morada: </label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label> {data.morada}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row ">

                                                                <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                                    <div className="row">
                                                                        <div className="col-xs-2 mr-3 font-weight-normal">
                                                                            <label> Localidade: </label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.localidade}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                                    <div className="row">
                                                                        <div className="col-xs-2 mr-3 font-weight-normal">
                                                                            <label> Código Postal:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.codigopostal}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-1 ">
                                                                <div className="col-xl-11  ml-lg-3 ml-xl-0 ">
                                                                    <div className="row ">
                                                                        <div
                                                                            className="col-xl-2 col-lg-3 col-md-4 col-sm-4   mr-2 pl-sm-0  pl-0 font-weight-normal">
                                                                            <label>Disponibilidade: </label>
                                                                        </div>


                                                                        <div className="col-md-2 pl-0">
                                                                            <div className="custom-control custom-switch">

                                                                                {(data.viajar === true ?
                                                                                    (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}

                                                                                <label
                                                                                    className="custom-control-label"
                                                                                    htmlFor="customSwitch1"
                                                                                >
                                                                                    Viajar </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-3 pl-0">
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
                                                                        <div className="col-md-2 pl-0">
                                                                            <div className="custom-control custom-switch">
                                                                                {(data.reunircliente === true ?
                                                                                    (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}
                                                                                <label
                                                                                    className="custom-control-label"
                                                                                    htmlFor="customSwitch3"
                                                                                >
                                                                                    Cliente
                    </label>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="row">
                                                                <div className="col pl-0 ml-lg-3 ml-xl-0 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="font-weight-normal">Interesses:</label>
                                                                        <label>{data.interesses}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="col-xl-2 col-md-3 col-sm-3 col-lg-12 col-md-12  col-sm-12 col-sm-3 pl-xl-2  pl-0">
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
                                                    <div className="row justify-content-end col-lg-12 mt-2 mb-2  pr-3 float-right">

                                                        {/* <button type="button" className="btnlaranjanormal ">Editar</button> */}
                                                    </div>


                                                </form>
                                            </div>

                                        </div>

                                        <div className="row ">

                                            <div className="col-lg-11 col-xl-11 ml-xl-5 col-md-12 col-sm-12 my-4 pr-5 pl-5 pt-4 pb-4  bg-white">

                                                <div className="row">
                                                    <div className="col-xs-11 col-sm-11 col-xl-6 col-lg-6 col-md-12 pr-5 pl-5 pt-1  col-sm-6">
                                                        <h5 className=" titulos font-weight-normal pb-1 text-left">Competências Técnicas</h5>
                                                        <hr />

                                                        {data.skills_utilizadores_skills.map(function (skill) {
                                                            return (

                                                                <div className="row mt-2">
                                                                    {skill.tipo === 1 ?
                                                                        <div>
                                                                            <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                                                <span className="my-4 font-weight-light">{skill.nome} </span>
                                                                            </div>
                                                                            <div className="col mb-2">
                                                                                <span className="my-4 font-weight-light">
                                                                                    <div className="progress">

                                                                                        <div className="progress-bar" style={{ width: skill.utilizador_skills.nivel + "%" }}></div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        : " "}
                                                                </div>
                                                            );
                                                        })
                                                        }
                                                    </div>
                                                    <div className="col-xs-11 col-sm-11  col-xl-6 col-lg-6 col-md-12 pr-5 pl-5 pt-1 col-sm-6">
                                                        <h5 className="titulos font-weight-normal pb-1 text-left ">Competências Humanas</h5>
                                                        <hr />
                                                        {data.skills_utilizadores_skills.map(function (skill) {
                                                            return (

                                                                <div className="row mt-2">
                                                                    {skill.tipo === 2 ?
                                                                        <div>
                                                                            <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                                                <span className="my-4 font-weight-light">{skill.nome} </span>
                                                                            </div>
                                                                            <div className="col mb-2">
                                                                                <span className="my-4 font-weight-light">
                                                                                    <div className="progress">

                                                                                        <div className="progress-bar" style={{ width: skill.utilizador_skills.nivel + "%" }}></div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        : " "}
                                                                </div>
                                                            );
                                                        })
                                                        }


                                                    </div>
                                                </div>
                                            </div>
                                        </div>






                                        <div className="row justify-content-center">

                                            <div className="col-xl-7 col-md-12  ml-lg-0 mr-lg-0     my-4 pr-5 pl-5 pt-4 pb-4  mr-sm-0 ml-sm-0 bg-white  mr-xl-5">
                                                <h5 className="pb-1 titulos font-weight-normal text-left">Avaliações</h5>
                                                <hr />
                                                <div className="my-4">
                                                    <div className="row font-weight-light">

                                                        <div className="col-lg-1 col-1 ">
                                                            <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                                        </div>
                                                        <div className="col-lg-5 col-11 ">
                                                            <p className="comentario  ml-4 ">"Excelente editor com grandes capacidades para
                                                            entrar em
                                                                        futuros  projetos."</p>
                                                            <p className="comentario small ml-5"> Bruno Fernandes, Team Leader</p>
                                                        </div>


                                                        <div className="col-lg-1 col-1 ">
                                                            <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                                        </div>
                                                        <div className="col-lg-5 col-11 ">
                                                            <p className="comentario ml-4">Excelente editor com grandes capacidades para
                                                            entrar em
                                                                        futuros projetos."</p>
                                                            <p className="comentario small ml-5"> Bruno Fernandes, Team Leader</p>
                                                        </div>
                                                    </div>

                                                    <div className="row font-weight-light mt-4">

                                                        <div className="col-lg-1 col-1 ">
                                                            <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                                        </div>
                                                        <div className="col-lg-5 col-11 ">
                                                            <p className="comentario  ml-4">"Excelente editor com grandes capacidades para
                                                            entrar em
                                                                        futuros projetos."</p>
                                                            <p className="comentario small ml-5"> Bruno Fernandes, Team Leader</p>
                                                        </div>


                                                        <div className="col-lg-1 col-1 ">
                                                            <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                                        </div>
                                                        <div className="col-lg-5 col-11 ">
                                                            <p className="comentario ml-4">Excelente editor com grandes capacidades para
                                                            entrar em
                                                                        futuros projetos."</p>
                                                            <p className="comentario small ml-5"> Bruno Fernandes, Team Leader</p>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                            <div className="col-xl-3 col-md-12  ml-lg-0 mr-lg-0     my-4 pr-5 pl-5 pt-4 pb-4 mr-sm-0 ml-sm-0 bg-white  ml-xl-5">

                                                <h5 className="pb-1 titulos font-weight-normal text-left">Recomendações</h5>
                                                <hr />

                                                <div className="row mt-2">
                                                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                                        <span className="my-4 font-weight-light"> Photoshop</span>
                                                    </div>
                                                    <div className="col xl-12">
                                                        <span className="my-4 font-weight-light">
                                                            <div className="progress">
                                                                <div className="progress-bar" style={{ width: "85%" }}></div>
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
                                                                <div className="progress-bar bg-warning" style={{ width: "85%" }}></div>
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
                                                                <div className="progress-bar bg-info" style={{ width: "85%" }}></div>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                                        <span className="my-4 font-weight-light"> AfterEffects</span>
                                                    </div>
                                                    <div className="col xl-12">
                                                        <span className="my-4 font-weight-light">
                                                            <div className="progress">
                                                                <div className="progress-bar bg-danger" style={{ width: "96%" }}></div>
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
                                                                <div className="progress-bar" style={{ width: "75%" }}></div>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3  mt-2">
                                                        <span className="my-4 font-weight-light"> Illustrator</span>
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
                                <div className="modal-footer bg-white ">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>

                        </div>
                    </div>



                    {/* SEGUNDO MODAL */}


                    <div className="modal fade mt-1" id={'ModalAbreEditarProjeto' + index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content1">
                                <div className="modal-header bg-white ">
                                    <h5 className="modal-title" id="exampleModalLabel">Detalhes do utilizador {data.nome}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body pre-scrollable1 ">
                                    <div className="container-fluid">
                                        <div className="row justify-content-md-center">
                                            <div className="col-xl-11  my-4 pr-5 pl-5 pt-2 pb-2 bg-white  ">
                                                <h5 className="pb-1 mt-3 titulos font-weight-normal">Informações Gerais</h5>
                                                <hr />

                                                <form className="mt-2">

                                                    <div className="row font-weight-light texto">

                                                        <div className="col-md-2 justify-content-center">
                                                            <div className="row" >
                                                                <div className="col-lg-12 col-xs-1">
                                                                    <div className="file-field">
                                                                        <img src={data.fotourl} className="maxphotoperfilmodal ml-4"
                                                                            alt="Avatar" style={{ marginTop: "30px" }} />
                                                                    </div>
                                                                </div>

                                                                <div className="justify-content-center col-md-0 col-xs-0  mt-2 ml-5 pl-2  ">
                                                                    <div>
                                                                        <button className="btnamarelonormal font-weight-normal btn-sm mb-1  "
                                                                            htmlFor="my-file-selector">
                                                                            <input type="file" value={this.state.fotourl} onChange={(value) =>
                                                                                this.setState({ fotourl: value.target.value })} className="d-none" />
                                                                            Alterar
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="col-sm pl-5 mt-4">
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-12">
                                                                    <div className="row mb-1">
                                                                        <div className="col-xs-1 mr-4">
                                                                            <label>Nome</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <input value={this.state.nome} type="text" maxLength="55" className="form-control form-control-sm "
                                                                                onChange={(e) => this.updatenome(e.target.value)} />
                                                                        </div>

                                                                    </div>
                                                                    < ValidationMessage className="error" valid={this.state.nomeValid} message={this.state.errorMsg.nome} />

                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="row mb-1">
                                                                        <div className="col-xs-1">
                                                                            <label>Número de Contribuinte</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <input value={this.state.nr_contribuinte} type="text" maxLength="9"
                                                                                onChange={(e) => this.updatenr_contribuinte(e.target.value)} className="form-control form-control-sm " />
                                                                        </div>
                                                                    </div>
                                                                    < ValidationMessage className="error" valid={this.state.nr_contribuinteValid} message={this.state.errorMsg.nr_contribuinte} />

                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="row mb-1">
                                                                        <div className="col-xs-1">
                                                                            <label>Telemóvel</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <input value={this.state.telemovel} type="text" maxLength="9"
                                                                                onChange={(e) => this.updatetelemovel(e.target.value)} className="form-control form-control-sm " />
                                                                        </div>
                                                                    </div>
                                                                    < ValidationMessage className="error" valid={this.state.telemovelValid} message={this.state.errorMsg.telemovel} />

                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="row mb-1">
                                                                        <div className="col-xs-1">
                                                                            <label>Email</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <input type="text" maxLength="55"   value={this.state.email}
                                                                            onChange={(e) => this.updateemail(e.target.value)} className="form-control form-control-sm " />
                                                                        </div>
                                                                    </div>
                                                                    < ValidationMessage className="error" valid={this.state.emailValid} message={this.state.errorMsg.email} />
                                                                </div>
                                                            </div>


                                                            <div className="row ">
                                                                <div className="col-lg-6 ">
                                                                    <div className="row mb-1">
                                                                        <div className="col-xs-1">
                                                                            <label>Localidade</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <select value={this.state.localidade} onChange={(value) => this.setState({ localidade: value.target.value })} className="form-control form-control-sm" id="sel1">
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
                                                                            <input value={this.state.codigopostal} type="text" maxLength="8" onChange={(e) => this.updatecodigopostal(e.target.value)}
                                                                                className="form-control form-control-sm " />
                                                                        </div>
                                                                        <ValidationMessage className="error" valid={this.state.codigopostalValid} message={this.state.errorMsg.codigopostal} />

                                                                    </div>
                                                                    <div className="row mb-1">
                                                                        <div className="col-xs-2 mr-3">
                                                                            <label>Formação</label>
                                                                        </div>
                                                                        <div className="col ">
                                                                            <input value={this.state.formacao} type="text" maxLength="55" onChange={(e) => this.updateformacao(e.target.value)} className="form-control form-control-sm " />
                                                                        </div>

                                                                        < ValidationMessage className="error" valid={this.state.formacaoValid} message={this.state.errorMsg.formacao} />


                                                                    </div>

                                                                </div>





                                                                <div className="col-lg-6">
                                                                    <div className="row mb-1">
                                                                        <div className="col-xs-2 mr-3">
                                                                            <label>Morada</label>
                                                                        </div>
                                                                        <div className="col ">
                                                                            <input value={this.state.morada} type="text" maxLength="70" onChange={(e) => this.updatemorada(e.target.value)} className="form-control form-control-sm " />
                                                                        </div>
                                                                    </div>

                                                                    < ValidationMessage className="error" valid={this.state.moradaValid} message={this.state.errorMsg.morada} />


                                                                </div>

                                                            </div>
                                                            <div className="row  ">
                                                                <div className="col-md-12 mb-2 mt-2 ">
                                                                    <div className="row ">
                                                                        <div className="col-xs-3 mr-3 ">
                                                                            <label >Disponibilidade </label>
                                                                        </div>






                                                                        <div className="col-md-2 pl-0">
                                                                            <div className="custom-control custom-switch">


                                                                                {(this.state.viajar === true ?
                                                                                    (<input value={this.state.viajar} onChange={(value) =>
                                                                                        this.setState({ viajar: !this.state.viajar })} type="checkbox" checked className="custom-control-input" id="customSwitchviajar" />) : (<input value={this.state.viajar} onChange={(value) =>
                                                                                            this.setState({ viajar: !this.state.viajar })} type="checkbox" className="custom-control-input" id="customSwitchviajar" />))}


                                                                                <label className="custom-control-label" htmlFor="customSwitchviajar">
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

                                                                                <label className="custom-control-label " htmlFor="customSwitchcliente">Cliente</label>
                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col pl-0">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleFormControlTextarea1">Interesses</label>
                                                                        <textarea value={this.state.interesses} type="checkbox" maxLength="255" rows="3"
                                                                            onChange={(e) => this.updateinteresses(e.target.value)} className="form-control">
                                                                        </textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ValidationMessage className="error" valid={this.state.interessesValid} message={this.state.errorMsg.interesses} />
                                                            <div className="col-md-2 pl-0">
                                                                <div className="custom-control custom-switch">

                                                                    {(this.state.estado === true ?
                                                                        (<input value={this.state.estado} onChange={(value) =>
                                                                            this.setState({ estado: !this.state.estado })} type="checkbox" checked className="custom-control-input" id="customSwitchestado" />) : (<input value={this.state.estado} onChange={(value) =>
                                                                                this.setState({ estado: !this.state.estado })} type="checkbox" className="custom-control-input" id="customSwitchestado" />))}

                                                                    <label className="custom-control-label " htmlFor="customSwitchestado">Ativo</label>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="row justify-content-end col-lg-12 mt-2 mb-2  pr-3 float-right">

                                                        <button className="btnoutlinelaranja mr-2" type="button" data-dismiss="modal" >Cancelar</button>

                                                        <button type="submit" onClick={() => this.sendUpdate(data.id_utilizador)} data-dismiss="modal" className="btnlaranjanormal" >Salvar</button>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center  ">

                                            <div className="col-xl-5 col-md-12  mr-lg-0     my-4 pr-5 pl-5 pt-4 pb-4  mr-sm-0 ml-sm-0 bg-white  mr-xl-5">

                                                <h5 className="pb-1 titulos font-weight-normal text-left">Competências Técnicas</h5>
                                                <hr />
                                                <div className="row mt-2">

                                                    {data.skills_utilizadores_skills.map(function (skill) {
                                                        return (

                                                            <div className="row mt-2">
                                                                {skill.tipo === 1 ?
                                                                    <div>
                                                                        <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                                            <span className="my-4 font-weight-light">{skill.nome} </span>
                                                                        </div>
                                                                        <div className="col mb-2">
                                                                            <span className="my-4 font-weight-light">
                                                                                <div className="progress">

                                                                                    <div className="progress-bar" style={{ width: skill.utilizador_skills.nivel + "%" }}></div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    : " "}
                                                            </div>
                                                        );
                                                    })
                                                    }


                                                </div>

                                                <div className="row mt-2">
                                                    {this.loadFillDataTecnicas()}

                                                    <div className="row text-left">


                                                        <div className="col  mt-3">
                                                            <div className="row mb-2 ">
                                                                <div className="col-xs-3 col-xs-3 col-md-4 col-lg-3 col-xl-3 pl-0 pr-0 mr-0">
                                                                    <label className="col pt-2 font-weight-light">Competência</label>
                                                                </div>

                                                                <div className="col-xs-9  col-xs-9 col-lg-9  col-md-8 col-xl-9">

                                                                    <div className="input-group ">

                                                                        <input type="text" className="form-control form-control-sm my-0 py-1  " id="compTecnicas"
                                                                            placeholder="" name="adicionar" value={this.state.inputTagValue} onKeyDown={onKeyDown} onChange={onChange} />

                                                                        <div className="input-group-append">

                                                                            <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#F16830" }} onClick={() => this.sendUpdate1()}>Inserir</button>
                                                                        </div>
                                                                    </div>
                                                                    <div> {suggestionsListComponent}</div>

                                                                </div>


                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>

                                            <div className=" col-xl-5 col-md-12 mr-lg-0  my-4 pr-5 pl-5 pt-4 pb-4  mr-sm-0 ml-sm-0 bg-white  ml-xl-5 ml-xl-5">

                                                <h5 className="pb-1 titulos font-weight-normal text-left">Competências Humanas</h5>
                                                <hr />

                                                <div className="row mt-2">

                                                    {data.skills_utilizadores_skills.map(function (skill) {
                                                        return (

                                                            <div className="row mt-2">
                                                                {skill.tipo === 2 ?
                                                                    <div>
                                                                        <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                                            <span className="my-4 font-weight-light">{skill.nome} </span>
                                                                        </div>
                                                                        <div className="col mb-2">
                                                                            <span className="my-4 font-weight-light">
                                                                                <div className="progress">

                                                                                    <div className="progress-bar" style={{ width: skill.utilizador_skills.nivel + "%" }}></div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    : " "}
                                                            </div>
                                                        );
                                                    })
                                                    }
                                                </div>


                                                <div className="row mt-2">


                                                    {this.loadFillDataHumanas()}


                                                    <div className="row text-left">


                                                        <div className="col  mt-3">
                                                            <div className="row mb-2 ">
                                                                <div className="col-xs-3 col-xs-3 col-md-4 col-lg-3 col-xl-3 pl-0 pr-0 mr-0">
                                                                    <label className="col pt-2 font-weight-light ">Adicionar</label>
                                                                </div>


                                                                <div className="col-xs-9  col-xs-9 col-lg-9  col-md-8 col-xl-9">



                                                                    <div className="input-group ">


                                                                        <input type="text" className="form-control form-control-sm my-0 py-1 " id="compHumanas"
                                                                            name="Competencias Humanas" value={this.state.inputTagValue1} onKeyDown={onKeyDown1} onChange={onChange1} />

                                                                        <div className="input-group-append">
                                                                            <button onClick={() => this.sendUpdate2()} className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#F16830" }}  >Inserir</button>
                                                                        </div>
                                                                    </div>
                                                                    <div> {suggestionsListComponent1}</div>



                                                                </div>


                                                            </div>
                                                        </div>

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

                        </div>  </div>


                </tr >

            );
        });
    }


    loadFillDataTecnicas() {

        //enquanto houver, preenche
        return this.state.skills_utilizador_tecnicas.map((data, index) => {
            return (
                <div>
                    {data.skills_utilizadores_skills.map(function (skill, index1) {
                        return (

                            <div>
                                {this.state.show == false ?

                                    <div key={skill.utilizador_skills.id_utilizadorskill} className="row mt-2">
                                        <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3">
                                            <span className="my-4 font-weight-light">{skill.nome} </span>
                                        </div>
                                        <div className="col mb-2">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">

                                                    <div className="progress-bar" style={{ width: skill.utilizador_skills.nivel + "%" }}></div>
                                                </div>
                                            </span>
                                        </div>


                                    </div>

                                    :

                                    <div key={skill.utilizador_skills.id_utilizadorskill} className="row mt-2">
                                        <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3">
                                            <span className="my-4 font-weight-light">{skill.nome} </span>
                                        </div>
                                        <div className="col mb-2">
                                            <span className="my-4 font-weight-light">
                                                <div className="slidecontainer">


                                                    <input type="range"
                                                        onChange={(event) =>
                                                            this.handle_Slider(event.target.value, skill.id_skill, skill.utilizador_skills.id_utilizadorskill, this.sendUpdate())}
                                                        defaultValue={skill.utilizador_skills.nivel} />

                                                    <button onClick={() => this.onDelete(skill.utilizador_skills.id_utilizadorskill)} type="button" className="botaoremover ml-3"> <img src="imagens/remover.png" alt="remover" /></button>
                                                </div>


                                            </span>
                                        </div>


                                    </div>}

                            </div>



                        );
                    }.bind(this))
                        //existe um metodo disponivel para usar
                    }
                </div>


            )
        })
    }



    loadFillDataHumanas() {

        //enquanto houver, preenche
        return this.state.skills_utilizador_humanas.map((data, index) => {
            return (
                <div key={index}>
                    {data.skills_utilizadores_skills.map(function (skill) {
                        return (

                            <div>
                                {this.state.show1 == false ?

                                    <div key={skill.utilizador_skills.id_utilizadorskill} className="row mt-2">
                                        <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3">
                                            <span className="my-4 font-weight-light">{skill.nome} </span>
                                        </div>
                                        <div className="col mb-2">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">

                                                    <div className="progress-bar" style={{ width: skill.utilizador_skills.nivel + "%" }}></div>
                                                </div>
                                            </span>
                                        </div>


                                    </div>
                                    :

                                    <div key={skill.utilizador_skills.id_utilizadorskill} className="row mt-2">
                                        <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3">
                                            <span className="my-4 font-weight-light">{skill.nome} </span>
                                        </div>
                                        <div className="col mb-2">
                                            <span className="my-4 font-weight-light">
                                                <div className="slidecontainer">


                                                    <input type="range"
                                                        onChange={(event) =>
                                                            this.handle_Slider1(event.target.value, skill.id_skill, skill.utilizador_skills.id_utilizadorskill, this.sendUpdate1())}
                                                        defaultValue={skill.utilizador_skills.nivel} />

                                                    <button onClick={() => this.onDelete(skill.utilizador_skills.id_utilizadorskill)} type="button" className="botaoremover ml-3"> <img src="imagens/remover.png" alt="remover" /> </button>
                                                </div>
                                            </span>
                                        </div>


                                    </div>}

                            </div>
                        );
                    }.bind(this))
                        //existe um metodo disponivel para usar
                    }

                </div>

            )
        })
    }


    

    sendUpdate2() {


        //MOSTRA NA CONSOLA O ARRAY COM OS DADOS
        console.log(this.state.valorescompetencia)

        const url = HerokuURL + "/utilizador_skills/update/" + this.state.valorescompetencia[2]
        // parametros de datos post


        const datapost = {
            nivel: this.state.valorescompetencia[0],
            id_skill: this.state.valorescompetencia[1],
            tagsTec: this.tagsTec,
            tagsHum: this.tagsHum
        }
        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {


                    // alert(response.data.message)
                    // // this.props.history.push("/");


                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Erro ao guardar os seus dados." + error)
            })

    }

    sendUpdate1() {


        //MOSTRA NA CONSOLA O ARRAY COM OS DADOS
        console.log(this.state.valorescompetencia1)

        const url = HerokuURL + "/utilizador_skills/update/" + this.state.valorescompetencia1[2]
        // parametros de datos post

        const datapost = {
            nivel: this.state.valorescompetencia1[0],
            id_skill: this.state.valorescompetencia1[1],
            tagsHum: this.tagsHum,
            tagsTec: this.tagsTec

        }

        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {

                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Erro ao guardar os seus dados." + error)
            })

    }

    sendUpdate(id_utilizador) {


        const url = HerokuURL + "/utilizador/update/" + id_utilizador
        // parametros de datos post

        const datapost = {
            nome: this.state.nome,
            email: this.state.email,
            estado: this.state.estado,
            genero: this.state.genero,
            morada: this.state.morada,
            codigopostal: this.state.codigopostal,
            telemovel: this.state.telemovel,
            fotourl: this.state.fotourl,
            datanascimento: this.state.datanascimento,
            viajar: this.state.viajar,
            horasextra: this.state.horasextra,
            reunircliente: this.state.reunircliente,
            anos_experiencia: this.state.anos_experiencia,
            interesses: this.state.interesses,
            nr_contribuinte: this.state.nr_contribuinte,
            formacao: this.state.formacao,
            localidade: this.state.localidade,

            tagsHum: this.tagsHum,
            tagsTec: this.tagsTec,

        }

        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {

                    alert(response.data.message)
                    this.Load_devs();

                    // this.props.history.push("/DEVPe");
                }

                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Erro ao guardar os seus dados.")
            })
    }

 
}


export default RHPesquisarDev;









