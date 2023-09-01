import { Link, useLocation} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/svg/logo.svg';

import { useCallback, useState } from 'react';

import AuthForm from '../../popups/authorization/authorization';
import OfferForm from '../../popups/offerForm/offerForm';

import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../../actions/actions';

const Header = () => {
    const location = useLocation();

    const [auth, setAuth] = useState(false);
    const [offer, setOffer] = useState(false);

    const dispatch = useDispatch();
    const userState = useSelector(store => store.userReducer);

    return (
        <>
            {auth && <AuthForm setPopup={setAuth} />}
            {offer && <OfferForm setPopup={setOffer}/>}
            <header>
                <nav>
                    <div className="container">
                        <a href="#" className="logo"><img src={logo} alt="logo" /></a>
                        <div className="navbar-wrapper">
                            <ul>
                                <li><NavLink  to="/">Главная</NavLink></li>
                                {
                                    userState.auth && userState.approved ? 
                                    <>
                                        <li><NavLink to="/offers">Сотрудники</NavLink></li>
                                        <li><NavLink to="/thefts">Кражи</NavLink></li>
                                    </>
                                    :
                                    <>
                                        <li><HashLink smooth to="/#about-us">О нас</HashLink></li>
                                        <li><HashLink smooth to="/#tarifs">Тарифы</HashLink></li>
                                    </>
                                }
                            </ul>
                            <div className="nav-buttons">
                                <button className="btn" onClick={() => setOffer(true)}>Сообщить о краже</button>
                                {userState.user.user ? 
                                    <div className='accout'>
                                        <p>{userState.user.user.firstName}</p>
                                        <Link to="/" onClick={() => dispatch(logOut())}>Выйти</Link>
                                    </div>
                                    :
                                    <button className="btn btn-transparent" onClick={() => setAuth(true)}>Вход / регистрация</button>
                                }
                            </div>
                        </div>
                    </div>
                </nav>

                {location.pathname === '/' && 
                    <main>
                        {(userState.auth && !userState.approved) && <p>Вас еще не подтвердили!</p>}
                        <div className="container block__group g-60">
                            <h1>Аренда велосипеда <br />
                                за 2700₽ на месяц</h1>
                            <p>Отпрвляйся на романтическую велопрогулку, атмосферную поездку или экстримальное путешествие</p>
                            <div className="block__group">
                                <button className="btn">Забронировать</button>
                                <a href="#">Узнать подробнее</a>
                            </div>
                        </div>
                    </main>
                }
            </header>
        </>
    );
}

export default Header;