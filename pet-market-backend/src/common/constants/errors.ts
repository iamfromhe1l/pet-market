export enum Errors {
    USER_NOT_FOUND = "Пользователь с таким email или паролем не найден!",
    ALREADY_REGISTERED = "Пользователь с таким email уже зарегестрирован!",
    RT_HASH_NOT_FOUND = "Пользователь вышел из аккаунта!",
    RT_HASH_INVALID = "Неверный refresh токен",
    NOT_AUTHENTICATED = "access токен не валидный!",
    NOT_OBJECT_ID = "Не является ObjectId",
    NOT_AUTHORIZED = "Пользователь не авторизован!",
    CONNECTION_ERROR = "Ошибка подключения к серверу!",
    SERVER_ERROR = "Ошибка на сервере 404!",
    UNEXPECTED_ERROR = "Неизвестная ошибка!",
}
