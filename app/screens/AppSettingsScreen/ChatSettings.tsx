import ThemedSwitch from '@components/input/ThemedSwitch'
import SectionTitle from '@components/text/SectionTitle'
import { AppSettings } from '@lib/constants/GlobalValues'
import { t } from '@lib/i18n'
import React from 'react'
import { View } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv'

const ChatSettings = () => {
    const [firstMes, setFirstMes] = useMMKVBoolean(AppSettings.CreateFirstMes)
    const [chatOnStartup, setChatOnStartup] = useMMKVBoolean(AppSettings.ChatOnStartup)
    const [autoScroll, setAutoScroll] = useMMKVBoolean(AppSettings.AutoScroll)
    const [sendOnEnter, setSendOnEnter] = useMMKVBoolean(AppSettings.SendOnEnter)
    const [autoLoadUser, setAutoLoadUser] = useMMKVBoolean(AppSettings.AutoLoadUser)
    const [quickDelete, setQuickDelete] = useMMKVBoolean(AppSettings.QuickDelete)
    const [saveScroll, setSaveScroll] = useMMKVBoolean(AppSettings.SaveScrollPosition)
    const [autoTitle, setAutoTitle] = useMMKVBoolean(AppSettings.AutoGenerateTitle)
    const [alternate, setAlternate] = useMMKVBoolean(AppSettings.AlternatingChatMode)
    const [wide, setWide] = useMMKVBoolean(AppSettings.WideChatMode)

    const [showTokensPerSecond, setShowTokensPerSecond] = useMMKVBoolean(
        AppSettings.ShowTokenPerSecond
    )

    return (
        <View style={{ rowGap: 8 }}>
            <SectionTitle>{t('Chat')}</SectionTitle>

            <ThemedSwitch
                label={t('Auto Scroll')}
                value={autoScroll}
                onChangeValue={setAutoScroll}
                description={t('Autoscrolls text during generations')}
            />

            <ThemedSwitch
                label={t('Use First Message')}
                value={firstMes}
                onChangeValue={setFirstMes}
                description={t(
                    'Disabling this will make new chats start blank, needed by specific models'
                )}
            />

            <ThemedSwitch
                label={t('Load Chat On Startup')}
                value={chatOnStartup}
                onChangeValue={setChatOnStartup}
                description={t('Loads the most recent chat on startup')}
            />

            <ThemedSwitch
                label={t('Auto Load User')}
                value={autoLoadUser}
                onChangeValue={setAutoLoadUser}
                description={t(
                    'When opening a chat, automatically loads the User the chat was created with'
                )}
            />

            <ThemedSwitch
                label={t('Send on Enter')}
                value={sendOnEnter}
                onChangeValue={setSendOnEnter}
                description={t('Submits messages when Enter is pressed')}
            />

            <ThemedSwitch
                label={t('Show Tokens Per Second')}
                value={showTokensPerSecond}
                onChangeValue={setShowTokensPerSecond}
                description={t('Show tokens per second when using local models')}
            />

            <ThemedSwitch
                label={t('Quick Delete')}
                value={quickDelete}
                onChangeValue={setQuickDelete}
                description={t('Toggle delete button in chat options bar')}
            />

            <ThemedSwitch
                label={t('Save Scroll Position')}
                value={saveScroll}
                onChangeValue={setSaveScroll}
                description={t('Automatically move to last scrolled position in chat')}
            />

            <ThemedSwitch
                label={t('Automatically Generate Titles')}
                value={autoTitle}
                onChangeValue={setAutoTitle}
                description={t('Automatically generates titles for chats (only in Remote mode)')}
            />

            <ThemedSwitch
                label={t('Wide Chat')}
                value={wide}
                onChangeValue={setWide}
                description={t('Removes whitespace for wider chat')}
            />

            <ThemedSwitch
                label={t('Alternate User and Character Positions')}
                value={alternate}
                onChangeValue={setAlternate}
                description={t('Left align character chats and right aligns user chats')}
            />
        </View>
    )
}

export default ChatSettings
