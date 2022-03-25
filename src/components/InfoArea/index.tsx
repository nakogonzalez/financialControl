import * as C from './styles'
import {ResumeItem} from '../ResumeItem'

type Props = {
    income: number;
    expense: number;
    expenseDolar: number;
    incomeDolar: number;
    expenseEuro: number;
    incomeEuro: number;
    expenseReal: number;
    incomeReal: number;
}

export const InfoArea = ({income, expense, expenseDolar, incomeDolar, expenseEuro, incomeEuro, expenseReal, incomeReal}: Props) => {

    return (
        <C.Container>
            <C.ResumeArea>
                <ResumeItem title={'Entradas Pesos'} value={income} color={'#64B83C'} />
                <ResumeItem title={'Salidas Pesos'} value={expense} color={'red'}/>
                <ResumeItem title={'Balance Pesos'} value={income - expense} color={income-expense < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea>  
            <C.ResumeArea>
                <ResumeItem title={'Entradas Dolar'} value={incomeDolar} color={'#64B83C'}/>
                <ResumeItem title={'Salidas Dolar'} value={expenseDolar} color={'red'}/>
                <ResumeItem title={'Balance Dolar'} value={incomeDolar - expenseDolar} color={incomeDolar-expenseDolar < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea>
            <C.ResumeArea>
                <ResumeItem title={'Entradas Euro'} value={incomeEuro} color={'#64B83C'}/>
                <ResumeItem title={'Salidas Euro'} value={expenseEuro} color={'red'}/>
                <ResumeItem title={'Balance Euro'} value={incomeEuro - expenseEuro} color={incomeEuro-expenseEuro < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea>      
            <C.ResumeArea>
                <ResumeItem title={'Entradas Real'} value={incomeReal} color={'#64B83C'}/>
                <ResumeItem title={'Salidas Real'} value={expenseReal} color={'red'}/>
                <ResumeItem title={'Balance Real'} value={incomeReal - expenseReal} color={incomeReal-expenseReal < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea>  
        </C.Container>
    );
}