import { Entypo } from '@expo/vector-icons'
import { useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View, ViewStyle } from 'react-native'

import BottomSheet from '@components/views/BottomSheet'
import { t } from '@lib/i18n'
import { Theme } from '@lib/theme/ThemeManager'
import { normalizeA11yLabel } from '@lib/utils/A11y'

import { useDropdownStyles } from './MultiDropdownSheet'

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
    const styles = useDropdownStyles()
    const [showList, setShowList] = useState(false)
    const [searchFilter, setSearchFilter] = useState('')
    const theme = Theme.useTheme()
    const translatedPlaceholder = t(placeholder)
    const translatedModalTitle = t(modalTitle)
    const items = data.filter((item) =>
        labelExtractor(item).toLowerCase().includes(searchFilter.toLowerCase())
    )
    return (
        <View style={containerStyle}>
            <BottomSheet
                visible={showList}
                setVisible={setShowList}
                onClose={() => {
                    setSearchFilter('')
                }}>
                <Text style={styles.modalTitle}>{translatedModalTitle}</Text>
                {items.length > 0 ? (
                    <FlatList
                        contentContainerStyle={{ rowGap: 2 }}
                        showsVerticalScrollIndicator={false}
                        data={items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                accessible
                                accessibilityRole="button"
                                accessibilityLabel={normalizeA11yLabel(
                                    t('Select {item}', { item: labelExtractor(item) })
                                )}
                                style={
                                    selected && labelExtractor(item) === labelExtractor(selected)
                                        ? styles.listItemSelected
                                        : styles.listItem
                                }
                                onPress={() => {
                                    onChangeValue(item)
                                    setShowList(!closeOnSelect)
                                }}>
                                <Text style={styles.listItemText}>{labelExtractor(item)}</Text>
                            </Pressable>
                        )}
                    />
                ) : (
                    <Text style={styles.emptyText}>{t('No Items')}</Text>
                )}
                {search && (
                    <TextInput
                        accessible
                        accessibilityLabel={`${translatedModalTitle} ${t('Filter')}`}
                        placeholder={t('Filter...')}
                        placeholderTextColor={theme.color.text._300}
                        style={styles.searchBar}
                        value={searchFilter}
                        onChangeText={setSearchFilter}
                    />
                )}
            </BottomSheet>
            <Pressable
                accessible
                accessibilityRole="button"
                accessibilityLabel={normalizeA11yLabel(translatedModalTitle)}
                accessibilityHint={t('Opens selection list')}
                style={[style, styles.button]}
                onPress={() => setShowList(true)}>
                {selected && <Text style={styles.buttonText}>{labelExtractor(selected)}</Text>}
                {!selected && (
                    <Text style={styles.placeholderText}>{translatedPlaceholder}</Text>
                )}
                <Entypo name="chevron-down" color={theme.color.primary._800} size={18} />
            </Pressable>
        </View>
    )
}

export default DropdownSheet
