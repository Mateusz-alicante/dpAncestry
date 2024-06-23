import { useEffect, useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';

import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavbarMinimal.module.css';

import { useAtom } from 'jotai'
import { dataAtom } from '../../../utils/atoms';

import Image from 'next/image'
import Logo from '../../Common/logo.png'

import {
    IconLogout,
  } from '@tabler/icons-react';


function NavbarLink({ icon: Icon, label, active, onClick }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}



export default ({ tabs, defaultActive }) => {
    const [data, setData] = useAtom(dataAtom)
  const [active, setActive] = useState(2);

  useEffect(() => {
    setActive(defaultActive);
  }, [defaultActive]);

  const links = tabs.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        link.onClick();
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
      <Image
      src={Logo}
      width={40}
      height={40}
      alt="Logo"
    />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Exit" onClick={() => setData({ready: false})} />
      </Stack>
    </nav>
  );
}