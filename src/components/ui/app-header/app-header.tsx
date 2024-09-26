import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { CustomLink } from '../../custom-link';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <CustomLink icon={<BurgerIcon type={'primary'} />} link={'/'} text={'Конструктор'} />
        </>
        <>
          <CustomLink icon={<ListIcon type={'primary'} />} link={'/feed'} text={'Лента заказов'} />
        </>
      </div>
      <div className={styles.logo}>
        <Logo className="" />
      </div>
      <div className={styles.link_position_last}>
        <CustomLink icon={<ProfileIcon type={'primary'} />} link={'/profile'} text={userName || 'Личный кабинет'} />
      </div>
    </nav>
  </header>
);
