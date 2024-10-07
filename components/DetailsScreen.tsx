import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { s } from "./components.style";

export default function DetailsScreen({ isVisible, artworkId, onClose }) {
  const uri = "https://api.artic.edu/api/v1/artworks/".concat(artworkId);
  {
    /*Here, the ID passed from DisplayScreen is concatenated with the URL to fetch api response of that ID */
  }
  const [details, setDetails] = useState<any>();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then(
        (result) => {
          setDetails(result);
          {
            /*API response is stored in 'details' as an object*/
          }
          setLoading(false);
        },
        (error) => {
          setError(error);
          console.log(error);
          setLoading(false);
        }
      );
  }, []);

  const displayData = () => {
    console.log(
      "Error" + error + " Loading" + isLoading + " details" + details
    );
    if (error) {
      return <Text>{error}</Text>;
    }
    if (isLoading) return <></>;
    if (!details) {
      console.log("No response");
      return <></>;
    }
    return (
      <View style={s.centeredView}>
        <Modal animationType="slide" transparent={true} visible={isVisible}>
          <View style={s.modalBackground}>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>

            <View style={s.modalView}>
              <ScrollView>
                <Image
                  source={{
                    uri: `${details.config.iiif_url}/${details.data.image_id}/full/843,/0/default.jpg`,
                  }}
                  style={s.images}
                ></Image>
                <Text style={s.titles}>{details.data.title}</Text>
                <Text style={s.details}>
                  {details.data.date_start}|{details.data.place_of_origin}
                  {"\n"}
                  {details.data.artist_display}
                </Text>

                <Text style={s.headings}>Credit Line</Text>
                <Text style={s.details}>{details.data.credit_line}</Text>
                <Text style={s.headings}>Medium Display:</Text>
                <Text style={s.details}>{details.data.medium_display}</Text>
                <Text style={s.headings}>Description:</Text>
                <Text style={s.details}>{details.data.description}</Text>
                <Text style={s.headings}>Artwork Type:</Text>
                <Text style={s.details}>{details.data.artwork_type_title}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  return <View>{displayData()}</View>;
}
