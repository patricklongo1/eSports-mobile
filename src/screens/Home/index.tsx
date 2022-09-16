import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";

import { styles } from "./styles";

import api from "../../services/api";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadGameList() {
      try {
        const response = /* await api.get("/games"); */ [
          {
            id: "f3ee72b4-558a-41a3-bf8c-16441d7e623e",
            title: "Counter Strike",
            bannerUrl:
              "https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-188x250.jpg",
            _count: {
              ads: 2,
            },
          },
          {
            id: "d952e306-fdfe-49c0-b0be-30732eeeefc6",
            title: "League of Legends",
            bannerUrl:
              "https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg",
            _count: {
              ads: 0,
            },
          },
          {
            id: "b76b5298-73a3-484f-87d5-39292fcb4135",
            title: "GTA V",
            bannerUrl:
              "https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-188x250.jpg",
            _count: {
              ads: 0,
            },
          },
          {
            id: "28c6df27-dd5c-4527-8bcf-bc33c6fdb21f",
            title: "Among Us",
            bannerUrl:
              "https://static-cdn.jtvnw.net/ttv-boxart/510218_IGDB-188x250.jpg",
            _count: {
              ads: 0,
            },
          },
          {
            id: "17f4656d-f804-4899-9220-e1e6b785cd78",
            title: "F1 Manager 2022",
            bannerUrl:
              "https://static-cdn.jtvnw.net/ttv-boxart/489490035_IGDB-188x250.jpg",
            _count: {
              ads: 0,
            },
          },
          {
            id: "55af74e9-868b-47db-82eb-ae486fe3c473",
            title: "Minecraft",
            bannerUrl:
              "https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-188x250.jpg",
            _count: {
              ads: 0,
            },
          },
        ];

        setGames(response /* .data */);
      } catch (error) {
        console.log(error);
      }
    }
    loadGameList();
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subTitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
