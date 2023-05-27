export enum RequestPriority {
    HIGH = 'Высокий',
    MEDIUM = 'Средний',
    LOW = 'Низкий'
}

export type requestPriorityType = keyof typeof RequestPriority;
