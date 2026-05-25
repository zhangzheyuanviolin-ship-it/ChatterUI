import PopupMenu, { MenuRef } from '@components/views/PopupMenu'
import { Model } from '@lib/engine/Local/Model'
import { t } from '@lib/i18n'
import { useState } from 'react'
import { View } from 'react-native'

type ModelNewMenuProps = {
    modelImporting: boolean
    setModelImporting: (b: boolean) => void
}

const ModelNewMenu: React.FC<ModelNewMenuProps> = ({ modelImporting, setModelImporting }) => {
    const [showDownload, setShowDownload] = useState(false)

    // const handleDownloadModel = (text: string) => {}

    const handleSetExternal = async (menuRef: MenuRef) => {
        menuRef.current?.close()
        if (modelImporting) return
        setModelImporting(true)
        await Model.linkModelExternal()
        setModelImporting(false)
    }

    const handleImportModel = async (menuRef: MenuRef) => {
        menuRef.current?.close()
        if (modelImporting) return
        setModelImporting(true)
        await Model.importModel()
        setModelImporting(false)
    }

    return (
        <View>
            <PopupMenu
                placement="bottom"
                icon="addfile"
                triggerLabel={t('Add model')}
                disabled={modelImporting}
                options={[
                    {
                        label: t('Copy Model Into ChatterUI'),
                        icon: 'download',
                        onPress: handleImportModel,
                    },
                    {
                        label: t('Use External Model'),
                        icon: 'link',
                        onPress: handleSetExternal,
                    },
                ]}
            />
        </View>
    )
}

export default ModelNewMenu
