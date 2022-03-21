import * as C from './styles'
import {Item} from '../../types/item'
import {categories} from '../../data/categories';
import {coin} from '../../data/coin';
import {formatDate} from '../../helpers/dateFilter';


type Props = {
    item: Item,
    handleDeleteItem(deleteItem: string): void;
}

export const TableItem = ({item, handleDeleteItem}:Props) => {

    return (
      <C.TableLine>
          <C.TableColumn>{formatDate(item.date)}</C.TableColumn>

          <C.TableColumn>
              <C.Category color={categories[item.category].color}>
              {categories[item.category].title}
              </C.Category>
          </C.TableColumn>

          <C.TableColumn>
              <C.Category color={coin[item.coin].color}>
              {coin[item.coin].title}
              </C.Category>
          </C.TableColumn>
          <C.TableColumn>
                 {item.valueCurrency != 0 ? `$ ${item.valueCurrency}` : null}
          </C.TableColumn>  
          <C.TableColumn>
                 {item.valueCurrency != 0 ? `$ ${item.value}` : null}
          </C.TableColumn> 
          <C.TableColumn>
              <C.Value color={categories[item.category].expense ? 'red' : 'limegreen'}>
                $ {item.valueCurrency > 0 ? item.value * item.valueCurrency : item.value + item.valueCurrency}
              </C.Value>
          </C.TableColumn>
          <C.TableColumn>
             <C.Button onClick={() => handleDeleteItem(item.coin)}>Eliminar</C.Button>
          </C.TableColumn>
      </C.TableLine>  
    );
};