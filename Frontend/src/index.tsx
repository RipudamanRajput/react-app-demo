import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider, TextStyle, } from '@shopify/polaris';
import { Provider } from 'react-redux';
import Store from './Util/Store';
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import Errorhandler from './Components/ErrorBoundary/Errorhandler';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AppProvider
    i18n={{
      Polaris: {
        Avatar: {
          label: 'Avatar',
          labelWithInitials: 'Avatar with initials {initials}',
        },
        ContextualSaveBar: {
          save: 'Save',
          discard: 'Discard',
        },
        TextField: {
          characterCount: '{count} characters',
        },
        TopBar: {
          toggleMenuLabel: 'Toggle menu',

          SearchField: {
            clearButtonLabel: 'Clear',
            search: 'Search',
          },
        },
        Modal: {
          iFrameTitle: 'body markup',
        },
        Frame: {
          skipToContent: 'Skip to content',
          navigationLabel: 'Navigation',
          Navigation: {
            closeMobileNavigationLabel: 'Close navigation',
          },
        },
      },
    }}
    linkComponent={Link}>
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={Errorhandler}>
        <Provider store={Store}>
          <BrowserRouter >
            <App />
          </BrowserRouter>
        </Provider>
        </ErrorBoundary>
    </React.StrictMode>
  </AppProvider >
);
reportWebVitals();

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

function Link({ children, url = '', external, ref, ...rest }: any) {
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