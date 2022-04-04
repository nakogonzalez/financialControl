import { useState } from 'react';
import * as C from './styles';

import { Item } from '../../types/item';
import { categories } from '../../data/categories';
import { coins } from '../../data/coin';

type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [dateField, setDateField] = useState('');
  const [categoryField, setCategoryField] = useState('');
  const [coinField, setCoinField] = useState('');
  const [valueCurrencyField, setValueCurrencyField] = useState(0);
  const [valueField, setValueField] = useState(0);
  const [nameField, setNameField] = useState('')
  let [valueId, setId] = useState(1);
  
  let categoryKeys: string[] = Object.keys(categories);
  let coinKeys: string[] = Object.keys(coins);

  const handleAddEvent = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let errors: string[] = [];

    // Condicional de errores
    if(isNaN(new Date(dateField).getTime())) {
      errors.push('Data inválida!');
    }
    if(!categoryKeys.includes(categoryField)) {
      errors.push('Categoria inválida!');
    }
    if(!coinKeys.includes(coinField)) {
      errors.push('Moneda inválida!');
    }
    if(valueCurrencyField <= -1) {
      errors.push('Valor Moneda inválido!');
    }
    if(valueField <= 0) {
      errors.push('Valor inválido!');
    }

    if(errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      // Si no hay errores Agregar campos a la Lista, funcion onAdd por parametro
        onAdd({
          id:valueId++,
          date: new Date(dateField),
          name: nameField,
          category: categoryField,
          coin: coinField,
          valueCurrency:valueCurrencyField,
          value: valueField
        });

        setId(valueId)
      
      clearFields();
    }
  }

  const clearFields = () => {
    setCategoryField('');
    setCoinField('');
    setValueCurrencyField(0);
    setValueField(0);
  }
  
  

  return (
      <C.Container>
        <C.InputLabel>
          <C.InputTitle>Fecha</C.InputTitle>
          <C.Input type="date" value={dateField} onChange={e => setDateField(e.target.value)} />
        </C.InputLabel>

        <C.InputLabel>
          <C.InputTitle>Nombre</C.InputTitle>
          <C.Input type="name" value={nameField} onChange={e => setNameField(e.target.value)} />
        </C.InputLabel>

        <C.InputLabel>
          <C.InputTitle>Categoria</C.InputTitle>
          <C.Select value={categoryField} onChange={e => setCategoryField(e.target.value)}>
            <>
              <option></option>
              {categoryKeys.map((key, index) => (
                <option key={index} value={key}>{categories[key].title}</option>
              ))}
            </>
          </C.Select>
        </C.InputLabel>

        <C.InputLabel>
          <C.InputTitle>Moneda </C.InputTitle>
          <C.Select value={coinField} onChange={e => setCoinField(e.target.value)}>
            <>
              <option></option> 
              {coinKeys.map((key, index) => (
                <option key={index} value={key}>{coins[key].title}</option>
              ))}
            </>
          </C.Select>
        </C.InputLabel>

         <C.InputLabel>
          {categoryField !== '' && categoryField !== 'entradaInicial' && <C.InputTitle>Valor Pesos $</C.InputTitle>}
          {categoryField !== '' && categoryField !== 'entradaInicial' && <C.Input type="number" value={valueCurrencyField} onChange={e => setValueCurrencyField(parseFloat(e.target.value))} /> }
        </C.InputLabel>

        <C.InputLabel> 
          <C.InputTitle>Cantidad $</C.InputTitle>
          <C.Input type="number" value={valueField} onChange={e => setValueField(parseFloat(e.target.value))} />
        </C.InputLabel>

        <C.InputLabel>
          <C.InputTitle>&nbsp;</C.InputTitle>
          <C.Button onClick={handleAddEvent}>Agregar</C.Button>
        </C.InputLabel>
      </C.Container>
  );
}