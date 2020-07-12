import React, { } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from 'axios';

const HerokuURL = "https://moontechv2.herokuapp.com";

//IMPORT CHIPS
import Chip from '@material-ui/core/Chip';
//import authService from './auth.service';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from "./styles";


//VALIDAÇOES
function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className='error'>{props.message}</div>
        )
    }
    return null;
}

class RHAdicionarDev extends React.Component {
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

            skills_utilizador_tecnicas: [],
            skills_utilizador_humanas: [],

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

            //VALIDACOES
            formValid: false,
            errorMsg: {},


            utilizador: [],

            //campos
            nome: "", nomeValid: false,
            email: "", emailValid: false,
            estado: 1,
            tipo: 1,
            morada: "", moradaValid: false,
            codigopostal: "", codigopostalValid: false,
            telemovel: "", telemovelValid: false,
            fotourl: null,
            nomefoto: "",
            tamanhofoto: "",
            keyfoto: "",
            datanascimento: "2020-10-10",
            viajar: false,
            horasextra: 0,
            reunircliente: 0,
            anos_experiencia: 0, anos_experienciaValid: false,
            interesses: "",
            nr_contribuinte: "", nr_contribuinteValid: false,
            formacao: "", formacaoValid: false,
            localidade: "Escolha uma opção...",
            genero: "Escolha uma opção...",
            utilizadorrecente: [],
            password: "", passwordValid: false,
            password_Confirm: "", password_ConfirmValid: false,

            utilizador_id_utilizador_skills: null,
            skills_id_skills: null,

            SkillsTec: [],
            SkillsHum: [],

            // uploadedFiles: [],
        };

        this.tagsTec = [];
        this.tagsHum = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleInsertTag = this.handleInsertTag.bind(this);

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleInsertTag1 = this.handleInsertTag1.bind(this);
    }
    //LIMPAR FORM

    resetForm = () => {
        this.setState({

            //campos
            nome: "",
            email: "", emailValid: false,
            estado: 1,
            tipo: 1,
            morada: "", moradaValid: false,
            codigopostal: "", codigopostalValid: false,
            telemovel: "", telemovelValid: false,
            fotourl: null,
            nomefoto: "",
            tamanhofoto: "",
            keyfoto: "",
            datanascimento: "2020-10-10",
            viajar: false,
            horasextra: false,
            reunircliente: false,
            anos_experiencia: 0, anos_experienciaValid: false,
            interesses: "",
            nr_contribuinte: "", nr_contribuinteValid: false,
            formacao: "", formacaoValid: false,
            localidade: "Escolha uma opção...",
            genero: "Escolha uma opção...",
            utilizadorrecente: [],
            password: "", passwordValid: false,
            password_Confirm: "", password_ConfirmValid: false,

        })
    }


    carregadatadaschipstecnicas() {

        const { suggestions } = this.props;
        return this.state.SkillsTec.map((data, index) => {
          return  suggestions.push(data.nome)
        })
    }
    carregadatadaschipsHumanas() {

        const { suggestions1 } = this.props;
        return this.state.SkillsHum.map((data, index) => {
           return  suggestions1.push(data.nome)
        })
    }

    Load_UtilizadoresRecentes() {
        const url = HerokuURL + "/utilizador/listrecentes";
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;

                this.setState({ utilizadorrecente: data });

            } else {

                alert("Error Web Service!");
            }
        })
            .catch(error => {
                alert(error)
            });
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


    componentDidMount() {

        this.Load_UtilizadoresRecentes()
        this.Load_skillshumanas()
        this.Load_skillsTecnicas()
        this.carregadatadaschipstecnicas()
        this.carregadatadaschipsHumanas()
        this.Load_skills_utilizador_Tecnicas()
        this.Load_skills_utilizador_Humanas()
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
    Load_skills_utilizador_Tecnicas() {
        let id_utilizador = 1;
        const url = HerokuURL + "/utilizador/BuscaSkillsEspcTecnicas/" + id_utilizador
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ skills_utilizador_tecnicas: data });


            } else {
                alert("Error Web Service!");
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
                alert("Erro no Servidor Web!");
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
                alert("Erro no Servidor Web!");
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


                    alert("Erro no Servidor Web!");
                }

                this.carregadatadaschipstecnicas()
            })
            .catch(error => {
                alert(error)
            });


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

    //VALIDAÇÕES
    validateForm = () => {
        const { nomeValid, nr_contribuinteValid, telemovelValid, emailValid, moradaValid, codigopostalValid, formacaoValid, anos_experienciaValid, datanascimentoValid, passwordValid, password_ConfirmValid } = this.state;
        this.setState({
            formValid: nomeValid && nr_contribuinteValid && telemovelValid && emailValid && moradaValid && codigopostalValid && formacaoValid && anos_experienciaValid && datanascimentoValid && passwordValid && password_ConfirmValid
        })
    }


    updateNome = (nome) => {
        this.setState({ nome }, this.validatenome)
    }


    validatenome = () => {
        const { nome } = this.state;
        let nomeValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (!/^[aA-zZ\u00C0-\u017F]+ [aA-zZ\u00C0-\u017F]\S+$/.test(nome)) {
            nomeValid = false;
            errorMsg.nome = 'Preencha o primeiro e último nome'
        }

        this.setState({ nomeValid, errorMsg }, this.validateForm)
    }


    //CONTRIBUINTE



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





    //TELEMOVEL

    updatetelemovel = (telemovel) => {
        this.setState({ telemovel }, this.validatetelemovel)
    }

    validatetelemovel = () => {
        const { telemovel } = this.state;
        let telemovelValid = true;
        let errorMsg = { ...this.state.errorMsg }


        if (!/[0-9]{9,9}$/.test(telemovel)) {
            telemovelValid = false;
            errorMsg.telemovel = 'Introduza apenas números'
        }

        this.setState({ telemovelValid, errorMsg }, this.validateForm)
    }

    //EMAIL
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


    //MORADA

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

    //CODIGO POSTAL
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

    //ANOS EXPERIENCIA
    updateanosexperiencia = (anos_experiencia) => {
        this.setState({ anos_experiencia }, this.validateAnosExperiencia)
    }

    validateAnosExperiencia = () => {
        const { anos_experiencia } = this.state;
        let anos_experienciaValid = true;
        let errorMsg = { ...this.state.erroMsg }

        if (!/^[0-9]{1,2}[:.,-]?$/.test(anos_experiencia)) {
            anos_experienciaValid = false;
            errorMsg.anos_experiencia = 'Introduza os anos de experiência .'

        }

        this.setState({ anos_experienciaValid, errorMsg }, this.validateForm)
    }
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



    // password
    updatepassword = (password) => {
        this.setState({ password }, this.validatepassword)
    }

    validatepassword = () => {
        const { password } = this.state;
        let passwordValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (password.length < 6) {
            passwordValid = false;
            errorMsg.password = 'Password must be at least 6 characters long';
        } else if (!/\d/.test(password)) {
            passwordValid = false;
            errorMsg.password = 'Password must contain a digit';
        } else if (!/[!@#$%^&*]/.test(password)) {
            passwordValid = false;
            errorMsg.password = 'Password must contain special character: !@#$%^&*';
        }
        else {

            errorMsg.password = '';
        }



        this.setState({ passwordValid, errorMsg }, this.validateForm)
    }




    updatepassword_Confirm = (password_Confirm) => {
        this.setState({ password_Confirm }, this.validatepassword_Confirm)
    }

    validatepassword_Confirm = () => {
        const { password_Confirm, password } = this.state;
        let password_ConfirmValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (password !== password_Confirm) {
            password_ConfirmValid = false;
            errorMsg.password_Confirm = 'Passwords do not match'
        }

        this.setState({ password_ConfirmValid, errorMsg }, this.validateForm)
    }

    //FIM VALIDACOES



    renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <UploadMessage>Arraste a foto</UploadMessage>
        }

        if (isDragReject) {
            return <UploadMessage type="error">Arquivo não suportada</UploadMessage>
        }
        return <UploadMessage type="success">Solte a foto</UploadMessage>
    };

    //teste fotos paiva é burro
    fileSelectedHandler = event => {
        this.setState({
            foto: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.foto, this.state.foto.name);
        axios.post('', fd, {
            onUploadProgress: progressEvent => {
                console.log("Progresso do Upload " + Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%");
            }
        })
            .then(res => {
                console.log(res);
            });
    }

    render() {
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

        const { onUpload } = this.props;


        let suggestionsListComponent;
        let suggestionsListComponent1;

        if (showSuggestions && inputTagValue) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
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
                    <div class="no-suggestions">
                        <em>Sem resultados</em>
                    </div>
                );
            }
        }

        if (showSuggestions1 && inputTagValue1) {
            if (filteredSuggestions1.length) {
                suggestionsListComponent1 = (
                    <ul class="suggestions">
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
                    <div class="no-suggestions">
                        <em>Sem resultados</em>
                    </div>
                );
            }
        }



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
                                        <Link to="/RHDashboard">                  
                                        <div className="profile-img mb-xl-4 "> <img className="profile-img maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /> </div>
                                        </Link>
                                        <h3 className="profile-usertitle-name mt-0">{JSON.parse(localStorage.getItem('Utilizador')).nome}</h3>
                                        <h4 className="profile-usertitle-job ">{JSON.parse(localStorage.getItem('Utilizador')).tipoUser === 3 ?
                                            "Recursos Humanos" : "Recursos Humanos"}</h4>
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
                                            <img src="imagens/Developer.svg" width="24px" alt="" /><span className="pl-3">Developers</span></a>

                                        <ul className="collapse list-unstyled" id="pageSubmenu">
                                            <li > <Link to="/RHAdicionarDev" >Adicionar Developer</Link></li>
                                            <li><Link to="/RHPesquisarDev">Pesquisar Developer</Link></li>
                                            <li><Link to="/RHatribuirPapeisTL">Atribuir papéis</Link></li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="#CompSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false"> <img
                                            src="imagens/Competencias.svg" alt="" width="24px" /><span
                                                className="pl-3">Competências</span></a>
                                        <ul className="collapse list-unstyled" id="CompSubmenu">
                                            <li><Link to="/RHPesquisarCompetenciasTecnicas">Competências Técnicas</Link></li>
                                            <li><Link to="/RHPesquisarCompetenciasHumanas">Competências Humanas</Link></li>
                                            <li><Link to="/RHAdicionarCompetencias">Adicionar Competências</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#homeSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false"><img
                                            className="prj_icon" src="imagens/Projetos.svg" alt="" width="24px" />
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
                                            <h5 className="dropdown-header"><img className="pr-1" src="imagens/Competencias.svg" width="24px"
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
                                            <Link to="/Logout">
                                                <img src="imagens/sair.svg" alt="" width="24px" />
                                                <span className="pl-3 fixed_bottom">Sair</span>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="ml-4 mt-5 titulos" > Developers</h3>

                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal">Adicionar Developers</h5>
                                    <hr />
                                    <form name="contactform" className="my-4 font-weight-light col-xl-12 texto " >
                                        <div className="row">
                                            <div className="col-xl-6 col-md-6 ">
                                                <div className="row ">
                                                    <div className="col-xs-1 mr-4 mb-2" >
                                                        <label >Nome</label>
                                                    </div>
                                                    <div className="col mr-2">

                                                        <input maxLength="20" value={this.state.nome} onChange={(e) => this.updateNome(e.target.value)} className=" form-control form-control-sm mr-0 " id="nome" name="nome" type="text" />

                                                        < ValidationMessage className="error" valid={this.state.nomeValid} message={this.state.errorMsg.nome} />

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="col-xl-6 col-md-6">
                                                <div className="row ">
                                                    <div className="col-xs-1 mb-2">
                                                        <label>Contribuinte</label>
                                                    </div>
                                                    <div className="col ">
                                                        <input maxLength="9" value={this.state.nr_contribuinte} onChange={(e) => this.updatenr_contribuinte(e.target.value)} className=" form-control form-control-sm mr-0 " id="nr_contribuinte" name="nr_contribuinte" type="text" />

                                                        < ValidationMessage className="error" valid={this.state.nr_contribuinteValid} message={this.state.errorMsg.nr_contribuinte} />


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row ">
                                                    <div className="col-xs-2 mb-2">
                                                        <label>Telemóvel</label>
                                                    </div>


                                                    <div className="col mr-2">

                                                        <input maxLength="9" value={this.state.telemovel} onChange={(e) => this.updatetelemovel(e.target.value)} className=" form-control form-control-sm mr-0 " id="telemovel" name="telemovel" type="text" />


                                                        < ValidationMessage className="error" valid={this.state.telemovelValid} message={this.state.errorMsg.telemovel} />





                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row ">
                                                    <div className="col-xs-2 mb-2">
                                                        <label >E-mail</label>
                                                    </div>
                                                    <div className="col">


                                                        <input maxLength="38" value={this.state.email} onChange={(e) => this.updateemail(e.target.value)} className=" form-control form-control-sm mr-0 " id="email" name="email" type="text" />


                                                        < ValidationMessage className="error" valid={this.state.emailValid} message={this.state.errorMsg.email} />


                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-xs-2 mr-3">
                                                        <label>Morada</label>
                                                    </div>
                                                    <div className="col mr-2 mb-2">


                                                        <input maxLength="50" value={this.state.morada} onChange={(e) => this.updatemorada(e.target.value)} className=" form-control form-control-sm mr-0 " id="morada" name="morada" type="text" />


                                                        < ValidationMessage className="error" valid={this.state.moradaValid} message={this.state.errorMsg.morada} />




                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="row ">
                                                    <div className="col-xs-1 mb-2">
                                                        <label >Distrito</label>
                                                    </div>
                                                    <div className="col">

                                                        <select value={this.state.localidade} onChange={(value) => this.setState({ localidade: value.target.value })} className="form-control form-control-sm" id="">

                                                            <option >Viana do Castelo</option>
                                                            <option >Vila Real</option>
                                                            <option >Bragança</option>
                                                            <option >Porto</option>
                                                            <option >Aveiro</option>
                                                            <option >Viseu</option>
                                                            <option >Guarda</option>
                                                            <option >Coimbra</option>
                                                            <option>Castelo Branco</option>
                                                            <option >Leiria</option>
                                                            <option >Lisboa</option>
                                                            <option >Santarém</option>
                                                            <option >Portalegre</option>
                                                            <option >Setúbal</option>
                                                            <option >Évora</option>
                                                            <option >Beja</option>
                                                            <option >Faro</option>
                                                            <option>Não aplicável</option>


                                                        </select>

                                                    </div>
                                                    <div className="col-xs-2">
                                                        <label className="col-xs-1">Código Postal</label>
                                                    </div>
                                                    <div className="col">



                                                        <input maxLength="8" placeholder={"nnnn-nnn"} value={this.state.codigopostal} onChange={(e) => this.updatecodigopostal(e.target.value)} className=" form-control form-control-sm mr-0 " id="codigopostal" name="codigopostal" type="text" />


                                                        < ValidationMessage className="error" valid={this.state.codigopostalValid} message={this.state.errorMsg.codigopostal} />



                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row ">
                                                    <div className="col-xs-2 mb-2">
                                                        <label>Password</label>
                                                    </div>


                                                    <div className="col mr-2">
                                                        <input value={this.state.password} onChange={(e) => this.updatepassword(e.target.value)} className=" form-control form-control-sm mr-0 " id="password" name="password" type="password" />

                                                        < ValidationMessage className="error" valid={this.state.passwordlValid} message={this.state.errorMsg.password} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row ">
                                                    <div className="col-xs-2 mb-2">
                                                        <label >Confirmação Password</label>
                                                    </div>
                                                    <div className="col">



                                                        <input value={this.state.password_Confirm} onChange={(e) => this.updatepassword_Confirm(e.target.value)} className=" form-control form-control-sm mr-0 " id="password_Confirm" name="password_Confirm" type="password" />

                                                        < ValidationMessage className="error" valid={this.state.password_ConfirmValid} message={this.state.errorMsg.password_Confirm} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                <div className="row">
                                                    <div className="col-xs-2 mr-3 ">
                                                        <label> Data de nascimento </label>
                                                    </div>
                                                    <div className="col-xs-1 ">
                                                        <input value={this.state.datanascimento}
                                                            onChange={(e) => this.updatedatanascimento(e.target.value)}
                                                            type="date" className="form-control form-control-sm mb-2" id="datanascimento"
                                                            name="datanascimento" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div className="row">
                                                    <div className="col-xs-6 mr-3" >
                                                        <label >Género</label>
                                                    </div>
                                                    <div className="col-xs-3 " >

                                                        <select value={this.state.genero} onChange={(value) => this.setState({ genero: value.target.value })} className="form-control form-control-sm" id="sel1">

                                                            <option value="1" >Feminino</option>
                                                            <option value="2">Masculino</option>
                                                            <option value="3">Outro</option>

                                                        </select>
                                                    </div>
                                                </div>
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
                                                            <input value={this.state.viajar} onChange={(value) => this.setState({ viajar: !this.state.viajar })} type="checkbox" className="custom-control-input" id="toogleviajar" />
                                                            <label className="custom-control-label " htmlFor="toogleviajar">Viajar</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 pl-0">
                                                        <div className="custom-control custom-switch">
                                                            <input value={this.state.horasextra} onChange={(value) => this.setState({ horasextra: !this.state.horasextra })} type="checkbox" className="custom-control-input" id="customSwitch2" />
                                                            <label className="custom-control-label" htmlFor="customSwitch2">Horas Extra</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-3 pl-0">
                                                        <div className="custom-control custom-switch">
                                                            <input value={this.state.reunircliente} onChange={(value) => this.setState({ reunircliente: !this.state.reunircliente })} type="checkbox" className="custom-control-input" id="customSwitch3" />
                                                            <label className="custom-control-label " htmlFor="customSwitch3">
                                                                Cliente</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-xl-6 col-md-8 col-sm-12 col-lg-8 col-12 mb-2" >
                                                <div className="row">
                                                    <div className="col-xs-2 mr-3">
                                                        <label> Fotografia </label>
                                                    </div>
                                                    <div className="col-xs-1 ">
                                                        <Dropzone accept="image/*" onDropAccepted={onUpload}>
                                                            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                                                                <DropContainer
                                                                    {...getRootProps()}
                                                                    isDragActive={isDragActive}
                                                                    isDragReject={isDragReject}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                Escolha uma Foto
                                                                    {this.renderDragMessage(isDragActive, isDragReject)}
                                                                </DropContainer>
                                                            )}
                                                        </Dropzone>

                                                        {/* <input value={this.state.foto} onChange={(value) => this.setState({ foto: value.target.value })} type="file" className="texto font-weight-light" multiple /> */}

                                                        {/* <input onChange={this.fileSelectedHandler} type="file" className="texto font-weight-light"/>
                                                    <button onClick={this.fileUploadHandler}>Upload</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-3 col-md-6 ">
                                                <div className="row  ">
                                                    <div className="col-xs-2 mb-2">
                                                        <label>Anos de experiência</label>
                                                    </div>
                                                    <div className="col mr-2">


                                                        <input maxLength={2} value={this.state.anos_experiencia} onChange={(e) => this.updateanosexperiencia(e.target.value)} className=" form-control form-control-sm mr-0 " id="anos_experiencia" name="anos_experiencia" type="text" />

                                                        < ValidationMessage className="error" valid={this.state.anos_experienciaValid} message={this.state.errorMsg.anos_experiencia} />







                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-9 col-md-6">
                                                <div className="row  ">
                                                    <div className="col-xs-2 mb-2">
                                                        <label>Formação:</label>
                                                    </div>
                                                    <div className="col mr-2 pr-xl-2 pr-md-1">
                                                        <input value={this.state.formacao} maxLength={50} onChange={(e) => this.updateformacao(e.target.value)} className=" form-control form-control-sm mr-0 " id="formacao" name="formacao" type="text" />


                                                        < ValidationMessage className="error" valid={this.state.formacaoValid} message={this.state.errorMsg.formacao} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row ">
                                                    <div className="col-xs-2 mb-2 ">
                                                        <label>Competências Humanas</label>
                                                    </div>
                                                    <div className="col mr-2">

                                                        <div className="input-group ">


                                                            <input type="text" className="form-control form-control-sm my-0 py-1 " id="compHumanas"
                                                                name="Competencias Humanas" value={inputTagValue1} onKeyDown={onKeyDown1} onChange={onChange1} />

                                                            <div className="input-group-append">
                                                                <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#F16830" }} onClick={this.handleInsertTag1}>Inserir</button>
                                                            </div>
                                                        </div>
                                                        <div> {suggestionsListComponent1}</div>
                                                        {this.tagsHum.map((name, index1) => {

                                                            {
                                                                const cor = index1.toString().split('').pop() === "0" ? (this.selectedColor1 = "#FAAC19")
                                                                    : index1.toString().split('').pop() === "1" ? (this.selectedColor1 = "#F16830")
                                                                        : index1.toString().split('').pop() === "2" ? (this.selectedColor1 = "#59CABC")
                                                                            : index1.toString().split('').pop() === "3" ? (this.selectedColor1 = "#CC2743")
                                                                                : index1.toString().split('').pop() === "4" ? (this.selectedColor1 = "#FAAC19")
                                                                                    : index1.toString().split('').pop() === "5" ? (this.selectedColor1 = "#F16830")
                                                                                        : index1.toString().split('').pop() === "6" ? (this.selectedColor1 = "#59CABC")
                                                                                            : index1.toString().split('').pop() === "7" ? (this.selectedColor1 = "#CC2743")
                                                                                                : index1.toString().split('').pop() === "8" ? (this.selectedColor1 = "#FAAC19")
                                                                                                    : index1.toString().split('').pop() === "9" ? (this.selectedColor1 = "#F16830")
                                                                                                        : "#FAAC19 ";
                                                            }

                                                            let estilochips1 = {
                                                                backgroundColor: this.selectedColor1,
                                                                marginTop: "2%",
                                                                marginRight: "0.5%",
                                                                fontWeight: "400",
                                                                color: "white"
                                                            };

                                                            return <Chip tabIndex={index1 + 1} label={name} onDelete={this.handleDelete1.bind(this, index1)} style={estilochips1} />
                                                        }, this)}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="row ">
                                                    <div className="col-xs-1 mb-2">
                                                        <label>Competências Técnicas</label>
                                                    </div>



                                                    <div className="col">
                                                        {/* COMEÇAM CHIPS NO BROWSER  */}

                                                        <div className="input-group ">


                                                            <input type="text" className="form-control form-control-sm my-0 py-1 " id="compTecnicas"
                                                                name="Competências Tecnicas" onChange={onChange} onKeyDown={onKeyDown}
                                                                value={inputTagValue} />

                                                            <div className="input-group-append">
                                                                <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#F16830" }} onClick={this.handleInsertTag}>Inserir</button>
                                                            </div>


                                                        </div>
                                                        <div> {suggestionsListComponent}</div>
                                                        {this.tagsTec.map((name, index) => {

                                                            {
                                                                const cor = index.toString().split('').pop() === "0" ? (this.selectedColor = "#FAAC19")
                                                                    : index.toString().split('').pop() === "1" ? (this.selectedColor = "#F16830")
                                                                        : index.toString().split('').pop() === "2" ? (this.selectedColor = "#59CABC")
                                                                            : index.toString().split('').pop() === "3" ? (this.selectedColor = "#CC2743")
                                                                                : index.toString().split('').pop() === "4" ? (this.selectedColor = "#FAAC19")
                                                                                    : index.toString().split('').pop() === "5" ? (this.selectedColor = "#F16830")
                                                                                        : index.toString().split('').pop() === "6" ? (this.selectedColor = "#59CABC")
                                                                                            : index.toString().split('').pop() === "7" ? (this.selectedColor = "#CC2743")
                                                                                                : index.toString().split('').pop() === "8" ? (this.selectedColor = "#FAAC19")
                                                                                                    : index.toString().split('').pop() === "9" ? (this.selectedColor = "#F16830")
                                                                                                        : "#FAAC19 ";
                                                            }

                                                            let estilochips = {
                                                                backgroundColor: this.selectedColor,
                                                                marginTop: "2%",
                                                                marginRight: "0.5%",
                                                                fontWeight: "400",
                                                                color: "white"
                                                            };

                                                            return <Chip tabIndex={index + 1} label={name} onDelete={this.handleDelete.bind(this, index)} style={estilochips} />
                                                        }, this)}
                                                    </div>


                                                </div>

                                                <div className="row justify-content-end ">
                                                    <div className=" text-right mt-5 mb-2  pr-0 col-lg-12 ">
                                                        <button type="Reset" className="btnoutlinelaranja " onClick={this.resetForm}>Limpar</button>

                                                        <button onClick={() => this.sendSave()} className='btnlaranjanormal' type='submit' disabled={!this.state.formValid}>Adicionar</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row justify-content-center">

                                <div className="col-lg-11 col-12 col-sm-11     my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal">Developers adicionados recentemente</h5>

                                    <table className="table table-striped mt-3 font-weight-light texto mb-2">
                                        <thead>

                                            <tr>
                                                <th scope="col">Foto</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Projetos Atuais</th>
                                                <th scope="col">Estado</th>

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



    sendSave() {

        // const fd = new FormData();
        // fd.append('image', this.state.foto, this.state.foto.name);

        const Url = HerokuURL + "/utilizador/create"

        const datapost = {


            nome: this.state.nome,
            password: this.state.password,
            email: this.state.email,
            estado: this.state.estado,
            tipo: this.state.tipo,
            morada: this.state.morada,
            codigopostal: this.state.codigopostal,
            telemovel: this.state.telemovel,
            fotourl: this.state.fotourl,
            // nomefoto: this.state.nomefoto,
            // tamanho: this.state.tamanho,
            // keyfoto: this.state.keyfoto,
            datanascimento: this.state.datanascimento,
            viajar: this.state.viajar,
            horasextra: this.state.horasextra,
            reunircliente: this.state.reunircliente,
            anos_experiencia: this.state.anos_experiencia,
            interesses: this.state.interesses,
            nr_contribuinte: this.state.nr_contribuinte,
            formacao: this.state.formacao,
            localidade: this.state.localidade,
            genero: this.state.genero,

            tagsHum: this.tagsHum,
            tagsTec: this.tagsTec,

        }

        axios.post(Url, datapost)
            .then(response => {
                if (response.data.success === true) {

                    alert(response.data.message)

                    this.Load_UtilizadoresRecentes();
                }
                else {
                    alert(response.data.message)

                }
            }).catch(error => {
                alert("Error 34 " + error)

            })
    }


    loadFillData() {

        //enquanto houver, preenche
        return this.state.utilizadorrecente.map((data, index, index1, index2, index3) => {
            return (

                <tr >
                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#ModalAbreEditarProjeto' + index} key={index} >
                        <img className="maxphotoperfil " src={data.fotourl} alt=""></img></td>

                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#ModalAbreEditarProjeto' + index} key={index1}> {data.nome}</td>

                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#ModalAbreEditarProjeto' + index} key={index2} > {data.n_projetos_utilizador} </td>

                    <td style={{ cursor: 'pointer' }} data-toggle="modal" data-target={'#ModalAbreEditarProjeto' + index} key={index3} >

                        {(data.estado === true ? (<img src="imagens/ativo.png" alt="Estado ativo do projeto" />) : <img src="imagens/desativo.png" alt="Estado desatvado do projeto" />)}
                    </td>


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
                                                <h5 className="pb-1 mt-3 titulos font-weight-normal text-left">Informações Gerais</h5>
                                                <hr />


                                                <form>
                                                    <div className="row font-weight-light texto ">
                                                        <div className="col-lg-2 justify-content-center">
                                                            <div className="row">
                                                                <div className="col-lg-12  mb-4">
                                                                    <img className="maxphotoperfilaberto" alt="" src={data.fotourl} ></img>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm pl-5">
                                                            <div className="row ">
                                                                <div className="col-xl-12 col-lg-11 ml-lg-3 ml-xl-0 ">
                                                                    <div className="row ">
                                                                        <div className="col-xs-1  mr-md-1  font-weight-normal">
                                                                            <label>Nome: </label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label> {data.nome}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-xl-12 col-lg-11 ml-lg-3 ml-xl-0">
                                                                    <div className="row ">
                                                                        <div className="col-xs-1 font-weight-normal">
                                                                            <label>Contribuinte:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label> {data.nr_contribuinte}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row ">
                                                                <div className="col-xl-5 col-lg-12   ">
                                                                    <div className="row ">
                                                                        <div
                                                                            className="col-xs-1 pl-md-0 font-weight-normal pl-xl-0 pl-lg-3">
                                                                            <label>Telemovel:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label> {data.telemovel}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-7 col-lg-12">
                                                                    <div className="row ">
                                                                        <div className="col-xs-1 pl-md-0  pl-lg-3 font-weight-normal">
                                                                            <label>Email:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label> {data.email}</label>
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
                                                                <div className="col-xl-5 col-lg-12   ">
                                                                    <div className="row ">
                                                                        <div
                                                                            className="col-xs-1 pl-md-0  pl-lg-3 font-weight-normal pl-xl-0">
                                                                            <label>Localidade:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.localidade}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-7 col-lg-12">
                                                                    <div className="row ">
                                                                        <div className="col-xs-1 pl-md-0  pl-lg-3  font-weight-normal">
                                                                            <label>Código Postal:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.codigopostal}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>



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
                                                                            <label> Formação: </label>
                                                                        </div>
                                                                        <div className="col">
                                                                            <label>{data.formacao}</label>
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

                                                                                {(data.estado === true ?
                                                                                    (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}

                                                                                <label
                                                                                    className="custom-control-label"
                                                                                    htmlFor="customSwitch1"
                                                                                >
                                                                                    Ativo </label>
                                                                            </div>
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

                                </div>
                                <div className="modal-footer bg-white ">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </tr>
            )

        });
    }
}
export default RHAdicionarDev;