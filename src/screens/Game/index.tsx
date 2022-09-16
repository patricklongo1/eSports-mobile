import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Image, FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { GameParams } from "../../@types/navigation";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  useEffect(() => {
    async function loadGameList() {
      try {
        const response = /* await api.get(`/games/${game.id}/ads`); */ [
          {
            "id": "d91bc693-afea-4f4c-b210-0761832ee488",
            "name": "Jota",
            "weekDays": [
              "0",
              "5",
              "6"
            ],
            "useVoiceChannel": true,
            "yearsPlaying": 5,
            "hourStart": "18:33",
            "hourEnd": "22:55"
          },
          {
            "id": "0ff86f78-79ef-41be-93e5-2d184f8744e9",
            "name": "Virus",
            "weekDays": [
              "0",
              "5",
              "6"
            ],
            "useVoiceChannel": true,
            "yearsPlaying": 5,
            "hourStart": "18:00",
            "hourEnd": "22:00"
          }
        ];

        setDuos(response /* .data */);
      } catch (error) {
        console.log(error);
      }
    }
    loadGameList();
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subTitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {
                console.log("olokinho meu");
              }}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
