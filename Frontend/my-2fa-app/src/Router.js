import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Auth from './components/Auth';
import Home from './components/Home';
import Example from './components/Example';

class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Example}/>
                    <Route exact path="/iniciar" component={Login}/> 
                    <Route exact path="/2fa" component={Auth}/> 
                    <Route exact path="/home" component={Home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;