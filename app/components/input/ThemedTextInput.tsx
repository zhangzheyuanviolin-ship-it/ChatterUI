import { t } from '@lib/i18n'
import { useUnfocusTextInput } from '@lib/hooks/UnfocusTextInput'
import { Theme } from '@lib/theme/ThemeManager'
import { firstDefined, normalizeA11yLabel } from '@lib/utils/A11y'
import { useRef } from 'react'
import { View, Text, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native'

interface ThemedTextInputProps extends TextInputProps {
    label?: string
    description?: string
    value: string
    containerStyle?: ViewStyle
    autoUnfocus?: boolean
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
    label,
    description,
    numberOfLines,
    multiline = false,
    style = undefined,
    autoUnfocus = true,
    containerStyle = {},
    ...rest
}) => {
    const { color } = Theme.useTheme()
    const ref = useUnfocusTextInput()
    const translatedLabel = label ? t(label) : undefined
    const translatedDescription = description ? t(description) : undefined
    const translatedPlaceholder = rest.placeholder ? t(rest.placeholder) : undefined
    const a11yLabel = firstDefined(
        normalizeA11yLabel(rest.accessibilityLabel ? t(rest.accessibilityLabel) : undefined),
        normalizeA11yLabel(translatedLabel),
        normalizeA11yLabel(translatedPlaceholder),
        t('Text input')
    )
    const a11yHint = firstDefined(
        normalizeA11yLabel(rest.accessibilityHint ? t(rest.accessibilityHint) : undefined),
        normalizeA11yLabel(translatedDescription)
    )

    return (
        <View
            style={{
                flex: 1,
                ...containerStyle,
            }}>
            {translatedLabel && (
                <Text
                    style={{
                        color: color.text._100,
                        marginBottom: 8,
                    }}>
                    {translatedLabel}
                </Text>
            )}
            <TextInput
                ref={autoUnfocus ? ref : null}
                accessible={rest.accessible ?? true}
                accessibilityLabel={a11yLabel}
                accessibilityHint={a11yHint}
                multiline={(!!numberOfLines && numberOfLines > 1) || multiline}
                numberOfLines={numberOfLines}
                style={[
                    {
                        color: color.text._100,
                        borderColor: color.neutral._400,
                        borderWidth: 1,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 8,
                        textAlignVertical: numberOfLines && numberOfLines > 1 ? `top` : `center`,
                    },
                    style,
                ]}
                placeholderTextColor={color.text._500}
                {...rest}
                placeholder={translatedPlaceholder ?? rest.placeholder}
            />
        </View>
    )
}

export default ThemedTextInput
