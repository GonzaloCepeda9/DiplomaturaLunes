import React from "react";
import "./NosotrosItem.css";

const NosotrosItem = (props) => {
  const { imagen, name, surname, marketStall, description, body } = props;

  return (
        <div className="persona">
          <p>
            <img src={imagen} alt="" />
          </p>
          <h5>
            {name} {surname}
          </h5>
          <h6>{marketStall}</h6>
          <p>{description}</p>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
  );
};

export default NosotrosItem;
