import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function HeroSection({ tagline, sub, ctaText, bgImages = [] }) {
    const [current, setCurrent] = useRef ? [0, () => { }] : [0, () => { }];
    // Simple auto-slider
    const idxRef = useRef(0);
    const [imgIdx, setImgIdx] = [idxRef.current, (v) => { idxRef.current = v; }];

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background image/video */}
            <div className="absolute inset-0 bg-navy">
                {bgImages.map((img, i) => (
                    <motion.div key={i} className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
                        initial={{ opacity: 0 }} animate={{ opacity: i === 0 ? 1 : 0 }}
                        transition={{ duration: 1.5 }}
                    />
                ))}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
                    <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-4">
                        Premium Interior & Construction
                    </p>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6 max-w-3xl">
                    {tagline || "Crafting Spaces That Inspire"}
                </motion.h1>

                <motion.div className="gold-line" initial={{ width: 0 }} animate={{ width: 48 }} transition={{ delay: 0.9, duration: 0.6 }} />

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}
                    className="font-sans text-cream/70 text-base md:text-lg max-w-md mt-4 mb-10 leading-relaxed">
                    {sub || "Award-winning interior design and construction company based in Hyderabad."}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
                    className="flex flex-wrap gap-4">
                    <Link to="/portfolio" className="btn-gold">View Our Work</Link>
                    <Link to="/contact" className="btn-outline">Get a Quote</Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="font-sans text-[10px] text-cream/40 tracking-widest uppercase">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
            </motion.div>
        </section>
    );
}