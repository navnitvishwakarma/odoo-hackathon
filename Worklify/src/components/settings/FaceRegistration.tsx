import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle } from 'lucide-react';
import { SettingSection } from './SettingSection';

export const FaceRegistration: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false); // Mock state
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const startCamera = async () => {
        setIsCameraActive(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera error:", err);
            setIsCameraActive(false);
            alert("Unable to access camera. Please check permissions.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
    };

    const captureFace = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Mirror the capture to match the mirrored video view
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(videoRef.current, 0, 0);
                const imageData = canvas.toDataURL('image/jpeg');
                setCapturedImage(imageData);
                stopCamera();
                // TODO: Determine if we should automatically upload here or wait for "Save"
            }
        }
    };

    const handleRegister = () => {
        // TODO: API call to save face data
        console.log('Face data saved');
        setIsRegistered(true);
        setCapturedImage(null);
    };

    const handleRetake = () => {
        setCapturedImage(null);
        startCamera();
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <SettingSection
            title="Face Recognition"
            description="Register your face for seamless attendance check-in."
        >
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">

                {isRegistered && !isCameraActive && !capturedImage ? (
                    <div className="text-center py-8">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Face Registered</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">You can use face recognition for attendance.</p>
                        <button
                            onClick={() => { setIsRegistered(false); startCamera(); }}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Re-register Face
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-sm">
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4 shadow-lg">
                            {!isCameraActive && !capturedImage && (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                                    <Camera size={48} />
                                </div>
                            )}

                            {isCameraActive && (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover transform scale-x-[-1]"
                                />
                            )}

                            {capturedImage && (
                                <img
                                    src={capturedImage}
                                    alt="Captured Face"
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* Overlay Frame */}
                            {(isCameraActive || capturedImage) && (
                                <div className="absolute inset-0 pointer-events-none border-2 border-white/30 rounded-lg">
                                    <div className="absolute inset-[15%] border-2 border-dashed border-white/60 rounded-full"></div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center gap-4">
                            {!isCameraActive && !capturedImage && (
                                <button
                                    onClick={startCamera}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <Camera size={18} />
                                    Start Camera
                                </button>
                            )}

                            {isCameraActive && (
                                <button
                                    onClick={captureFace}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <Camera size={18} />
                                    Capture
                                </button>
                            )}

                            {capturedImage && (
                                <>
                                    <button
                                        onClick={handleRetake}
                                        className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    >
                                        <RefreshCw size={18} />
                                        Retake
                                    </button>
                                    <button
                                        onClick={handleRegister}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        <CheckCircle size={18} />
                                        Save & Register
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </SettingSection>
    );
};
