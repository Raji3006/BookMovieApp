import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import Details from './screens/details/Details';
import BookShow from './screens/bookshow/BookShow';
import Home from './screens/home/Home';

//ReactDOM.render(<Controller />, document.getElementById('root'));
ReactDOM.render(<Home />, document.getElementById('root'));
//ReactDOM.render(<BookShow />, document.getElementById('root'));
registerServiceWorker();
