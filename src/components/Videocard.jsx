// src/components/VideoCard.jsx
export default function VideoCard({ video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-[250px] flex-shrink-0 p-4 rounded-lg bg-white/10 backdrop-blur-md hover:scale-105 transition-transform cursor-pointer"
    >
      <h3 className="text-white font-bold text-lg mb-1">{video.title}</h3>
      <p className="text-white/80 text-sm">{video.description}</p>
    </a>
  );
}
