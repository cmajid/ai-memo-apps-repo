import { Text, View, Image } from "react-native";
import { CButton } from "../components/c-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function DashboardScreen({ navigation, route }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      getUserInfo();
    }
  }, [user]);

  const getUserInfo = async () => {
    const userinfo = await AsyncStorage.getItem("@user");
    setUser(JSON.parse(userinfo));
  };

  return (
    <>
      <Text>This is dashboard</Text>
      {user && (
        <View>
          <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
            Welcome
          </Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
        </View>
      )}
      <CButton
        title="Delete cache"
        icon="google"
        onPress={async () => {
          await AsyncStorage.removeItem("@user");
        }}
      />
    </>
  );
}
