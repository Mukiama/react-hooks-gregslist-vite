//destructure props from listing as we'll need for the fetch request
function ListingCard({id, description, image, location, favorite, updateListing, deleteListing}) {
  //define onClick event handler
  // add fetch to event handler
  const handleFavorite = () => {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({favorite:!favorite})
    })
    .then(r => {
        if (!r.ok) {throw new Error("failed to favorite listing") }
          return r.json()
        })
    .then(updateListing)  //use prop to update state
    .catch(error => console.log(error.message))
  }
  //create onClick event handler 
  //add fetch request
  const handleDelete = () => {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: "DELETE",
    })
     .then(r => {
          if (!r.ok) {throw new Error("Delete failed") }
          deleteListing(id)
        })
      .catch(error => console.log(error.message))
  }
  
  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={"https://via.placeholder.com/300x300"} alt={"description"} />
      </div>
      <div className="details">
        {/* add onClicks to both buttons */}
        {true ? (
          <button onClick= {handleFavorite}className="emoji-button favorite active">★</button>
        ) : (
          <button onClick= {handleFavorite}className="emoji-button favorite">☆</button>
        )}
        <strong>{"description"}</strong>
        <span> · {"location"}</span>
        {/* add event handler */}
        <button onClick= {handleDelete} className="emoji-button delete">🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
