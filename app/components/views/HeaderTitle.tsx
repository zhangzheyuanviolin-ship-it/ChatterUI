import { t } from '@lib/i18n'
import { Stack } from 'expo-router'
import { ReactNode } from 'react'

type HeaderTitleProps = {
    title?: string
    headerTitle?: ((props: { children: string; tintColor?: string }) => ReactNode) | undefined
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title = '', headerTitle = undefined }) => {
    const translatedTitle = title ? t(title) : title
    return (
        <Stack.Screen
            options={{
                title: translatedTitle,
                headerTitle: headerTitle,
                animation: 'simple_push',
            }}
        />
    )
}

export default HeaderTitle
