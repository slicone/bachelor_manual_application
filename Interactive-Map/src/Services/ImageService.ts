interface PostData {
  file_path: string
  width: number
  height: number
}

export class ImageService {
  async resizePicture(file_path: string, data: PostData): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3000/resize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()
      return response.ok
    } catch (error) {
      console.error('Error making POST request:', error)
      return false
    }
  }
}
