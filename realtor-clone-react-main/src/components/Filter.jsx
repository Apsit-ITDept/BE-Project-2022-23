import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import ListingItem from "../components/ListingItem";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Filter = () => {
  const [listings, setListings] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, settypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [maxpriceFilter, setMaxPriceFilter] = useState('');

  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("address", "==", locationFilter),
          where("type", "==", typeFilter),
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listing)
        console.log('useEffect ran');
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, [locationFilter, priceFilter, maxpriceFilter, typeFilter]);



  return (
    <div className="bg-white mb-10">
      <div className=" grid grid-cols-2 px-5 py-5">
        <div className="flex flex-col m-6">
          <label htmlFor="location-filter" className="mb-2 font-medium">Location:</label>
          <select id="location-filter" className="py-2 px-4 border border-gray-400 rounded-md" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">Select</option>
            <option value="Kalyan">Kalyan</option>
            <option value="Powai">Powai</option>
            <option value="Thane">Thane</option>
          </select>
        </div>

        <div className="flex flex-col m-6">
          <label htmlFor="type-filter" className="mb-2 font-medium">Type:</label>
          <select id="type-filter" className="py-2 px-4 border border-gray-400 rounded-md" value={typeFilter} onChange={(e) => settypeFilter(e.target.value)}>
            <option value="">Select</option>
            <option value="rent">rent</option>
            <option value="sale">sale</option>
          </select>
        </div>

        <div className="flex flex-col m-6">
          <label htmlFor="price-filter" className="mb-2 font-medium">Minprice:</label>
          <select id="price-filter" className="py-2 px-4 border border-gray-400 rounded-md" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="">Select</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
            <option value="4000">4000</option>
          </select>
        </div>

        <div className="flex flex-col m-6">
          <label htmlFor="maxprice-filter" className="mb-2 font-medium">Maxprice:</label>
          <select id="maxprice-filter" className="py-2 px-4 border border-gray-400 rounded-md" value={maxpriceFilter} onChange={(e) => setMaxPriceFilter(e.target.value)}>
            <option value="">Select</option>
            <option value="10000">10000</option>
            <option value="20000">20000</option>
            <option value="30000">30000</option>
            <option value="40000">40000</option>
            <option value="100000">100000</option>

          </select>
        </div>
      </div>


      <div className="max-w-6xl mx-6 pt-4 space-y-6">
        {listings.map(listing => (
          <div className="m-2 mb-6">
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>

        ))}
      </div>
    </div>

  )
}

export default Filter;