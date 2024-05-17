import { useEffect, useState } from "react";

import SearchInput from "./components/SearchInput/SearchInput";
import CandidateList from "./components/CandidateList/CandidateList";

import styles from "./App.module.css";

const PAGE_SIZE = 10;
let universe = [];

function App() {
  const [data, setData] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/users`);
      const data = await response.json();
      setData(data);
      universe = data;
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    setItems(data.slice(0, page * PAGE_SIZE));
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setLoading(true);
    // simulate random delay between 1-3 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      if (page * PAGE_SIZE >= data.length) {
        setHasMore(false);
      }
      setItems(data.slice(0, page * PAGE_SIZE));
      setLoading(false);
    }, delay);
  }, [page]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredData = universe.filter((user) => {
      const nameCondition =
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase());
      const roleCondition = user.role
        .toLowerCase()
        .includes(selectedOption.toLowerCase());
      return nameCondition && roleCondition;
    });
    setData(filteredData);
    setPage(1);
    setHasMore(true);
    setSearchTerm("");
  };

  const handleReset = () => {
    setData(universe);
    setPage(1);
    setHasMore(true);
    setSearchTerm("");
    setSelectedOption("");
  };

  const handleFilterChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Cornell Tech Intern Search</h1>
      </header>
      <div className={styles.contentContainer}>
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          selectedOption={selectedOption}
          handleChange={handleFilterChange}
        />
      </div>
      <CandidateList
        hasMore={hasMore}
        setPage={setPage}
        items={items}
        loading={loading}
      />
    </div>
  );
}

export default App;
