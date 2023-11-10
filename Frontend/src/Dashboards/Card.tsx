import React, { ReactNode, MouseEvent, CSSProperties } from 'react';
import './Dash.css';

interface CardProps {
  title: string;
  icon: ReactNode;
  backgroundImage: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  style?: CSSProperties;
}

const Card: React.FC<CardProps> = ({ title, icon, backgroundImage, children, onClick, style }) => {
  const cardStyle: CSSProperties = {
    ...style, // Include additional styles from the style prop
  };

  const imageStyle: CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%',
    overflow: 'hidden',
    width: '160px', // Adjust the size as needed
    height: '160px',
    marginRight: '10px', // Adjust the spacing to the right of the circular image
    float: 'right', // Align the image to the left
  };

  const iconBackgroundStyle: CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '50%',
    width: '60px', // Adjust the size as needed
    height: '60px',
    float: 'left', // Align the icon background to the left
    marginLeft: '-10px', // Adjust the marginLeft to move the icon to the left
    marginRight: '10px', // Adjust the spacing to the right of the icon background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="card" style={cardStyle} onClick={onClick}>
      <div style={imageStyle}></div>
      <div className="card-header">
        <div style={iconBackgroundStyle}>{icon}</div>
        <h2>{title}</h2>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
