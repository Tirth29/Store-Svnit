// import { View, Text, ScrollView } from "react-native";
// import React, { useState } from "react";
// import {
//   colors,
//   defaultStyle,
//   formHeading,
//   inputOptions,
//   inputStyling,
// } from "../Styles/styles";
// import { Header } from "react-native/Libraries/NewAppScreen";
// import Loader from "../Components/Loader";
// import { Button, TextInput } from "react-native-paper";
// import SelectComponent from "../Components/SelectComponent";

// const UpdateProduct = ({ navigation, route }) => {
  // const loading = false;
  // const loadingOther = false;
  // const [id] = useState(route.params.id);
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [stock, setStock] = useState("");
  // const [category, setCategory] = useState("Laptop");
  // const [categoryID, setCategoryID] = useState("");
  // const [categories, setCategories] = useState([
  //   {
  //       _id:"abc",
  //       category:"Laptop",
  //   },
  //   {
  //       _id:"a",
  //       category:"Laptop1",
  //   },
  //   {
  //       _id:"ac",
  //       category:"Laptop2",
  //   },
  //   {
  //       _id:"bc",
  //       category:"Laptop3",
  //   },
  // ]);
  // const [visible, setVisible] = useState(false);
  // const submitHandler = () => {};
//   return (
//     <View style={{flex:1,backgroundColor:colors.color1,}}>
//       <View
//         style={{
//           ...defaultStyle,
//           backgroundColor: colors.color2,
//           flex: 1,
//         }}
//       >
//         <Header back={true} />
//         <View style={{ maerginTop: 70, marginBottom: 20 }}>
//           <Text style={formHeading}>Update Product</Text>
//         </View>
//         {loading ? (
//           <Loader />
//         ) : (
//           <ScrollView
//             style={{
//               padding: 20,
//               elevation: 10,
//               borderRadius: 10,
//               backgroundColor: colors.color3,
//             }}
//           >
//             <View
//               style={{
//                 justifyContent: "center",
//                 height: 650,
//                 images: [],
//               }}
//             >
//               <Button
//                 onPress={() => navigation.navigate("productimages", { id })}
//               >
//                 Manage Images
//               </Button>
//               <TextInput
//                 {...inputOptions}
//                 placeholder="Name"
//                 keyboardType="default"
//                 value={name}
//                 onChangeText={setName}
//               />
//               <TextInput
//                 {...inputOptions}
//                 placeholder="Description"
//                 keyboardType="default"
//                 value={description}
//                 onChangeText={setDescription}
//               />
//               <TextInput
//                 {...inputOptions}
//                 placeholder="Price"
//                 keyboardType="default"
//                 value={price}
//                 onChangeText={setPrice}
//               />
//               <TextInput
//                 {...inputOptions}
//                 placeholder="Stock"
//                 keyboardType="default"
//                 value={stock}
//                 onChangeText={setStock}
//               />
//               <TextInput
//                 {...inputOptions}
//                 placeholder="Name"
//                 keyboardType="default"
//                 value={name}
//                 onChangeText={setName}
//               />
//               <Text
//                 style={{
//                   ...inputStyling,
//                   textAlign: "center",
//                   borderRadius: 3,
//                 }}
//                 onPress={() => setVisible(true)}
//               >
//                 {category}
//               </Text>
//               <Button
//                 textColor={colors.color2}
//                 style={{
//                   backgroundColor: colors.color1,
//                   margin: 20,
//                   padding: 6,
//                 }}
//                 onPress={submitHandler}
//                 loading={loadingOther}
//                 disabled={loadingOther}
//               >
//                 Update
//               </Button>
//             </View>
//           </ScrollView>
//         )}
//       </View>
//       <SelectComponent
//         categories={categories}
//         setCategory={setCategory}
//         setCategoryID={setCategoryID}
//         visible={visible}
//         setVisible={setVisible}
//       />
//     </View>
//   );
// };

// export default UpdateProduct;


import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from "../Styles/styles";
import Loader from "../Components/Loader";
import { Button, TextInput } from "react-native-paper";
import SelectComponent from "../Components/SelectComponent";
import { useMessageAndErrorOther, useSetCategories } from "../Utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../Redux/Actions/ProductAction";
import { updateProduct } from "../Redux/Actions/OtherAction";

const UpdateProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { product, loading } = useSelector((state) => state.product);

  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const submitHandler = () => {
    dispatch(updateProduct(id, name, description, price, stock, categoryID));
  };

  const loadingOther = useMessageAndErrorOther(
    dispatch,
    navigation,
    "adminpanel"
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, 
  [dispatch, id, isFocused]
  );

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setCategory(product.category?.category);
      setCategoryID(product.category?._id);
    }
  }, [product]);
  
  return (
    <>
      <View
        style={{
          ...defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        <Header back={true} />

        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>Update Product</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,
              backgroundColor: colors.color3,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                height: 650,
              }}
            >
              <Button
                onPress={() =>
                  navigation.navigate("productimages", {
                    id,
                    images: product.images,
                  })
                }
                textColor={colors.color1}
              >
                Manage Images
              </Button>

              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                {...inputOptions}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />

              <TextInput
                {...inputOptions}
                placeholder="Price"
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
              />
              <TextInput
                {...inputOptions}
                placeholder="Stock"
                value={stock}
                keyboardType="number-pad"
                onChangeText={setStock}
              />

              <Text
                style={{
                  ...inputStyling,
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 3,
                }}
                onPress={() => setVisible(true)}
              >
                {category}
              </Text>

              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>

      <SelectComponent
        categories={categories}
        setCategoryID={setCategoryID}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default UpdateProduct;
