import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import { Buffer } from "buffer";

import "react-image-crop/src/ReactCrop.scss";
import "./image-cropper.scss";

const ImageCropper = ({ src, onImageAdjust, aspect }) => {
  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 300,
    height: 300*(1/aspect),
  });
  const onSubmitCrop = () => {
    if (true) {
      // create a canvas element to draw the cropped image
      const canvas = document.createElement("canvas");
      // console.log("canvas :>> ", canvas);
      // get the image element
      const image = imgRef.current;

      // draw the image on the canvas
      if (image) {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        if (ctx) {
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingQuality = "high";

          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
          );
        }

        const base64Image = canvas.toDataURL("image/png"); // can be changed to jpeg/jpg etc

        if (base64Image) {
          // @ts-ignore
          const fileType = base64Image.split(";")[0].split(":")[1];

          const buffer = Buffer.from(
            base64Image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          const file = new File([buffer], "image", { type: fileType });
          console.log(file); // function passed as a prop
          onImageAdjust(file)
        }
      }
    }
  };
  const imgRef = useRef();

  const _onSubmit = () => {};

  return (
    <>
      <div className="imageCropperOuter">
        <div className="imageCropper">
          <div className="imageCropperInner">
            <ReactCrop crop={crop} aspect={aspect} onChange={(c) => setCrop(c)}>
              <img src={src} alt="" ref={imgRef} crossorigin="anonymous" />
            </ReactCrop>

            <div className="actions" onClick={onSubmitCrop}>
              <div className="submit">Done</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
