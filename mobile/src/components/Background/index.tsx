import { ImageBackground } from 'react-native';

import bgImg from '../../assets/background-galaxy.png' 

import { styles } from './stylesBackground';

interface Props {
    children: React.ReactNode;
}

export function Background({ children }: Props) {
    return (
        <ImageBackground source={bgImg} defaultSource={bgImg} style={styles.container}>
            {children}
        </ImageBackground>
    );
}