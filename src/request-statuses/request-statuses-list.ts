export enum RequestStatus {
    SUCCESSFULLY_CLOSED = 'Закрыта',
    Failed = 'Провалена',
    AT_WORK = 'В работе'
}

export type requestStatusType = keyof typeof RequestStatus;
