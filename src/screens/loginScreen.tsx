import { StyleSheet, Image, View, Text } from "react-native";
import { CButton } from "../components/c-button";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { CLIENT_WEB_ID, CLIENT_IOS_ID } from "@env";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();
const ios = String(CLIENT_IOS_ID);

export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: ios,
  });
  React.useEffect(() => {
    handleUseEffect();
  }, [response]);

  const refreshToken = async (refreshToken: string) => {
    const tokenResult = await AuthSession.refreshAsync(
      {
        clientId: ios,
        refreshToken: refreshToken,
      },
      {
        tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
      }
    );
    return tokenResult;
  };
  const getMemoToken = async (idToken: string) => {
    let response = await fetch("http://localhost:3002/auth/verify", {
      method: "POST",
      body: JSON.stringify({
        idToken,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const useInfo = await response.json();
    return useInfo;
  };

  const handleUseEffect = async () => {
    const user = await getLocalUser();
    if (user) {
      navigation.replace("Dashboard");
      return;
    }
    if (response?.type !== "success") return;

    const memoToken = await getMemoToken(response.authentication.idToken);
    await AsyncStorage.setItem("@user", JSON.stringify(memoToken.user));
    navigation.replace("Dashboard");
  };

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  return (
    <LinearGradient colors={["#f9f9f9", "#faf9f7"]} style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require("../assets/images/puppy.jpeg")}
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
