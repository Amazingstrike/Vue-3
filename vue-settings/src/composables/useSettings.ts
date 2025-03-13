import { ref, watch } from 'vue';
type Visibility = 'public' | 'private'

interface SettingsMap {
    general: GeneralSettings,
    notifications: NotificationsSettings,
    privacy: PrivacySettings
}

type SettingsKey = keyof SettingsMap;

interface GeneralSettings {
    username: string,
    email: string,
    gender: string,
    about: string,
    country: string,
}

const init = <T extends SettingsKey>(key: T, defaults: SettingsMap[T]) => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaults;
};

const watcher = <T extends SettingsKey>(key: T) => (value: SettingsMap[T]) => {localStorage.setItem(key, JSON.stringify(value));};

const general = ref<GeneralSettings>(
    init('general', {
        about: '',
        country: 'USA',
        gender: 'male',
        email: '',
        username: ''
        })
);


interface NotificationsSettings {
    email: boolean,
    sms: boolean
}

const notifications = ref<NotificationsSettings>(
    init('notifications', {
        email: false,
        sms: false
    })
);

interface PrivacySettings {
    visibility: Visibility,
    searchEngineIndexing: boolean
}

const privacy = ref<PrivacySettings>(
    init('privacy', {
        visibility: 'public',
        searchEngineIndexing: false
    })
);

export function useSettings() {
    return {
        general,
        notifications,
        privacy
    };
}

watch(general, watcher('general'), {deep : true});
watch(notifications, watcher('notifications'), {deep : true});
watch(privacy, watcher('privacy'), {deep : true});