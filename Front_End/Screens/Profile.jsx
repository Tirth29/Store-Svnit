import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
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

const users = {
  name: "John",
  email: "john@example.com",
};
const loading = false;
const Profile = ({ navigation }) => {
  const [avatar, setAvatar] = useState("");
  const logoutHandler = () => {
    console.log("logout");
  };
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
  return (
    <>
      <View style={{
          padding: 35,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: colors.color2,
      }}>
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
                  uri: defaultImg,
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
              >
                <Button textColor={colors.color1}>Change Photo</Button>
              </TouchableOpacity>
              <Text style={styles.name}>{users?.name}</Text>
              <Text
                style={{
                  fontWeight: 300,
                  backgroundColor: colors.color2,
                }}
              >
                {users?.email}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Orders"}
                  icon={"cart"}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Admin"}
                  icon={"view-dashboard"}
                  reverse={true}
                />
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
    marginTop: 10,
    color: colors.color2,
  },
});

export default Profile;
