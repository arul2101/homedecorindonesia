import React from 'react';
import TopBar from './Header/TopBar';
import MainHeader from './Header/MainHeader';
import NavLinks from './Header/NavLinks';

export default function Header() {

  return (
    <header className="bg-white">
      <TopBar />
      <MainHeader />
      <NavLinks />
    </header>
  )
}
