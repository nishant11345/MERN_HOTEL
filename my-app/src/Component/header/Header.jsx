import React, { useContext, useState } from 'react';
import "./Header.css";
import { faBed, faCalendar, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [opendate, setopendate] = useState(false);
  const [destination, setdestination] = useState("");
  const [dates, setdates] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }]);
  const [openoptions, setopenoptions] = useState(false);
  const [options, setoptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const handleOption = (name, operation) => {
    setoptions((prev) => {
      return {
        ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(SearchContext);
  const handlesearchtext = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });

    navigate('/hotels', { state: { destination, dates, options } });
  };
  return (
    <div className="header">
      <div className={type === "List" ? "headercontainer Listmode" : "headercontainer"}>
        <div className="headerlist ">
          <div className="headerlistitem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>

          </div>
          <div className="headerlistitem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerlistitem">
            <FontAwesomeIcon icon={faCar} />
            <span>Cars Rental</span>
          </div>
          <div className="headerlistitem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attraction</span>
          </div>
          <div className="headerlistitem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airpot Taxi</span>
          </div>
        </div>
        {type !== "List" &&
          <>
            <h1 className='headertitle'>Get your All bookings at one place</h1>
            <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, eum sed tempora possimus dicta rerum aliquid totam natus architecto eius asperiores deleniti repellat corrupti soluta, iure nulla pariatur, delectus ipsa.</p>
            {!user && <button className="headerBtn">Sign in / Register</button>}            <div className="headersearch">

              <div className="headersearchitem">
                <FontAwesomeIcon icon={faBed} className='headericon' />

                <input type='text' placeholder='Where are you going ' className='headersearchinput' onChange={e => setdestination(e.target.value)} />
              </div>
              <div className="headersearchitem">
                <FontAwesomeIcon icon={faCalendar} className='headericon'
                />

                <span onClick={() => setopendate(!opendate)} className='headersearchtext'>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`} </span>
                {opendate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setdates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className='date'
                />}


              </div>

              <div className="headersearchitem">
                <FontAwesomeIcon icon={faPerson} className='headericon' />

                <span onClick={() => setopenoptions(!openoptions)} className='headersearchtext'> {`${options.adult} adult ${options.children} children ${options.room} room `} </span>
                {openoptions && <div className="options">
                  <div className="optionitem">
                    <span className="optiontext">Adult</span>
                    <div className="optioncounter">
                      <button
                        disabled={options.adult <= 1} className="optionbutton" onClick={() => handleOption("adult", "d")}>-</button>
                      <span className="optioncounternumber"> {options.adult} </span>
                      <button className="optionbutton" onClick={() => handleOption("adult", "i")}> +</button>
                    </div>
                  </div>
                  <div className="optionitem">
                    <span className="optiontext">Children</span>
                    <div className="optioncounter">
                      <button
                        disabled={options.children <= 0} className="optionbutton" onClick={() => handleOption("children", "d")}>-</button>
                      <span className="optioncounternumber">{options.children}</span>
                      <button className="optionbutton" onClick={() => handleOption("children", "i")}>+</button>
                    </div>
                  </div>
                  <div className="optionitem">
                    <span className="optiontext">Room</span>
                    <div className="optioncounter">
                      <button
                        disabled={options.room <= 1} className="optionbutton" onClick={() => handleOption("room", "d")}>-</button>
                      <span className="optioncounternumber">{options.room}</span>
                      <button className="optionbutton" onClick={() => handleOption("room", "i")}>+</button>
                    </div>
                  </div>
                </div>}
              </div>
              <div className="headersearchitem">

                <button className="headerBtn" onClick={handlesearchtext}>Search</button>
              </div>


            </div></>}
      </div>
    </div>
  )
}

export default Header;
