import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CurrencyConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const myHeaders = new Headers();
  myHeaders.append("apikey", "JgyAIVPt8tGfx0tcg0ibMzWQarTtTuO1");

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const fetchCurrencies = async () => {
    const response = await fetch('https://api.apilayer.com/exchangerates_data/symbols', requestOptions);
    const data = await response.json();
    setCurrencies(Object.keys(data.symbols));
  };
  
  const convertCurrency = async () => {
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedCurrency}&amount=${amount}`, requestOptions);
    const data = await response.json();
    setResult(data.result);
  };

  return (
    <View style={{margin:120, marginTop:'80%'}}>
      <Text style={{ fontSize: 20, fontWeight:'bold' }}>{result.toFixed(2)} €</Text>
      <Picker
        selectedValue={selectedCurrency}
        onValueChange={value => setSelectedCurrency(value)}
      >
        {currencies.map(currency => <Picker.Item key={currency} label={currency} value={currency} />)}
      </Picker>
      <TextInput
        keyboardType="numeric"
        onChangeText={text => setAmount(text)}
        value={amount}
      />
      <Button title="Convert" onPress={convertCurrency} />
    </View>
  );
};

export default CurrencyConverter;