import React from "react";
import styles from "./goalList.module.scss";

import { Goal } from "../Goal/Goal";

export const GoalList = () => {
  return (
    <div className={styles.root}>
      <header>
        <div>
          <span>Цели</span>
          <button>
            <svg
              height="18px"
              version="1.1"
              viewBox="0 0 32 32"
              width="18px"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z" />
            </svg>
            Добавить
          </button>
        </div>

        <div>
          <svg
            height="22px"
            version="1.1"
            viewBox="0 0 512 512"
            width="22px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
          </svg>

          <svg
            width="22px"
            height="22px"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="none" height="22px" width="22px" />
            <polyline
              fill="none"
              points="144 168 184 208 224 168"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
              x1="184"
              x2="184"
              y1="112"
              y2="208"
            />
            <line
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
              x1="48"
              x2="120"
              y1="128"
              y2="128"
            />
            <line
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
              x1="48"
              x2="184"
              y1="64"
              y2="64"
            />
            <line
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
              x1="48"
              x2="104"
              y1="192"
              y2="192"
            />
          </svg>
        </div>
      </header>

      <div className={styles.content}>
        <Goal />
      </div>
    </div>
  );
};
