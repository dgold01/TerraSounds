import type { GoogleEventsParameters } from 'serpapi';
import {getJson} from 'serpapi'

const ApiKey = '39874278852d0eaf15097f5672066c23c747e110757533c71c9931ee242e3cac'

const params = {
    q: '',
    google_domain: "google.com",
    api_key: ApiKey,
} 
const getEventsFromApi = async (location:string) =>{
    console.log(location)
    params.q = 'Music Events in '+location
    console.log(params)
    const result = await getJson('google',params)
    return result 
}
export default getEventsFromApi

