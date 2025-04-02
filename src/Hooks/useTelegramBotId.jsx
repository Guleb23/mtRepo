// hooks/useTelegramBotId.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTelegramBotId = (botUsername) => {
    const [botId, setBotId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!botUsername) return;

        const fetchBotId = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.telegram.org/bot${botUsername}/getMe`
                );
                setBotId(response.data.result.id);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBotId();
    }, [botUsername]);

    return { botId, loading, error };
};

export default useTelegramBotId;