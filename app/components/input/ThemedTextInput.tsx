import { Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'

import { useUnfocusTextInput } from '@lib/hooks/UnfocusTextInput'
import { Theme } from '@lib/theme/ThemeManager'
import { firstDefined, normalizeA11yLabel } from '@lib/utils/A11y'

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
    const a11yLabel = firstDefined(
        normalizeA11yLabel(rest.accessibilityLabel),
        normalizeA11yLabel(label),
        normalizeA11yLabel(rest.placeholder),
        'Text input'
    )
    const a11yHint = firstDefined(
        normalizeA11yLabel(rest.accessibilityHint),
        normalizeA11yLabel(description)
    )

    return (
        <View
            style={{
                flex: 1,
                ...containerStyle,
            }}>
            {label && (
                <Text
                    style={{
                        color: color.text._100,
                        marginBottom: 8,
                    }}>
                    {label}
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
                placeholder="----"
                placeholderTextColor={color.text._500}
                {...rest}
            />
        </View>
    )
}

export default ThemedTextInput
