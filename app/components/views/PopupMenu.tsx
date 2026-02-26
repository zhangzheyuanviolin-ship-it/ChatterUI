import { AntDesign } from '@expo/vector-icons'
import { t } from '@lib/i18n'
import { Theme } from '@lib/theme/ThemeManager'
import { normalizeA11yLabel } from '@lib/utils/A11y'
import { useFocusEffect } from 'expo-router'
import React, { ReactNode, useRef, useState } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    BackHandler,
    TextStyle,
    ViewStyle,
    I18nManager,
} from 'react-native'
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuOptionsCustomStyle,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu'

const { Popover } = renderers

export type MenuRef = React.MutableRefObject<Menu | null>

type PopupOptionProps = {
    label: string
    icon: keyof typeof AntDesign.glyphMap
    onPress: (m: MenuRef) => void | Promise<void>
    warning?: boolean
    menuRef: MenuRef
    disabled?: boolean
}

type MenuOptionProp = Omit<PopupOptionProps, 'menuRef'>

type PopupMenuProps = {
    disabled?: boolean
    icon?: keyof typeof AntDesign.glyphMap
    iconSize?: number
    triggerLabel?: string
    triggerHint?: string
    style?: TextStyle
    options: MenuOptionProp[]
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto'
    children?: ReactNode
    menuCustomStyle?: ViewStyle
}

const PopupOption: React.FC<PopupOptionProps> = ({
    onPress,
    label,
    icon,
    menuRef,
    warning = false,
}) => {
    const styles = useStyles()
    const { color } = Theme.useTheme()
    const handleOnPress = async () => {
        await onPress(menuRef)
    }
    const translatedLabel = t(label)

    return (
        <MenuOption>
            <TouchableOpacity
                accessible
                accessibilityRole="button"
                accessibilityLabel={normalizeA11yLabel(translatedLabel) ?? t('Menu option')}
                style={styles.popupButton}
                onPress={handleOnPress}>
                <AntDesign
                    style={{ minWidth: 20 }}
                    name={icon}
                    size={18}
                    color={warning ? color.error._300 : color.text._100}
                />
                <Text style={warning ? styles.optionLabelWarning : styles.optionLabel}>
                    {translatedLabel}
                </Text>
            </TouchableOpacity>
        </MenuOption>
    )
}

const PopupMenu: React.FC<PopupMenuProps> = ({
    disabled,
    icon,
    iconSize = 26,
    triggerLabel = 'Open menu',
    triggerHint,
    style = {},
    menuCustomStyle = {},
    options,
    children,
    placement = 'left',
}) => {
    const styles = useStyles()
    const { color } = Theme.useTheme()
    const menuStyle = useMenuStyle()
    const translatedTriggerLabel = t(triggerLabel)
    const translatedTriggerHint = triggerHint ? t(triggerHint) : undefined
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const menuRef: MenuRef = useRef(null)

    const backAction = () => {
        if (!menuRef.current || !menuRef.current?.isOpen()) return false
        menuRef.current?.close()
        return true
    }

    useFocusEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => handler.remove()
    })

    const switchRTL = () => {
        if (!I18nManager.isRTL) return placement
        if (placement === 'left') return 'right'
        if (placement === 'right') return 'left'
        return placement
    }

    return (
        <Menu
            ref={menuRef}
            onOpen={() => setShowMenu(true)}
            onClose={() => setShowMenu(false)}
            style={menuCustomStyle}
            renderer={Popover}
            rendererProps={{
                placement: switchRTL(),
                anchorStyle: styles.anchor,
                openAnimationDuration: 150,
                closeAnimationDuration: 0,
            }}>
            <MenuTrigger disabled={disabled}>
                <TouchableOpacity
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={normalizeA11yLabel(translatedTriggerLabel) ?? t('Open menu')}
                    accessibilityHint={translatedTriggerHint}
                    disabled={disabled}
                    onPress={() => menuRef.current?.open()}>
                    {icon && (
                        <AntDesign
                            style={style}
                            color={showMenu ? color.text._500 : color.text._300}
                            name={icon}
                            size={iconSize}
                        />
                    )}
                    {children}
                </TouchableOpacity>
            </MenuTrigger>
            <MenuOptions customStyles={menuStyle}>
                {options
                    .filter((item) => !item.disabled)
                    .map((item, index) => (
                        <PopupOption {...item} key={`${item.label}-${index}`} menuRef={menuRef} />
                    ))}
            </MenuOptions>
        </Menu>
    )
}

export default PopupMenu

const useMenuStyle = (): MenuOptionsCustomStyle => {
    const { color, spacing, borderRadius } = Theme.useTheme()
    return {
        optionsContainer: {
            backgroundColor: color.neutral._200,
            padding: spacing.sm,
            borderRadius: borderRadius.l,
            borderWidth: 1,
            borderColor: color.neutral._300,
        },
        optionsWrapper: {
            backgroundColor: color.neutral._200,
        },
    }
}

const useStyles = () => {
    const { color, spacing } = Theme.useTheme()

    return StyleSheet.create({
        anchor: {
            backgroundColor: color.neutral._300,
            padding: 4,
        },

        popupButton: {
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: spacing.l,
            paddingVertical: spacing.l,
            paddingRight: spacing.xl2,
            paddingLeft: spacing.l,
            borderRadius: spacing.l,
        },

        headerButtonContainer: {
            flexDirection: 'row',
        },

        optionLabel: {
            color: color.text._100,
        },

        optionLabelWarning: {
            fontWeight: '500',
            color: color.error._300,
        },
    })
}
