type message = {
    id: string,
    author: string,
    content: string,
    create: string
}

type colorScore = {
    label: string,
    color: string,
    score: number
}

type winner = {
    label: string,
    color: string,
    score: number
}

function selectWinners(allMessages: message[])
{
    /*  1 = 🔵 | 2 = 🟢 | 3 = 🟣 | 4 = 🌑 | 5 = 🍊 | 6 = 🟡 | 7 = 🟤 | 8 = 🔴 | */
   
    let count = [
        { label: '1', color: '🔵', score: 0 },
        { label: '2', color: '🟢', score: 0 },
        { label: '3', color: '🟣', score: 0 },
        { label: '4', color: '🌑', score: 0 },
        { label: '5', color: '🍊', score: 0 },
        { label: '6', color: '🟡', score: 0 },
        { label: '7', color: '🟤', score: 0 },
        { label: '8', color: '🔴', score: 0 },

    ]; 

    for (const key in allMessages) {
        if (Object.prototype.hasOwnProperty.call(allMessages, key)) {
            const element: message = allMessages[key];
            let lastChart: string = element.content.at(- 1);
            const counter = count.find(c => c.label === lastChart);
            if( counter ) counter.score += 1;
                    
        }
    }

    return count;
}

function orderWinners(colorScore: winner[]) 
{
    const GOAL: number = 50;
    
    const sorted = [...colorScore].sort((a, b) => b.score - a.score);

    const winners = sorted.filter(w => w.score < GOAL);

    return winners;
    
}

const allMessages = [
    {
      "id": "1377439284453445744",
      "author": "tsuki0775",
      "content": "puxei 6",
      "create": "28/05/2025"
    },
    {
      "id": "1377438525540008067",
      "author": "tsuki0775",
      "content": "puxei  7",
      "create": "28/05/2025"
    },
    {
      "id": "1377408050096242759",
      "author": "tsuki0775",
      "content": "puxei 5",
      "create": "28/05/2025"
    },
    {
      "id": "1377408048766779463",
      "author": "tsuki0775",
      "content": "puxei 5",
      "create": "28/05/2025"
    },
    {
      "id": "1377408047697104979",
      "author": "tsuki0775",
      "content": "puxei 5",
      "create": "28/05/2025"
    },
    {
      "id": "1377408046417838230",
      "author": "tsuki0775",
      "content": "puxei 5",
      "create": "28/05/2025"
    },
    {
      "id": "1377408035915305112",
      "author": "tsuki0775",
      "content": "puxei 5",
      "create": "28/05/2025"
    },
    {
      "id": "1377408020547502251",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "28/05/2025"
    },
    {
      "id": "1377408014604177489",
      "author": "tsuki0775",
      "content": "puxei 4",
      "create": "28/05/2025"
    },
    {
      "id": "1377408012951752826",
      "author": "tsuki0775",
      "content": "puxei 4",
      "create": "28/05/2025"
    },
    {
      "id": "1377408010246295734",
      "author": "tsuki0775",
      "content": "puxei 4",
      "create": "28/05/2025"
    },
    {
      "id": "1377408008405123083",
      "author": "tsuki0775",
      "content": "puxei 4",
      "create": "28/05/2025"
    },
    {
      "id": "1377407992038690846",
      "author": "tsuki0775",
      "content": "puxei",
      "create": "28/05/2025"
    },
    {
      "id": "1377407990759428136",
      "author": "tsuki0775",
      "content": "puxei",
      "create": "28/05/2025"
    },
    {
      "id": "1377407988851146844",
      "author": "tsuki0775",
      "content": "puxei 4",
      "create": "28/05/2025"
    },
    {
      "id": "1377407966319349963",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "28/05/2025"
    },
    {
      "id": "1377407965233156156",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "28/05/2025"
    },
    {
      "id": "1377407963458961580",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "28/05/2025"
    },
    {
      "id": "1377336072606056620",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "28/05/2025"
    },
    {
      "id": "1377322552497668247",
      "author": "tsuki0775",
      "content": "defpuxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322545459630154",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322535825182744",
      "author": "tsuki0775",
      "content": "frfwredfrd puxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322526027550801",
      "author": "tsuki0775",
      "content": "sacsacpuxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322523326152708",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322521413554308",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322520130224319",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322518242660393",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322515646513323",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "28/05/2025"
    },
    {
      "id": "1377322492904865912",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "28/05/2025"
    },
    {
      "id": "1377322491625738410",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "28/05/2025"
    },
    {
      "id": "1377322489960595546",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "28/05/2025"
    },
    {
      "id": "1377322487938813982",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "28/05/2025"
    },
    {
      "id": "1377322486118748203",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "28/05/2025"
    },
    {
      "id": "1377107649836875786",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "27/05/2025"
    },
    {
      "id": "1377107648419205250",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "27/05/2025"
    },
    {
      "id": "1377107647186079936",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "27/05/2025"
    },
    {
      "id": "1377107645747433624",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "27/05/2025"
    },
    {
      "id": "1377107631549845575",
      "author": "tsuki0775",
      "content": "puxei 8",
      "create": "27/05/2025"
    },
    {
      "id": "1377107611299610675",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "27/05/2025"
    },
    {
      "id": "1377107610150502421",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "27/05/2025"
    },
    {
      "id": "1377107609026560101",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "27/05/2025"
    },
    {
      "id": "1377107607298375792",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "27/05/2025"
    },
    {
      "id": "1377107605511471234",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "27/05/2025"
    },
    {
      "id": "1377107590571360308",
      "author": "tsuki0775",
      "content": "puxei 2",
      "create": "27/05/2025"
    },
    {
      "id": "1377107589359341608",
      "author": "tsuki0775",
      "content": "puxei 2",
      "create": "27/05/2025"
    },
    {
      "id": "1377107587329429576",
      "author": "tsuki0775",
      "content": "puxei 2",
      "create": "27/05/2025"
    },
    {
      "id": "1376956021997834440",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "27/05/2025"
    },
    {
      "id": "1376956009926492200",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "27/05/2025"
    },
    {
      "id": "1376689025468993669",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "26/05/2025"
    },
    {
      "id": "1376689023845928971",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "26/05/2025"
    },
    {
      "id": "1376689022956736632",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "26/05/2025"
    },
    {
      "id": "1376689021681668198",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "26/05/2025"
    },
    {
      "id": "1376689020104474685",
      "author": "tsuki0775",
      "content": "puxei 3",
      "create": "26/05/2025"
    },
    {
      "id": "1376688968845885512",
      "author": "tsuki0775",
      "content": "puxei 2",
      "create": "26/05/2025"
    },
    {
      "id": "1376688967331872952",
      "author": "tsuki0775",
      "content": "puxei 2",
      "create": "26/05/2025"
    },
    {
      "id": "1376688966643748954",
      "author": "tsuki0775",
      "content": "puxei 2",
      "create": "26/05/2025"
    },
    {
      "id": "1376688965318479872",
      "author": "tsuki0775",
      "content": "puxei 2",
      "create": "26/05/2025"
    },
    {
      "id": "1376688963275980900",
      "author": "tsuki0775",
      "content": "puxei 2",
      "create": "26/05/2025"
    },
    {
      "id": "1376688936365068399",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "26/05/2025"
    },
    {
      "id": "1376688935098515466",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "26/05/2025"
    },
    {
      "id": "1376688933840359465",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "26/05/2025"
    },
    {
      "id": "1376688932376547358",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "26/05/2025"
    },
    {
      "id": "1376679630798458920",
      "author": "tsuki0775",
      "content": "puxei 1",
      "create": "26/05/2025"
    }
];

const selectWinner = selectWinners(allMessages);

if(selectWinner)
{
   console.log(orderWinners(selectWinner));
}