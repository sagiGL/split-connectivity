-- filepath: /Users/s.gleizer/split-connectivity/openChrome.scpt
tell application "Google Chrome"
    activate
    set newWindow to make new window
    tell newWindow
        set bounds to {0, 0, 800, 600}
        make new tab with properties {URL:"http://localhost:3000"}
        set mode to "incognito"
    end tell
end tell