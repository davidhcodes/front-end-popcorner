import axios from 'axios'

const apiClient = axios.create ({
    baseURl: 'https://popcorner.vercel.app/communities/LizardLounge/events',
    headers: {
        'Text' : 'application/json',
        //what goes after text
    }
})

export const fetchEvents = async () => {
    try {
        const response = await apiClient.get('data');
        return response.data;
    } catch (error) {
        console.log('Error fetching events data:', error)
    }
}