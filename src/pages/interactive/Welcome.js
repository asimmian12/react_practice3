import { motion } from "framer-motion";
import React from "react";

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
        const delay = i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        };
    },
};

const Welcome = () => {
    return (
        <section className="bg-black">
            <motion.svg
                width="800"
                height="200"
                viewBox="0 0 800 200"
                initial="hidden"
                animate="visible"
                style={image}
            >
                {/* Path for the word "Welcome" */}
                <motion.path
                    d="M10 150 L50 50 L90 150 M120 150 L120 50 L160 150 M200 150 Q220 50 240 150 M260 150 L300 50 L340 150 M360 150 L360 50 L400 150 M420 150 Q440 50 460 150 M480 150 L520 50 L560 150"
                    stroke="#ff0088"
                    fill="transparent"
                    strokeWidth="10"
                    strokeLinecap="round"
                    variants={draw}
                    custom={1}
                />
            </motion.svg>
        </section>
    );
};

/**
 * ==============   Styles   ================
 */

const image = {
    maxWidth: "80vw",
};

export default Welcome;
