import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './Reducer';
import { PageLoader } from './components';
import { VirtualTourProvider } from './components/Dashboard/components/VirtualTour';
import App from './App';
import i18n from './i18n';

const store = createStore(Reducer);

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<PageLoader />}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <SnackbarProvider maxSnack={3}>
            <VirtualTourProvider>
              <App />
            </VirtualTourProvider>
          </SnackbarProvider>
        </I18nextProvider>
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);
