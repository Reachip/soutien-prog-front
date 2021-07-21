export default function mustBeVisioConferenceLink(value) {
    return value === null ? false :
        value.startsWith("https://discord.gg/")
        || value.startsWith("https://us05web.zoom.us/")
        || value.startsWith("https://teams.microsoft.com/")
        || value.startsWith("https://meet.google.com/")
}