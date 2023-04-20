
export async function getEvents() {
    const response = await fetch('http://localhost:3002/events')
    const events = await response.json()
    console.log(events)
    return events['events_results']
}