import React, { useState, useEffect, useRef } from 'react';
import { LogIn, LogOut, MapPin, Camera, AlertTriangle, CheckCircle, X } from 'lucide-react';
// import { isWithinOfficeRadius } from '../../utils/geoUtils';

export const CheckInWidget: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<Date | null>(null);

    // Feature States
    const [isVerifying, setIsVerifying] = useState(false);
    const [locationStatus, setLocationStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
    const [cameraActive, setCameraActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [locationErrorMsg, setLocationErrorMsg] = useState('');

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Cleanup camera when component unmounts or verification stops
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const startCheckInProcess = async () => {
        setIsVerifying(true);
        setLocationStatus('checking');
        setLocationErrorMsg('');

        // 1. Check Location
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    // const { latitude, longitude } = position.coords;

                    // DEMO MODE: Temporarily allowing current location as office location
                    // For production, use: const isInside = isWithinOfficeRadius(latitude, longitude);
                    const isInside = true;

                    if (isInside) {
                        setLocationStatus('success');
                        setTimeout(startCamera, 500); // Slight delay for smooth transition
                    } else {
                        setLocationStatus('error');
                        setLocationErrorMsg('You are outside office premises.');
                    }
                },
                (error) => {
                    setLocationStatus('error');
                    setLocationErrorMsg('Location access denied or unavailable.');
                    console.error(error);
                }
            );
        } else {
            setLocationStatus('error');
            setLocationErrorMsg('Geolocation is not supported by this browser.');
        }
    };

    const startCamera = async () => {
        setCameraActive(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera error:", err);
            // Handle camera permission error
            setCameraActive(false);
            setLocationErrorMsg('Camera access denied. Please allow camera access.');
            setLocationStatus('error');
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraActive(false);
    };

    const confirmCheckIn = () => {
        // Mock Face Verification Success
        setTimeout(() => {
            stopCamera();
            setIsCheckedIn(true);
            setCheckInTime(new Date());
            setIsVerifying(false);
            setLocationStatus('idle');
        }, 1500); // Simulate processing time
    };

    const cancelVerification = () => {
        stopCamera();
        setIsVerifying(false);
        setLocationStatus('idle');
    };

    const handleCheckOut = () => {
        setIsCheckedIn(false);
        setCheckInTime(null);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Daily Attendance</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="text-center">
                    <p className="text-3xl font-mono font-bold text-slate-800 dark:text-white">
                        {currentTime.toLocaleTimeString()}
                    </p>
                    {isCheckedIn && checkInTime && (
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
                            Checked in at {checkInTime.toLocaleTimeString()}
                        </p>
                    )}
                </div>

                <div>
                    {!isCheckedIn ? (
                        <button
                            onClick={startCheckInProcess}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            <LogIn size={20} />
                            Check In
                        </button>
                    ) : (
                        <button
                            onClick={handleCheckOut}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            <LogOut size={20} />
                            Check Out
                        </button>
                    )}
                </div>
            </div>

            {/* Verification Modal / Overlay - Now using Fixed Positioning for true modal behavior */}
            {isVerifying && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                                Identity Verification
                            </h3>
                            <button
                                onClick={cancelVerification}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Location Step */}
                            <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${locationStatus === 'success'
                                ? 'bg-green-50/50 border-green-200'
                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full flex-shrink-0 ${locationStatus === 'success' ? 'bg-green-100 text-green-600' :
                                            locationStatus === 'error' ? 'bg-red-100 text-red-600' :
                                                'bg-blue-100 text-blue-600'
                                        }`}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className={`font-semibold ${locationStatus === 'success' ? 'text-green-900 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
                                            {locationStatus === 'success' ? 'Location Verified' : 'Checking Location'}
                                        </p>
                                        <p className={`text-sm ${locationStatus === 'success' ? 'text-green-700 dark:text-green-400/80' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {locationStatus === 'checking' && 'Verifying GPS coordinates...'}
                                            {locationStatus === 'success' && 'You are within office premises'}
                                            {locationStatus === 'error' && locationErrorMsg}
                                        </p>
                                    </div>
                                </div>
                                {locationStatus === 'success' && <CheckCircle size={24} className="text-green-600 dark:text-green-400" />}
                                {locationStatus === 'error' && <AlertTriangle size={24} className="text-red-500" />}
                            </div>

                            {/* Camera Step */}
                            {locationStatus === 'success' && (
                                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                                    <div className="relative aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-inner group">
                                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />

                                        {!cameraActive && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-900">
                                                <Camera size={48} className="mb-2 opacity-50" />
                                                <span className="text-sm">Initializing Camera...</span>
                                            </div>
                                        )}

                                        {cameraActive && (
                                            <>
                                                {/* Scanning Overlay */}
                                                <div className="absolute inset-0 pointer-events-none">
                                                    {/* Scanning Line */}
                                                    <div className="absolute left-0 right-0 h-0.5 bg-green-400/80 shadow-[0_0_20px_rgba(74,222,128,0.5)] animate-[scan_2s_ease-in-out_infinite]" />

                                                    {/* Face Guide Frame */}
                                                    <div className="absolute inset-[15%] border-2 border-white/30 rounded-full box-border border-dashed opacity-50"></div>

                                                    {/* Corner Brackets */}
                                                    <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl" />
                                                    <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl" />
                                                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl" />
                                                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl" />

                                                    {/* Status Text Overlay */}
                                                    <div className="absolute bottom-4 left-0 right-0 text-center">
                                                        <span className="inline-block px-3 py-1 bg-black/60 backdrop-blur-md text-green-400 text-xs font-mono rounded-full border border-green-500/30">
                                                            FACE_DETECTED: 98.4% MATCH
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="text-center space-y-3 pt-2">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Please position your face within the frame
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={cancelVerification}
                                                className="flex-1 px-4 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={confirmCheckIn}
                                                className="flex-2 flex-grow flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                                            >
                                                <Camera size={20} />
                                                Verify & Check In
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error State Retry Button */}
                            {locationStatus === 'error' && (
                                <button
                                    onClick={startCheckInProcess}
                                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-semibold text-slate-700 dark:text-white transition-colors"
                                >
                                    Retry Verification
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes scan {
                    0% { top: 5%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 95%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};
