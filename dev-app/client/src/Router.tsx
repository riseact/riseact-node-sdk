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

  // `__organization` is only present on the first load from the Riseact admin
  // iframe: client-side navigation drops the query string, so a missing param
  // must not invalidate the session. Same rule as the SDK auth middleware:
  // only an explicit mismatch forces a new authorize round.
  const hasSession = !!token && !!organization && (!__organization || organization === __organization);

  if (!hasSession) {
    window.location.href = `/oauth/authorize?__organization=${encodeURIComponent(__organization || organization || '')}`;

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
