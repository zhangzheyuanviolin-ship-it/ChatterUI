import { Logger } from '@lib/state/Logger'
import { getBackendDevicesInfo } from 'cui-llama.rn'
import { useEffect, useState } from 'react'

const useBackendDevices = () => {
    const [devices, setDevices] = useState<string[]>([])

    useEffect(() => {
        getBackendDevicesInfo()
            .then((items) => {
                const names = items.map((item) => item.deviceName)
                Logger.info(`Detected backend devices: ${names.join(', ') || 'none'}`)
                setDevices(names)
            })
            .catch((e) => {
                Logger.warn('Failed to get backend devices: ' + e)
            })
    }, [])

    return devices
}

export default useBackendDevices
