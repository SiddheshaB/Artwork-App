import React, { useEffect, useState } from "react";
import { s } from "./components.style";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import DetailsScreen from "./DetailsScreen";
export default function DisplayScreen() {
  const url = "https://api.artic.edu/api/v1/artworks/";
  const [artworkList, setArtworkList] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ID, setID] = useState();
  const [nextPage, setNextPage] = useState(url);

  const onModalClose = () => {
    setIsModalVisible(false);
    {
      /*Modal will close when 'X' icon is pressed*/
    }
  };
  const displayModal = (ID) => {
    setID(ID);
    setIsModalVisible(true);
    {
      /*Modal will be visible when the button is pressed*/
    }
  };
  const fetchNextPage = async (url: string) => {
    fetch(url)
      .then((response) => response.json())
      .then(
        (result) => {
          setLoading(false);
          setArtworkList((existingItems) => {
            return [...existingItems, ...result.data];
            {
              /*new response will be appended to existing response*/
            }
          });
          setLoading(false);
          setNextPage(result.pagination.next_url);
          {
            /*here next url link is fetched from api response*/
          }
        },
        (error) => {
          setLoading(false);
          setError(error);
          console.log(error);
        }
      );
  };
  useEffect(() => {
    fetchNextPage(url);
  }, []);
  const displayData = () => {
    if (error) {
      return <Text>{error}</Text>;
    }
    if (isLoading) return <></>;
    return (
      <FlatList
        data={artworkList}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.buttons}
            onPress={() => displayModal(item.id)}
          >
            <Image
              source={{
                uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
              }}
              style={s.thumbnailImage}
            ></Image>
            <Text style={s.buttonText} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        onEndReached={() => {
          fetchNextPage(nextPage);
        }}
        ListFooterComponent={() => <View>{isLoading}</View>}
        contentContainerStyle={{ gap: 10 }}
        onEndReachedThreshold={0.5}
      />
    );
    {
      /*When button is clicked, ID of that item is passed to displayModal. When the end of the list is reached, fetchNextPage function will load next page */
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      {displayData()}
      {/*First thing to render when app is loaded*/}
      {isModalVisible && (
        <DetailsScreen
          isVisible={isModalVisible}
          onClose={onModalClose}
          artworkId={ID}
        />
      )}
    </View>
  );
  {
    /*Passing Modal visibility, onClose and ID of the item clicked to Details screen*/
  }
}
