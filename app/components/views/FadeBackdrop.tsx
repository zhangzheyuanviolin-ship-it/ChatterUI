import { ReactNode } from 'react'
import { GestureResponderEvent, Pressable, StyleSheet } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

type FadeScreenProps = {
    handleOverlayClick?: (e: GestureResponderEvent) => void
    children?: ReactNode
    accessibilityLabel?: string
}

const FadeBackrop: React.FC<FadeScreenProps> = ({
    handleOverlayClick,
    children,
    accessibilityLabel = 'Close overlay',
}) => {
    const onBackdropPress = (e: GestureResponderEvent) => {
        if (handleOverlayClick && e.target === e.currentTarget) handleOverlayClick(e)
    }
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.absolute}>
            <Pressable
                accessible
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel}
                onPress={onBackdropPress}
                style={styles.absolute}>
                {children}
            </Pressable>
        </Animated.View>
    )
}

export default FadeBackrop

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        height: '200%', // this is needed due to negative padding on some screens
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})
