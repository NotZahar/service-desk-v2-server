export enum RequestType {
    INCIDENT = 'Инцидент', 
    INTERNAL = 'Внутренняя',
    SERVICE = 'Обслуживание'
}

export type requestTypeType = keyof typeof RequestType;
