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
// import { Avatar, Button, TextInput } from "react-native-paper";
// import SelectComponent from "../Components/SelectComponent";
// import { TouchableOpacity } from "react-native";

// const NewProduct = ({ navigation, route }) => {
//   const loading = false;
//   const loadingOther = false;
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [category, setCategory] = useState("Laptop");
//   const [categoryID, setCategoryID] = useState("");
//   const [categories, setCategories] = useState([
//     {
//       _id: "abc",
//       category: "Laptop",
//     },
//     {
//       _id: "a",
//       category: "Laptop1",
//     },
//     {
//       _id: "ac",
//       category: "Laptop2",
//     },
//     {
//       _id: "bc",
//       category: "Laptop3",
//     },
//   ]);
//   const [visible, setVisible] = useState(false);
//   const submitHandler = () => {};
//   return (
//     <>
//       <View
//         style={{
//           ...defaultStyle,
//           backgroundColor: colors.color5,
//         }}
//       >
//         <Header back={true} />
//         <View style={{ maerginTop: 70, marginBottom: 20 }}>
//           <Text style={formHeading}>New Product</Text>
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
//               <View
//                 style={{
//                   width: 80,
//                   height: 80,
//                   alignSelf: "center",
//                   marginBottom: 20,
//                 }}
//               >
//                 <Avatar.Image
//                   size={80}
//                   style={{
//                     backgroundColor: colors.color1,
//                   }}
//                   source={{
//                     uri: image ? image : null,
//                   }}
//                 />
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate("camera", { newProduct: true })
//                   }
//                 >
//                   <Avatar.Icon
//                     icon={"camera"}
//                     size={30}
//                     color={colors.color3}
//                     style={{
//                       backgroundColor: colors.color2,
//                       position: "absolute",
//                       bottom: 0,
//                       right: -5,
//                     }}
//                   />
//                 </TouchableOpacity>
//               </View>

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
//                 keyboardType="number-pad"
//                 value={price}
//                 onChangeText={setPrice}
//               />
//               <TextInput
//                 {...inputOptions}
//                 placeholder="Stock"
//                 value={stock}
//                 onChangeText={setStock}
//                 keyboardType="number-pad"
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
//                 Create 
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
//     </>
//   );
// };

// export default NewProduct;


import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from "../Styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import SelectComponent from "../Components/SelectComponent";
import { useSetCategories, useMessageAndErrorOther } from "../Utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { createProduct } from "../Redux/Actions/OtherAction";

const NewProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Choose Category");
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const disableBtnCondition =
    !name || !description || !price || !stock || !image;

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("stock", stock);
    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    }
    );

    if (categoryID) myForm.append("category", categoryID);

    dispatch(createProduct(myForm));
  };

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

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
          <Text style={formHeading}>New Product</Text>
        </View>

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
            <View
              style={{
                width: 80,
                height: 80,
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              <Avatar.Image
                size={80}
                style={{
                  backgroundColor: colors.color1,
                }}
                source={{
                  uri: image ? image : null,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("camera", { newProduct: true })
                }
              >
                <Avatar.Icon
                  icon={"camera"}
                  size={30}
                  color={colors.color3}
                  style={{
                    backgroundColor: colors.color2,
                    position: "absolute",
                    bottom: 0,
                    right: -5,
                  }}
                />
              </TouchableOpacity>
            </View>

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
              keyboardType="number-pad"
              placeholder="Stock"
              value={stock}
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
              loading={loading}
              disabled={disableBtnCondition || loading}
            >
              Create
            </Button>
          </View>
        </ScrollView>
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

export default NewProduct;
