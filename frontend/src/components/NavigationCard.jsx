import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import '../styles/components/NavigationCard.scss';
import { useSelector } from 'react-redux';

export default function NavigationCard({
  svg, title, description, path,
}) {
  const [cardIsHovered, setCardIsHovered] = useState(false);

  const setArrowIcon = () => {
    const getTheme = useSelector((state) => state.theme);

    if (getTheme === 'dark') {
      return (
        <ArrowForwardIcon style={{ color: 'white' }} />
      );
    }
    return (
      <ArrowForwardIcon style={cardIsHovered ? { color: 'white' } : { color: 'black' }} />
    );
  };
  return (
    <Link
      className="nav-link"
      to={path}
      onFocus={() => setCardIsHovered(true)}
      onMouseOver={() => setCardIsHovered(true)}
      onMouseLeave={() => setCardIsHovered(false)}
    >
      <div className="content">
        <img className="icon" src={`/assets/dashboard/${svg}.svg`} alt={svg} />
        <div className="text">
          <div className="title">
            {title}
          </div>
          <div className="description">
            {description}
          </div>
        </div>
        {setArrowIcon()}
      </div>
    </Link>
  );
}
