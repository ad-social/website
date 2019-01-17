import React from 'react';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

const ButtonsMenu = () => (
  <div>
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
