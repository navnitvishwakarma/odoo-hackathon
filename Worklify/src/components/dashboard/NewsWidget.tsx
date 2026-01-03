import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsItem {
    id: number;
    title: string;
    source: string;
    time: string;
    url: string;
}

const MOCK_NEWS: NewsItem[] = [
    {
        id: 1,
        title: "Sensex surges 500 points as tech stocks rally globally",
        source: "Times of India",
        time: "1 hour ago",
        url: "#"
    },
    {
        id: 2,
        title: "New Metro line approved for city expansion project",
        source: "Times of India",
        time: "2 hours ago",
        url: "#"
    },
    {
        id: 3,
        title: "Local startup raises $10M in Series A funding",
        source: "Times of India",
        time: "4 hours ago",
        url: "#"
    },
    {
        id: 4,
        title: "Weather alert: Heavy rains expected this weekend",
        source: "Times of India",
        time: "5 hours ago",
        url: "#"
    }
];

export const NewsWidget: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Newspaper className="text-red-600" size={20} />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">City News</h3>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Times of India</span>
            </div>

            <div className="space-y-4">
                {MOCK_NEWS.map((news) => (
                    <a
                        key={news.id}
                        href={news.url}
                        className="block group border-b border-slate-100 dark:border-slate-700 last:border-0 pb-3 last:pb-0"
                    >
                        <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {news.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">{news.time}</span>
                            <ExternalLink size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </a>
                ))}
            </div>

            <button className="w-full mt-4 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                View All Headlines
            </button>
        </div>
    );
};
