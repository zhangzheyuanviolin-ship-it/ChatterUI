import React from 'react'
import { Switch, Text, View } from 'react-native'

import { t } from '@lib/i18n'
import { Theme } from '@lib/theme/ThemeManager'
import { firstDefined, normalizeA11yLabel } from '@lib/utils/A11y'

interface ThemedSwitchProps {
    description?: string
    label?: string
    value: boolean | undefined
    onChangeValue: (b: boolean) => void
}

const ThemedSwitch: React.FC<ThemedSwitchProps> = ({
    description,
    label,
    value,
    onChangeValue,
}) => {
    const { color, spacing } = Theme.useTheme()
    const translatedLabel = label ? t(label) : undefined
    const translatedDescription = description ? t(description) : undefined
    const accessibilityLabel = firstDefined(
        normalizeA11yLabel(translatedLabel),
        normalizeA11yLabel(translatedDescription),
        t('Switch')
    )

    return (
        <View>
            <View
                style={{ flexDirection: 'row', paddingVertical: spacing.m, alignItems: 'center' }}>
                <Switch
                    accessible
                    accessibilityRole="switch"
                    accessibilityLabel={accessibilityLabel}
                    accessibilityState={{ checked: !!value }}
                    trackColor={{
                        false: color.neutral._300,
                        true: color.neutral._500,
                    }}
                    thumbColor={value ? color.primary._500 : color.neutral._400}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onChangeValue}
                    value={value}
                />
                {translatedLabel && (
                    <Text
                        style={{
                            flex: 1,
                            marginLeft: spacing.xl,
                            color: value ? color.text._100 : color.text._300,
                        }}>
                        {translatedLabel}
                    </Text>
                )}
            </View>
            {translatedDescription && (
                <Text
                    style={{
                        color: color.text._400,
                        paddingBottom: spacing.xs,
                        marginBottom: spacing.m,
                    }}>
                    {translatedDescription}
                </Text>
            )}
        </View>
    )
}

export default ThemedSwitch
