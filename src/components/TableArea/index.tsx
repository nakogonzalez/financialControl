import * as C from './styles'
import {Item} from '../../types/item';
import { TableItem } from '../TableItem';


type Props = {
    list: Item[],
    handleDeleteItem(deleteItem: number): void;
}

export const TableArea = ({list, handleDeleteItem}: Props) => {
   
    
    return (
        <C.Table>
            <thead>
                <tr>
                    <C.TableHeadColumn width={50}>#</C.TableHeadColumn>
                    <C.TableHeadColumn width={100}>Fecha</C.TableHeadColumn>
                    <C.TableHeadColumn width={130}>Categoria</C.TableHeadColumn>
                    <C.TableHeadColumn width={130}>Moneda</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Valor Pesos $</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Cantidad $</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Valor Pesos $</C.TableHeadColumn>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index)=>(
                    <TableItem key={index} item={item} handleDeleteItem={handleDeleteItem} />
                ))}
            </tbody>
        </C.Table>
    );

}