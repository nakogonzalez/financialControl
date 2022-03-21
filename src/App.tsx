import { useState, useEffect } from 'react';
import * as C from './App.styles';

import {Item} from './types/item';
import { categories } from './data/categories';
import { items } from './data/item';

import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';

import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';

const App = () => {  
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  

  // Filtrar lista por mes
  useEffect(()=> {
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list, currentMonth]);


  // Calculo de Entrada y Salida en el valor de la lista
  useEffect(()=> {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        if(filteredList[i].valueCurrency >=1) {
          expenseCount += (filteredList[i].value * filteredList[i].valueCurrency);
        }else {
          expenseCount += filteredList[i].value;
        }
      } else {
        if(filteredList[i].valueCurrency >=1){
          incomeCount += (filteredList[i].value * filteredList[i].valueCurrency);
        }else {
          incomeCount += filteredList[i].value;
        }
      }
    }
    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);


  // handeler Para agregar un nuevo item a la lista
  const handleAddItem = (item: Item) => {
    setList([...list, item]);
  }  

  const handleDeleteItem = (deleteItem: string) => {
    setList(list.filter((item)=> {
      return item.coin != deleteItem
    }))
  }


  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Beto Financiera</C.HeaderText>
      </C.Header>
      <C.Body>


      {/* Área de informacion */}
      <InfoArea
      income={income}
      expense={expense}
      />

      
      {/* Insertar Informacion */}
      <InputArea 
        onAdd={handleAddItem}
      />


        
      {/* Tabla de items */}
      <TableArea 
        list={filteredList}
        handleDeleteItem={handleDeleteItem}
      />


      </C.Body>
    </C.Container>
  );
}

export default App;