import Page from '@components/Page';
import { CLIENT_TOKEN_KEY, ORGANIZATION_KEY } from '@config/const';
import ROUTE from '@config/routing';
import Campaigns from '@routes/Campaigns';
import Home from '@routes/Home';
import { FC } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

const ProtectedRoute: FC = () => {
  const token = localStorage.getItem(CLIENT_TOKEN_KEY);
  const organization = localStorage.getItem(ORGANIZATION_KEY);

  const __organization = new URLSearchParams(window.location.search).get('__organization');

  const isInIframe = (): boolean => {
    try {
      return window.self !== window.top;
    } catch (e) {
      // Se c'è un errore di sicurezza per accesso cross-origin,
      // probabilmente siamo in un iframe
      return true;
    }
  };

  if (isInIframe() && !__organization) {
    console.warn('Missing __organization parameter in iframe context');
    window.parent.postMessage({ type: 'RELOAD_IFRAME' }, '*');
  }

  if (!token || !organization || organization !== __organization) {
    window.location.href = `/oauth/authorize?__organization=${__organization || ''}`;

    // return (
    //   <div>
    //     non authorized, click the link above to authorize
    //     <br />
    //     <button
    //       onClick={() => {
    //         window.location.href = `/oauth/authorize?__organization=${__organization || ''}`;
    //       }}
    //     >
    //       Authorize
    //     </button>
    //   </div>
    // );

    return null;
  }

  return <Outlet />;
};

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Page />}>
            <Route index element={<Home />} />

            <Route path={ROUTE.CAMPAIGNS} element={<Campaigns />}>
              <Route index element={<Campaigns.List />} />
              <Route path={ROUTE.CAMPAIGNS_CREATE} element={<Campaigns.Create />} />
              <Route path={ROUTE.CAMPAIGNS_DETAIL} element={<Campaigns.Detail />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
