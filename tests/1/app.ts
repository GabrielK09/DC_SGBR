import { format, parse } from 'date-fns';

const currentDate = new Date();
const currentDateFormated = parse(format(currentDate, 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date());
const inputDate = parse('31/05/2025', 'dd/MM/yyyy', new Date());

if(currentDateFormated > inputDate)
{
    console.log('Data atual: ', currentDateFormated);
    console.log('Data de entrada: ', inputDate);
    console.log('Data de hoje é maior');

} else if (currentDateFormated < inputDate) {
    console.log('Data atual: ', currentDateFormated);
    console.log('Data de entrada: ', inputDate);
    console.log('Data de hoje é menor');

} else {
    console.log('Data atual: ', currentDateFormated);
    console.log('Data de entrada: ', inputDate);
    console.log('Datas iguais');
    
}