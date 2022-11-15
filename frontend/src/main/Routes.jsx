import React from 'react';
import { Navigate, Route, Routes as Switch} from 'react-router-dom'
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';

function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UserCrud />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Switch>
  );
}

export default Routes;