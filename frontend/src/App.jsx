import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles/App.scss';
import './styles/Generic.scss';
import './i18n';
import PageRouter from './routers';

function App() {
  return <PageRouter />;
}

export default withRouter(App);
