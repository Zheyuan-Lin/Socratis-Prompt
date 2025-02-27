export function BackgroundDecoration() {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
  
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl" />
  
        <svg
          className="absolute -bottom-10 -left-10 text-indigo-200 dark:text-indigo-900 opacity-20 w-64 h-64"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1.5C87,13.4,81.4,26.8,73.6,38.6C65.8,50.4,55.9,60.6,43.7,67.1C31.4,73.7,15.7,76.7,0.6,75.8C-14.5,74.9,-29,70.1,-41.2,62.2C-53.5,54.3,-63.5,43.3,-70.3,30.4C-77.1,17.5,-80.7,2.6,-78.9,-11.2C-77.1,-25,-69.9,-37.8,-59.9,-47.6C-49.9,-57.4,-37.1,-64.2,-24.2,-71.9C-11.3,-79.6,1.6,-88.2,15.8,-87.7C30,-87.2,60.1,-77.7,74.1,-70.7Z"
            transform="translate(100 100)"
          />
        </svg>
  
        <svg
          className="absolute -top-20 -right-20 text-cyan-200 dark:text-cyan-900 opacity-20 w-80 h-80"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M47.7,-73.2C62.1,-66.3,74.5,-54.5,79.8,-40.2C85.2,-25.9,83.5,-9.1,79.9,6.2C76.3,21.5,70.8,35.3,61.4,45.9C51.9,56.5,38.5,63.9,24.4,69.5C10.3,75.1,-4.4,78.9,-17.4,75.2C-30.4,71.6,-41.7,60.5,-51.5,48.8C-61.3,37.1,-69.6,24.8,-74.2,10.7C-78.8,-3.4,-79.7,-19.3,-73.4,-31.4C-67.1,-43.5,-53.6,-51.8,-40,-59.1C-26.3,-66.4,-12.4,-72.7,2.2,-76.1C16.8,-79.5,33.3,-80.1,47.7,-73.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    )
  }