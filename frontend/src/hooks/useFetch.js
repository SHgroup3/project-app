import { useState, useEffect } from 'react';
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [, setError] = useState(null);
 
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, [url]);

    return { data, loading, setSelectedSchedule, selectedSchedule, selectedService, setSelectedService};
};

export default useFetch;