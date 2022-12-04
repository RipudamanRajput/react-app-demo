import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, } from '@shopify/polaris';
import { Provider } from 'react-redux';
import Store from './Util/Store';
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider i18n={enTranslations} linkComponent={Link}>
    <React.StrictMode>
      <Provider store={Store}>
        <BrowserRouter >
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </AppProvider>
);
reportWebVitals();

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

function Link({ children, url = '', external, ref, ...rest }) {
  // react-router only supports links to pages it can handle itself. It does not
  // support arbirary links, so anything that is not a path-based link should
  // use a reglar old `a` tag
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = '_blank';
    rest.rel = 'noopener noreferrer';
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}