export interface Task {
    id: number,
    taskName: string,
    description: string,
    status: string
}

export interface Pageable {
    sort: {
        unsorted: boolean,
        sorted: boolean,
        empty: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
}

export interface ToDoResponse {
    data: [{
        content: Task[],
        pageable: Pageable,
        totalPages: number,
        totalElements: number,
        last: boolean,
        size: number,
        number: number,
        sort: {
            unsorted: boolean,
            sorted: boolean,
            empty: boolean
        },
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
