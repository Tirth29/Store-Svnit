import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultImg,
  defaultStyle,
  formHeading,
} from "../Styles/styles";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../Components/ButtonBox";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../Redux/Actions/UserAction";
import {
  useMessageAndErrorOther,
  useMessageAndErrorUser,
} from "../Utils/hooks";
import mime from "mime";
import { useIsFocused } from "@react-navigation/native";
import { updatePic } from "../Redux/Actions/OtherAction";

const Profile = ({ navigation,route }) => {
  const [avatar, setAvatar] = useState(defaultImg);
  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, dispatch, "login");
  const { user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(logout());
  };
  const loadingPic = useMessageAndErrorOther(dispatch, null, null, loadUser);
  const isFocused = useIsFocused();
  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel");
        break;
      case "Orders":
        navigation.navigate("orders");
        break;
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        logoutHandler();
        break;
      default:
      case "Orders":
        navigation.navigate("orders");
        break;
    }
  };

  
  useEffect(()=>{
    if(route.params?.image){
      setAvatar(route.params.image);
      const myform = new FormData();
      myform.append("file",{
        uri:route.params.image,
        type:mime.getType(route.params.image),
        name:route.params.image.split("/").pop(),
      })
      dispatch(updatePic(myform))
    }
    dispatch(loadUser());
  },[route.params,dispatch,isFocused]);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar.url);
    }
  }, [user]);
  
  return (
    <>
      <View
        style={{
          padding: 35,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: colors.color2,
        }}
      >
        {/* heading  */}
        <View
          style={
            {
              // marginBottom: 20,
            }
          }
        >
          <Text style={formHeading}>Profile</Text>
        </View>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={defaultStyle}>
            <View style={styles.container}>
              <Avatar.Image
                source={{
                  uri: avatar,
                }}
                size={100}
                style={{
                  backgroundColor: colors.color1,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }
                disabled={loadingPic}
              >
                <Button
                  textColor={colors.color1}
                  disabled={loadingPic}
                  loading={loadingPic}
                >
                  Change Photo
                </Button>
              </TouchableOpacity>
              <Text style={styles.name}>{user?.name}</Text>
              <Text
                style={{
                  fontWeight: 300,
                  backgroundColor: colors.color2,
                  paddingRight:10,
                  paddingLeft:10,
                  paddingTop:3,
                  paddingBottom:3,
                  borderRadius:10,
                }}
              >
                {user?.email}
              </Text>
            </View>
            <View style={{
              marginTop:20,
            }} >
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Orders"}
                  icon={"cart"}
                />
                {user?.role === "admin" && (
                  <ButtonBox
                    handler={navigateHandler}
                    text={"Admin"}
                    icon={"view-dashboard"}
                    reverse={true}
                  />
                )}
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Password"}
                  icon={"pencil"}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Sign Out"}
                  icon={"exit-to-app"}
                />
              </View>
            </View>
          </View>
          <Footer />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 5,
    color: colors.color2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
});

export default Profile;
