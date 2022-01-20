import { React } from 'react';
import { Link, Outlet } from 'react-router-dom';

import './layout.scss';

export default function Layout() {
  return (
    <>
      <header>
        <Link className="dillcap" to="/seasons">
          dillcap
        </Link>
      </header>
      <Outlet />
    </>
  );
}
