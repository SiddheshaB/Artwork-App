import { StyleSheet } from "react-native";
export const s = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    backgroundColor: "#EDE8DC",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 1,
  },
  Header: {
    fontSize: 30,
    marginTop: 30,
    marginLeft: 15,
    color: "#ffdbac",
    fontFamily: "Rubik-Medium",
    fontWeight: "normal",
  },
  decoration: {
    fontSize: 30,
    color: "#c68642",
    marginLeft: 5,
    alignSelf: "center",
  },
  quote: {
    fontSize: 22,
    color: "#745151",
    marginLeft: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  name: { fontSize: 16, color: "#b69a82", marginLeft: 15 },
});
