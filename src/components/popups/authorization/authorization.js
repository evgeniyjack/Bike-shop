import close from '../../../assets/svg/close.svg';

import { HashLink } from 'react-router-hash-link';
import Spinner from '../../spinner/spinner';

import { useHttp } from '../../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';

import { loginFetch } from '../../../actions/actions';

import { CSSTransition } from 'react-transition-group';

const AuthForm = ({setPopup}) => {
    const {request} = useHttp();
    const dispatch = useDispatch();
    const loginLoadingStatus = useSelector(store => store.userReducer.loginLoadingStatus);

    if (loginLoadingStatus === 'loading') {
        return (
            <div className="modal center">
                <div className="popup">
                    <Spinner />
                </div>
            </div>
        )
    }

    return (
        <CSSTransition
            in={true} 
            appear={true} 
            timeout={200} 
            classNames="popup" 
            unmountOnExit    
        >
            <div className="modal center">
                <div className="popup">
                    <div className="title-form">Вход</div>
                    <button onClick={() => setPopup(false)} className="close"><img src={ close } alt="close icon" /></button>
                    <form onSubmit={(e) => dispatch(loginFetch(request, e, 'api/auth/sign_in', setPopup))}>
                        <div className="form-group">
                            <label>E-mail</label>
                            <input required type="text" name="email" placeholder="velo@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label>Пароль</label>
                            <input required type="password" name="password" placeholder="***************" />
                        </div>
                        <button className="btn">Войти</button>
                        <p>Если у вас нету аккаунта - <HashLink smooth to="/#registration" onClick={() => setPopup(false)}>Зарегистрируйтесь</HashLink></p>
                    </form>
                </div>
            </div>
        </CSSTransition>
    );
}

export default AuthForm;