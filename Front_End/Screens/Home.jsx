import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, activeRoute } from "react";
import { colors, defaultStyle } from "../Styles/styles";
import Header from "../Components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModel from "../Components/SearchModel";
import ProductCard from "../Components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Components/Footer";
import Heading from "../Components/Heading";
export const products = [
  {
    price: 2422,
    name: "Sample1",
    _id: "adv1",
    stock: 23,
    category:"Laptop",
    images: [
      {
        url: "https://picsum.photos/seed/picsum/200/300",
      },
    ],
  },
  {
    price: 2422,
    name: "Sample1",
    _id: "adv11",
    stock: 23,
    category:"Phone",
    images: [
      {
        url: "https://picsum.photos/seed/picsum/200/300",
      },
    ],
  },
  {
    price: 2422,
    name: "Sample1",
    _id: "adv111",
    stock: 23,
    category:"efqaeefqewas",
    images: [
      {
        url: "https://picsum.photos/seed/picsum/200/300",
      },
    ],
  },
  {
    price: 2422,
    name: "Sample1",
    _id: "adv1111",
    stock: 23,
    category:"efefqewas",
    images: [
      {
        url: "https://picsum.photos/seed/picsum/200/300",
      },
    ],
  },
  {
    price: 24222,
    name: "Sample2",
    _id: "adv2",
    stock: 23,
    category:"efefqes",
    images: [
      {
        url: "https://picsum.photos/seed/picsum/200/300",
      },
    ],
  },
];

const Home = () => {
  const categories = [
    { category: "abc", _id: "adc10" },
    { category: "abc", _id: "adc9" },
    { category: "abc", _id: "adc8" },
    { category: "abc", _id: "adc7" },
    { category: "abc", _id: "adc6" },
    { category: "abc", _id: "adc5" },
    { category: "abc", _id: "adc4" },
    { category: "abc", _id: "adc3" },
    { category: "abc", _id: "adc2" },
    { category: "abc", _id: "adc1" },
  ];

  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categoryButtonHandler = (id) => {
    setCategory(id);
  };
  const handleSearchToggle = () => {
    setActiveSearch((prev) => !prev);
  };
  const addToCartHandler = (id) => {
    console.log("Add to cart ", id);
  };

  const navigate = useNavigation();

  return (
    <>
      {activeSearch && (
        <SearchModel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}
      <View style={defaultStyle}>
        {/* header-bar */}
        <Header />
        <View
          style={{
            paddingTop: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* heading  */}
          <Heading text1="Our" text2="Products" />
          {/* search bar */}
          <View>
            <TouchableOpacity onPress={handleSearchToggle}>
              <Avatar.Icon
                icon={"magnify"}
                color={"gray"}
                size={45}
                style={{ backgroundColor: colors.color2, elevation: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    color: category === item._id ? colors.color2 : "gray",
                    fontSize: 12,
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                images={item.images}
                addToCartHandler={addToCartHandler}
                id={item._id}
                key={item._id}
                i={index}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <Footer activeRoute={"home"} />
    </>
  );
};

export default Home;
