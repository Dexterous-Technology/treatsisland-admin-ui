import React, { useEffect, useState } from "react";
import Modal from "react-awesome-modal";
import moment from "moment";
import { useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./event-editor-popup.scss";
import ApiCalls from "../../../../api";

const EventEditorPopup = ({
  isEditing = false,
  isVisible = true,
  orgId = -1,
  selectedEvent = null,
  onDismiss = () => { },
  onSave = () => { },
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [generalFormError, setGeneralFormError] = useState('');


  const _toggleSelection = (product) => {
    const copyOfSelectedProducts = [...selectedProducts];
    const index = copyOfSelectedProducts.findIndex(p => p.ProductID === product.ProductID);
    console.log('index :>> ', index);
    if (index > -1) {
      copyOfSelectedProducts.splice(index, 1)
    } else {
      copyOfSelectedProducts.push(product);
    }
    console.log('copyOfSelectedProducts :>> ', copyOfSelectedProducts);
    setSelectedProducts(copyOfSelectedProducts);
  }

  const _generateSelectedProductIds = () => {
    return selectedProducts.map(product => product.ProductID);
  }

  const _editEvent = async (payload) => {
    await ApiCalls.event.private.editEvent(payload);
    onDismiss();
  }

  const _addEvent = async (payload) => {
    await ApiCalls.event.private.createEvent(payload);
    onDismiss();
  }

  const onSubmit = async ({ eventName, teamName, startDate }) => {
    setFormError("");
    setGeneralFormError('');
    if (!(startDate && startDate > 0)) {
      setGeneralFormError('Please provide a valid start date and time');
      return;
    }
    if (!selectedProducts?.length) {
      setFormError("Please select atleast one product to continue");
      return;
    }
    // Else process
    const payload = {
      eventName,
      teamName,
      startDate,
      endDate: moment(startDate).add(5, 'days'),
      productIds: _generateSelectedProductIds()
    }
    if (isEditing) {
      payload.eventId = selectedEvent.EventID;
      _editEvent(payload);
    } else {
      payload.orgId = orgId;
      _addEvent(payload);
    }
  };

  const _fetchAllProducts = async () => {
    try {
      const { data: { data: { allProducts } } } = await ApiCalls.product.private.getAllProducts();
      if (allProducts?.length) {
        setAllProducts(allProducts);
      }
    } catch (error) {

    }
  }

  const _reset = () => {
    reset();
    setFormError('');
    setSelectedProducts([]);
    setSearchInput('');
  }

  const _setValuesIfNeeded = () => {
    if (isEditing && selectedEvent) {
      console.log('selectedEvent :>> ', selectedEvent);
      setValue('eventName', selectedEvent.EventName);
      setValue('teamName', selectedEvent.TeamName);
      setValue('startDate', selectedEvent.StartDate);
      setSelectedProducts(selectedEvent.products)
    }
  }

  useEffect(() => {
    _fetchAllProducts();
  }, []);

  useEffect(() => {
    _setValuesIfNeeded();
    return () => {
      _reset();
    }
  }, [isVisible]);

  const _filterProducts = () => {
    let trimmedSearchValue = searchInput?.trim()?.toLowerCase();
    let filteredProducts = [...allProducts];
    if (trimmedSearchValue?.length) {
      filteredProducts = filteredProducts.filter(product => product.Product.toLowerCase().indexOf(trimmedSearchValue) > -1)
    }
    const selectedProductsIdMapped = {};
    selectedProducts.forEach(selectedProduct => selectedProductsIdMapped[selectedProduct.ProductID] = true);
    filteredProducts.forEach(product => {
      if (selectedProductsIdMapped[product.ProductID]) {
        product.isSelected = true;
      } else {
        product.isSelected = false;
      }
    })
    return filteredProducts;
  }


  const filteredProducts = _filterProducts();

  const { startDate = +new Date() } = watch();

  return (
    <>
      <Modal
        visible={isVisible}
        width="1200"
        height="75%"
        effect="fadeInUp"
        onClickAway={onDismiss}
      >
        <div>
          <div className="container-fluid p-5">
            {/* <div className="row">
              <div className="col-lg-5">
                <div className="formWrapper">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label>Event name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter event name"
                        {...register("eventName", {
                          required: true,
                          minLength: 2,
                        })}
                      />
                      <small className="form-text text-muted">
                        {errors.eventName && "Please provide valid event name"}
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Team name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter event team name"
                        {...register("teamName", {
                          required: true,
                          minLength: 2,
                        })}
                      />
                      <small className="form-text text-muted">
                        {errors.teamName && "Please provide valid team name"}
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Start date & time</label>
                      <ReactDatePicker
                        selected={startDate ? moment(parseInt(startDate)).toDate() : null}
                        onChange={(date) => {
                          setValue("startDate", +moment(date).toDate())
                        }}
                        minDate={new Date()}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                      />
                      <small className="form-text text-muted">
                        {generalFormError}
                      </small>
                    </div>
                    <div className="actions">
                      <button className="saveBtn" type="submit">Save</button>
                      <button className="dismissBtn" type="button" onClick={onDismiss}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="productSelectorWrapper">
                  <h3>Select products</h3>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products here"
                    onChange={e => setSearchInput(e.target.value)}
                    value={searchInput}
                  />
                  <div className="productResults">
                    {
                      filteredProducts?.map(product => (
                        <div className={`product ${product?.isSelected && 'selected'}`} onClick={e => _toggleSelection(product)} key={product.ProductID}>
                          <div className="productLabel">{product.Product}</div>
                          <div className="productAction"></div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div> */}

            <div class="modal-title">
              <span class="title">Create an event</span>
              <div class="modal-close"> <i className="fa fa-times"></i> </div>
            </div>

            <div className="inner-content">
              <div className="section">
                <div class="h4 font-weight-bold text-dark border-bottom pb-2">Organization details</div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group input-error">
                      <label htmlFor="">Organization name</label>
                      <input type="text" className="form-control" placeholder="Enter organization name" />
                      <small class="error-text">Please provide valid organization name</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">Type of organization</label>
                      <select name="" id="" className="form-control">
                        <option value="">Select type</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>


              <div className="section">
                <div class="h4 font-weight-bold text-dark border-bottom pb-2">Event details</div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Event coordinator name</label>
                      <input type="text" className="form-control" placeholder="Enter event coordinator name" />
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="form-group">
                      <label htmlFor="">Start time & date (Timezone: Asia/Calcutta)</label>
                      <ReactDatePicker
                        // selected={startDate ? moment(startDate).toDate() : null}
                        // onChange={(date) => {
                        //   setValue("startDate", +moment(date).toDate())
                        // }}
                        // minDate={new Date()}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        showTimeSelect
                      />
                    </div>
                  </div>
                </div>
              </div>


              <div className="buttons">
                <div className="cancel button secondary">Cancel</div>
                <div className="save button primary">Save</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EventEditorPopup;
