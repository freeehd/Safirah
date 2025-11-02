import React from 'react';
import Image from 'next/image';
const HiraImage = () => {
    return (
        <Image 
            src="/public/assets/1.webp" 
            alt="An illustration of Hira Safi, a coach, with a warm smile and arms crossed." 
            className="hira-portrait" 
            width={100}
            height={100}
        />
    );
};

export default HiraImage;