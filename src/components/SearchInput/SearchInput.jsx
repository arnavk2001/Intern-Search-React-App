import React from "react";
import { GrPowerReset } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";

import styles from "./SearchInput.module.css";

const options = [
  "PM",
  "Data Science, AI/ML intern",
  "ML, Engineering",
  "SDE",
  "Engineering",
];

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  handleSubmit,
  handleReset,
  handleChange,
  selectedOption,
}) => {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <FaSearch size={16} className={styles.searchIcon} />
            <input
              type="text"
              id="search"
              placeholder="Start typing to search..."
              value={searchTerm}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleReset}
          >
            <GrPowerReset size={16} className={styles.clearIcon} />
            Clear
          </button>
        </div>
      </div>
      <div
        style={{ marginTop: "16px", display: "flex", alignItems: "center" }}
        className={styles.formGroup}
      >
        <label htmlFor="role-select">Role</label>
        <div className={styles.select}>
          <select
            id="role-select"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
