export default async function saveEmail(email: string) {
  try {
    const response = await fetch(`/api/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      console.error(`Error saving email: ${response.statusText}`)
      return { error: `Error saving email: ${response.statusText}` }
    }

    const data = await response.json()

    if (data.error) {
      return { error: data.error }
    } else if (data.warning) {
      return { warning: data.warning }
    }

    return data
  } catch (error) {
    throw new Error(`Error saving email: ${error}`)
  }
}

