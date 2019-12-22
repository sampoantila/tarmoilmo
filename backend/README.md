| Language | Framework | Platform | Author |
| -------- | -------- |--------|--------|
| Nodejs | Express | Azure Web App, Virtual Machine| |


# Tarmo-ilmo-API

Tarmo-ilmo-API

## License:

See [LICENSE](../LICENSE).

## Contributing

Ask from author.

## Authenticate process

- authenticate
get /authenticate/<email>
    - generoidaan tietokantaan guid, ja päättymis timestamp
-> lähettää email, mukana linkki softaan ja guid mukana
-> linkki urillin ohjaa sivulle joka tekee kutsun:
get /authenticate/validate/<guid>
-> jos guid voimassa ja valid: palauttaa tokenin
    - tokenilla api kutsu oikeus (jatkossa openid token)
    - token talteen kantaan ja 1h päästä timestamp, jonka jälkeen invalidoituu
    - tässä kohden voi samalla siivota myös muut invalidit guidit pois kannasta
- haetaan ko. henkilön tiedot lomakkeelle valmiiksi, jos hlö löytyy
- käyttäjä muokkaa ui:ssa tiedot
- tallentaa tiedot
- logout -> poistetaan token kannasta
