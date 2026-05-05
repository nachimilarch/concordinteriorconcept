import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
    const imgSrc = project.cover_image
        ? `${import.meta.env.VITE_API_URL}/uploads/${project.cover_image}`
        : "/placeholder.jpg";

    return (
        <Link to={`/portfolio/${project.slug}`}>
            <motion.div whileHover={{ y: -4 }} className="group relative overflow-hidden bg-navy cursor-pointer">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                    <img src={imgSrc} alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/70 transition-all duration-500 flex flex-col justify-end p-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileHover={{ opacity: 1, y: 0 }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="font-sans text-[10px] text-gold tracking-widest uppercase">
                            {project.category_name}
                        </span>
                        <h3 className="font-serif text-xl text-cream mt-1">{project.title}</h3>
                        <p className="font-sans text-cream/60 text-xs mt-1">{project.location} · {project.year_completed}</p>
                        <div className="gold-line mt-3" />
                    </motion.div>
                </div>
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-gold text-white text-[10px] font-sans tracking-widest uppercase px-3 py-1 group-hover:opacity-0 transition-opacity">
                    {project.category_name}
                </span>
            </motion.div>
        </Link>
    );
}