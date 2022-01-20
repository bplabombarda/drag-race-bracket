import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

export default function Header() {
  return (
    <header>
      <Link className="dillcap" to="/seasons">
        dillcap
      </Link>
    </header>
  );
}
