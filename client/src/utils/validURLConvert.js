export const validURLConvert = (name) => {
    const url = name?.toString().toLowerCase().replaceAll(" ","-").replaceAll(" ","-").replaceAll("&","-")
    return url

}