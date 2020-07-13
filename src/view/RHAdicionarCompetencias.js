import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
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


class RHAdicionarCompetencias extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            //campos
            skills: [],

            utilizador: [],

            //validações
            nome: '', nomeValid: false,
            tipo: '', siglaValid: false,
            categoria: "", elementosValid: false,
            formValid: false,
            errorMsg: {},


        };
    }


    componentDidMount() {
        this.Load_skillsRecentes()
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

    Load_skillsRecentes() {
        const url = HerokuURL + "/skill/recentes";
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ skills: data });


            } else {
                alert("Erro no Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }


    //LIMPAR FORM

    resetForm = () => {
        this.setState({

            //campos
            nome: "",
            tipo: 0,
            categoria: "",

        })
    }


    //VALIDAÇÕES 


    validateForm = () => {
        const { nomeValid } = this.state;
        this.setState({
            formValid: nomeValid
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
            errorMsg.nome = 'Insira o nome da competência'
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


    render() {



        // const { isOpen } = this.state;

        return this.state.utilizador.map((data, index) => {
            return (

                <div style={{ marginLeft: "0px", marginRight: "15px" }}>
                    <div className="row">
                        <div className="d-none d-xl-block  col-xl-2">

                            <div className="modal fade " id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenter"
                                aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content1">
                                        <div className="modal-header bg-white ">
                                            <h5 className="modal-title" id="exampleModalCenter">Remover Competência</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">


                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body pre-scrollable1">
                                            <div className="container-fluid">

                                                <p className="texto"> Deseja remover a competência Organização?</p>

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
                                        <Link to="/RHDashboard"><div className="profile-img mb-xl-4 "> <img className="profile-img maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /> </div></Link>
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
                                                src="imagens/ceveloper.svg" width="24px" alt="" /><span className="pl-3">Developers</span></a>

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

                                    <h5 className="pb-1 titulos font-weight-normal">Adicionar Competências</h5>
                                    <hr />

                                    <form className="my-4 font-weight-light col-xl-12 texto">
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-xs-2  mb-2 ">
                                                        <label>Nome</label>
                                                    </div>
                                                    <div className="col mr-2  mx-sm-0 ">

                                                        <input value={this.state.nome} onChange={(e) => this.updateNome(e.target.value)}
                                                            type="text" className="form-control form-control-sm" id="titulo"
                                                            name="titulo" />
                                                        < ValidationMessage className="error" valid={this.state.nomeValid} message={this.state.errorMsg.nome} />

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 ">
                                                <div className="row mb-2">
                                                    <div className="col-xs-1 mr-sm-1">
                                                        <label>Tipo</label>

                                                    </div>
                                                    <div className="col mr-1">

                                                        <select value={this.state.tipo} onChange={(value) => this.setState({ tipo: value.target.value })} className="form-control form-control-sm" id="tipo">

                                                            <option value={0}></option>
                                                            <option value={2}>Competências Humanas</option>
                                                            <option value={1}>Competências Técnicas</option>
+
                                                        </select>
                                                    </div>
                                                    <div className="col-xs-2">
                                                        <label className="col-xs-1">Categoria</label>
                                                    </div>
                                                    <div className="col">

                                                        {(this.state.tipo == 1 ? <select id="categoria" value={this.state.categoria} onChange={(value) => this.setState({ categoria: value.target.value })} className="form-control form-control-sm"  >
                                                            <option></option>
                                                            <option> </option>
                                                            <option>Conteúdos Audiovisuais </option>
                                                            <option>Desenvolvimento Web </option>
                                                            <option>Design </option>
                                                            <option>Gestão</option>
                                                            <option>Informática </option>
                                                            <option>Línguas </option>
                                                            <option>Matemática</option>
                                                            <option>Programação</option>
                                                            <option>Outro</option>


                                                        </select> : <select disabled id="categoria" value="" className="form-control form-control-sm"  >

                                                                <option> </option>


                                                            </select>)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className=" text-right mt-3 mb-2  pr-0 col-lg-12 ">
                                                <button type="reset" value="Limpar" className="btnoutlineamarelo " onClick={this.resetForm}>Limpar</button>
                                                <button onClick={() => this.sendSave()} type='submit' disabled={!this.state.formValid} className="btnamarelonormal ">Adicionar</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-lg-11 col-12 col-sm-11  my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">


                                    <h5 className="pb-1 titulos font-weight-normal">Competências adicionadas recentemente</h5>

                                    <table className="table table-striped mt-3 font-weight-light texto mb-2 ">
                                        <thead>

                                            <tr>
                                                <th scope="col">Competência</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Categoria</th>
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
        return this.state.skills.map((data, index, index1, index2) => {
            return (

                <tr >
                    <td key={index}>{data.nome}</td>
                    <td key={index1}> {data.tipo === 1 ? "Competência Técnica" : "Competência Humana"}</td>
                    <td key={index2}> {data.categoria}</td>
                </tr>

            )

        });
    }




    sendSave() {




        if (this.state.nome === "") {
            alert("Insira um nome.");
        }
        if (this.state.tipo === "") {
            alert("Insira um tipo");
        }




        else {
            const Url = HerokuURL + "/skill/create"


            const datapost = {

                nome: this.state.nome,
                tipo: this.state.tipo,
                categoria: this.state.categoria,

            }


            axios.post(Url, datapost)
                .then(response => {

                    if (response.data.success === true) {


                        alert(response.data.message)
                        this.Load_skillsRecentes();
                    }
                    else {
                        alert(response.data.message)

                    }
                }).catch(error => {
                    alert("Erro!" + error)

                })
        }
    }



}

export default RHAdicionarCompetencias;