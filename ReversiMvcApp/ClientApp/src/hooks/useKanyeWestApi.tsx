import {KanyeWestApi} from '@/apis/KanyeWestApi';
import {useEffect, useRef, useState} from 'react';

export default function useKanyeWestApi() {
    const {current: api} = useRef(new KanyeWestApi());
    const [quote, setQuote] = useState('Loading a Kanye West quote...');

    useEffect(() => {
        (async () => {
            const {quote} = await api.getQuote();
            setQuote(quote);
        })();
    }, []);

    return {
        quote,
    };
}
