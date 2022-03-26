import { useState, useEffect } from 'react';
import * as C from './App.styles';
import logoFina from './assets/financiera.png'
import logo from './assets/exchange house.png'

import {Item} from './types/item';
import { categories } from './data/categories';
import { coins } from './data/coin';
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
  const [incomeDolar, setIncomeDolar] = useState(0);
  const [expenseDolar, setExpenseDolar] = useState(0);
  const [incomeEuro, setIncomeEuro] = useState(0);
  const [expenseEuro, setExpenseEuro] = useState(0);
  const [incomeReal, setIncomeReal] = useState(0);
  const [expenseReal, setExpenseReal] = useState(0);
  

  // Filtrar lista por mes
  useEffect(()=> {
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list, currentMonth]);


  // Calculo de Entrada y Salida en el valor de la lista
  useEffect(()=> {
    let incomePesos = 0;
    let expensePesos = 0;
    let incomeDolar = 0;
    let expenseDolar = 0;
    let incomeEuro = 0;
    let expenseEuro = 0;
    let incomeReal = 0;
    let expenseReal = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        if(coins[filteredList[i].coin].title == 'Dolar') {
          incomePesos += (filteredList[i].value * filteredList[i].valueCurrency);
          expenseDolar+= filteredList[i].value;
        }else if(coins[filteredList[i].coin].title == 'Euro') {
          incomePesos += (filteredList[i].value * filteredList[i].valueCurrency);
          expenseEuro += filteredList[i].value;
        }else if(coins[filteredList[i].coin].title == 'Reales') {
          incomePesos += (filteredList[i].value * filteredList[i].valueCurrency);
          expenseReal += filteredList[i].value;
        }
      }else {
        if(coins[filteredList[i].coin].title == 'Pesos'){
          incomePesos += filteredList[i].value;
        } else if (coins[filteredList[i].coin].title == 'Dolar'){
           expensePesos += (filteredList[i].value * filteredList[i].valueCurrency);
           incomeDolar += filteredList[i].value;
        }else if (coins[filteredList[i].coin].title == 'Euro'){
          expensePesos += (filteredList[i].value * filteredList[i].valueCurrency);
          incomeEuro += filteredList[i].value;
       }else if (coins[filteredList[i].coin].title == 'Reales'){
        expensePesos += (filteredList[i].value * filteredList[i].valueCurrency);
        incomeReal += filteredList[i].value;
     }
      }
    }
    setExpenseEuro(expenseEuro)
    setIncomeEuro(incomeEuro)
    setExpenseReal(expenseReal)
    setIncomeReal(incomeReal)
    setExpenseDolar(expenseDolar)
    setIncomeDolar(incomeDolar)
    setIncome(incomePesos);
    setExpense(expensePesos);
  }, [filteredList]);


  // handeler Para agregar un nuevo item a la lista
  const handleAddItem = (item: Item) => {
    setList([...list, item]);
  }  

  const handleDeleteItem = (deleteItem: number) => {
    setList(list.filter((item)=> {
      return item.id != deleteItem
    }))
  }


  return (
    <C.Container>
      <C.Header>
        <C.Img src={logoFina}></C.Img>
        <C.HeaderText>Financiera</C.HeaderText>
        <C.Img src={logo}></C.Img>
      </C.Header>
      <C.Body>
        {/* Área de informacion */}
        <C.BlockInfo>
          <InfoArea
          income={income}
          expense={expense}
          expenseDolar={expenseDolar}
          incomeDolar={incomeDolar}
          expenseEuro={expenseEuro}
          incomeEuro={incomeEuro}
          expenseReal={expenseReal}
          incomeReal={incomeReal}

          />
        </C.BlockInfo>
      
        <C.BlockArea>
            {/* Insertar Informacion */}
          <InputArea 
            onAdd={handleAddItem}
          />
          {/* Tabla de items */}
          <TableArea 
            list={filteredList}
            handleDeleteItem={handleDeleteItem}
          />

        </C.BlockArea>
      </C.Body>
    </C.Container>
  );
}

export default App;