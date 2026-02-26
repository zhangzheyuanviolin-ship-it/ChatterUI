import { Entypo } from '@expo/vector-icons'
import { t } from '@lib/i18n'
import { Theme } from '@lib/theme/ThemeManager'
import { normalizeA11yLabel } from '@lib/utils/A11y'
import { useState } from 'react'
import { FlatList, Modal, Pressable, Text, View, ViewStyle, TextInput } from 'react-native'

import { useDropdownStyles } from './MultiDropdownSheet'
import FadeBackrop from '../views/FadeBackdrop'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type DropdownSheetProps<T> = {
    containerStyle?: ViewStyle
    style?: ViewStyle
    data: T[]
    selected?: T | undefined
    onChangeValue: (data: T) => void
    labelExtractor: (data: T) => string
    search?: boolean
    placeholder?: string
    modalTitle?: string
    closeOnSelect?: boolean
}

const DropdownSheet = <T,>({
    containerStyle = undefined,
    onChangeValue,
    style,
    selected = undefined,
    data = [],
    placeholder = 'Select Item...',
    modalTitle = 'Select Item',
    labelExtractor = (data) => {
        return data as string
    },
    search = false,
    closeOnSelect = true,
}: DropdownSheetProps<T>) => {
    const insets = useSafeAreaInsets()
    const styles = useDropdownStyles()
    const [showList, setShowList] = useState(false)
    const [searchFilter, setSearchFilter] = useState('')
    const theme = Theme.useTheme()
    const items = data.filter((item) =>
        labelExtractor(item).toLowerCase().includes(searchFilter.toLowerCase())
    )
    const translatedTitle = t(modalTitle)
    const translatedPlaceholder = t(placeholder)
    return (
        <View style={containerStyle}>
            <Modal
                transparent
                statusBarTranslucent
                navigationBarTranslucent
                onRequestClose={() => setShowList(false)}
                visible={showList}
                animationType="fade">
                <KeyboardAvoidingView
                    behavior="height"
                    keyboardVerticalOffset={-insets.bottom}
                    style={{ flex: 1 }}>
                    <FadeBackrop
                        handleOverlayClick={() => {
                            setSearchFilter('')
                            setShowList(false)
                        }}
                    />
                    <View style={{ flex: 1 }} />
                    <View style={styles.listContainer}>
                        <Text style={styles.modalTitle}>{translatedTitle}</Text>
                        {items.length > 0 ? (
                            <FlatList
                                contentContainerStyle={{ rowGap: 2 }}
                                showsVerticalScrollIndicator={false}
                                data={items}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <Pressable
                                        accessible
                                        accessibilityRole="button"
                                        accessibilityLabel={normalizeA11yLabel(
                                            t('Select {item}', { item: labelExtractor(item) })
                                        )}
                                        style={
                                            selected &&
                                            labelExtractor(item) === labelExtractor(selected)
                                                ? styles.listItemSelected
                                                : styles.listItem
                                        }
                                        onPress={() => {
                                            onChangeValue(item)
                                            setShowList(!closeOnSelect)
                                        }}>
                                        <Text style={styles.listItemText}>
                                            {labelExtractor(item)}
                                        </Text>
                                    </Pressable>
                                )}
                            />
                        ) : (
                            <Text style={styles.emptyText}>{t('No Items')}</Text>
                        )}
                        {search && (
                            <TextInput
                                accessible
                                accessibilityLabel={`${translatedTitle} ${t('Filter')}`}
                                placeholder={t('Filter...')}
                                placeholderTextColor={theme.color.text._300}
                                style={styles.searchBar}
                                value={searchFilter}
                                onChangeText={setSearchFilter}
                            />
                        )}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            <Pressable
                accessible
                accessibilityRole="button"
                accessibilityLabel={normalizeA11yLabel(translatedTitle)}
                accessibilityHint={t('Opens selection list')}
                style={[style, styles.button]}
                onPress={() => setShowList(true)}>
                {selected && <Text style={styles.buttonText}>{labelExtractor(selected)}</Text>}
                {!selected && <Text style={styles.placeholderText}>{translatedPlaceholder}</Text>}
                <Entypo name="chevron-down" color={theme.color.primary._800} size={18} />
            </Pressable>
        </View>
    )
}

export default DropdownSheet
