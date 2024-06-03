import React, { useEffect, useState } from 'react';
import Header from '../../Component/header/Header';
import Navbar from '../../Component/navbar/Navbar';
import "./list.css";
import { useLocation } from 'react-router-dom';
import { format, isValid } from "date-fns";
import { DateRange } from 'react-date-range';
import Searchitem from '../../Component/searchitem/Searchitem';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const location = useLocation();
  const [opendate, setopendate] = useState(false);
  const [destination, setdestination] = useState(location.state?.destination || "");
  const [dates, setdates] = useState(location.state?.date || {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [option, setoption] = useState(location.state?.option || { adult: 1, children: 0, room: 1 });
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 1000}`
  );
  
  const handleClick = () => {
    reFetch();
  };

  // Helper function to check date validity
  const isValidDate = (date) => {
    return isValid(new Date(date));
  };

  return (
    <div>
      <Navbar />
      <Header type="List" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsitem">
              <label>Destination</label>
              <input placeholder={destination} type='text' />
            </div>
            <div className="lsitem">
              <label>Check-in</label>
              <span onClick={() => setopendate(!opendate)}>
                {isValidDate(dates.startDate) && isValidDate(dates.endDate)
                  ? `${format(new Date(dates.startDate), "dd/MM/yyyy")} to ${format(new Date(dates.endDate), "dd/MM/yyyy")}`
                  : "Invalid date range"
                }
              </span>
              {opendate && (
                <DateRange
                  onChange={item => {
                    if (isValidDate(item.selection.startDate) && isValidDate(item.selection.endDate)) {
                      setdates(item.selection);
                    }
                  }}
                  minDate={new Date()}
                  ranges={[dates]}
                />
              )}
            </div>
            <div className="Lsitem">
              <label>Options</label>
              <div className='lsitemoption'>
                <div className="lsoptionitem">
                  <span className="lsoptiontext">Min Price <small>per night</small></span>
                  <input type="number" className="lsoptioninput"
                    onChange={(e) => setMin(e.target.value)} />
                </div>
                <div className="lsoptionitem">
                  <span className="lsoptiontext">Max Price <small>per night</small></span>
                  <input type="number" className="lsoptioninput"
                    onChange={(e) => setMax(e.target.value)} />
                </div>
                <div className="lsoptionitem">
                  <span className="lsoptiontext">Adults</span>
                  <input min={1} type="number" className="lsoptioninput" placeholder={option.adult} />
                </div>
                <div className="lsoptionitem">
                  <span className="lsoptiontext">Children</span>
                  <input min={0} type="number" className="lsoptioninput" placeholder={option.children} />
                </div>
                <div className="lsoptionitem">
                  <span className="lsoptiontext">Room</span>
                  <input min={1} type="number" className="lsoptioninput" placeholder={option.room} />
                </div>
              </div>
              <button className='lsbutton' onClick={handleClick}>search</button>
            </div>
          </div>
          <div className="listresult">
            {loading ? "loading" : <>
              {data.map(item => (
                <Searchitem item={item} key={item._id} />
              ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
