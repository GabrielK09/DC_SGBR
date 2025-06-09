type winners = {
    label: string,
    color: string,
    score: number
}

let winners = [];
const colors = [
    {
        "id": "1381376486174494810",
        "author": "tsuki0775",
        "content": "puxei 🟣",
        "create": "08/06/2025"
    },
    {
        "id": "1378876568889327729",
        "author": "tsuki0775",
        "content": "puxei  🟤",
        "create": "01/06/2025"
    }
]

colors.map((c: winners) => {
    if(c.id  === '1381376486174494810')
    {
        winners.push(c);
        
    } 
})

console.log(winners)