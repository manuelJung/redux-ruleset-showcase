
export async function fetchUsers (filters) {
  let url = 'https://randomuser.me/api/?results='+filters.numHits

  if (filters.gender !== 'all') {
    url += '&gender=' + filters.gender
  }
  if (filters.numHits === 13) {
    throw new Error('oops. an error happened ;)')
  }
  const users = await fetch(url).then(res => res.json())
  return users.results
}