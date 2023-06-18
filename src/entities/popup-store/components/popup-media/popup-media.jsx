import React, { useEffect, useRef, useState } from "react";
import PopupUtils from "../../../events/utils/popup-utils";
import "./popup-media.scss";

const PopupMedia = ({ src, muteByDefault = true, showControls = false, position = {top: '20rem', right: '30px'} }) => {
  const fileType = PopupUtils.getMediaTypeFromFilePath(src);
  const [isMuted, setIsMuted] = useState(true);
  const vidRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const _toggleMute = (e = null) => {
    if (e) {
      e.preventDefault();
    e.stopPropagation();
    }
    setIsMuted(!isMuted);
  };
  const _togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      vidRef.current.pause();
    } else {
      vidRef.current.play();
    }
  };

  return (
    <>
      {fileType === "video" ? (
        <div className="videoWrapper">
          {showControls ? (
            <div className="videoActions">
              <div className="buttonsWrapper" style={position}>
                <button className="playButton" id="playButton" onClick={_togglePlay}>
                  {isPlaying ? (
                    <i className="fa-solid fa-pause"></i>
                  ) : (
                    <i className="fa-solid fa-play"></i>
                  )}
                </button>
                <button className="muteButton" onClick={_toggleMute}>
                  {isMuted ? (
                    <i className="fa-solid fa-volume-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-volume-high"></i>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
          <video
            ref={vidRef}
            height="100%"
            width="100%"
            id='video'
            controls={false}
            muted={isMuted}
            className="popupVideo"
            autoPlay={true}
            loop={true}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      ) : (
        <img src={src} alt="" />
      )}
    </>
  );
};

export default PopupMedia;
