import React from "react";
import { GoalDetails } from "../components/GoalDetails/GoalDetails";
import { GoalList } from "../components/GoalList/GoalList";

export const Goals = () => {
  return (
    <>
      <GoalList />
      <GoalDetails />
    </>
  );
};
