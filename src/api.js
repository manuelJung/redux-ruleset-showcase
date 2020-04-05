
export async function fetchUsers (filters) {
  let url = 'https://randomuser.me/api/?results='+filters.numHits
  if (filters.gender !== 'all') {
    url += '&gender=' + filters.gender
  }
  const users = await fetch(url).then(res => res.json())
  return users.results
}