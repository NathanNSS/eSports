import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ColorValue,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { THEME } from '../../theme';
import { styles } from './stylesDuoCard';

export interface InterfaceDuoCard {
    id: string;
    hourEnd: string;
    hourStart: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

interface Props {
    data: InterfaceDuoCard;
    onConnect: () => void;
}

export function DuoCard({ data,onConnect }: Props) {

    return (
        <View style={styles.container}>
            <DuoInfo
                label="Nome"
                value={data.name}
            />
            <DuoInfo
                label="Tempo de Jogo"
                value={`${data.yearsPlaying} ano${data.yearsPlaying > 1 ? 's' : ''}`}
            />
            <DuoInfo
                label="Disponibilidade"
                value={`${data.weekDays.length} dias • ${data.hourStart} - ${data.hourEnd}`}
            />
            <DuoInfo
                label="Chamada de Áudio"
                value={data.useVoiceChannel ? "Sim" : "Não"}
                colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={onConnect}
            >
                <Ionicons
                    name="game-controller-outline"
                    size={20}
                    color={THEME.COLORS.TEXT}
                />
                <Text style={styles.btnTitle}>
                    Conectar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

////**////

interface PropsDuoInfo {
    label: string;
    value: string;
    colorValue?: ColorValue
}

function DuoInfo({ label, value, colorValue = THEME.COLORS.TEXT }: PropsDuoInfo) {
    return (
        <View style={stylesDuoI.container}>
            <Text style={stylesDuoI.label} numberOfLines={1}>
                {label}
            </Text>

            <Text style={[stylesDuoI.value, { color: colorValue }]} numberOfLines={1}>
                {value}
            </Text>
        </View>
    )
}

const stylesDuoI = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16
    },

    label: {
        color: THEME.COLORS.CAPTION_300,
        fontSize: THEME.FONT_SIZE.SM,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        marginBottom: 4
    },

    value: {
        fontSize: THEME.FONT_SIZE.SM,
        fontFamily: THEME.FONT_FAMILY.BOLD,
    },
})