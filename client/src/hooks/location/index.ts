import { useState, useEffect } from "react";

interface ILocation {
    loaded: boolean;
    coordinates: number[] | null;
    error: {
        code: number;
        message: string;
    } | null
}
const useGeoLocation = () => {
    const [location, setLocation] = useState<ILocation>({
        loaded: false,
        coordinates: [],
        error: null
    });

    const onSuccess = (location: any) => {
        const { latitude, longitude } = location.coords;
        setLocation({
            loaded: true,
            coordinates: [latitude, longitude],
            error: null
        });
    };

    const onError = (error: any) => {
        setLocation({
            loaded: true,
            coordinates: null,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        // if the browser does not support geo-location (unlikely)
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;