import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
    { end: 150, label: "Projects Completed", suffix: "+" },
    { end: 12, label: "Years of Experience", suffix: "+" },
    { end: 120, label: "Happy Clients", suffix: "+" },
    { end: 8, label: "Awards Won", suffix: "" },
];

export default function Counter() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <section ref={ref} className="bg-navy py-20">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                {stats.map(({ end, label, suffix }) => (
                    <div key={label} className="flex flex-col items-center gap-3">
                        <span className="font-serif text-5xl md:text-6xl text-gold">
                            {inView ? <CountUp end={end} duration={2.5} suffix={suffix} /> : `0${suffix}`}
                        </span>
                        <div className="w-8 h-px bg-gold/40" />
                        <p className="font-sans text-cream/60 text-sm tracking-wider uppercase">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}