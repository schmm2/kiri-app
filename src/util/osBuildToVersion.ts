// expected build number like 10.0.19042.508
const osBuildToVersion = (build: string) => {
    let buildArray = build.split('.');

    if (buildArray[2]) {
        switch (buildArray[2]) {
            case "25120": return "Win 11 - 22H2";
            case "22000": return "Win 11 - 21H2";
            case "19044": return "Win 10 - 21H2";
            case "19043": return "Win 10 - 21H1";
            case "19042": return "Win 10 - 20H2";
            case "19041": return "Win 10 - 2004";
            case "18363": return "Win 10 - 1909";
            case "17763": return "Win 10 - 1809";
            case "14393": return "Win 10 - 1607";
            case "10240": return "Win 10 - 1507";
            default: return null;
        }
    }
    return null;
}
export {osBuildToVersion}