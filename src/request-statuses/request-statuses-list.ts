export enum RequestStatus {
    SUCCESSFULLY_CLOSED = 'Закрыта',
    FAILED = 'Провалена',
    AT_WORK = 'В работе'
}

export type requestStatusType = keyof typeof RequestStatus;
