export const base64ToFile = (base64String: string, fileName: string) => {
    const byteCharacters = atob(base64String)
    const byteArrays = []

    for (let i = 0; i < byteCharacters.length; i += 512) {
        const slice = byteCharacters.slice(i, i + 512)
        const byteNumbers = new Array(slice.length)
        for (let j = 0; j < slice.length; j++) {
            byteNumbers[j] = slice.charCodeAt(j)
        }
        byteArrays.push(new Uint8Array(byteNumbers))
    }

    return new File(byteArrays, fileName, { type: 'image/png' })
}
