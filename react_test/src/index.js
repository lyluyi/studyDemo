import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';  // service worker 来缓存资源到本地，提升应用的访问速度。

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
