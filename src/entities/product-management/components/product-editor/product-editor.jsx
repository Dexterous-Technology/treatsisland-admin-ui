import React, { Component, useEffect, useState } from "react";
import ToggleButton from "../../../../core/form-elements/toggle-button/toggle-button";
import "./product-editor.scss";
import { EventEmitter } from "../../../../utils/event-emitter";
import EventNames from "../../../../const/event-names";
import { useForm } from "react-hook-form";
import ProductUtils from "../../product-utils";
import ProductImageEditor from "../product-image-editor/product-image-editor";
import MediaUploader from "../../../../utils/media-uploader";

const ProductEditor = ({
  modalProductEdit = true,
  productId = null,
  onDismiss = () => {},
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors, isDirty },
  } = useForm();
  const [activeProduct, setActiveProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [generalFormError, setGeneralFormError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isActive, setIsActive] = useState("true");

  const _setFormValues = (product) => {
    setValue("Product", product?.Product || "");
    setValue("Price", product?.Price || "");
    setValue("Description", product?.Description || "");
    setIsActive(product?.isActive || "true");
  };

  const _resetForm = () => {
    reset({
      Product: "",
      Price: "",
      Description: "",
    });
    setIsEditing(false);
    setActiveProduct(null);
    setIsActive("true");
    setSelectedImage(null);
  };

  const _resetAndClose = () => {
    _resetForm();
    setIsModalVisible(false);
  };

  const _handleToggle = (isActive) => {
    setIsActive(isActive);
  };

  const _preparePayload = async ({
    Product, Price, Description
  }) => {
    let payload = {};
    if (isEditing) {
      payload = {
        ...activeProduct,
        isActive,
        Product,
        Price,
        Description,
      };
    } else {
    }
    if (selectedImage) {
      const image = await MediaUploader.uploadImage(selectedImage);
      payload.imageLink = image;
    }
    return payload;
  }

  const _handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const onSubmit = async ({ Product, Price, Description }) => {
    setGeneralFormError('');
    const payload = await _preparePayload({
      Product, Price, Description
    });
    if (isEditing) {
      await ProductUtils.updateProduct({
        productId: activeProduct.ProductID,
        product: payload, 
      });
    } else {
      await ProductUtils.addProduct(payload);
    }
    // After submit, navigate to product list
    _resetAndClose();
  };

  const _subscribeToEvents = () => {
    EventEmitter.subscribe(
      EventNames.adminProductEditPopup.show,
      (productToEdit) => {
        if (productToEdit) {
          console.log("productToEdit :>> ", productToEdit);
          _setFormValues(productToEdit);
          setActiveProduct(productToEdit);
          setIsEditing(true);
        } else {
          _resetForm();
        }
        setIsModalVisible(true);
      }
    );
  };

  const _unsubscribeEvents = () => {
    EventEmitter.cancelAll(EventNames.adminProductEditPopup.show);
  };

  useEffect(() => {
    _subscribeToEvents();
    return () => {
      _unsubscribeEvents();
    };
  }, []);

  if (isModalVisible) {
    return (
      <>
        <div className={"modalProductEdit " + (modalProductEdit ? "show" : "")}>
          <div className="modalTop" onClick={_resetAndClose}>
            <i className="fa fa-arrow-left"></i> <span>Go back</span>
          </div>

          <div className="modalHeader">Edit product</div>

          <div className="modalContent">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <ProductImageEditor
                    onImageChange={_handleImageChange}
                    imageLink={activeProduct?.imageLink}
                  />
                </div>

                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-10">
                      <div className="form-group">
                        <label htmlFor="">Product name</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("Product", {
                            required: true,
                            minLength: 2,
                          })}
                        />
                      </div>
                      <span className="error">{
                        errors.Product?.type === "required" && "Product name is required" 
                      }</span>
                    </div>

                    <div className="col-md-2">
                      <ToggleButton
                        isEnabled={isActive}
                        onToggle={_handleToggle}
                      />
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="">Price ($)</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("Price", {
                            required: true,
                            minLength: 2,
                          })}
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="">Discount (%)</label>
                        <input type="text" className="form-control" value="0" disabled />
                      </div>
                    </div> */}
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="">Sale price (calculated)</label>
                        <input type="text" className="form-control" value="900" />
                      </div>
                    </div> */}

                    {/* <div className="col-md-12">
                      <div className="form-check p-0">
                        <input type="checkbox" className="mr-2" />
                        <label htmlFor="instock">In stock</label>
                      </div>
                    </div> */}

                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <textarea
                          name=""
                          id=""
                          rows="5"
                          className="form-control"
                          {...register("Description", {
                            required: true,
                            minLength: 2,
                          })}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="buttons text-right">
                    <div className="btn btn-light mr-3" onClick={_resetAndClose}>
                      Cancel
                    </div>
                    <button className="btn btn-primary" type="submit" >Update</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ProductEditor;
