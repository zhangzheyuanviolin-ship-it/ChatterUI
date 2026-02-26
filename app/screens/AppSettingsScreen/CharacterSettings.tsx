import { View } from 'react-native'

import ThemedButton from '@components/buttons/ThemedButton'
import SectionTitle from '@components/text/SectionTitle'
import Alert from '@components/views/Alert'
import { t } from '@lib/i18n'
import { Characters } from '@lib/state/Characters'

import TagHiderSettings from './TagHiderSettings'

const CharacterSettings = () => {
    return (
        <View style={{ rowGap: 8 }}>
            <SectionTitle>{t('Character Management')}</SectionTitle>
            <ThemedButton
                label={t('Regenerate Default Card')}
                variant="secondary"
                onPress={() => {
                    Alert.alert({
                        title: t('Regenerate Default Card'),
                        description: t(
                            'This will add the default AI Bot card to your character list.'
                        ),
                        buttons: [
                            { label: t('Cancel') },
                            {
                                label: t('Create Default Card'),
                                onPress: async () => await Characters.createDefaultCard(),
                            },
                        ],
                    })
                }}
            />
            <TagHiderSettings />
        </View>
    )
}

export default CharacterSettings
