const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:3000';


export async function getGjirafaJobListings() {
    try {
        const response = await fetch(`${apiUrl}/api/gjirafa`, {
            method: "GET",
            next: { revalidate: 10 },
        })
        return response.json()
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}
export async function getKosovaJobListings() {
    try {
        const response = await fetch(`${apiUrl}/api/kosova-jobs`, {
            method: "GET",
            next: { revalidate: 10 },
        })
        return response.json()
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

export async function getTelegrafiJobListings() {
    try {
        const response = await fetch(`${apiUrl}/api/telegrafi-jobs`, {
            method: "GET",
            next: { revalidate: 10 },
        })
        return response.json()
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

export async function getOfertaPuneJobListings() {
    try {
        const response = await fetch(`${apiUrl}/api/ofertapune-jobs`, {
            method: "GET",
            next: { revalidate: 10 },
        })
        return response.json()
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}
export async function getSuperpunaJobListings() {
    try {
        const response = await fetch(`${apiUrl}/api/superpuna-jobs`, {
            method: "GET",
            next: { revalidate: 10 },
        })
        return response.json()
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}