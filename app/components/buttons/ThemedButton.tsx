import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { ReactNode } from 'react'
import {
    PressableProps,
    TextStyle,
    Pressable,
    ViewStyle,
    StyleSheet,
    Animated,
    useAnimatedValue,
} from 'react-native'

import TText from '@components/text/TText'
import { t } from '@lib/i18n'
import { Theme } from '@lib/theme/ThemeManager'
import { firstDefined, normalizeA11yLabel } from '@lib/utils/A11y'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'critical' | 'disabled'

export interface ThemedButtonProps extends Omit<PressableProps, 'style'> {
    labelStyle?: TextStyle
    label?: string
    buttonStyle?: ViewStyle
    opacity?: number
    variant?: ButtonVariant
    iconName?: keyof typeof AntDesign.glyphMap
    iconSize?: number
    iconStyle?: TextStyle
    icon?: ReactNode
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type ButtonTheme = {
    buttonStyle: ViewStyle
    labelStyle: TextStyle
}

const useButtonTheme = (variant: ButtonVariant): ButtonTheme => {
    const theme = Theme.useTheme()
    //TODO:
    // Have a lightness checker to figure out whether or not to use light or dark text
    switch (variant) {
        default:
        case 'primary':
            return {
                buttonStyle: {
                    backgroundColor: theme.color.primary._500,
                    borderColor: theme.color.primary._200,
                    borderWidth: theme.borderWidth.m,
                    paddingVertical: theme.spacing.m,
                    paddingHorizontal: theme.spacing.xl,
                    borderRadius: theme.borderRadius.m,
                },
                labelStyle: {
                    textAlign: 'center',
                    color: theme.color.text._900,
                },
            }
        case 'secondary':
            return {
                buttonStyle: {
                    borderColor: theme.color.primary._400,
                    borderWidth: theme.borderWidth.m,
                    paddingVertical: theme.spacing.m,
                    paddingHorizontal: theme.spacing.xl,
                    borderRadius: theme.borderRadius.m,
                },
                labelStyle: {
                    textAlign: 'center',
                    color: theme.color.primary._700,
                },
            }
        case 'tertiary':
            return {
                buttonStyle: {
                    borderWidth: theme.borderWidth.m,
                    borderColor: 'rgba(0, 0, 0, 0)',
                },
                labelStyle: {
                    textAlign: 'center',
                    color: theme.color.text._200,
                },
            }
        case 'critical':
            return {
                buttonStyle: {
                    borderColor: theme.color.error._400,
                    borderWidth: theme.borderWidth.m,
                    paddingVertical: theme.spacing.m,
                    paddingHorizontal: theme.spacing.xl,
                    borderRadius: theme.borderRadius.m,
                },
                labelStyle: {
                    textAlign: 'center',
                    color: theme.color.error._400,
                },
            }
        case 'disabled':
            return {
                buttonStyle: {
                    borderColor: theme.color.neutral._500,
                    borderWidth: theme.borderWidth.m,
                    paddingVertical: theme.spacing.m,
                    paddingHorizontal: theme.spacing.xl,
                    borderRadius: theme.borderRadius.m,
                },
                labelStyle: {
                    textAlign: 'center',
                    color: theme.color.neutral._500,
                },
            }
    }
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
    labelStyle,
    label,
    buttonStyle,
    children,
    onPressIn,
    opacity = 1,
    onPressOut,
    variant = 'primary',
    iconName = undefined,
    iconSize = 20,
    iconStyle = undefined,
    icon = undefined,
    ...rest
}) => {
    const animOpacity = useAnimatedValue(1)
    const theme = useButtonTheme(variant)
    const translatedLabel = label ? t(label) : undefined
    const accessibilityHint = rest.accessibilityHint ? t(rest.accessibilityHint) : undefined
    const accessibilityLabel = firstDefined(
        normalizeA11yLabel(rest.accessibilityLabel ? t(rest.accessibilityLabel) : undefined),
        normalizeA11yLabel(translatedLabel),
        normalizeA11yLabel(iconName)
    )

    const handlePressIn = () => {
        animOpacity.setValue(0.4)
    }

    const handlePressOut = () => {
        Animated.timing(animOpacity, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
        }).start()
    }

    return (
        <AnimatedPressable
            {...rest}
            disabled={variant === 'disabled'}
            accessible={rest.accessible ?? true}
            accessibilityRole={rest.accessibilityRole ?? 'button'}
            accessibilityState={{
                ...rest.accessibilityState,
                disabled: Boolean(variant === 'disabled' || rest.disabled),
            }}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            onPressIn={(event) => {
                handlePressIn()
                if (onPressIn) onPressIn(event)
            }}
            onPressOut={(event) => {
                handlePressOut()
                if (onPressOut) onPressOut(event)
            }}
            style={StyleSheet.flatten([
                theme.buttonStyle,
                {
                    flexDirection: 'row',
                    columnGap: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: animOpacity,
                },
                buttonStyle,
            ])}>
            {!icon &&
                iconName &&
                (iconName !== 'search' ? (
                    <AntDesign
                        name={iconName}
                        size={iconSize}
                        style={iconStyle}
                        color={theme.labelStyle.color}
                    />
                ) : (
                    <MaterialIcons
                        name={'search'}
                        size={iconSize}
                        style={iconStyle}
                        color={theme.labelStyle.color}
                    />
                ))}
            {icon}
            {translatedLabel && (
                <TText style={[theme.labelStyle, labelStyle]}>{translatedLabel}</TText>
            )}
        </AnimatedPressable>
    )
}

export default ThemedButton
