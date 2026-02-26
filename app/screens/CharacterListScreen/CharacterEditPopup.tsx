import Alert from '@components/views/Alert'
import PopupMenu, { MenuRef } from '@components/views/PopupMenu'
import { t } from '@lib/i18n'
import { CharInfo, Characters } from '@lib/state/Characters'
import { useRouter } from 'expo-router'

type CharacterEditPopupProps = {
    characterInfo: CharInfo
    nowLoading: boolean
    setNowLoading: (b: boolean) => void
}

const CharacterEditPopup: React.FC<CharacterEditPopupProps> = ({
    characterInfo,
    setNowLoading,
    nowLoading,
}) => {
    const router = useRouter()

    const setCurrentCard = Characters.useCharacterStore((state) => state.setCard)

    const deleteCard = (menuRef: MenuRef) => {
        Alert.alert({
            title: t('Delete Character'),
            description: t(
                "Are you sure you want to delete '{name}'? This cannot be undone.",
                { name: characterInfo.name }
            ),
            buttons: [
                {
                    label: t('Cancel'),
                },
                {
                    label: t('Delete Character'),
                    onPress: async () => {
                        Characters.db.mutate.deleteCard(characterInfo.id ?? -1)
                    },
                    type: 'warning',
                },
            ],
        })
    }

    const cloneCard = (menuRef: MenuRef) => {
        Alert.alert({
            title: t('Clone Character'),
            description: t("Are you sure you want to clone '{name}'?", {
                name: characterInfo.name,
            }),
            buttons: [
                {
                    label: t('Cancel'),
                },
                {
                    label: t('Clone Character'),
                    onPress: async () => {
                        setNowLoading(true)
                        await Characters.db.mutate.duplicateCard(characterInfo.id)
                        menuRef.current?.close()
                        setNowLoading(false)
                    },
                },
            ],
        })
    }

    const editCharacter = async (menuRef: MenuRef) => {
        if (nowLoading) return
        setNowLoading(true)
        await setCurrentCard(characterInfo.id)
        setNowLoading(false)
        menuRef.current?.close()
        router.push('/screens/CharacterEditorScreen')
    }

    return (
        <PopupMenu
            style={{ paddingHorizontal: 8 }}
            disabled={nowLoading}
            icon="edit"
            options={[
                { label: t('Edit'), icon: 'edit', onPress: editCharacter },
                { label: t('Clone'), icon: 'copy1', onPress: cloneCard },
                { label: t('Delete'), icon: 'delete', onPress: deleteCard, warning: true },
            ]}
        />
    )
}

export default CharacterEditPopup
