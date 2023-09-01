import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";

import { theftDelete } from "../actions/actions";

import { Link } from "react-router-dom";
import Spinner from "../components/spinner/spinner";
import Clear from "../components/clear/clear";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { _apiUrl } from "../App";

import { statuses, veloTypes } from "../App";

const Thefts = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();

    const token = useSelector(store => store.userReducer.user.token);
    const thefts = useSelector(store => store.theftsReducer.thefts);
    const theftsLoadingStatus = useSelector(store => store.theftsReducer.theftsLoadingStatus);
    const offers = useSelector(store => store.offersReducer.offers); 

    const deleteTheft = useCallback((e) => {
        const id = e.target.getAttribute('data-id');

        request(_apiUrl + 'api/cases/' + id, 'DELETE', null,
            {'Authorization': `Bearer ${token}`})
                .then(() => dispatch(theftDelete(id)))
                .catch(error => alert(error));
    }, [])
    
    if (theftsLoadingStatus === 'loading') {
        return <Spinner />
    }

    const renderTheftsList = (arr) => {
        if (arr.length === 0) {
            return <Clear />
        }

        return arr.map(({status, _id, licenseNumber, type, ownerFullName, createdAt, updatedAt, color, officer, description, resolution}) => {
            const statusTheft = statuses.find(({name}) => name === status);
            const currentOfficer = offers.find(({_id}) => officer === _id); 
            return (
                <CSSTransition
                    key={_id}
                    classNames="fade"
                    timeout={500} 
                >
                    <div className="offer__item">
                        <Link to={`/theft/${_id}`}>
                            <p>Статус: <span>{statusTheft.string}</span></p>
                            <p>Номер лицензии: <span>{licenseNumber}</span></p>
                            <p>Тип велосипеда: <span>{veloTypes[type]}</span></p>
                            <p>ФИО: <span>{ownerFullName}</span></p>
                            <p>Дата создания: <span>{new Date(createdAt).toLocaleString()}</span></p>
                            <p>Дата последнего обновления: <span>{updatedAt ? new Date(updatedAt).toLocaleString() : '-'}</span></p>
                            <p>Цвет: <span>{color}</span></p>
                            <p>Отвественный сотрудник: <span>{currentOfficer ? `${currentOfficer.firstName} ${currentOfficer.lastName}` : '-'}</span></p>
                            <p>Комментарий клиента: <span>{description ? description : '-'}</span></p>
                            <p>Завершающий комментарий: <span>{resolution ? resolution : '-'}</span></p>
                        </Link>
                        <button data-id={_id} className="btn" onClick={deleteTheft}>Удалить сообщение</button>
                    </div>
                </CSSTransition>
            )
        })
    }

    const elements = renderTheftsList(thefts)

    return (
        <section className="wh">
            <div className="container">
                <TransitionGroup className="offers-wrapper">
                    {elements}
                </TransitionGroup>
            </div>
        </section>
    );
}

export default Thefts;