import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import NavMenu from './NavMenu';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NavMenu />, document.getElementById('root'));
registerServiceWorker();
