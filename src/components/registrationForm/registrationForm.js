import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";

import { clientId } from "../../App";

import { loginFetch } from "../../actions/actions";

const FormReg = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();

    return (
        <form onSubmit={(e) => dispatch(loginFetch(request, e, 'api/auth/sign_up', false, clientId))} className="registration">
            <div className="form-group">
                <label>Ваше имя</label>
                <input type="text" name="firstName" placeholder="Имя" />
            </div>
            <div className="form-group">
                <label>Ваша фамилия</label>
                <input type="text" name="lastName" placeholder="Фамилия" />
            </div>
            <div className="form-group">
                <label>E-mail</label>
                <input required type="email" name="email" placeholder="velo@gmail.com" />
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input required type="password" name="password" placeholder="***************" />
            </div>
            <button className="btn">Отправить</button>
        </form>
    );
}

export default FormReg;