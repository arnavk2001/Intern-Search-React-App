import React from "react";

import styles from "./CandidateCard.module.css";

const CandidateCard = ({ user }) => {
  const { first_name, last_name, email, linkedin, role } = user;
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>
        {first_name} {last_name}
      </h3>
      <p>Email: {email}</p>
      {/* <p>
        LinkedIn: <a href={linkedin}>{linkedin}</a>
      </p> */}
      <p>Role: {role}</p>
    </div>
  );
};

export default CandidateCard;
