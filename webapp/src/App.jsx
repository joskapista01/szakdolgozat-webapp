import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './_components/PrivateRoute';
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

export default function App() {
        return (
                <div className="maxHeight">
                    <Router>
                        <div className='maxHeight'>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                        </div>
                    </Router>
                </div>
        )
    }
