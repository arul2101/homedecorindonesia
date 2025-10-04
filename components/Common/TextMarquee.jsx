'use client'

export default function TextMarquee({
  text = "PREMIUM QUALITY • CUSTOM DESIGNS • PROFESSIONAL INSTALLATION • 10+ YEARS EXPERIENCE",
  speed = 20,
  backgroundColor = 'bg-gray-900',
  textColor = 'text-white',
  textSize = 'text-sm',
  fontWeight = 'font-light',
  letterSpacing = 'tracking-wider',
  height = 'py-4',
  pauseOnHover = true,
  repeatCount = 3
}) {
  return (
    <section className={`${height} ${backgroundColor} overflow-hidden ${pauseOnHover ? 'group' : ''}`}>
      <div className="relative">
        <div
          className={`flex whitespace-nowrap ${pauseOnHover ? 'group-hover:animation-pause' : ''}`}
          style={{
            animation: `marquee ${speed}s linear infinite`,
          }}
        >
          {/* Generate repeated text for seamless scrolling */}
          {Array.from({ length: repeatCount }, (_, index) => (
            <span
              key={index}
              className={`${textColor} ${textSize} ${fontWeight} ${letterSpacing} mx-8 inline-block`}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .group-hover\:animation-pause:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  )
}