import React from 'react';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Divider from '@material-ui/core/Divider';

const ButtonsMenu = () => (
  <div>
    <Button
      onClick={() => {
        Router.push('/');
      }}
      color="inherit"
    >
      Home
    </Button>

    <Button
      onClick={() => {
        Router.push('/whatWeDo');
      }}
      color="inherit"
    >
      What We Do
    </Button>

    <Button
      onClick={() => {
        Router.push('/work');
      }}
      color="inherit"
    >
      Work
    </Button>

    <Button
      onClick={() => {
        Router.push('/information');
      }}
      color="inherit"
    >
      Information
    </Button>

    <Button
      onClick={() => {
        Router.push('/contact');
      }}
      color="inherit"
    >
      Contact Us
    </Button>

    <Button
      onClick={() => {
        Router.push('/dashboard');
      }}
      color="inherit"
    >
      My Dashboard
    </Button>
  </div>
);

export default ButtonsMenu;
