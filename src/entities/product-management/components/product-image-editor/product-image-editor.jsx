import React, { Component, useRef, useState } from "react";

const ProductImageEditor = ({ imageLink, onImageChange = () => {} }) => {
  const [isCleared, setIsCleared] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const upload = useRef(null);

  const onChangeFile = (event) => {
    setIsCleared(false);
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    setSelectedFile(file);
    onImageChange(file);
  };

  const _generatePreviewImageLink = () => {
    let image =
      "https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1-580x386.jpg";
    if (selectedFile) {
      image = URL.createObjectURL(selectedFile);
    } else if (imageLink?.length) {
      image = imageLink;
    }
    return image;
  };

  const previewImage = _generatePreviewImageLink();

  return (
    <div className="image-wrapper">
      <img src={previewImage} alt="" />

      <div
        className="editIcon"
        onClick={() => {
          upload.current.click();
        }}
      >
        <i className="fa fa-edit"></i>
      </div>
      <input
        id={"inputId"}
        type="file"
        ref={upload}
        style={{ display: "none" }}
        onChange={onChangeFile}
      />
    </div>
  );
};

export default ProductImageEditor;
