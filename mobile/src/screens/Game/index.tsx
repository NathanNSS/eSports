import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
} from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons'

import { Background } from '../../components/Background';
import { DuoCard, InterfaceDuoCard } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import { DuoMatch } from '../../components/DuoMatch';

import { styles } from './stylesGame';
import { THEME } from '../../theme';
import logo from '../../assets/logo-nlw-esports.png'
import { InterfaceGameParams } from '../../types/navigation';
import { api } from '../../api';

export function Game() {
    const navigation = useNavigation()

    const route = useRoute()
    const game = route.params as InterfaceGameParams

    const [duos, setDuos] = useState<InterfaceDuoCard[]>([])
    const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('')

    async function getDiscordUser(adsId: string) {
        api({
            route: `/ads/${adsId}/discord`,
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
            .then((data) => setDiscordDuoSelected(data.discord))
            .catch((err) =>  Alert.alert("Volte mais Tarde", "Não foi possivel carregar os dados :(") );
    }

    useEffect(() => {
        api({
            route: `/games/${game.id}/ads`,
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
            .then((data) => setDuos(data))
            .catch((err) =>   Alert.alert("Volte mais Tarde", "Não foi possivel carregar os dados :(") );

    }, [])
    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Entypo
                            name='chevron-thin-left'
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logo}
                        defaultSource={logo}
                        style={styles.logo}
                    />

                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover"
                />

                <Heading title={game.title} subTitle="Conecte-se e comece a jogar!" />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    style={styles.containerList}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>Não há anucios publicados para essa jogo </Text>
                    )}
                    renderItem={({ item }) => (

                        <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
                    )}
                />
                <DuoMatch
                    discord={discordDuoSelected}
                    visible={discordDuoSelected.length > 0}
                    onClose={() => setDiscordDuoSelected('')}
                />
            </SafeAreaView>
        </Background>
    );
}