import React from 'react';

export const HolidaysWidget: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Holidays</h3>
            <ul className="space-y-4">
                <li className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-50 rounded-lg text-blue-700">
                            <span className="text-xs font-bold uppercase">Jan</span>
                            <span className="text-lg font-bold">26</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Republic Day</p>
                            <p className="text-xs text-slate-500">Wednesday</p>
                        </div>
                    </div>
                </li>
                <li className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-orange-50 rounded-lg text-orange-700">
                            <span className="text-xs font-bold uppercase">Aug</span>
                            <span className="text-lg font-bold">15</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Independence Day</p>
                            <p className="text-xs text-slate-500">Friday</p>
                        </div>
                    </div>
                </li>
                <li className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-green-50 rounded-lg text-green-700">
                            <span className="text-xs font-bold uppercase">Oct</span>
                            <span className="text-lg font-bold">02</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Gandhi Jayanti</p>
                            <p className="text-xs text-slate-500">Thursday</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};
