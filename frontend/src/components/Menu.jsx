import React from 'react';
import * as AiIcons from 'react-icons/ai';

export const MenuData = [
  {
    title: 'Home',
    path:'/home',
    icon:<AiIcons.AiFillHome/>,
    cName:'nav-text'
  },
  {
    title: 'Teams',
    path:'/teams',
    icon:<AiIcons.AiOutlineTeam/>,
    cName:'nav-text'
  },
  {
    title: 'Log out',
    path:'/logout',
    icon:<AiIcons.AiOutlineLogout/>,
    cName:'nav-text'
  }
]
