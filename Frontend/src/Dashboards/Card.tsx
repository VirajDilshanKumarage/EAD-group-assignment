// Card.jsx
import React, { ReactNode } from 'react';
import './Dash.css';

interface CardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span role="img" aria-label="icon">
          {icon}
        </span>
        <h2>{title}</h2>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
