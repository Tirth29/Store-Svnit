import { View, Text, StyleSheet } from "react-native";
import React,{useEffect, useState} from "react";
import { colors } from "../Styles/styles";
import { Button } from "react-native-paper";
const API_ENDPOINT = "https://e-commerce-server-a619.up.railway.app/api/v1/user"

const OrderItem = async({
  id,
  price,
  address,
  cname,
  orderedOn,
  status,
  paymentMethod,
  updateHandler,
  admin = false,
  loading,
  i = 0,
}) => {
  const [cuname, setCuname] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/${cname}`);
        const { name } = response.data;
        setCuname(name);
      } catch (error) {
        console.error('Error retrieving user:', error);
        // Handle error state or display a message to the user
      }
    };

    fetchUserName();
  }, [cname]);

  return (
    <View
      style={{
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
        ...styles.container,
      }}
    >
      <Text
        style={{
          ...styles.text,
          backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
        //   color:i%2===0 ? colors.color2 : colors.color3,
        }}
      >
        ID:#{id}
      </Text>
      <TextBox title={"Customer Name"} value={cuname} i={i} />
      <TextBox title={"Address"} value={address} i={i} />
      <TextBox title={"Ordered On"} value={orderedOn} i={i} />
      <TextBox title={"Price"} value={price} i={i} />
      <TextBox title={"Status"} value={status} i={i} />
      <TextBox title={"Payment Method"} value={paymentMethod} i={i} />

      {admin && (
        <Button
          icon={"update"}
          mode={"contained"}
          textColor={i % 2 === 0 ? colors.color2 : colors.color3}
          style={{
            width: 120,
            alignSelf: "center",
            marginTop: 10,
            backgroundColor: i % 2 === 0 ? colors.color3 : colors.color2,
          }}
          onPress={() => updateHandler(id)}
          loading={loading}
          disabled={loading}
        >
          Update
        </Button>
      )}
    </View>
  );
};

const TextBox = ({ title, value, i }) => (
    <Text
      style={{
        marginVertical: 6,
        color: i % 2 === 0 ? colors.color3 : colors.color2,
      }}
    >
      <Text style={{ fontWeight: "900" }}>{title} - </Text>
      {title === "Price" ? "₹" : ""}
      {value}
    </Text>
  );

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default OrderItem;
