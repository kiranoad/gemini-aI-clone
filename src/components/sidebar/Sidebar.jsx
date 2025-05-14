import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";

import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const [isHamburgerMenuOn, setIsHamburgerMenuOn] = useState(false);
  const handleMouseHover = () => {
    setExtended(true);
  };
  const handleMouseLeave = () => {
    if (!isHamburgerMenuOn) {
      setExtended(false);
    }
  };

  const handleMenuClick = () => {
    setIsHamburgerMenuOn((prev) => !prev);
  };
  const { onSent, prevPrompt, setResultPrompt } = useContext(Context);
  return (
    <div
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      className={`sidebar ${extended ? "extended" : "collapsed"}`}
    >
      <div className="top">
        <img
          onClick={handleMenuClick}
          className="menu"
          src={isHamburgerMenuOn ? assets.plus_icon : assets.menu_icon}
          alt=""
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
