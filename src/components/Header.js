import React from 'react';
import { Link } from 'react-router-dom';

import SearchFrom from './SearchForm';

import './Header.css';
import { Button } from './Button';

export default function Header(props) {
  return (
    <div className="Header">
      <div className="title">
        <Link to="/">bookmap</Link>{' '}
        <span className="version">
          <a
            href="https://github.com/iwazaru/bookmap/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            0.2.3
          </a>
        </span>
      </div>
      <SearchFrom {...props} />
      <Link to="/a-propos">
        <Button icon="fas fa-question" />
      </Link>
    </div>
  );
}
