import React from "react";

function Filter({filter, onChange}) {
  return (
    <div className="form-group search">
      <label htmlFor="search">Filter by name:</label>
      <input
        type="text"
        id="search"
        name="search"
        value={filter}
        onChange={onChange}
      />
    </div>
  );
}

export default Filter;
