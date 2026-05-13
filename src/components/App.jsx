import {useState, useEffect} from "react"
import Header from "./Header";
import ListingForm from "./ListingForm";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([])
  //create state to hold search query
  const [search, setSearch] = useState("")
  //add useEffect to App component with empty dependency array
  useEffect (() => {
    fetch("http://localhost:6001/listings")
    .then(r=> {
      if (!r.ok) {throw new Error("failed to get listings")}
      return r.json()
    })
    .then(setListings)
    .catch(error => console.log(error.message))
  },[]);

  //define function to add listing to useState
  const addListing = newListing=> setListings(previousListings =>[...previousListings, newListing])

  //define function to update a listing in stata
  const updateListing = updatedListing => setListings(previousListings=> previousListings.map(listing => 
    listing.id === updatedListing.id ? updatedListing : listing
  ))
// define function to delete a listing in state
const deleteListing= deletedListingId  => setListings(previousListings=> previousListings.filter(listing => listing.id !==deletedListingId))
//filter listings by the search query 
const displayedListings = listings.filter((listing) => (listing.description || "").toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="app">
      {/*pass onSearch as setSearch*/}
      <Header search= {search} onSearch={setSearch}/>
      <ListingForm addListing={addListing} />
      {/*change the listings passed down to the new filtered listings*/}
      <ListingsContainer listings={displayedListings} 
      updateListing= {updateListing}
      deleteListing= {deleteListing}/> 
    </div>
  );
}

export default App;
