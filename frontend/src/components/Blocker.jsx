import React from 'react';
import '../styles/components/Blocker.scss';

export default function Blocker({
  active, title, description, icon,
}) {
  return (
    <div className={`blocker ${active && 'active'}`}>
      {icon}
      <div className="text">
        <div className="title">
          {title}
        </div>
        <div className="description">
          {description}
        </div>
      </div>
    </div>
  );
}
