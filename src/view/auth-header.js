export default function authHeader() {
    const Utilizador = JSON.parse(localStorage.getItem('Utilizador'));
    if (Utilizador && Utilizador.token) {
        return { Authorization: 'Bearer ' + Utilizador.token };
    } else {
        return {};
    }
}