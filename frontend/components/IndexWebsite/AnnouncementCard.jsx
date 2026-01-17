import React, { useState } from "react";
import "../IndexWebsiteCSS/AnnouncementCard.css"; // create this CSS file

function AnnouncementCard({ title, date, image, description }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="announcement-card">
      {image && <img src={image} alt={title} className="announcement-image" />}
      <div className="announcement-body">
        <h4>{title}</h4>
        <small>{new Date(date).toLocaleDateString()}</small>
        <p className={expanded ? "expanded" : "collapsed"}>{description}</p>
        {description.length > 100 && (
          <button onClick={() => setExpanded(!expanded)} className="expand-btn">
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AnnouncementCard;
