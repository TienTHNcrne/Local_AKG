import React from "react";

export default function Triangular({ direction, size, color, className }) {
    direction;
    const styles = {
        up: {
            width: 0,
            height: 0,
            borderLeft: `${size}px solid transparent`,
            borderRight: `${size}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
        },
        down: {
            width: 0,
            height: 0,
            borderLeft: `${size}px solid transparent`,
            borderRight: `${size}px solid transparent`,
            borderTop: `${size}px solid ${color}`,
        },
        left: {
            width: 0,
            height: 0,
            borderTop: `${size}px solid transparent`,
            borderBottom: `${size}px solid transparent`,
            borderRight: `${size}px solid ${color}`,
        },
        right: {
            width: 0,
            height: 0,
            borderTop: `${size}px solid transparent`,
            borderBottom: `${size}px solid transparent`,
            borderLeft: `${size}px solid ${color}`,
        },
    };

    return <div style={styles[direction]} className={className}></div>;
}
