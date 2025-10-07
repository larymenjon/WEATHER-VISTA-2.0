import React from 'react';

interface AnimatedBackgroundProps {
  weatherCondition: string;
}

const Rain: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
            <div
                key={i}
                className="absolute bg-blue-300 w-px h-10 animate-fall"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    animationDelay: `${Math.random() * 5}s`,
                }}
            />
        ))}
    </div>
);

const Clouds: React.FC = () => (
    <>
        <div className="absolute top-10 -left-1/4 w-1/2 h-1/2 bg-white/20 rounded-full opacity-50 animate-drift"></div>
        <div className="absolute top-1/4 -right-1/4 w-2/3 h-1/2 bg-white/20 rounded-full opacity-40 animate-drift" style={{ animationDelay: '5s' }}></div>
        <div className="absolute bottom-5 -left-1/3 w-1/2 h-1/2 bg-white/20 rounded-full opacity-30 animate-drift" style={{ animationDelay: '10s' }}></div>
    </>
);

const Thunderstorm: React.FC = () => (
    <>
        <Rain />
        <div className="absolute inset-0 bg-yellow-300 opacity-0 animate-lightning"></div>
    </>
)

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ weatherCondition }) => {
    let backgroundClass = 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
    let WeatherEffect = null;
    
    const condition = weatherCondition.toLowerCase();

    if (condition.includes('clear')) {
        backgroundClass = 'bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800';
    } else if (condition.includes('clouds')) {
        backgroundClass = 'bg-gradient-to-br from-slate-500 via-slate-700 to-slate-900';
        WeatherEffect = <Clouds />;
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
        backgroundClass = 'bg-gradient-to-br from-gray-600 via-gray-800 to-blue-900';
        WeatherEffect = <Rain />;
    } else if (condition.includes('thunderstorm')) {
        backgroundClass = 'bg-gradient-to-br from-gray-700 via-gray-900 to-indigo-900';
        WeatherEffect = <Thunderstorm />;
    } else if (condition.includes('snow')) {
        backgroundClass = 'bg-gradient-to-br from-sky-300 via-slate-400 to-slate-600';
        // Snow effect could be added similarly to Rain
    } else if (condition.includes('mist') || condition.includes('fog')) {
        backgroundClass = 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700';
    }

    return (
        <div className={`absolute inset-0 transition-colors duration-1000 ${backgroundClass}`}>
            {WeatherEffect}
            {/* Fix: The 'jsx' prop is specific to styled-jsx (a library used in frameworks like Next.js) and is not a standard React attribute for the <style> tag. Removing it resolves the TypeScript error. */}
            <style>{`
                @keyframes fall {
                    to {
                        transform: translateY(100vh);
                    }
                }
                .animate-fall {
                    animation-name: fall;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                @keyframes drift {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(150vw); }
                }
                .animate-drift {
                    animation: drift 20s linear infinite;
                }
                @keyframes lightning {
                    0%, 100% { opacity: 0; }
                    5% { opacity: 0.5; }
                    10% { opacity: 0; }
                    15% { opacity: 0.3; }
                    20% { opacity: 0; }
                }
                .animate-lightning {
                    animation: lightning 7s infinite;
                }
            `}</style>
        </div>
    );
};

export default AnimatedBackground;