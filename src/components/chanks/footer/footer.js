import { Link} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import logo from '../../../assets/svg/logo.svg';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-wrapper">
                    <div className="footer__item">
                        <a href="#" className="logo"><img src={ logo } alt="logo" /></a>
                        <p className="copyright">© 2023, Все права защищены </p>
                    </div>
                    <div className="footer__item footer__nav">
                        <ul>
                            <li><Link href="#">Главная</Link></li>
                            <li><HashLink smooth to="/#about-us">О нас</HashLink></li>
                            <li><HashLink smooth to="/#tarifs">Тарифы</HashLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;