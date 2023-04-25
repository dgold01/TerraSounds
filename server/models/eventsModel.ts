
import {getJson} from 'serpapi'
import db from '../databases/eventsDatabase'
const ApiKey = 'f1dbde83e021d9d72719ab5c09300b3cc6882d4261616b5c6f2665ed4cb02a7d'



const params = {
    q: '',
    google_domain: "google.com",
    api_key: ApiKey,
} 
export const getEventsFromApi = async (location:string) =>{
    console.log(location)
    try{
        params.q = 'Music Events in '+location
        console.log(params)
        const result = await getJson('google_events',params)
        console.log(result['events_results'] + '!!!!!!!')
        if(!result['events_results']){
            console.log('YESERROR')
            throw Error
        }
        else return result
    }
    catch(error){
        params.q = 'Music Events in '+location
        console.log(params)
        const result = await getJson('google',params)
        console.log(result['events_results'])
        console.log('we are reutning')
        return result['events_results']
    }
    
    
}

export const  getSavedEventsFromModel = async () =>{
    const result = await db.find()
    return result
}

export const saveEventToModel = async (event:Event) =>{
    console.log(event)
    const res = await db.create(event)
    return res
}

export const deleteEventFromModel = async (_id:string) =>{
    console.log('etst')
    const res = db.findByIdAndDelete(_id)
    return res
}


