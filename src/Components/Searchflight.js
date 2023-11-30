import React, { useEffect, useRef, useState } from "react";
import NavbarComponent from "./Navbar";
import { GoArrowSwitch } from "react-icons/go";
import { FaMapMarker } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CryptoJS from "crypto-js";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Collapse,
} from "react-bootstrap";
import axios from "axios";
import Select from "react-select";

import { Autocomplete, TextField } from "@mui/material";

const Searchflight = () => {
  const [flyingFrom, setFlyingFrom] = useState("");
  const [flyingTo, setFlyingTo] = useState("");

  const encryptText = (data) => {
    const key = "aLtAeNCrypT";

    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();
    return encrypted;
  };

  // Form to api function

  const [options, setOptions] = useState([]);
  const previousController = useRef();

  const getData = async (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;

    //   signal,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (myJson) {
    //     console.log(
    //       "search term: " + searchTerm + ", results: ",
    //       myJson.products
    //     );
    //     const updatedOptions = myJson.products.map((p) => {
    //       return { title: p.title };
    //     });
    //     setOptions(updatedOptions);
    //   });

    // =============??????
    const state = { search_key: searchTerm };
    const data = encryptText(state);
    const request_data = { request_data: data };

    const json = JSON.stringify(request_data);
    try {
      const response = await axios.post(
        "https://devadmin.altabooking.com/api/v2/flight/search-flight-airport",

        json,

        {
          headers: {
            "Content-Type": "application/json",
            apikey: "indusAltaR2PSM",
            currency:
              "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCALQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvLCmpe0RATiqDh7g==",
          },
          // Other headers if needed, e.g., Authorization
        }
      );
      // console.log("response data code ", response.data.main_data.data);
      const updatedOptions = response.data.main_data.data.map((p) => {
        return {
          id: p.id,
          iata: p.iata,
          airport_name: p.airport_name,
        };
        // const from = {
        //   id: p.id,
        //   iata: p.iata,
        //   airport_name: p.airport_name,
        // };
        // console.log(from);
      });

      setOptions(updatedOptions);
      // response
      //  console.log("response  code ", response.data.main_data.res_code);

      //   const decrypt = decryptText(response.data.response_data);
      //   console.log("response data decrypt", decrypt.res_code);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const onInputChange = (event, value, reason) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };
  console.log("flying from options", flyingFrom);
  console.log("flying to options", flyingTo);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [traveller, setTraveller] = useState("");
  const travellerfun = () => {
    handleToggle();
    setTraveller(` ${adult} Adults 🔵 ${child} Child 🔵 ${infant} Infant`);
  };
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedPrefer, setSelectedPrefer] = useState("");

  const handleSelectChange = (event) => {
    setSelectedPrefer(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const state = {
      from_airport: flyingFrom,
      to_airport: flyingTo,
      departure_date: selectedDate.toISOString().split("T")[0],
      // return_date: selectedDate.toISOString().split("T")[0],
      adults: adult,
      childs: child,
      infants: infant,
      class_type: selectedPrefer,
      travel_type: "oneway",
      max_result: 100,
      user_id: 0,
    };
    console.log("State", state);
    const data = encryptText(state);
    const request_data = { request_data: data };

    const json = JSON.stringify(request_data);

    try {
      const response = await axios.post(
        "https://devadmin.altabooking.com/api/v2/flight/flight-search-list",

        json,

        {
          headers: {
            "Content-Type": "application/json",
            apikey: "indusAltaR2PSM",
            currency:
              "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCALQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvLCmpe0RATiqDh7g==",
          },
          // Other headers if needed, e.g., Authorization
        }
      );
      console.log("response data code ", response.data);
      // response
      // console.log("response  code ", response.data.main_data.res_code);
      // if (response.data.main_data.res_code == 200) {
      //   navigate(from);
      //   toast.success(response.data.main_data.response);
      // } else {
      //   toast.error(response.data.main_data.response);
      // }
      //   const decrypt = decryptText(response.data.response_data);
      //   console.log("response data decrypt", decrypt.res_code);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  return (
    <>
      <NavbarComponent />
      <div style={{ padding: "15px" }}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className=" d-flex align-items-center">
                <Col className="col-md-4">
                  <Form.Label>Flying From</Form.Label>
                  <InputGroup>
                    <Autocomplete
                      id="combo-box-demo"
                      options={options}
                      onInputChange={onInputChange}
                      getOptionLabel={(option) => option.iata}
                      onChange={(event, newValue) => {
                        console.log("iata", newValue.iata);
                        setFlyingFrom(newValue.iata);
                      }}
                      style={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Flying from"
                          variant="outlined"
                        />
                      )}
                    />
                    <InputGroup.Text>
                      <FaMapMarker />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col className="col-md-1">
                  <GoArrowSwitch />
                </Col>
                <Col>
                  <Form.Label className="col-md-4">Flying To</Form.Label>
                  <InputGroup>
                    <Autocomplete
                      id="combo-box-demo"
                      options={options}
                      onInputChange={onInputChange}
                      getOptionLabel={(option) => option.iata}
                      onChange={(event, newValue) => {
                        console.log("iata", newValue.iata);
                        setFlyingTo(newValue.iata);
                      }}
                      style={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Flying to"
                          variant="outlined"
                        />
                      )}
                    />
                    <InputGroup.Text>
                      <FaMapMarker />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col className="col-md-3">
                  <Form.Label>Depature Date</Form.Label>
                  <DatePicker
                    showIcon
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="eee d MMM yyyy" // format the displayed date
                    placeholderText="Select a date..."
                    className="input"
                  />
                </Col>
              </Row>
              <div style={{ margin: "15px" }}></div>
              <div className=" row">
                <Col className="col-md-4">
                  <Form.Label>Traveller(S)</Form.Label>
                  <Form.Control
                    placeholder="Select traveller "
                    onClick={handleToggle}
                    value={traveller}
                  />

                  <Collapse in={isOpen}>
                    <div className="col-md-12" style={{ paddingLeft: "15px" }}>
                      <Row className="pt-2">
                        <Col className="col-md-6">
                          <h4>Adult</h4>
                        </Col>
                        <Col className="col-md-2">
                          <Button
                            variant="primary"
                            onClick={() => setAdult(adult - 1)}
                            disabled={adult <= 0}
                          >
                            {" "}
                            -{" "}
                          </Button>
                        </Col>
                        <Col className="col-md-2">{adult}</Col>
                        <Col className="col-md-2">
                          <Button
                            variant="primary"
                            onClick={() => setAdult(adult + 1)}
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                      <Row className="pt-2">
                        <Col className="col-md-6">
                          <h4>Children(3-12yrs.) </h4>
                        </Col>
                        <Col className="col-md-2">
                          <Button
                            variant="primary"
                            onClick={() => setChild(child - 1)}
                            disabled={child <= 0}
                          >
                            {" "}
                            -{" "}
                          </Button>
                        </Col>
                        <Col className="col-md-2">{child}</Col>
                        <Col className="col-md-2">
                          <Button
                            variant="primary"
                            onClick={() => setChild(child + 1)}
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                      <Row className="pt-2">
                        <Col className="col-md-6">
                          <h4>Infant(0-2yrs.) </h4>
                        </Col>
                        <Col className="col-md-2">
                          <Button
                            variant="primary"
                            onClick={() => setInfant(infant - 1)}
                            disabled={infant <= 0}
                          >
                            {" "}
                            -{" "}
                          </Button>
                        </Col>
                        <Col className="col-md-2">{infant}</Col>
                        <Col className="col-md-2">
                          <Button
                            variant="primary"
                            onClick={() => setInfant(infant + 1)}
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                      <Row
                        className=" mt-4"
                        style={{ width: "100px", margin: "0 auto" }}
                      >
                        <Button
                          variant="primary"
                          onClick={() => travellerfun()}
                        >
                          Done
                        </Button>
                      </Row>
                    </div>
                  </Collapse>
                </Col>

                <Col className="col-md-4">
                  <Form.Label>Preferred Class</Form.Label>
                  <select
                    value={selectedPrefer}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Preferred Class</option>
                    {PreferredClass.map((prefer) => (
                      <option key={prefer} value={prefer}>
                        {prefer}
                      </option>
                    ))}
                  </select>
                </Col>
              </div>
              <Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4"
                  style={{ width: "100px", margin: "0 auto" }}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Searchflight;
const PreferredClass = ["Economy", "Premium Economy", "Business", "First"];
