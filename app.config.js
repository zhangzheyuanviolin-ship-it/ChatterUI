const APP_VARIANT = process.env.APP_VARIANT ?? 'production'

const VARIANT_CONFIG = {
    production: {
        name: 'ChatterUI',
        identifier: 'com.Vali98.ChatterUI',
        version: '0.8.8',
        buildNumber: '1',
        versionCode: 1,
    },
    development: {
        name: 'ChatterUI (DEV)',
        identifier: 'com.Vali98.ChatterUIDev',
        version: '0.8.8',
        buildNumber: '1',
        versionCode: 1,
    },
    shipit: {
        name: 'ChatterUI Next',
        identifier: 'com.zhangzheyuan.chatterui.next',
        version: '0.8.8-engine2',
        buildNumber: '3',
        versionCode: 3,
    },
}

const selectedVariant = VARIANT_CONFIG[APP_VARIANT] ?? VARIANT_CONFIG.production

module.exports = {
    expo: {
        name: selectedVariant.name,
        newArchEnabled: true,
        slug: 'ChatterUI',
        version: selectedVariant.version,
        orientation: 'default',
        icon: './assets/images/icon.png',
        scheme: 'chatterui',
        userInterfaceStyle: 'automatic',
        assetBundlePatterns: ['**/*'],
        ios: {
            icon: {
                dark: './assets/images/ios-dark.png',
                light: './assets/images/ios-light.png',
                tinted: './assets/images/icon.png',
            },
            supportsTablet: true,
            package: selectedVariant.identifier,
            bundleIdentifier: selectedVariant.identifier,
            buildNumber: selectedVariant.buildNumber,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon-foreground.png',
                backgroundImage: './assets/images//adaptive-icon-background.png',
                monochromeImage: './assets/images/adaptive-icon-foreground.png',
                backgroundColor: '#000',
            },
            edgeToEdgeEnabled: true,
            package: selectedVariant.identifier,
            versionCode: selectedVariant.versionCode,
            userInterfaceStyle: 'dark',
            permissions: [
                'android.permission.FOREGROUND_SERVICE',
                'android.permission.WAKE_LOCK',
                'android.permission.FOREGROUND_SERVICE_DATA_SYNC',
            ],
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/adaptive-icon.png',
        },
        plugins: [
            [
                'expo-asset',
                {
                    assets: ['./assets/models/aibot.raw', './assets/models/llama3tokenizer.gguf'],
                },
            ],
            [
                'expo-build-properties',
                {
                    android: {
                        largeHeap: true,
                        usesCleartextTraffic: true,
                        enableProguardInReleaseBuilds: true,
                        enableShrinkResourcesInReleaseBuilds: true,
                        useLegacyPackaging: true,
                        extraProguardRules: '-keep class com.rnllama.** { *; }',
                    },
                },
            ],
            [
                'expo-splash-screen',
                {
                    backgroundColor: '#000000',
                    image: './assets/images/adaptive-icon.png',
                    imageWidth: 200,
                },
            ],
            [
                'expo-notifications',
                {
                    icon: './assets/images/notification.png',
                },
            ],
            [
                './expo-build-plugins/androidattributes.plugin.js',
                {
                    'android:largeHeap': true,
                },
            ],
            [
                'react-native-edge-to-edge',
                {
                    android: {
                        parentTheme: 'Default',
                    },
                },
            ],
            'expo-localization',
            'expo-router',
            'expo-sqlite',
            './expo-build-plugins/bgactions.plugin.js',
            './expo-build-plugins/copyjni.plugin.js',
            './expo-build-plugins/usercert.plugin.js',
            './expo-build-plugins/rnllama.plugin.js',
            './expo-build-plugins/copyhtp.plugin.js',
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: 'd588a96a-5eb0-457a-85bc-e21acfdc60e9',
            },
        },
    },
}
