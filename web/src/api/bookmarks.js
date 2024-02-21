
export async function GetBookmarks(token) {

    const response = await fetch(`http://localhost:1234/user/bookmarks`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    })

    return await response.json();

}

export async function SaveBookmarks(_id, token) {

    const response = await fetch(`http://localhost:1234/user/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ buildingId: _id })
    })

    return await response.json();

}

export async function DeleteBookmarks(_id, token) {

    const response = await fetch(`http://localhost:1234/user/bookmarks/${_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    })

    return await response.json();

}