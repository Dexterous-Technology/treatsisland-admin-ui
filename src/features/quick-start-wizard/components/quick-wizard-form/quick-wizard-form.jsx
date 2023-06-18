import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import ApiCalls from "../../../../api";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./quick-wizard-form.scss";
import { useSelector } from "react-redux";
import EventUtils from "../../../../entities/events/utils/event-utils";
import Swal from "sweetalert2";
import useDeepCompareEffect from "use-deep-compare-effect";

let hasShown = false;

const QuickWizardForm = ({
  gotoNextStep,
  gotoPrevStep,
  formValues,
  closeModal,
  setFormValues,
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
  const [orgTypes, setOrgTypes] = useState([]);
  const [generalFormError, setGeneralFormError] = useState('');
  const { events } = useSelector((state) => state.event);

  const _checkIfHasActiveEvents = () => {
    let hasActiveEvent = false;
    for (let event of events) {
      const startDateTimeStamp = +moment(parseInt(event.StartDate)).toDate();
      const endDateTimeStamp = +moment(parseInt(event.StartDate))
        .add(5, "days")
        .toDate();
      const currentDateTimeStamp = +moment().toDate();
      if (
        currentDateTimeStamp > startDateTimeStamp &&
        currentDateTimeStamp < endDateTimeStamp
      ) {
        hasActiveEvent = true;
        break;
      }
    }
    return hasActiveEvent;
  };

  const hasActiveEvents = _checkIfHasActiveEvents();

  if (hasActiveEvents && !hasShown) {
    // hasShown = true;
    // Swal.fire({
    //   icon: "error",
    //   title: "Cannot create a new event",
    //   text: "You already have an active event",
    //   didClose: () => {
    //     closeModal();
    //   }
    //   // footer: '<a href="">Why do I have this issue?</a>'
    // });
  }


  const _loadEvents = () => {
    EventUtils.loadAllEvents();
  }

  useDeepCompareEffect(() => {
    hasShown = false;
    if (!events?.length) {
      console.log('_loadEvents 12345');
      _loadEvents();
    }
  }, [events])


  const _setValuesIfNeeded = () => {
    setValue("eventName", formValues?.eventName || "");
    setValue("orgName", formValues?.orgName || "");
    setValue("orgType", formValues?.orgType || "");
    setValue("startDate", formValues?.startDate || "");
  };

  const _loadOrgTypes = async () => {
    if (!orgTypes?.length) {
      try {
        const response = await ApiCalls.org.public.loadOrgTypes();
        if (response?.data?.data?.allOrgTypes) {
          setOrgTypes(response?.data?.data?.allOrgTypes);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };

  const onSubmit = async ({ eventName, orgName, orgType, startDate }) => {
    setGeneralFormError('');
    if (!(startDate && startDate > 0)) {
      setGeneralFormError('Please provide a valid start date and time');
      return;
    }
    const selectedOrgType = orgTypes.find(ot => ot.OrganizationTypeID == orgType)
    setFormValues({
      eventName,
      orgName,
      orgType,
      orgTypeName: selectedOrgType.OrganizationType,
      startDate,
    });

    gotoNextStep();
  };

  const filterTime = (date) => {
    const isPastTime = new Date().getTime() > date.getTime();
    return !isPastTime;
    };

  useEffect(() => {
    _setValuesIfNeeded();
    _loadOrgTypes();
  }, []);

  const { startDate = new Date() } = watch();

  return (
    <>
      <form className={"wizard_steps step2 "} onSubmit={handleSubmit(onSubmit)} >
        <div
          className="wizard_content"
          // style={{opacity: `${!hasActiveEvents? 0.2: 1}`}}
        >
          <div className="h4 font-weight-bold text-dark border-bottom pb-2">
            Organization details
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className={`form-group ${errors.orgName && "input-error"}`}>
                <label htmlFor=""><b>Organization name</b></label>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  className="form-control"
                  {...register("orgName", {
                    required: true,
                    minLength: 2,
                  })}
                />
                <small className="error-text">
                  {errors.orgName && "Please provide valid organization name"}
                </small>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`form-group ${errors.orgType && "input-error"}`}>
                <label htmlFor=""><b>Type of organization</b></label>
                <select
                  name=""
                  id=""
                  defaultValue={formValues.orgType}
                  className="form-control"
                  {...register("orgType", {
                    required: true,
                    min: 0,
                  })}
                >
                  <option value="-1">Select type</option>
                  {orgTypes?.map((orgType) => (
                    <option
                      value={orgType.OrganizationTypeID}
                      key={orgType.OrganizationTypeID}
                    >
                      {orgType.OrganizationType}
                    </option>
                  ))}
                </select>
                <small className="error-text">
                  {errors.orgType && "Please select a valid type"}
                </small>
              </div>
            </div>
          </div>

          <div className="h4 font-weight-bold text-dark border-bottom pb-2 mt-5">
            Event details
          </div>
          <div className="row">
            <div className="col-md-4">
              <div
                className={`form-group ${errors.eventName && "input-error"}`}
              >
                <label htmlFor=""><b>Event coordinator name</b></label>
                <input
                  type="text"
                  placeholder="Enter event coordinator name"
                  className="form-control"
                  {...register("eventName", {
                    required: true,
                  })}
                />
                <small className="error-text">
                  {errors.eventName && "Please provide valid event coordinator name"}
                </small>
              </div>
            </div>

            {/* <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">Team name</label>
                <input
                  type="text"
                  placeholder="Enter team name"
                  className="form-control"
                />
              </div>
            </div> */}

            <div className="col-md-8">
              <div
                className={`form-group ${generalFormError.length && "input-error"}`}
              >
                <label htmlFor=""><b>Start date & time</b> (Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone})</label>
                {/* <input
                  type="date"
                  {...register("startDate", {
                    required: true,
                  })}
                  minDate={new Date()}
                /> */}
                <ReactDatePicker
                  selected={startDate ? moment(startDate).toDate() : null}
                  onChange={(date) => {
                    setValue("startDate", +moment(date).toDate())
                  }}
                  minDate={new Date()}
                  filterTime={filterTime}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                  showTimeSelect
                />
                <small className="error-text">
                  {generalFormError}
                </small>
              </div>
            </div>


            {/* <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">End date</label>
                <input type="date" className="form-control" />
              </div>
            </div> */}
          </div>

          {/* <div className="searchProducts">
                  <div className="form-group">
                    <label htmlFor="">Search products</label>
                    <input type="text" placeholder="Search products here" className="form-control" />
                  </div>

                  <div className="wizard_products">
                    <WizardProduct />
                    <WizardProduct />
                    <WizardProduct />
                    <WizardProduct />
                  </div>
                </div> */}
        </div>
        <div className="wizard_buttons">
          <span className="button secondary" onClick={gotoNextStep}>
            Previous
          </span>
          <button
            className="button primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default QuickWizardForm;
