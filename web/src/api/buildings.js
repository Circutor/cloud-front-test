
export async function GetBuildings(token) {

    const response = await fetch(`http://localhost:1234/buildings`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    })

    return await response.json();

}

export async function GetBuildingMetrics(_id, _startDate, _endDate, _interval, token) {

    const response = await fetch(`http://localhost:1234/buildings/${_id}/${_interval}?start=${_startDate}&end=${_endDate}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    })

    return await response.json();

}