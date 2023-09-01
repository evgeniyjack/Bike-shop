import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttp } from "../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

import { _apiUrl } from "../App";

import { updateTheft } from "../actions/actions";

import Spinner from "../components/spinner/spinner";
import { Link } from "react-router-dom";

import { statuses, veloTypes } from "../App";

const Theft = () => {
    const { id } = useParams();
    const { request } = useHttp();
    const token = useSelector(store => store.userReducer.user.token);
    const offers = useSelector(store => store.offersReducer.offers);
    const dispatch = useDispatch();

    const [statusTheft, setStatusTheft] = useState('new');
    const [officerTheft, setOfficerTheft] = useState();
    const [resolutionTheft, setResolutionTheft] = useState('');
    const [theft, setTheft] = useState('loading');
    
    const {color, createdAt, description, ownerFullName, licenseNumber, officer, status, type, updatedAt, resolution} = theft;

    useEffect(() => {
        if (theft !== 'loading') {
            setStatusTheft(status);
            setOfficerTheft(officer);
            setResolutionTheft(resolution);
        };
    }, [theft])
    
    useEffect(() => {
        if (token) {
            request(_apiUrl + 'api/cases/' + id, 'GET', null, {'Authorization': `Bearer ${token}`})
                .then(res => setTheft(res.data))
                .catch(error => console.log(error))
        }
    }, [token])

    const updateTheftElement = () => {
        request(_apiUrl + 'api/cases/' + id, 'PUT', JSON.stringify({
            status: statusTheft,
            officer: officerTheft,
            resolution: resolutionTheft
        }), {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
            .then(res => {
                alert('Изменения сохранены!');
                dispatch(updateTheft(res.data));
            })
            .catch(error => console.log(error));
    }

    if (theft === 'loading') {
        return <Spinner />
    }

    // const currentOfficer = offers.find(({_id}) => officer === _id); 
    const offersApproved = offers.filter(({approved}) => approved === true);
    const offersElements = offersApproved.map(({_id, firstName, lastName}) => <option key={_id} value={_id}>{firstName} {lastName}</option>)

    return (
        <section className="wh">
            <div className="container">
                <div className="edit-ffers__container">
                    <p className="select">Статус: <select value={statusTheft} onChange={(e) => setStatusTheft(e.target.value)} name="status">
                        {statuses.map(({name, string}, i) => <option key={i} value={name}>{string}</option>)}
                    </select></p>
                    <p>Номер лицензии: <span>{licenseNumber}</span></p>
                    <p>Тип велосипеда: <span>{veloTypes[type]}</span></p>
                    <p>ФИО: <span>{ownerFullName}</span></p>
                    <p>Дата создания: <span>{new Date(createdAt).toLocaleString()}</span></p>
                    <p>Дата последнего обновления: <span>{updatedAt ? new Date(updatedAt).toLocaleString() : '-'}</span></p>
                    <p>Цвет: <span>{color}</span></p>
                    <p className="select">Отвественный сотрудник: <select value={officerTheft} onChange={(e) => setOfficerTheft(e.target.value)} name="">
                        <option value>Выберите сотрудника</option>
                        {offersElements}
                    </select></p>
                    <p>Комментарий клиента: <span>{description ? description : '-'}</span></p>
                    <p>Завершающий комментарий: <span>{resolution}</span></p>
                    <textarea value={resolutionTheft} onChange={(e) => setResolutionTheft(e.target.value)} name="resolution" placeholder="Напишите комментарий"></textarea>
                    <button className="btn" onClick={updateTheftElement}>Сохранить изменения</button>
                    <Link to="/thefts"><button className="btn">Назад</button></Link>
                </div>
            </div>
        </section>
    );
}

export default Theft;