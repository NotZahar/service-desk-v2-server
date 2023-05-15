export enum AuthErrorMessage {
    UserWithThisEmailAlreadyExists = 'Пользователь с таким email уже существует',
    EmailOrPasswordAreWrong = 'Некорректный email или пароль',
    GeneralGuard = 'Ошибка аутентификации',
    InternalError = 'Ошибка сервера (возможно, были введены некорректные данные)',
    AuthTokenNotFound = 'Ошибка аутентификации (token not found)',
    NoAccess = 'Нет доступа'
}
