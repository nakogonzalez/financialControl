import * as C from './styles'
import {ResumeItem} from '../ResumeItem'

type Props = {
    inicialIncome: number;
    inicialDolar: number;
    inicialEuro: number;
    inicialReal: number;
    income: number;
    expense: number;
    expenseDolar: number;
    incomeDolar: number;
    expenseEuro: number;
    incomeEuro: number;
    expenseReal: number;
    incomeReal: number;
}

export const InfoArea = ({income, expense, expenseDolar, incomeDolar, expenseEuro, incomeEuro, expenseReal, incomeReal, inicialIncome, inicialDolar, inicialEuro, inicialReal}: Props) => {


    return (
        <C.Container>
            <C.ResumeArea>
                <ResumeItem title={'Entradas Pesos:'} value={income} color={'#64B83C'} />
                <ResumeItem title={'Salidas Pesos:'} value={expense} color={'red'}/>
                <ResumeItem title={'Balance Pesos:'} value={inicialIncome} color={inicialIncome < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea>  
            <C.ResumeArea>
                <ResumeItem title={'Entradas Dolar:'} value={incomeDolar} color={'#64B83C'}/>
                <ResumeItem title={'Salidas Dolar:'} value={expenseDolar} color={'red'}/>
                <ResumeItem title={'Balance Dolar:'} value={inicialDolar} color={inicialDolar < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea>
            <C.ResumeArea>
                <ResumeItem title={'Entradas Euro:'} value={incomeEuro} color={'#64B83C'}/>
                <ResumeItem title={'Salidas Euro:'} value={expenseEuro} color={'red'}/>
                <ResumeItem title={'Balance Euro:'} value={inicialEuro} color={inicialEuro < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea>      
            <C.ResumeArea>
                <ResumeItem title={'Entradas Real:'} value={incomeReal} color={'#64B83C'}/>
                <ResumeItem title={'Salidas Real:'} value={expenseReal} color={'red'}/>
                <ResumeItem title={'Balance Real:'} value={inicialReal} color={inicialReal < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea>  
        </C.Container>
    );
}