const renderDate = (dateTimeIso) => {
    let date = new Date(dateTimeIso);
    let dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' +
        date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return dateString;
}

export { renderDate }