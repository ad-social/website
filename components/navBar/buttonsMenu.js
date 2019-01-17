import React from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

const ButtonsMenu = () => (
  <div>
    <Button href="/dashboard" color="inherit">
      My Dashboard
    </Button>
  </div>
);

export default ButtonsMenu;
