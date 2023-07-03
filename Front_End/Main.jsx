import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import ProductDetails from "./Screens/ProductDetails";
import Toast from "react-native-toast-message";
import Cart from "./Screens/Cart";
import ConfirmOrder from "./Screens/ConfirmOrder";
import Payment from "./Screens/Payment";
import Login from "./Screens/Login";
import ForgetPassword from "./Screens/ForgetPassword";
import Verify from "./Screens/Verify";
import Signup from "./Screens/Signup";
import Profile from "./Screens/Profile";
import UpdateProfile from "./Screens/UpdateProfile";
import ChangePassword from "./Screens/ChangePassword";
import Orders from "./Screens/Orders";
import AdminPanel from "./Admin/AdminPanel";
import Category from "./Admin/Category";
import AdminOrders from "./Admin/AdminOrders";
import UpdateProduct from "./Admin/UpdateProduct";
import NewProduct from "./Admin/NewProduct";
import ProductImages from "./Admin/ProductImages";
import CameraComponent from "./Screens/Camera";
import { useDispatch } from "react-redux";
import { loadUser } from "./Redux/Actions/UserAction";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="productdetails" component={ProductDetails} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="confirmorder" component={ConfirmOrder} />
          <Stack.Screen name="payment" component={Payment} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="updateprofile" component={UpdateProfile} />
          <Stack.Screen name="orders" component={Orders} />
          <Stack.Screen name="camera" component={CameraComponent} />
          {/* password related route */}
          <Stack.Screen name="verify" component={Verify} />
          <Stack.Screen name="changepassword" component={ChangePassword} />
          <Stack.Screen name="forgetpassword" component={ForgetPassword} />
          {/* admin route */}
          <Stack.Screen name="adminpanel" component={AdminPanel} />
          <Stack.Screen name="categories" component={Category} />
          <Stack.Screen name="updateproduct" component={UpdateProduct} />
          <Stack.Screen name="adminorders" component={AdminOrders} />
          <Stack.Screen name="newproduct" component={NewProduct} />
          <Stack.Screen name="productimages" component={ProductImages} />
        </Stack.Group>
      </Stack.Navigator>
      <Toast position="top" topOffset={40} />
    </NavigationContainer>
  );
};

export default Main;
