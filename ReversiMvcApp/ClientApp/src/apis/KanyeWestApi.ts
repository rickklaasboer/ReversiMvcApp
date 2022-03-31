type KanyeWestApiResponse = {
    quote: string;
};

export class KanyeWestApi {
    baseUrl: string = 'https://api.kanye.rest/';

    /**
     * Get a random quote by our favourite celebrity Kanye West!
     */
    getQuote = async (): Promise<KanyeWestApiResponse> => {
        const request = await fetch(this.baseUrl);
        const response = await request.json();

        return response as KanyeWestApiResponse;
    };
}
