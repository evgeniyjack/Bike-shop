import close from '../../../assets/svg/close.svg';

import Spinner from '../../spinner/spinner';

import { useHttp } from '../../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';

import { _apiUrl, clientId } from '../../../App';
import { CSSTransition } from 'react-transition-group';

import { theftAdd } from '../../../actions/actions';
import { useCallback } from 'react';

const OfferForm = ({setPopup}) => {
    const {auth, user} = useSelector(store => store.userReducer);
    const theftsLoadingStatus = useSelector(store => store.theftsReducer.theftsLoadingStatus);
    const {request} = useHttp();
    const dispatch = useDispatch();
    
    const addTheft = useCallback(async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());

        const url = auth ? _apiUrl + 'api/cases/' : _apiUrl + 'api/public/report';
        const requestData = auth ? { ...formDataObject, officer: user.user.id } : { ...formDataObject, clientId };

        const headers = auth
            ? {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
            : {
                'Content-Type': 'application/json',
            };


        try {
            const result = await request(url, 'POST', JSON.stringify(requestData), headers);
            
            dispatch(theftAdd(result.data))
            alert('Заявка отправлена!');
            setPopup(false);
        } catch (error) {
            alert(error.message);
        }
    })

    if (theftsLoadingStatus === 'loading') {
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
            <div className="modal">
                <div className="popup">
                    <div className="title-form">Сообщить о краже</div>
                    <button className="close" onClick={() => setPopup(false)}><img src={close} alt="close icon" /></button>
                    <form onSubmit={addTheft}>
                        <div className="form-group">
                            <label>Номер лицензии</label>
                            <input required type="text" name="licenseNumber" placeholder="342423" />
                        </div>
                        <div className="form-group">
                            <label>ФИО клиента</label>
                            <input required type="text" name="ownerFullName" placeholder="Алексеев Алексей Алексеевич" />
                        </div>
                        <div className="form-group">
                            <label>Тип велосипеда</label>
                            <select required name="type">
                                <option active="true" >Выберите вариант</option>
                                <option value="general">Обычный</option>
                                <option value="sport">Спортивный</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Цвет велосипеда</label>
                            <input type="text" name="color" placeholder="Синий" />
                        </div>
                        <div className="form-group">
                            <label>Дата кражи</label>
                            <input type="date" name="date" placeholder="Дата кражи" max={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="form-group">
                            <label>Дополнительная информация</label>
                            <textarea name="description" placeholder="Дополнительная информация"></textarea>
                        </div>
                        <button className="btn">Отправить</button>
                    </form>
                </div>
            </div>
        </CSSTransition>
    );
}

export default OfferForm;