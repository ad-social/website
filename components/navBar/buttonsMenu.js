import React from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

const ButtonsMenu = () => (
  <div>
    <Link href="/dashboard">
      <Button color="inherit">My Dashboard</Button>
    </Link>
  </div>
);

export default ButtonsMenu;
