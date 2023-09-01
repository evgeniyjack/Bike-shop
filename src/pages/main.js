import { useSelector } from "react-redux";

import FormReg from "../components/registrationForm/registrationForm";

const Main = () => {
    const auth = useSelector(store => store.userReducer.auth);

    return (
        <>
            <section className="bg-w" id="about-us">
                <div className="container">
                    <div className="about-us__wrapper block__group g-60">
                        <div className="title">Прокат велосипедов <span>GoodBike</span></div>
                        <p>это широчайший выбор велосипедов в прокат в Барнауле: стандартные и горные, велосипеды комфорт-класса, BMX, складные велосипеды Shulz – всё для того, чтобы поймать велодрайв!</p>
                        <div className="phrase">Копите впечатления, а не вещи!</div>
                    </div>
                </div>
            </section>

            <section className="bg-orange" id="tarifs">
                <div className="container">
                    <div className="title-section">Тарифы</div>
                    <div className="cards__container">
                        <div className="card__item active">
                            <div className="time">1 сутки</div>
                            <div className="price">690р</div>
                            <a href="#">Выбрать</a>
                        </div>
                        <div className="card__item">
                            <div className="time">1 неделя</div>
                            <div className="price">990р</div>
                            <a href="#">Выбрать</a>
                        </div>
                        <div className="card__item">
                            <div className="time">2 недели</div>
                            <div className="price">1990р</div>
                            <a href="#">Выбрать</a>
                        </div>
                        <div className="card__item">
                            <div className="time">1 месяц</div>
                            <div className="price">3300р<span>/мес</span></div>
                            <a href="#">Выбрать</a>
                        </div>
                        <div className="card__item">
                            <div className="time">2 месяца</div>
                            <div className="price">3000р<span>/мес</span></div>
                            <a href="#">Выбрать</a>
                        </div>
                        <div className="card__item">
                            <div className="time">3 месяца</div>
                            <div className="price">2700р<span>/мес</span></div>
                            <a href="#">Выбрать</a>
                        </div>
                    </div>
                </div>
            </section>

            {
                !auth && 
                <section className="bg-w" id="registration"> 
                    <div className="container">
                        <div className="title-section">Зарегистрируйтесь, <br/> чтобы забронировать</div>
                        <FormReg />
                    </div>
                </section>
            }
        </>
    );
}

export default Main;