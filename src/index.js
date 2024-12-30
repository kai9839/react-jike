import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store';
import 'normalize.css'

// import showMessage from './utils/message';
import './utils/message'

import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        <RouterProvider router={router}/>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
