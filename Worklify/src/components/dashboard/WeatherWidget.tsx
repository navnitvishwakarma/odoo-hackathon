import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cloud, Sun, CloudRain, Wind, Loader, CloudLightning, CloudSnow } from 'lucide-react';

interface WeatherData {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
}

export const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    // Weather Codes to Icon mapping
    const getWeatherIcon = (code: number) => {
        if (code <= 1) return <Sun className="text-yellow-500" size={48} />;
        if (code <= 3) return <Cloud className="text-slate-400" size={48} />;
        if (code <= 48) return <Cloud className="text-slate-500" size={48} />; // Fog
        if (code <= 67) return <CloudRain className="text-blue-400" size={48} />;
        if (code <= 77) return <CloudSnow className="text-blue-200" size={48} />;
        if (code <= 99) return <CloudLightning className="text-purple-500" size={48} />;
        return <Sun className="text-yellow-500" size={48} />;
    };

    const getWeatherDescription = (code: number) => {
        if (code <= 1) return 'Clear Sky';
        if (code <= 3) return 'Partly Cloudy';
        if (code <= 48) return 'Foggy';
        if (code <= 67) return 'Rainy';
        if (code <= 77) return 'Snow';
        if (code <= 99) return 'Thunderstorm';
        return 'Clear';
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // New Delhi Coordinates
                const lat = 28.61;
                const lng = 77.20;

                const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);

                setWeather({
                    temperature: res.data.current_weather.temperature,
                    weatherCode: res.data.current_weather.weathercode,
                    windSpeed: res.data.current_weather.windspeed
                });
            } catch (error) {
                console.error("Failed to fetch weather", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex items-center justify-center h-48">
                <Loader className="animate-spin text-blue-500" />
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6 relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>

            <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-1">Weather Report</h3>
                <p className="text-blue-100 text-sm mb-4">New Delhi, India</p>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-4xl font-bold mb-1">{weather.temperature}°C</div>
                        <p className="text-blue-100 font-medium">{getWeatherDescription(weather.weatherCode)}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                        {getWeatherIcon(weather.weatherCode)}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
                    <Wind size={16} />
                    <span>Wind: {weather.windSpeed} km/h</span>
                </div>
            </div>
        </div>
    );
};
