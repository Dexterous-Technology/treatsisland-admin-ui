import React, { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import PopupUtils from "../../entities/events/utils/popup-utils";
import ImageCropper from "../image-cropper/image-cropper";
import "./image-picker.scss";
import { toast } from "react-toastify";

const ImagePicker = ({
  imageLink = "",
  aspect,
  selectedFile = null,
  onFileSet = () => {},
  onFileClear = () => {},
  inputId = +new Date(),
}) => {
  const upload = useRef(null);
  const [isActionVisible, setIsActionVisible] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [fileToCrop, setFileToCrop] = useState(null);
  const [showCropper, setShowCropper] = useState(null);

  const onChangeFile = (event) => {
    setIsCleared(false);
    event.stopPropagation();
    event.preventDefault();
    const allowedFileSize = 5 * 1024;
    const file = event.target.files[0];
    if (file.size / 1024 <= allowedFileSize) {
      // eslint-disable-next-line prefer-destructuring
      if (file?.type?.indexOf("video") > -1) {
        onFileSet(file);
      } else {
        setFileToCrop(URL.createObjectURL(file));
        setShowCropper(true);
      }
    } else {
      toast("File size too large, maximum allowed size is 5 MB");
    }
  };

  const _generatePreviewImageLink = () => {
    let image =
      "https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1-580x386.jpg";
    if (!isCleared) {
      if (selectedFile) {
        image = URL.createObjectURL(selectedFile);
      } else if (imageLink?.length) {
        image = imageLink;
      }
    }
    return image;
  };

  const _getContentLink = () => {
    let link = null;
    if (!isCleared) {
      if (selectedFile) {
        link = URL.createObjectURL(selectedFile);
      } else if (imageLink?.length) {
        link = imageLink;
      }
    }
    return link;
  };

  const previewImage = _generatePreviewImageLink();
  const fileType =
    selectedFile?.type?.indexOf("video") > -1
      ? "video"
      : PopupUtils.getMediaTypeFromFilePath(previewImage);

  const _renderContent = () => {
    const contentLink = _getContentLink();
    if (!contentLink?.length) {
      return (
        <>
          <div
            className="overlay"
            onClick={() => {
              upload.current.click();
            }}
          >
            <i className="far fa-image"></i>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="miniMediaActionWrapper"
            onClick={(e) => setIsActionVisible(true)}
          >
            <i className="fa fa-edit"></i>
            {isActionVisible ? (
              <div className="actionMenu">
                <div
                  className="action"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsActionVisible(false);
                    upload.current.click();
                  }}
                >
                  Upload New Media
                </div>
                {fileType === "image" ? (
                  <div
                    className="action"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCropper(true);
                      setIsActionVisible(false);
                      setFileToCrop(fileToCrop || previewImage);
                      // upload.current.click();
                    }}
                  >
                    Adjust crop
                  </div>
                ) : (
                  <></>
                )}
                {/* <div
                  className="action"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsActionVisible(false);
                    onFileClear();
                    setIsCleared(true);
                  }}
                >
                  Remove
                </div> */}
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsActionVisible(false);
        }}
      >
        <div className="image-upload">
          {fileType === "image" ? (
            <>
              <img src={previewImage} alt="" />
              {fileToCrop && showCropper ? (
                <ImageCropper
                  src={fileToCrop}
                  onImageAdjust={(file) => {
                    setShowCropper(false);
                    onFileSet(file);
                  }}
                  aspect={aspect}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <video height="100%" width="100%" controls>
                <source src={previewImage} type="video/mp4" />
              </video>
            </>
          )}
          {_renderContent()}
          <input
            id={inputId}
            type="file"
            ref={upload}
            style={{ display: "none" }}
            onChange={onChangeFile}
          />
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default ImagePicker;
