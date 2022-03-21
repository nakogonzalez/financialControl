import * as C from './styles'
import {ResumeItem} from '../ResumeItem'

type Props = {
    income: number;
    expense: number;
}

export const InfoArea = ({income, expense}: Props) => {

    return (
        <C.Container>
            <C.ResumeArea>
                <ResumeItem title={'Entradas'} value={income} color={'#64B83C'}/>
                <ResumeItem title={'Salidas'} value={expense} color={'red'}/>
                <ResumeItem title={'Balance Total'} value={income - expense} color={income-expense < 0 ? 'red' : '#64B83C'}/>
            </C.ResumeArea> 
        </C.Container>
    );
}