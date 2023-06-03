// import { View, Text, Dimensions } from "react-native";
// import React, { useRef } from "react";
// import { colors, defaultStyle } from "../Styles/styles";
// import Header from "../Components/Header";
// import Carousel from "react-native-snap-carousel";
// import { StyleSheet } from "react-native";
// import { Image } from "react-native-paper";

// const SLIDER_WIDTH = Dimensions.get("window").width;
// const ITEM_WIDTH= SLIDER_WIDTH;

// export const ProductDetails = ({ route : {params} }) => {
//   console.log(params.id);

//   const images = [
//     {
//       id:"afa",
//       url:"https://picsum.photos/seed/picsum/200/300",
//     },
//     {
//       id:"afa1",
//       url:"https://picsum.photos/seed/picsum/200/300",
//     },
//     {
//       id:"afa2",
//       url:"https://picsum.photos/seed/picsum/200/300",
//     },
//     {
//       id:"afa3",
//       url:"https://picsum.photos/seed/picsum/200/300",
//     },
//   ];

// const isCarousel = useRef(null);
//   return (
//     <View
//       style={{
//           ...defaultStyle,
//           padding:0,
//           backgroundColor:colors.color1,
//       }}
//     >
//       <Header back={true}/>
//       <Carousel layout="stack"
//         sliderWidth={SLIDER_WIDTH}
//         itemWidth={ITEM_WIDTH}
//         ref={isCarousel}
//         data={images}
//         renderItem={carouselCardItem}
//       />
//       <Text>ProductDetails</Text>
//     </View>
//   );
// };

// const carouselCardItem = ({item,index}) => (
//     <View style={style.container} key={index}>
//       <Image  source={{uri:item.uri}} style={style.image}  />
//     </View>
// );

// const style = StyleSheet.create({
//   container : {},
//   image:{
//     width:ITEM_WIDTH,
//     height:250,
//     resizeMode: "contain"
//   },
// });

import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, defaultStyle } from "../Styles/styles";
import Header from "../Components/Header";
import Carousel from "react-native-snap-carousel";
import { Avatar, Button } from "react-native-paper";
import  Toast  from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
// import { getProductDetails } from "../redux/actions/productAction";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;
export const iconOptions = {
  size: 20,
  style: {
    borderRadius: 5,
    backgroundColor: colors.color5,
    height: 25,
    width: 25,
  },
};

const ProductDetails = ({ route: { params } }) => {
  // const {
  //   product: { name, price, stock, description, images },
  // } = useSelector((state) => state.product);

  const images = [
    {
      id:"afa",
      url:"https://picsum.photos/seed/picsum/200/300",
    },
    {
      id:"afa1",
      url:"https://picsum.photos/seed/picsum/200/300",
    },
    {
      id:"afa2",
      url:"https://picsum.photos/seed/picsum/200/300",
    },
    {
      id:"afa3",
      url:"https://picsum.photos/seed/picsum/200/300",
    },
  ];

  const name= "abcdefghijklmnopqrstuvwxyz";
  const price = 12345;
  const stock= 10;
  const description = "lorem ipsum d  poster  velit  abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz ";
  
  const isCarousel = useRef(null);
  const [quantity, setQuantity] = useState(1);
  // const dispatch = useDispatch();
  // const isFocused = useIsFocused();

  const incrementQty = () => {
    if (stock <= quantity)
      return Toast.show({
        type: "error",
        text1: "Maximum Value Added",
      });
    setQuantity((prev) => prev + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCardHandler = () => {
    if (stock === 0)
    // try{

      return Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });
    // }
      // catch(err){
      //   console.log(err);
      // }
      console.log("Added to card",quantity);
  //   dispatch({
  //     type: "addToCart",
  //     payload: {
  //       product: params.id,
  //       name,
  //       price,
  //       image: images[0]?.url,
  //       stock,
  //       quantity,
  //     },
  //   });
    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  // useEffect(() => {
  //   dispatch(getProductDetails(params.id));
  // }, [dispatch, params.id, isFocused]);

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color1,
      }}
    >
      <Header back={true} />

      {/* Carousel */}
      <Carousel
        layout="stack"
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        data={images}
        renderItem={CarouselCardItem}
      />

      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          flex: 1,
          marginTop: -380,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 25,
          }}
        >
          {name}
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          ₹{price}
        </Text>

        <Text
          style={{
            letterSpacing: 1,
            lineHeight: 20,
            marginVertical: 15,
          }}
          numberOfLines={8}
        >
          {description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              color: colors.color3,
              fontWeight: "100",
            }}
          >
            Quantity
          </Text>

          <View
            style={{
              width: 80,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity 
            onPress={decrementQty}
            >
              <Avatar.Icon icon={"minus"} {...iconOptions} />
            </TouchableOpacity>

            <Text style={style.quantity}>{stock}</Text>

            <TouchableOpacity
             onPress={incrementQty}
             >
              <Avatar.Icon icon={"plus"} {...iconOptions} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9} 
        onPress={addToCardHandler}
        >
          {/* images */}
          <Button icon={"cart"} style={style.btn} textColor={colors.color2}>
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => (
  <View style={style.container} key={index}>
    <Image source={{ uri: item.url }} style={style.image} />
  </View>
);

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 250,
  },
  quantity: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },

  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});
export default ProductDetails;
