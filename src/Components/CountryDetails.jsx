import React, { useEffect, useState } from "react";
import { Button, Table, Typography } from "antd";
import CurrencyConverter from "./CurrencyConverter";
import { DeleteOutlined } from "@ant-design/icons";

const CountryDetails = (props) => {
  const { selectedCountry, onChange } = props;
  const [data, setData] = useState([]);

  const hendleDelete = (value) => {
    const filterData = selectedCountry?.filter((item) => item?.name !== value)
    onChange(filterData)
  };

  useEffect(() => {
    setData(selectedCountry);
  }, [selectedCountry]);

  return (
    <>
      <Table
        style={{ minWidth: 950, height: "70vh", overflow:"auto" }}
        dataSource={data}
        columns={[
          {
            title: "Country Name",
            key: "countryname",
            width:"150px",
            render: (item, record, key) => {
              return <a key={key}>{item?.name}</a>;
            },
          },
          {
            title: "Population",
            dataIndex: "population",
            key: "population",
            width:"100px",
          },
          {
            title: "Currency",
            key: "currency",
            width:"150px",
            render: (item, record, key) => {
              return (
                <Typography.Text key={key}>
                  {item?.currency?.name}
                </Typography.Text>
              );
            },
          },
          {
            title: "Symbol",
            key: "currencysymbol",
            width:"100px",
            render: (item, record, key) => {
              return (
                <Typography.Text key={key}>
                  {item?.currency?.Symbol}
                </Typography.Text>
              );
            },
          },
          {
            title: "Euro To Local Currency",
            key: "localcurrency",
            width:"300px",
            render: (item, record, key) => {
              return (
                <>
                  <CurrencyConverter currency={item?.currency?.shortName} />
                </>
              );
            },
          },
          {
            title: "Delete",
            key: "delete",
            width:"100px",
            render: (item, record, key) => (
              <Button
                shape="circle"
                type="primary"
                onClick={() => hendleDelete(item?.name)}
                key={key}
              >
                <DeleteOutlined />
              </Button>
            ),
          },
        ]}
      />
    </>
  );
};

export default CountryDetails;
