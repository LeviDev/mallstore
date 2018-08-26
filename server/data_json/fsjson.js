const fs = require('fs')

fs.readFile('./goods.json', 'utf8', (error, data) => {
    
    let newData = []
    if (error) {
        console.log(error)
    } else {
        let pushData = JSON.parse(data)
        pushData.RECORDS.map((value, index) => {
            if (value.IMAGE1) {
                newData.push(value)
                // console.log(value.NAME)
            }
        })
        console.log(newData.length)
    }
    fs.writeFile('newGoods.json', JSON.stringify(newData), (error) =>{
        if (error) {
            console.log(error)
        } else {
            console.log("write file success!")
        }
    })
})