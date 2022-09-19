import { StatusBar, Text, View } from 'react-native';
import {
    useFonts,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
} from '@expo-google-fonts/inter'

import { Background } from './src/components/Background';
import {Routes} from './src/routes'
import { Loading } from './src/components/Loading';

export default function App() {

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_900Black,
    });

    if (!fontsLoaded) return
    return (
        <Background>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
            />
            {fontsLoaded ? <Routes /> : <Loading />}
        </Background>
    );
}
