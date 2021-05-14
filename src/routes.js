import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

/**
 * Types of routes
*/
import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoute"
import { isAuthenticated } from "./auth"

/**
 * Pages
 * Alphabethic order
 */

import Account from "./pages/Users/Account/Info"
import Blog from './pages/Blog/Index'
import Card from './pages/Shopping/Card'
import ChangePassword from "./pages/Users/ChangePassword"
import Checkout from "./pages/Shopping/Payment/Checkout"
import CreateAddress from "./pages/Address/Create"
import CreateCategory from "./pages/Shopping/Product/Category/Create"
import CreateEssayQuestion from './pages/Simulated/EssayQuestions/Create'
import CreateExam from './pages/Simulated/Exam/Create'
import CreatePiece from './pages/Simulated/Piece/Create'
import CreatePost from './pages/Blog/Post/Create'
import CreateProduct from './pages/Shopping/Product/Create'
import CreateQuestion from "./pages/Simulated/Questions/Create/Create"
import CreateTheme from "./pages/Simulated/Theme/Create"
import CustomSimulatedMenu from "./pages/Simulated/FirstFase/CustomSimulatedMenu"
import EditEssayQuestion from './pages/Simulated/EssayQuestions/Edit'
import EditPiece from './pages/Simulated/Piece/Edit'
import EditProduct from './pages/Shopping/Product/Edit'
import EditQuestion from './pages/Simulated/Questions/Edit/Edit'
import EssayQuestion from './pages/Simulated/EssayQuestions/Single'
import FirstFase from "./pages/Simulated/FirstFase/FirstFase"
import Home from "./pages/WebSite/Home"
import MailBox from "./pages/Messages/BoxMail"
import NewMessage from "./pages/Messages/Write"
import Question from "./pages/Simulated/Questions/Single/SingleQuestion"
import Piece from "./pages/Simulated/Questions/Single/Single"
import Report from "./pages/Simulated/Report/Report"
import SearchPiece from './pages/Simulated/Piece/Search'
import SearchEssayQuestions from './pages/Simulated/EssayQuestions/Search'
import SearchQuestions from "./pages/Simulated/Questions/Search/Search"
import SearchProducts from './pages/Shopping/Product/Search'
import SecondFase from './pages/Simulated/SecondFase/SecondFase'
import Shopping from "./pages/Shopping/Shopping"
import SignIn from "./pages/Sign/SignIn"
import SignUp from "./pages/Sign/SignUp"
import SimuladosReport from "./pages/Simulated/Overview"
import SingleMessage from "./pages/Messages/Message"
import SinglePost from "./pages/Blog/Post/Single"
import SingleProduct from './pages/Shopping/Product/SingleProduct'
import UsersList from "./pages/Users/List/UsersList"

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/** Geral */}
                <Route exact path="/" render={(props) => <Home {...props} />} />
                <Route exact path="/home" render={(props) => <Home {...props} />} />

                {isAuthenticated() ? <Redirect exact path="/Signin" to="/" /> : <Route exact path="/Signin" render={(props) => <SignIn {...props} />} />}
                {isAuthenticated() ? <Redirect exact path="/Signin" to="/" /> : <Route exact path="/Signup" render={(props) => <SignUp {...props} />} />}
                <Route path="/Questions/Search" render={(props) => <SearchQuestions {...props} />} />
                <Route path="/Blog" render={(props) => <Blog {...props} />} />
                <Route path="/Shopping" render={(props) => <Shopping {...props} />} />
                <Route path="/Product/:idProduct/Single" render={(props) => <SingleProduct {...props} />} />
                <Route path="/Products/Search" render={(props) => <SearchProducts {...props} />} />
                <Route path="/Post/Single" render={(props) => <SinglePost {...props} />} />

                <AdminRoute path="/Product/Create" exact component={CreateProduct} />
                <AdminRoute path="/Product/:idProduto/Edit" exact component={EditProduct} />
                <AdminRoute path="/Category/create" exact component={CreateCategory} />
                <AdminRoute path="/Post/Create" exact component={CreatePost} />
                <AdminRoute path="/Theme/Create" exact component={CreateTheme} />
                {/** Usuário Comum - Autenticado */}
                <PrivateRoute path="/User/Account" exact component={Account} />
                <PrivateRoute path="/User/:userId" exact component={Account} />
                <PrivateRoute path="/Report/:ReportId" exact component={Report} />
                <PrivateRoute path="/Card/" exact component={Card} />
                <PrivateRoute path="/Checkout" exact component={Checkout} />
                <PrivateRoute path="/Address/create" exact component={CreateAddress} />
                <PrivateRoute path="/FirstFase/menu" exact component={CustomSimulatedMenu} />
                <PrivateRoute path="/FirstFase/:SimuladoId/start" exact component={FirstFase} />
                <PrivateRoute path="/SecondFase/start" exact component={SecondFase} />
                <PrivateRoute path="/Simulated/Report" exact component={SimuladosReport} />
                <PrivateRoute path="/MailBox/" exact component={MailBox} />
                <PrivateRoute path="/Question/:idQuestion/Single" exact component={Question} />
                <PrivateRoute path="/SingleMessage/:idMessage" exact component={SingleMessage} />
                <PrivateRoute path="/Piece/Search" exact component={SearchPiece} />
                <PrivateRoute path="/Piece/:idPiece/Single" exact component={Piece} />
                <PrivateRoute path="/Piece/:idPiece/Edit" exact component={EditPiece} />
                <PrivateRoute path="/EssayQuestion/Search" exact component={SearchEssayQuestions} />
                <PrivateRoute path="/NewMessage" exact component={NewMessage} />
                <PrivateRoute path="/ResetPassword" exact component={ChangePassword} />
                <PrivateRoute path="/EssayQuestion/:idEssayQuestion/Edit" exact component={EditEssayQuestion} />
                <PrivateRoute path="/EssayQuestion/:idEssayQuestion/Single" exact component={EssayQuestion} />
                {/**Administrador - Simulados */}
                <AdminRoute path="/Question/create" exact component={CreateQuestion} />
                <AdminRoute path="/Exam/create" exact component={CreateExam} />
                <AdminRoute path="/EssayQuestion/create" exact component={CreateEssayQuestion} />
                <AdminRoute path="/Question/:idQuestion/Edit" exact component={EditQuestion} />
                <AdminRoute path="/Users" exact component={UsersList} />
                <AdminRoute path="/Piece/Create" exact component={CreatePiece} />
                {isAuthenticated() ? console.log("autenticado") : console.log('não autenticado')}
            </Switch>
        </BrowserRouter>
    )
}

