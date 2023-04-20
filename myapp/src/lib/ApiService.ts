
export async function getEvents(location) {
    const response = await fetch('http://localhost:3002/events/'+location)
    const events = await response.json()
    console.log(events)
    return events['events_results']
}