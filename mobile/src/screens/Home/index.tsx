import { useEffect, useState } from 'react';
import {
   View,
   Text,
   Alert,
   Image,
   FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

import { GameCard, InterfaceGameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import logoImg from '../../assets/logo-nlw-esports.png'
import { api } from '../../api'

import { styles } from './stylesHome';
import { Background } from '../../components/Background';

export function Home() {
   const [games, setGames] = useState<InterfaceGameCard[]>([])

   const navigation = useNavigation()
   useEffect(() => {
      api({
         route: "/games",
         header: {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            mode: "cors",
         },
      })
         .then((res) => {
            if (res.ok) {
               return res.json();
            }
            throw res;
         })
         .then((data) => setGames(data))
         .catch((err) =>  Alert.alert("Volte mais Tarde", "Não foi possivel carregar os dados :(") );

   }, [])

   function handleOpenGame({ id, title, bannerUrl }: InterfaceGameCard) {
      navigation.navigate("game", {
         id: id,
         title: title,
         bannerUrl: bannerUrl,
      });
   }

   return (
      <Background>


         <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logoImg} />

            <Heading
               title="Encontre seu Duo!"
               subTitle="Selecione o game que deseja jogar..."
            />

            <FlatList
               data={games}
               keyExtractor={item => item.id}
               horizontal={true}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={styles.contentList}
               renderItem={({item}) => (

                  <GameCard data={item} onPress={() => handleOpenGame(item)} />
               )}
            />
         </SafeAreaView>
      </Background>
   );
}