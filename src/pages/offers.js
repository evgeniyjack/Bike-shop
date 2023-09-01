import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";

import { offerDelete } from "../actions/actions";

import { _apiUrl } from "../App";

import Spinner from "../components/spinner/spinner";
import { Link } from "react-router-dom";
import Clear from "../components/clear/clear";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useCallback } from "react";

const Offers = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();

    const token = useSelector(store => store.userReducer.user.token);
    const offersLoadingStatus = useSelector(store => store.offersReducer.offersLoadingStatus);
    const offers = useSelector(store => store.offersReducer.offers);

    const deleteOffer = useCallback((e) => {
        const id = e.target.getAttribute('data-id');

        request(_apiUrl + 'api/officers/' + id, 'DELETE', null,
            {'Authorization': `Bearer ${token}`})
                .then(() => dispatch(offerDelete(id)))
                .catch(error => alert(error));
    }, [])
    
    if (offersLoadingStatus === 'loading') {
        return <Spinner />
    }

    const renderOffers = (arr) => {
        if (arr.length === 0) {
            return <Clear />
        }

        return arr.map(({firstName, lastName, approved, _id}) => {
            return (
                <CSSTransition
                    key={_id}
                    timeout={300}
                    classNames="fade"
                >
                    <div className="offer__item">
                        <Link to={`/offer/${_id}`}>
                            <p>Имя: <span>{firstName}</span></p>
                            <p>Фамилия: <span>{lastName}</span></p>
                            <p>Одобрен: <span>{approved ? 'Да' : 'Нет'}</span></p>
                        </Link>
                        <button className="btn" onClick={deleteOffer} data-id={_id}>Удалить сотрудника</button>
                    </div>
                </CSSTransition>
            );
        })
    }

    const elements = renderOffers(offers);

    return (
        <section className="wh">
            <div className="container">
                <TransitionGroup className="offers-wrapper officers">
                    {elements}
                </TransitionGroup>
            </div>
        </section>
    );
}

export default Offers;