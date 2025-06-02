import { format, parse } from 'date-fns';

const currentDate = format(new Date, 'dd/MM/yyyy');
const inputDate = '01/06/2025';

if(currentDate < inputDate)
{
    console.log('Data de hoje menor que a data de entrada');
    console.log('Type: ', typeof currentDate, ' inputDate:', typeof inputDate)

} else if (currentDate > inputDate){
    console.log('Data de hoje maior que a data de entrada');
    console.log('Type: ', typeof currentDate, ' inputDate:', typeof inputDate)

} else {
    console.log('Datas iguais');
    console.log('Type: ', typeof currentDate, ' inputDate:', typeof inputDate)
    
}