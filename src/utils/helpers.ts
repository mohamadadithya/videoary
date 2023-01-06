const formatDuration = (time: number) => {
    const seconds = Math.floor(time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })
    const minutes = (Math.floor(time / 60) % 60)
    const hours = Math.floor(time / 3600)
    if(hours >= 1) {
        return `${hours}:${minutes}:${seconds}`
    } else {
        return `${minutes}:${seconds}`
    }
}

export { formatDuration }