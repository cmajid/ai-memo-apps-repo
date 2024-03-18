import { StyleSheet, Image, View, Text } from "react-native";
import { CButton } from "../components/c-button";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { CLIENT_WEB_ID, CLIENT_IOS_ID } from "@env";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
import * as Google from "expo-auth-session/providers/google";

export default function Login() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const web = String(CLIENT_WEB_ID);
  const ios = String(CLIENT_IOS_ID);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: web,
    iosClientId: ios,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text >
            Welcome
          </Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text >{user.name}</Text>
        </View>
      );
    }
  };

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
          onPress={() => { promptAsync()}}
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
