import React, { useState, useRef, useEffect } from 'react';
import './menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
        if(menuRef.current && !menuRef.current.contains(event.target)) {
           setIsOpen(false); 
        }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuRef]);

  return (
    <div className="menu" ref={menuRef}>
      <button className="menu-btn" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={`menu-list ${isOpen ? 'is-open' : ''}`}>
        <li className="menu-option"><a href="#">Perfil</a></li>
        <li className="menu-option"><a href="#">Equip</a></li>
        <li className="menu-option"><a href="#">Les meves dades</a></li>
        <li className="menu-option"><a href="#">Dades equip</a></li>
      </ul>
    </div>
  );
}

export default Menu;
