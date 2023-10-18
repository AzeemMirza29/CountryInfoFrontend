import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Typography } from "antd";

const { Text } = Typography;

function CurrencyConverter(props) {
  const { currency } = props;
  const [amountInEuro, setAmountInEuro] = useState(1);
  const [exchangeRates, setExchangeRates] = useState();
  const [convertedAmount, setConvertedAmount] = useState(null);
  const fixerApiKey = "b77f40e13e692c99e0664e555530eeed";

  useEffect(() => {
    // Fetch exchange rates from Fixer.io
    axios
      .get(`http://data.fixer.io/api/latest?base=EUR&access_key=${fixerApiKey}`)
      .then((response) => {
        setExchangeRates(response?.data?.rates);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
      });
  }, []);

  useEffect(() => {
    if (exchangeRates && amountInEuro) {
      if (exchangeRates.hasOwnProperty(currency)) {
        let value = exchangeRates[currency];
        const convertedAmount = amountInEuro * value;
        setConvertedAmount(convertedAmount);
      }
    }
  }, [exchangeRates, amountInEuro, currency]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <label style={{ width: "100%" }}>Amount in EUR:</label>
        <Input
          type="number"
          size="small"
          value={amountInEuro}
          onChange={(e) => setAmountInEuro(e.target.value)}
        />
      </div>
      {exchangeRates && convertedAmount !== null && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <label style={{ marginRight: "25px" }}>
            Conversion to {currency}:
          </label>
          <Text> {convertedAmount.toFixed(2)}</Text>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
