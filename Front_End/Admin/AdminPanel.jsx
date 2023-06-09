import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../Styles/styles";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import ButtonBox from "../Components/ButtonBox";
import ProductListHeading from "../Components/ProductListHeading";
import { products } from "../Screens/Home";
import ProductListItem from "../Components/ProductListItem";
import Chart from "../Components/Chart";
import { useNavigation } from "@react-navigation/native";

const AdminPanel = ({ navigation }) => {
  const deleteProductHandler = (id) => {
    console.log(`delete with ID : ${id}`);
  };
  const loading = false;
  const navigate = useNavigation();
  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigate.navigate("categories");
        break;
      case "All Orders":
        navigate.navigate("adminorders");
        break;
      case "Product":
        navigate.navigate("newproducts");
        break;

      default:
        navigate.navigate("adminorders");
        break;
    }
  };
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={formHeading}>Admin Panel</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.color3,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Chart inStock={15} outOfStock={3} />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-evenly",
              }}
            >
              <ButtonBox
                icon={"plus"}
                text={"Product"}
                handler={navigationHandler}
              />
              <ButtonBox
                icon={"format-list-bulleted-square"}
                text={"All Orders"}
                handler={navigationHandler}
                reverse={true}
              />
              <ButtonBox
                icon={"plus"}
                text={"Category"}
                handler={navigationHandler}
              />
            </View>
          </View>
          <ProductListHeading />
          <ScrollView>
            <View>
              {products.map((item, index) => (
                <ProductListItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  navigate={navigation}
                  deleteHandler={deleteProductHandler}
                  price={item.price}
                  stock={item.stock}
                  name={item.name}
                  category={item.category}
                  imgSrc={item.images[0].url}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminPanel;
