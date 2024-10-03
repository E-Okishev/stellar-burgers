import s from './custom-link.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';

type customLinkProps = {
  icon: React.ReactNode;
  link: string;
  text: string;
};

export const CustomLink: FC<customLinkProps> = ({ icon, link, text }) => {
  const { pathname } = useLocation();

  return (
    <Link className={`${s.link} ${pathname === link && s.active}`} to={link}>
      {icon}
      {text}
    </Link>
  );
};
