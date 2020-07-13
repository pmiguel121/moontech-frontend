import React, {  } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "./auth.service";
const HerokuURL = "https://moontech-backend.herokuapp.com/";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo é de preenchimento obrigatório!
            </div>
        );
    }
};

export default class IndexSite extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUtilizador = this.onChangeUtilizador.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            Utilizador: "",
            password: "",
            loading: false,
            message: "",

        };

    }

    onChangeUtilizador(e) {
        this.setState({ Utilizador: e.target.value });
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({ message: "", loading: true });
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            // console.log(this.state.Utilizador)
            // console.log(this.state.password)
            AuthService.login(this.state.Utilizador, this.state.password)

                .then((res) => {
                    if (res.success) {
                        this.setState({ message: 'Login efetuado com sucesso.' })
                        if (res.tipoUser === 1)

                            this.props.history.push("/DEVPerfil");
                        else if (res.tipoUser === 2)

                            this.props.history.push("/DEVPerfil");

                        else if (res.tipoUser === 3)
                            this.props.history.push("/RHDashboard");

                    }

                    else {

                        this.setState({ message: res.message })
                    }

                }
                );

        }
    }



    render() {
        return (
            <div>
                <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                    <main>
                        <div className="limiter">
                            <div className="container-login100">
                                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                                    <Form onSubmit={this.handleLogin} ref={c => { this.form = c; }} className="login100-form validate-form">
                                        <div className="">
                                            <img src="imagens/bizdirect.png" alt="bizdirect logo" id="bizdirect" />
                                        </div>

                                        <div className="wrap-input100 validate-input" data-validate="Email válido é necessário: ex@abc.xyz">
                                            <Input className="input100" type="text" name="email" placeholder="Email"
                                                value={this.state.Utilizador} onChange={this.onChangeUtilizador}
                                                validations={[required]} />
                                            
                                        </div>
                                        <span className="focus-input100-1"></span>
                                            <span className="focus-input100-2"></span>

                                        <div className="wrap-input100 rs1 validate-input" data-validate="Password necessária">
                                            <Input className="input100" type="password"  placeholder="Password" name="password"
                                                value={this.state.password} onChange={this.onChangePassword}
                                                validations={[required]} />
                                          
                                        </div>
                                        <span className="focus-input100-1"></span>
                                            <span className="focus-input100-2"></span>



                                        <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
                                        <div className="container-login100-form-btn m-t-20">
                                            <button className="login100-form-btn"> Entrar </button>
                                        </div>
                                        {this.state.message && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {this.state.message}
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-center p-t-45 p-b-4">
                                            <span className="txt1 mr-1">  Forgot </span>

                                            <a href="/#" className="txt2 hov1  ">
                                                Email / Password?	</a>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer>
                        <div className="footer" >
                            <h6>Powered by</h6>
                            <img src="imagens/moontechlogo-preto.png" id="moontech" alt="" />
                        </div>
                    </footer>
                </div>
            </div >
        );
    }
}