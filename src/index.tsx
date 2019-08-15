import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const app = (
    <ConfigProvider  locale={zhCN}>
        <App />
    </ConfigProvider>
)

NProgress.start();

ReactDOM.render(
    app, 
    document.getElementById('root')
);

NProgress.done();
serviceWorker.unregister();