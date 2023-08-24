import { useEffect, useState } from 'react';

const useDistricts = () => {
    const [districts, setDistricts] = useState<District[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/d/');
                const data = await response.json();
                setDistricts(data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchData();
    }, [districts]);

    return districts;
};

export {useDistricts} ;

export interface District {
    name: string;
    code: number;
}

const useProvinces = () => {
    const [provinces, setProvinces] = useState<Provinces[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/p/');
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchData();
    }, [provinces]);

    return provinces;
};

export {useProvinces} ;

export interface Provinces {
    name: string;
    code: number;
}
const useWards = () => {
    const [wards, setWards] = useState<Ward[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/w/');
                const data = await response.json();
                setWards(data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchData();
    }, [wards]);

    return wards;
};

export {useWards} ;

export interface Ward {
    name: string;
    code: number;
}


