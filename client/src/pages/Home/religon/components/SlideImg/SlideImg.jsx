import React, { useState, useEffect } from "react";
import Desktop from "./components/Desktop/Desktop";
import Mobile from "./components/Mobile/Mobile";
export default function SlideImg() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? <Mobile /> : <Desktop />;
}
