import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Typography } from "antd";
import CountryDetails from "../Components/CountryDetails";
import { SearchOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [data, setData] = useState();
  const [selectedCountry, setSelectedCountry] = useState([]);

  const handleOnChange = (value) => {
    setSelectedCountry(value);
  };

  const onChange = (value) => {
    const CountryDetials = data?.find((item) => item?.name?.common === value);
    let Currency = Object.keys(CountryDetials?.currencies);
    const countryData = {
      name: CountryDetials?.name?.common,
      population: CountryDetials?.population,
      currency: {
        name: CountryDetials?.currencies[Currency[0]]?.name,
        Symbol: CountryDetials?.currencies[Currency[0]]?.symbol,
        shortName: Currency[0],
      },
    };
    setSelectedCountry((pre) => [...pre, countryData]);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  return (
    <div className="HomePaageContainer">
      <Select
        style={{ marginBottom: "50px", width: "300px" }}
        showSearch
        suffixIcon={<SearchOutlined />}
        placeholder="Search a country"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={filterOption}
      >
        {data?.map((item, key) => (
          <Select.Option
            value={item?.name?.common}
            label={item?.name?.common}
            key={key}
          >
            <Typography.Text>{item?.name?.common}</Typography.Text>
          </Select.Option>
        ))}
      </Select>

      <CountryDetails
        selectedCountry={selectedCountry}
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
    </div>
  );
};

export default HomePage;
