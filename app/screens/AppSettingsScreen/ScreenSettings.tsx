import ThemedSwitch from '@components/input/ThemedSwitch'
import SectionTitle from '@components/text/SectionTitle'
import { AppSettings } from '@lib/constants/GlobalValues'
import { t } from '@lib/i18n'
import React from 'react'
import { View } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv'

const ScreenSettings = () => {
    const [unlockOrientation, setUnlockOrientation] = useMMKVBoolean(AppSettings.UnlockOrientation)
    return (
        <View style={{ rowGap: 8 }}>
            <SectionTitle>{t('Screen')}</SectionTitle>
            <ThemedSwitch
                label={t('Unlock Orientation')}
                value={unlockOrientation}
                onChangeValue={setUnlockOrientation}
                description={t('Allows landscape on phones (App restart required)')}
            />
        </View>
    )
}

export default ScreenSettings
