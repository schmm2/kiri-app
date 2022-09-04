const renderDate = (dateTimeIso) => {
    let date = new Date(dateTimeIso);
    let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' +
        date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return dateString;
}

export { renderDate }