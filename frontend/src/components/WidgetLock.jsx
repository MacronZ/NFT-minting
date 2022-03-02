import React from 'react';
import '../styles/components/WidgetLock.scss';

export default function WidgetLock({
  title, description, icon,
}) {
  return (
    <div className="widgetLock">
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
