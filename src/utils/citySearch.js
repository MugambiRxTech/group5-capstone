export async function searchCities(query) {
  const trimmed = query?.trim()
  if (!trimmed || trimmed.length < 2) return []

  try {
    const params = new URLSearchParams({
      name: trimmed,
      count: '6',
      language: 'en',
      format: 'json',
    })

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`
    )

    if (!response.ok) return []

    const data = await response.json()
    if (!data.results?.length) return []

    return data.results.map((place) => {
      const parts = [place.name]
      if (place.admin1) parts.push(place.admin1)
      if (place.country_code) parts.push(place.country_code)

      return {
        id: place.id,
        label: parts.join(', '),
        name: place.name,
        region: place.admin1 || '',
        country: place.country || place.country_code || '',
      }
    })
  } catch {
    return []
  }
}
