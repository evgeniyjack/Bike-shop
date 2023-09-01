import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/chanks/header/header";
import Footer from "./components/chanks/footer/footer";
import Main from "./pages/main";
import Offers from "./pages/offers";
import Offer from "./pages/offer";
import Thefts from "./pages/thefts";
import Theft from "./pages/theft";

import './css/style.css'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "./hooks/http.hook";

import { offersFetch, theftsFetch } from "./actions/actions";

import { loginFetched } from "./actions/actions";

export const clientId = '61318c8d-42cb-4aa9-b7f2-05f06f577f18';
export const _apiUrl = 'https://sf-final-project-be.herokuapp.com/';

export const statuses = [
  {
      name: 'new',
      string: 'Новый',
  },
  {
      name: 'in_progress',
      string: 'В процессе',
  },
  {
      name: 'done',
      string: 'Закончен',
  }
];

export const veloTypes = {
  general: 'Обычный',
  sport: 'Спортивный'
}

function App() {
  const dispatch = useDispatch();
  const {request} = useHttp();
  const token = useSelector(store => store.userReducer.user.token);
  const approved = useSelector(store => store.userReducer.approved);
  const user = localStorage.getItem('user');
  const date = localStorage.getItem('date-auth')

  useEffect(() => {
    if (date && date + 15 * 24 * 60 * 60 * 1000 < new Date().getTime()) {
      request(_apiUrl + 'api/auth/', 'GET', null, {'Authorization': `Bearer ${token}`})
        .then(res => dispatch(loginFetched(res.data)))
        .then(() => localStorage.setItem('date-auth', new Date().getTime()))
        .catch(error => console.log(error));
    }else{
      user && dispatch(loginFetched({data: JSON.parse(user)}));
    }
  }, [])

  useEffect(() => {
    (token && user && approved) && dispatch(theftsFetch(request, token));
    (token && user && approved) && dispatch(offersFetch(request, token));
  }, [token])


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <Main /> }/>
        <Route path="/offers" element={ <Offers /> }/>
        <Route path="/offer/:id" element={ <Offer /> }/>
        <Route path="/thefts" element={ <Thefts /> }/>
        <Route path="/theft/:id" element={ <Theft /> }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
