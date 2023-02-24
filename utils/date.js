export const toDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {timeZone:"UTC"}).format(new Date(date))
}