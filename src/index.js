import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import ErrorBoundary from '@/layout/ErrorBoundary';
import {PersistGate} from 'redux-persist/integration/react';
import '@/lang/index';
import {store, persistor} from '@/store';
import {logBadge, logCopyRight} from "./utils";
import './index.less';
import App from './App';
// import reportWebVitals from './reportWebVitals';
console.groupCollapsed('版权所有');
logCopyRight();
console.groupEnd();
console.group('版本环境');
logBadge('当前环境', process.env.REACT_APP_ENV, '#606060', '#42c02e');
logBadge('当前版本', VERSION, '#606060', '#1475b2');
console.groupEnd();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </PersistGate>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
