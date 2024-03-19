import { StyleSheet, Image, View, Text } from "react-native";
import { CButton } from "../components/c-button";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { CLIENT_WEB_ID, CLIENT_IOS_ID } from "@env";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();
const web = String(CLIENT_WEB_ID);
const ios = String(CLIENT_IOS_ID);

export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: web,
    iosClientId: ios,
  });
  React.useEffect(() => {
    handleUseEffect();
  }, [response]);

  const handleUseEffect = async () => {
    const user = await getLocalUser();
    if (user) {
      navigation.replace("Dashboard");
      return;
    }
    if (response?.type !== "success") return;
    fetchUserInfo(response.authentication.accessToken);
  };

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  async function getUserInfo(token: string) {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const useInfo = await response.json();
    return useInfo;
  }

  async function fetchUserInfo(token: string) {
    if (!token) return;
    const useInfo = await getUserInfo(token);
    await AsyncStorage.setItem("@user", JSON.stringify(useInfo));
    navigation.replace("Dashboard");
  }

  return (
    <LinearGradient colors={["#fcfcfc", "#fcfcfc"]} style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require("../assets/images/puppy.png")}
          style={{ width: "100%", height: 400 }}
        />
      </View>
      <View style={styles.login}>
        <CButton
          icon="google"
          onPress={() => {
            promptAsync();
          }}
          title="Sign in with Google"
          colors={["#2B86C5", "#2B86C5"]}
        />
      </View>
    </LinearGradient>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    flex: 1,
    height: "70%",
    justifyContent: "flex-end",
  },
  login: {
    height: "30%",
    justifyContent: "space-around",
  },
});
