import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import DisplayScreen from "./components/DisplayScreen";
import { s } from "./App.style";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#666547" }}>
      <Text style={s.Header}>Artworks</Text>
      <Text style={s.decoration}>─────•~❉᯽❉~•─────</Text>
      <StatusBar style="auto" />
      <View style={s.container}>
        <Text style={s.quote}>
          “An artist is not paid for his labor but for his vision.”{" "}
        </Text>
        <Text style={s.name}>– James McNeill Whistler.</Text>
        <DisplayScreen />
        {/*Calling DisplayScreen component*/}
      </View>
    </View>
  );
}
