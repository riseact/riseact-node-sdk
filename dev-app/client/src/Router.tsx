import Page from '@components/Page';
import ROUTE from '@config/routing';
import Campaigns from '@routes/Campaigns';
import Home from '@routes/Home';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Page />}>
          <Route index element={<Home />} />

          <Route path={ROUTE.CAMPAIGNS} element={<Campaigns />}>
            <Route index element={<Campaigns.List />} />
            <Route path={ROUTE.CAMPAIGNS_CREATE} element={<Campaigns.Create />} />
            <Route path={ROUTE.CAMPAIGNS_DETAIL} element={<Campaigns.Detail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
