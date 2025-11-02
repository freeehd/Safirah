import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WaterColorBlob = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    // Smoother, organic blob shapes with identical point structures to prevent glitching.
    const shapes = [
        "M300,100 C400,100 450,150 450,250 C450,350 400,400 300,400 C200,400 150,350 150,250 C150,150 200,100 300,100 Z",
        "M300,120 C380,120 480,180 480,250 C480,320 380,380 300,380 C220,380 120,320 120,250 C120,180 220,120 300,120 Z",
        "M300,150 C350,150 400,200 400,250 C400,300 350,350 300,350 C250,350 200,300 200,250 C200,200 250,150 300,150 Z"
    ];

    useEffect(() => {
        const svg = svgRef.current;
        const path = pathRef.current;
        if (!path || !svg) return;

        gsap.set(path, { attr: { d: shapes[0] } });

        const morphTl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            defaults: { duration: 10, ease: 'sine.inOut' }
        });

        morphTl.to(path, { attr: { d: shapes[1] } })
               .to(path, { attr: { d: shapes[2] } })
               .to(path, { attr: { d: shapes[0] } });
        
        const rotateTl = gsap.timeline({ repeat: -1 });
        rotateTl.to(svg, { rotation: 360, duration: 45, ease: 'none', transformOrigin: '50% 50%' });
        
        return () => {
            morphTl.kill();
            rotateTl.kill();
        };

    }, []);

    return (
        <svg
            ref={svgRef}
            className="watercolor-blob pointer-events-none absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-60 -z-10"
            viewBox="0 0 600 500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
        >
            <defs>
                <radialGradient id="blobGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: '#FFB5A7', stopOpacity: 0.9 }} /> 
                    <stop offset="50%" style={{ stopColor: '#FE9999', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#FCD5CE', stopOpacity: 0.7 }} />
                </radialGradient>
            </defs>
            <path
                ref={pathRef}
                fill="url(#blobGradient)"
            />
        </svg>
    );
};

export default WaterColorBlob;
