import { OFFICE_COORDINATES, OFFICE_RADIUS_METERS } from './constants';

// Haversine formula to calculate distance between two coordinates in meters
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
};

export const isWithinOfficeRadius = (lat: number, lng: number): boolean => {
    const distance = calculateDistance(lat, lng, OFFICE_COORDINATES.lat, OFFICE_COORDINATES.lng);
    return distance <= OFFICE_RADIUS_METERS;
};
