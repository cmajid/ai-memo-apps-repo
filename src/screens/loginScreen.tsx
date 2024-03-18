import { StyleSheet, Image, View, Text } from "react-native";
import { CButton } from "../components/c-button";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { CLIENT_WEB_ID, CLIENT_IOS_ID } from "@env";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import storage from "../libraries/storage/storage";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen({ navigation }) {
  const [accessToken, setAccessToken] = React.useState(null);

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
    storage.save({
      key: "loginState", // Note: Do not use underscore("_") in key!
      data: useInfo,

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 1000 * 3600,
    });
    navigation.replace("Dashboard", { name: "Jane" });
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
          title="Go to Dashboard"
          onPress={() => navigation.navigate("Dashboard", { name: "Jane" })}
        />
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
