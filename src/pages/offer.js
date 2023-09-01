import { useParams } from "react-router";
import { useHttp } from "../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { _apiUrl } from "../App";

import { updateOfficer } from "../actions/actions";

import Spinner from "../components/spinner/spinner";
import { Link } from "react-router-dom";

const Offer = () => {
    const { id } = useParams();
    const { request } = useHttp();
    const token = useSelector(store => store.userReducer.user.token);

    const [offer, setOffer] = useState('loading');
    const [approve, setApprove] = useState(false);
    const dispatch = useDispatch();

    const {firstName, lastName, approved} = offer;

    useEffect(() => {
        if (offer !== 'loading') setApprove(approved)
    }, [offer])

    useEffect(() => {
        if (token) {
            request(_apiUrl + 'api/officers/' + id, 'GET', null, {'Authorization': `Bearer ${token}`})
                .then(res => {
                    setOffer(res.data);
                });
        }
    }, [token])

    const updateOfficerElement = () => {
        request(_apiUrl + 'api/officers/' + id, 'PUT', JSON.stringify({
            approved: approve
        }), {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
            .then(res => {
                alert('Изменения сохранены');
                dispatch(updateOfficer(res.data))
            })
            .catch(error => console.log(error));
    }

    if (offer === 'loading') {
        return <Spinner />
    }
    
    return (
        <section className="wh">
            <div className="container">
                <div className="edit-ffers__container">
                    <p>Имя <span>{firstName}</span></p>
                    <p>Фамилия <span>{lastName}</span></p>
                    <p className="checkbox">Одобрен: <input type="checkbox" onChange={() => setApprove(!approve)} value={approve} checked={approve} /></p>
                    <button className="btn" onClick={updateOfficerElement}>Сохранить изменения</button>
                    <Link to="/offers"><button className="btn">Назад</button></Link>
                </div>
            </div>
        </section>
    );
}

export default Offer;