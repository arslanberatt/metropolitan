export default function RevealWords({ text, className = "", stagger = 0.08, delay = 0 }: { text: string; className?: string; stagger?: number; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.12em" }}>
          <span
            className="inline-block"
            style={{
              animation: `revealWord 0.9s cubic-bezier(0.65,0,0.35,1) ${delay + i * stagger}s both`,
            }}
          >
            {w}{i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
      <style>{`@keyframes revealWord{from{transform:translateY(110%)}to{transform:translateY(0)}}`}</style>
    </span>
  );
}
