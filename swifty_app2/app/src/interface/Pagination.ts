interface Pagination {
    page: number;
    length: number;
    pageSize: number;
    setPage: (page: number) => void;
}

export default Pagination;