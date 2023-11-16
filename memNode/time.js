
setInterval(() => {
    const today = new Date()

    const hour = today.getHours()
    const minutes = today.getMinutes()
    const seconds = today.getSeconds()

    console.clear()
    console.log(`${hour}:${minutes}:${seconds}`)
}, 1000)