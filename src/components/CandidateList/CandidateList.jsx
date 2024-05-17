import React, { useCallback, useRef } from "react";

import CandidateCard from "./CandidateCard/CandidateCard";

import styles from "./CandidateList.module.css";
import { Grid } from "react-loader-spinner";

const CandidateList = ({ hasMore, loading, setPage, items }) => {
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.listContainer}>
        <div className={styles.container}>
          {items.map((user, index) => {
            if (items.length === index + 1) {
              return (
                <li className={styles.listItem} ref={lastItemRef} key={user.id}>
                  <CandidateCard key={user.id} user={user} />
                </li>
              );
            } else {
              return (
                <li className={styles.listItem} key={user.id}>
                  <CandidateCard key={user.id} user={user} />
                </li>
              );
            }
          })}
        </div>
        {loading && (
          <div className={styles.loadingContainer}>
            <Grid
              visible={true}
              height="60"
              width="60"
              color="#e95a5a"
              ariaLabel="grid-loading"
              radius="12.5"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
