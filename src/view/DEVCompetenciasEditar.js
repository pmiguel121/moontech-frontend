import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const HerokuURL = "https://moontech-backend.herokuapp.com";

class DEVCompetenciasEditar extends React.Component {
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
            inputTagValue: '',
            inputTagValue1: '',
            skills_utilizador_tecnicas: [],
            skills_utilizador_humanas: [],
            SkillsTec: [],
            SkillsHum: [],

            //chips

            activeSuggestion: 0,
            activeSuggestion1: 0,
            filteredSuggestions: [],
            filteredSuggestions1: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            showSuggestions1: false,

            utilizador: [],


            nivel: 0,
            id_skill: "",
            id_utilizador: 0,

            show: false,
            show1: false,


            //ID E COMPETENCIA
            valorescompetencia: [],
            valorescompetencia1: [],
            tagsTecArmazena: "",
            tagsHumArmazena: ""

        };

        // this.tags = [];
        // this.tags1 = [];

        this.tagsTec = [];
        this.tagsHum = [];
        this.handleChange = this.handleChange.bind(this);

        this.handleChange1 = this.handleChange1.bind(this);

        this.handle_Slider = this.handle_Slider.bind(this);
    }
    handleChange(event) {
        this.setState({ inputTagValue: event.target.value });

    }

    handleChange1(event) {
        this.setState({ inputTagValue1: event.target.value1 });

    }

    resetForm = () => {
        this.setState({

            //campos
            inputTagValue: "",
            inputTagValue1: ""


        })
    }




    //SLIDER
    handle_Slider(value, id_skill, id_utilizadorskill) {
        this.setState({ valorescompetencia: [value, id_skill, id_utilizadorskill] });

        this.Load_skills_utilizador_Tecnicas();
        this.Load_skills_utilizador_Humanas();

    };
    handle_Slider1(value, id_skill, id_utilizadorskill) {
        this.setState({ valorescompetencia1: [value, id_skill, id_utilizadorskill] });



        this.Load_skills_utilizador_Tecnicas();
        this.Load_skills_utilizador_Humanas();

    };
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
        this.Load_skills_utilizador_Tecnicas()
        this.Load_skills_utilizador_Humanas()
        this.carregadatadaschipsHumanas()
        this.carregadatadaschipstecnicas()
        this.Load_skillshumanas()
        this.Load_skillsTecnicas()
        this.Load_foto();
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

    carregadatadaschipstecnicas() {

        const { suggestions } = this.props;
        return this.state.SkillsTec.map((data, index) => {
            return suggestions.push(data.nome)
        })
    }
    carregadatadaschipsHumanas() {

        const { suggestions1 } = this.props;
        return this.state.SkillsHum.map((data, index) => {
            return suggestions1.push(data.nome)
        })
    }

    Load_skills_utilizador_Tecnicas() {
        let id_utilizador = JSON.parse(localStorage.getItem('Utilizador')).nrUser;
        const url = HerokuURL + "/utilizador/BuscaSkillsEspcTecnicas/" + id_utilizador
        axios.get(url).then(res => {




            if (res.data.success) {
                const data = res.data.data;
                this.setState({ skills_utilizador_tecnicas: data });

            } else {
                alert("Erro no servidor web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }



    Load_skills_utilizador_Humanas() {
        let id_utilizador = JSON.parse(localStorage.getItem('Utilizador')).nrUser;
        const url = HerokuURL + "/utilizador/BuscaSkillsEspcHumanas/" + id_utilizador
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ skills_utilizador_humanas: data });


            } else {
                alert("Erro no servidor web!");
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
                                        <Link to="/DEVPesquisarProjetos" className="p-3"> <img src="imagens/projetos.svg" width="24px" alt="" /><span className="pl-3">Projetos</span></Link>
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


                            <h3 className="ml-4 mt-5 titulos text-left"> Competências</h3>

                            <div className="row justify-content-center">

                                <div className="col-lg-5 col-12 col-sm-11    my-4 pr-5 pl-5 pt-4 pb-4 mr-lg-5 mr-sm-0  bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal text-left">Competências Técnicas</h5>
                                    <hr />

                                    {this.loadFillDataTecnicas()}

                                    {this.state.show === true ?

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

                                                                <button className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#a6a6a6" }} onClick={() => this.sendSave()}>Adicionar</button>
                                                            </div>
                                                        </div>
                                                        <div> {suggestionsListComponent}</div>

                                                    </div>


                                                </div>
                                            </div>

                                        </div>

                                        : ""}


                                    <div className="row justify-content-end col-lg-12 mt-2 mb-2   float-right">

                                        <button onClick={() => { this.setState({ show: !this.state.show }) }} className="btnamarelonormal">
                                            {/* onClick={() => { this.setState({ show: !this.state.show })}} */}
                                            Atualizar
                                            </button>

                                    </div>

                                </div>

                                <div className="col-lg-5 col-12 col-sm-11  my-4 pr-5 pl-5 pt-4 pb-0 ml-sm-0 ml-lg-5 ml-md-0 bg-white ">

                                    <h5 className="pb-1 titulos font-weight-normal text-left">Competências Humanas</h5>
                                    <hr />

                                    {this.loadFillDataHumanas()}

                                    {this.state.show1 === true ?
                                        <div className="row text-left">


                                            <div className="col  mt-3">
                                                <div className="row mb-2 ">
                                                    <div className="col-xs-3 col-xs-3 col-md-4 col-lg-3 col-xl-3 pl-0 pr-0 mr-0">
                                                        <label className="col pt-2 font-weight-light ">Competência</label>
                                                    </div>


                                                    <div className="col-xs-9  col-xs-9 col-lg-9  col-md-8 col-xl-9">



                                                        <div className="input-group ">


                                                            <input type="text" className="form-control form-control-sm my-0 py-1 " id="compHumanas"
                                                                name="Competencias Humanas" value={this.state.inputTagValue1} onKeyDown={onKeyDown1} onChange={onChange1} />

                                                            <div className="input-group-append">
                                                                <button onClick={() => this.sendSave1()} className="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#a6a6a6" }}  >Adicionar</button>
                                                            </div>
                                                        </div>
                                                        <div> {suggestionsListComponent1}</div>



                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                        : ""}

                                    <div className="row justify-content-end col-lg-12 mt-2 mb-2   float-right">


                                            <button onClick={() => { this.setState({ show1: !this.state.show1 }) }} className="btnamarelonormal">
                                                {/* onClick={() => { this.setState({ show: !this.state.show })}} */}
                                            Atualizar
                                            </button>

                                    </div>

                                </div>

                            </div>


                            <div className="row justify-content-center">
                                <div className="col-lg-7 col-12 col-sm-11    my-4 pr-5 pl-5 pt-4 pb-4 mr-lg-5 mr-sm-0 bg-white">
                                    <h5 className="pb-1 titulos font-weight-normal text-left">Avaliações</h5>
                                    <hr />
                                    <div className="row font-weight-light">

                                        <div className="col-lg-1 col-1 ">
                                            <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                        </div>
                                        <div className="col-lg-5 col-11 ">
                                            <div className="  ml-4">"Excelente editor com grandes capacidades para entrar em
                                            futuros
                                    projetos."</div>
                                            <div className=" small ml-5"> Bruno Fernandes, Team Leader</div>
                                        </div>


                                        <div className="col-lg-1 col-1 ">
                                            <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                        </div>
                                        <div className="col-lg-5 col-11 ">
                                            <div className=" ml-4">Excelente editor com grandes capacidades para entrar em
                                            futuros
                                    projetos."</div>
                                            <div className=" small ml-5"> Bruno Fernandes, Team Leader</div>
                                        </div>
                                    </div>

                                    <div className="row font-weight-light mt-4">

                                        <div className="col-lg-1 col-1 ">
                                            <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                        </div>
                                        <div className="col-lg-5 col-11 ">
                                            <div className="  ml-4">"Excelente editor com grandes capacidades para entrar em
                                            futuros
                                    projetos."</div>
                                            <div className=" small ml-5"> Bruno Fernandes, Team Leader</div>
                                        </div>


                                        <div className="col-lg-1 col-1 ">
                                            <img src="imagens/teste.png" className="maxphotoavaliacoes" alt="" />
                                        </div>
                                        <div className="col-lg-5 col-11 ">
                                            <div className=" ml-4">Excelente editor com grandes capacidades para entrar em
                                            futuros
                                    projetos."</div>
                                            <div className=" small ml-5"> Bruno Fernandes, Team Leader</div>
                                        </div>
                                    </div>



                                </div>
                                <div className="col-lg-3 col-12 col-sm-11  my-4 pr-5 pl-5 pt-4 pb-4 ml-lg-5 ml-sm-0 bg-white ">

                                    <h5 className="pb-1 titulos font-weight-normal">Recomendações</h5>
                                    <hr />
                                    <div className="row mt-2  text-left">
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
                                    <div className="row mt-2  text-left">
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
                                    <div className="row mt-2  text-left">
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
                                    <div className="row mt-2  text-left">
                                        <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3">
                                            <span className="my-4 font-weight-light"> AfterEffects</span>
                                        </div>
                                        <div className="col xl-12">
                                            <span className="my-4 font-weight-light">
                                                <div className="progress">
                                                    <div className="progress-bar bg-danger" style={{ width: "95%" }}></div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt-2 text-left">
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
                                    <div className="row mt-2 text-left">
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



                                </div>
                            </div >




                        </div>
                    </div>
                </div>

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
                                {this.state.show === false ?

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
                                {this.state.show1 === false ?

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



    sendUpdate() {


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

    sendSave() {
        const Url = HerokuURL + "/utilizador_skills/createTec"

        const datapost = {

            id_utilizador: JSON.parse(localStorage.getItem('Utilizador')).nrUser,
            tagsTecArmazena: this.state.inputTagValue,

        }




        axios.post(Url, datapost)


            .then(response => {
                if (response.data.status === 200) {


                }
                else {
                    this.Load_skills_utilizador_Tecnicas()
                    this.resetForm()

                }


            }).catch(error => {
                alert("Error 34 " + error)
            })
        // window.location.reload()


    }


    sendSave1() {
        const Url = HerokuURL + "/utilizador_skills/createHum"

        const datapost = {

            id_utilizador: JSON.parse(localStorage.getItem('Utilizador')).nrUser,
            tagsHumArmazena: this.state.inputTagValue1,

        }
        this.Load_skills_utilizador_Humanas()

        axios.post(Url, datapost)
            .then(response => {
                if (response.data.status === 200) {


                }
                else {
                    // alert(response.data.message)

                    this.Load_skills_utilizador_Humanas()
                    this.resetForm()

                }


            }).catch(error => {
                alert("Error 34 " + error)
            })
        // window.location.reload()
    }

    onDelete(id_utilizadorskill) {
        Swal.fire({
            title: 'Tem a certeza que quer apagar?',
            text: 'Não irá conseguir recuperar novamente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, Apagar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.sendDelete(id_utilizadorskill)
                //console.log("Alerta " + id_utilizadorskill)
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
        const Url = HerokuURL + "/utilizador_skills/delete/" + userId;

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
                this.Load_skills_utilizador_Humanas()
                this.Load_skills_utilizador_Tecnicas()
            }).catch(error => {
                alert("Error 325 ")
            })
    }





}
export default DEVCompetenciasEditar;