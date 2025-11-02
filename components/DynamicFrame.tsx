import React from 'react';

const DynamicFrame = () => {
    return (
        <svg
            className="dynamic-frame"
            viewBox="0 0 280 380"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                d="M230,30 L50,30 C20,30 20,60 20,90 L20,290 C20,320 20,350 50,350 L230,350 C260,350 260,320 260,290 L260,90 C260,60 260,30 230,30 Z"
                fill="none"
                stroke="var(--highlight-color)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default DynamicFrame;