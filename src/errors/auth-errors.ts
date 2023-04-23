export enum AuthErrorMessage {
    UserWithThisEmailAlreadyExists = 'Пользователь с таким email уже существует',
    EmailOrPasswordAreWrong = 'Некорректный email или пароль',
    GeneralGuard = 'Ошибка аутентификации',
    AuthTokenNotFound = 'Ошибка аутентификации (token not found)',
    NoAccess = 'Нет доступа'
}
