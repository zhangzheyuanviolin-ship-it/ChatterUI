import ThemedButton from '@components/buttons/ThemedButton'
import SectionTitle from '@components/text/SectionTitle'
import Alert from '@components/views/Alert'
import { t } from '@lib/i18n'
import { Logger } from '@lib/state/Logger'
import { Theme } from '@lib/theme/ThemeManager'
import { localDownload } from '@vali98/react-native-fs'
import appConfig from 'app.config'
import { reloadAppAsync } from 'expo'
import { getDocumentAsync } from 'expo-document-picker'
import { copyAsync, deleteAsync, documentDirectory } from 'expo-file-system'
import React from 'react'
import { Text, View } from 'react-native'

const appVersion = appConfig.expo.version

const exportDB = async (notify: boolean = true) => {
    await localDownload(`${documentDirectory}/SQLite/db.db`.replace('file://', ''))
        .then(() => {
            if (notify) Logger.infoToast(t('Download Successful!'))
        })
        .catch((e: string) => Logger.errorToast(t('Failed to copy database: {error}', { error: e })))
}

const importDB = async (uri: string, name: string) => {
    const copyDB = async () => {
        await exportDB(false)
        await deleteAsync(`${documentDirectory}SQLite/db.db`).catch(() => {
            Logger.debug(t('Somehow the db is already deleted'))
        })
        await copyAsync({
            from: uri,
            to: `${documentDirectory}SQLite/db.db`,
        })
            .then(() => {
                Logger.info(t('Copy Successful, Restarting now.'))
                reloadAppAsync()
            })
            .catch((e) => {
                Logger.errorToast(t('Failed to import database: {error}', { error: e }))
            })
    }

    const dbAppVersion = name.split('-')?.[0]
    if (dbAppVersion !== appVersion) {
        Alert.alert({
            title: t('WARNING: Different Version'),
            description: t(
                'The imported database file has a different app version ({dbVersion}) to installed version ({appVersion}).\n\nImporting this database may break or corrupt the database. It is recommended to use the same app version.',
                {
                    dbVersion: dbAppVersion,
                    appVersion,
                }
            ),
            buttons: [
                { label: t('Cancel') },
                { label: t('Import Anyways'), onPress: copyDB, type: 'warning' },
            ],
        })
    } else copyDB()
}

const DatabaseSettings = () => {
    const { color, spacing } = Theme.useTheme()
    return (
        <View style={{ rowGap: 8 }}>
            <SectionTitle>{t('Database Management')}</SectionTitle>

            <Text
                style={{
                    color: color.text._500,
                    paddingBottom: spacing.xs,
                    marginBottom: spacing.m,
                }}>
                {t("WARNING: only import if you are certain it's from the same version!")}
            </Text>
            <ThemedButton
                label={t('Export Database')}
                variant="secondary"
                onPress={() => {
                    Alert.alert({
                        title: t('Export Database'),
                        description: t(
                            'Are you sure you want to export the database file?\n\nIt will automatically be downloaded to Downloads'
                        ),
                        buttons: [
                            { label: t('Cancel') },
                            { label: t('Export Database'), onPress: exportDB },
                        ],
                    })
                }}
            />

            <ThemedButton
                label={t('Import Database')}
                variant="secondary"
                onPress={async () => {
                    getDocumentAsync({ type: ['application/*'] }).then(async (result) => {
                        if (result.canceled) return
                        Alert.alert({
                            title: t('Import Database'),
                            description: t(
                                'Are you sure you want to import this database? This may will destroy the current database!\n\nA backup will automatically be downloaded.\n\nApp will restart automatically'
                            ),
                            buttons: [
                                { label: t('Cancel') },
                                {
                                    label: t('Import'),
                                    onPress: () =>
                                        importDB(result.assets[0].uri, result.assets[0].name),
                                    type: 'warning',
                                },
                            ],
                        })
                    })
                }}
            />
        </View>
    )
}

export default DatabaseSettings
