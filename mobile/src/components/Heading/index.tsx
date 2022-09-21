import {
    View,
    Text,
    ViewProps
} from 'react-native';

import { styles } from './stylesHeading';

interface Props extends ViewProps {
    title: string;
    subTitle: string;
    center?: boolean
}

export function Heading({ title, subTitle, center, ...rest }: Props) {
    return (
        <View style={styles.container} {...rest}>
            <Text style={[styles.title, { textAlign: center ? 'center' : 'auto' }]}>
                {title}
            </Text>
            <Text style={[styles.subTitle, { textAlign: center ? 'center' : 'auto' }]}>
                {subTitle}
            </Text>
        </View>
    );
}