import axios from "axios";

// const { currentUser } = this.state;

const HerokuURL = "https://moontech-backend.herokuapp.com";

class AuthService {

    login(email, password) {
        return axios
            .post(HerokuURL + "/utilizador/login", { email, password })
            .then(res => {
                if (res.data.token) {
                    
                    localStorage.setItem("Utilizador", JSON.stringify(res.data));
                }
                return res.data;
            })
            .catch(error => {
                return error;
            });

    }

    logout()  { 
        localStorage.removeItem("Utilizador"); 
    }



    getCurrentUser() { return JSON.parse(localStorage.getItem("Utilizador")); }
      
}

export default new AuthService();



