import React, { ReactNode } from 'react'
import { TextProps, TextStyle } from 'react-native'

import { t } from '@lib/i18n'
import { Theme } from '@lib/theme/ThemeManager'

import TText from './TText'

const SectionTitle = ({
    children,
    style = undefined,
    visible = true,
    ...props
}: {
    props?: TextProps
    children?: ReactNode
    style?: TextStyle
    visible?: boolean
}) => {
    const { color, spacing } = Theme.useTheme()
    const translatedChildren = typeof children === 'string' ? t(children) : children
    if (visible)
        return (
            <TText
                {...props}
                style={{
                    color: color.text._100,
                    fontSize: 16,
                    paddingBottom: spacing.m,
                    borderBottomWidth: 1,
                    borderColor: color.neutral._500,
                    ...style,
                }}>
                {translatedChildren}
            </TText>
        )
}

export default SectionTitle
