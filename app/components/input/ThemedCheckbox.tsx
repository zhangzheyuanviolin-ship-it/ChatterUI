import { AntDesign } from '@expo/vector-icons'
import { useEffect } from 'react'
import { Pressable, Text, ViewStyle } from 'react-native'
import Animated, {
    BounceIn,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    ZoomIn,
    ZoomOut,
} from 'react-native-reanimated'

import { t } from '@lib/i18n'
import { Theme } from '@lib/theme/ThemeManager'
import { firstDefined, normalizeA11yLabel } from '@lib/utils/A11y'

type ThemedCheckboxProps = {
    label?: string
    value: boolean
    onChangeValue?: (item: boolean) => void
    style?: ViewStyle
}

const ThemedCheckbox: React.FC<ThemedCheckboxProps> = ({
    label = undefined,
    value,
    onChangeValue = () => {},
    style = {},
}) => {
    const theme = Theme.useTheme()
    const colorChange = useSharedValue(value ? 1 : 0)
    const translatedLabel = label ? t(label) : undefined
    const accessibilityLabel = firstDefined(normalizeA11yLabel(translatedLabel), t('Checkbox'))

    const color1 = theme.color.neutral._100
    const color2 = theme.color.primary._500
    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(colorChange.value, [0, 1], [color1, color2]),
        }
    })

    useEffect(() => {
        // this useEffect is necessary as onChangeValue may not update value
        // hence cannot triggered within onPress
        colorChange.value = withTiming(value ? 1 : 0, { duration: 100 })
    }, [colorChange, value])

    return (
        <Pressable
            accessible
            accessibilityRole="checkbox"
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ checked: value }}
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                onChangeValue(!value)
            }}>
            <Animated.View
                style={[
                    {
                        flexDirection: 'row',
                        alignItems: `center`,
                        padding: 4,
                        borderRadius: 8,
                        borderColor: theme.color.neutral._500,
                        borderWidth: 1,
                        marginVertical: 8,
                    },
                    animatedStyle,
                    style,
                ]}>
                {value && (
                    <Animated.View
                        entering={BounceIn.duration(150)}
                        exiting={ZoomOut.duration(150)}>
                        <AntDesign name="check" color={theme.color.text._100} size={20} />
                    </Animated.View>
                )}
                {!value && (
                    <Animated.View entering={ZoomIn.duration(150)} exiting={ZoomOut.duration(150)}>
                        <AntDesign name="close" color={theme.color.text._600} size={20} />
                    </Animated.View>
                )}
            </Animated.View>
            {translatedLabel && (
                <Text
                    style={{
                        paddingLeft: 12,
                        flex: 1,
                        color: value ? theme.color.text._100 : theme.color.text._400,
                    }}>
                    {translatedLabel}
                </Text>
            )}
        </Pressable>
    )
}

export default ThemedCheckbox
