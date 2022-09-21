import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ImageSourcePropType,
    TouchableOpacityProps
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './stylesGameCard';
import { THEME } from '../../theme';

export interface InterfaceGameCard {
    id: string;
    title: string;
    bannerUrl: string;
    ads: number;
}

interface Props extends TouchableOpacityProps{
    data: InterfaceGameCard;
}

export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest} activeOpacity={0.5}>
            <ImageBackground
                style={styles.cover}
                source={{uri:data.bannerUrl}}
            >


                <LinearGradient
                    colors={THEME.COLORS.FOOTER}
                    style={styles.footer}
                >
                    <Text style={styles.name}>
                        {data.title}
                    </Text>

                    <Text style={styles.ads}>
                        {data.ads} anúncio{data.ads > 1 ? 's': ''}
                    </Text>
                </LinearGradient>

            </ImageBackground>
        </TouchableOpacity>
    );
}