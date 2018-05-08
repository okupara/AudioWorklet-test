import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { start, stop , setVol } from './Audio';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App {...{start, stop, setVol}} />, document.getElementById('root'));
registerServiceWorker();
