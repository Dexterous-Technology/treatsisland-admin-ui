import React, { useEffect, useState } from "react";
import Modal from "react-awesome-modal";
import { useForm } from "react-hook-form";
import ApiCalls from "../../../../api";
import ImagePicker from "../../../../core/image-picker/image-picker";
import { EventEmitter } from "../../../../utils/event-emitter";
import MediaUploader from "../../../../utils/media-uploader";
import EventUtils from "../../../events/utils/event-utils";
import "./popup-store-editor.scss";
import {range} from "lodash";
import { useHistory } from "react-router-dom";

const goalOptions = range(500, 10250, 250); 

const PopupStoreEditor = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  console.log('history :>> ', history);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPopupStore, setSelectedPopupStore] = useState(null);
  const [selectedIconFile, setSelectedIconFile] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);

  const _loadPopupStore = async (event) => {
    setIsLoaderActive(true);
    try {
      const { data } = await ApiCalls.popup.private.getPopupStoreById(
        event.EventPopupID
      );
      if (data?.data?.popupStore) {
        setSelectedPopupStore(data.data.popupStore);
        _setValuesIfNeeded(data.data.popupStore);
      }
    } catch (error) {}
    setIsLoaderActive(false);
  };

  const _openInAddMode = (event) => {
    setIsVisible(true);
    setisEditing(false);
    setSelectedEvent(event);
  };

  const _openInEditMode = (event) => {
    setIsVisible(true);
    setisEditing(true);
    setSelectedEvent(event);
    _loadPopupStore(event);
  };

  const _reset = () => {
    setIsVisible(false);
    setisEditing(false);
    setIsLoaderActive(false);
    setSelectedEvent(null);
    setSelectedIconFile(null);
    setSelectedCoverFile(null);
    setSelectedPopupStore(null);
    reset();
  };

  const _listenToEvents = () => {
    EventEmitter.subscribe("SHOW_ADD_POPUP_MODAL", ({ event }) => {
      _openInAddMode(event);
    });
    EventEmitter.subscribe("SHOW_EDIT_POPUP_MODAL", ({ event }) => {
      _openInEditMode(event);
    });
  };

  const _setValuesIfNeeded = (popupStore) => {
    console.log("popupStore :>> ", popupStore);
    console.log("isEditing :>> ", isEditing);
    if (popupStore) {
      setValue("name", popupStore.PopupName);
      setValue("desc", popupStore.PopupDesc);
      setValue("goal", popupStore.PopupGoal);
    }
  };

  const onSubmit = async ({ name, goal, desc }) => {
    let coverLink = "";
    let iconLink = "";
    setIsLoaderActive(true);
    if (selectedCoverFile) {
      coverLink = await MediaUploader.uploadToCloudinary(selectedCoverFile);
    }
    if (selectedIconFile) {
      iconLink = await MediaUploader.uploadToCloudinary(selectedIconFile);
    }
    const payload = {
      popupName: name,
      popupDesc: desc,
      popupGoal: goal,
      popupCoverMediaLink: coverLink,
      popupIconMediaLink: iconLink,
    };
    try {
      if (isEditing) {
        payload.eventPopupId = selectedPopupStore.EventPopupID;
        await ApiCalls.popup.private.editPopup(payload);
      } else {
        payload.eventId = selectedEvent.EventID;
        const {data} = await ApiCalls.popup.private.createPopup(payload);
        // Open popup store
        console.log('data :>> ', data);
        if (data?.data?.popupStore?.EventPopupID) {
          history.push(`/popup-store-admin/${data?.data?.popupStore?.EventPopupID}`);
        }
      }
      await EventUtils.loadAllEvents();
      EventEmitter.dispatch("REFRESH_POPUP_STORE");
      _reset();
    } catch (error) {
      console.log("error :>> ", error);
    }
    setIsLoaderActive(false);
  };

  const _cancel = () => {
    _reset();
    if (!isEditing) {
      history.push(`/event-view-page/${selectedEvent.EventID}`)
    }
  } 

  useEffect(() => {
    _listenToEvents();
  }, []);
  return (
    <>
      <Modal
        visible={isVisible}
        width="1200"
        height="88%"
        effect="fadeInUp"
        onClickAway={_reset}
      >
        {isLoaderActive ? (
          <div className="loaderWrapper">
            <div className="loader"></div>
          </div>
        ) : (
          <></>
        )}
        <form
          className="popup-store-modal-inner container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="modal-title">
            {isEditing ? "Edit" : "Add new"} popup store for event {selectedEvent?.EventName}
          </div>

          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <div className="label">Store name</div>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", {
                    required: true,
                    minLength: 2,
                  })}
                />
                <small className="form-text text-muted error-text">
                  {errors.name && "Please provide valid name"}
                </small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <div className="label">Set goal</div>
                <div className="input-group">
                  <select
                  name=""
                  id=""
                  className="form-control"
                  {...register("goal", {
                    required: true,
                  })}
                >
                  <option value="">Select type</option>
                  {goalOptions?.map((goalOption) => (
                    <option value={goalOption} key={goalOption}>
                      ${goalOption}
                    </option>
                  ))}
                </select>
                </div>
                <small className="form-text text-muted error-text">
                  {errors.goal && "Please select a goal"}
                </small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group iconMedia">
                <div className="label">Icon media</div>
                <ImagePicker
                  inputId={"iconImage"}
                  aspect={1}
                  onFileSet={setSelectedIconFile}
                  onFileClear={e => setSelectedIconFile(null)}
                  imageLink={selectedPopupStore?.popupIconMediaLink}
                  selectedFile={selectedIconFile}
                />
                {/* <div className="hint small">Maximum file size for image is 500KB, for video it's 1MB</div> */}
                {/* <small class="form-text text-muted error-text">File size exceeds the limit!</small> */}
              </div>
            </div>
            <div className="col-md-8">
              <div className="form-group coverMedia">
                <div className="label">Cover media</div>
                <ImagePicker
                  inputId={"coverImage"}
                  aspect={16/4}
                  onFileSet={setSelectedCoverFile}
                  onFileClear={e => setSelectedCoverFile(null)}
                  imageLink={selectedPopupStore?.popupCoverMediaLink}
                  selectedFile={selectedCoverFile}
                />
                {/* <div className="hint small">Maximum file size for image is 500KB, for video it's 1MB</div> */}
                {/* <small class="form-text text-muted error-text">File size exceeds the limit!</small> */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <div className="label">Description</div>
                <textarea
                  name=""
                  id=""
                  rows="4"
                  className="form-control"
                  {...register("desc")}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="buttons text-right">
            <span href="#" className="btn btn-light mr-3" onClick={_cancel}>
              Cancel
            </span>
            <button className="btn btn-primary btn-border" type="submit">
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PopupStoreEditor;
