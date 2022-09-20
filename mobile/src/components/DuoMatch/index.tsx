import {useState} from 'react';
import {
    View,
    Modal,
    Text,
    ModalProps,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    Platform,
    ActivityIndicator,
} from 'react-native';

import { MaterialIcons } from "@expo/vector-icons"
import * as Clipboard from 'expo-clipboard';

import { styles } from './stylesDuoMatch';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const [ isCoping, setIsCoping] = useState<boolean>(false);

    async function CopyDiscordAds(){
        setIsCoping(true);
        await Clipboard.setStringAsync(discord)
        
        if(Platform.OS === "android"){
            ToastAndroid.show(`Discord ${discord} Cópiado`, ToastAndroid.SHORT);
        }else{
            Alert.alert('Discord Copiado!', `Usuário ${discord} copiado, cole e procure no Discord.`);
        }

        setIsCoping(false);
    }

    return (
        <Modal {...rest} transparent={true} statusBarTranslucent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <MaterialIcons name="check-circle-outline" size={64} color={THEME.COLORS.SUCCESS} />

                    <Heading
                        title="Let's play!"
                        subTitle="Agora é só começar a jogar!"
                        style={{ alignItems: "center", marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione no seu discord!
                    </Text>

                    <TouchableOpacity style={styles.btnDiscord}  onPress={CopyDiscordAds} disabled={isCoping}>
                        <Text style={styles.discord}>
                            {isCoping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/>: discord}                            
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}