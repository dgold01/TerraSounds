
export async function getEvents(location) {
    const response = await fetch('http://localhost:3002/events/'+location)
    const events = await response.json()
    console.log(events)
    return events['events_results']
}

export async function getSavedEvents() {
   
    const response = await fetch('http://localhost:3002/saved')
    const events = await response.json()
    console.log(events)
    return events
}

export async function saveEvent(event) {
    console.log('saved')
    const saveEvent = {title:event.title,date:event.date.when,location:event.location,link:event.link,image:event.image}
    console.log(saveEvent)
    const response = await fetch ('http://localhost:3002/saved',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(saveEvent)
    })
    return response.json();
}

export async function deleteEvent(_id) {
    console.log('deleted')
    const response = await fetch('http://localhost:3002/saved/'+_id,{
        method: "DELETE"    
    })
    console.log(response.json())
    return response.json()
}

 