export interface Task {
    id: number,
    taskName: string,
    description: string,
    status: string
}

export interface ToDoResponse {
    data: [{
        content: Task[],
        pageable: any,
        totalPages: number,
        totalElements: number,
        last: boolean,
        size: number,
        number: number,
        numberOfElements: number,
        first: boolean,
        empty: boolean
    }
]
}

export interface PostBody {
    id?: number
    status?: string,
    description?: string,
    taskName: string
}
