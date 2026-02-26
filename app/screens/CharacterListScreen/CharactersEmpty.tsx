import { Ionicons } from '@expo/vector-icons'
import { t } from '@lib/i18n'
import { Theme } from '@lib/theme/ThemeManager'
import { View, Text } from 'react-native'

const CharactersEmpty = () => {
    const { color, spacing, fontSize } = Theme.useTheme()
    return (
        <View
            style={{
                paddingVertical: spacing.xl,
                paddingHorizontal: spacing.m,
                flex: 1,
                alignItems: 'center',
                marginTop: spacing.xl3,
            }}>
            <Ionicons name="person-outline" color={color.text._400} size={60} />
            <Text
                style={{
                    color: color.text._400,
                    marginTop: spacing.xl,
                    fontStyle: 'italic',
                    fontSize: fontSize.l,
                }}>
                {t('No Characters Found. Try Importing Some!')}
            </Text>
        </View>
    )
}

export default CharactersEmpty
