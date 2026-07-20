export default function SkeletonCard({ height = 300, style = {} }) {
  return (
    <div style={{ height, background: "#E8E4DF", overflow: "hidden", position: "relative", ...style }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
        animation: "skeletonShimmer 1.6s ease-in-out infinite",
      }} />
      <style>{`@keyframes skeletonShimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </div>
  );
}
