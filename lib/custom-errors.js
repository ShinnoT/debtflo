class APILimitError extends Error {
    constructor(message) {
        super(message);
        this.name = "API Limit Error";
    }
}

class APISearchQueryError extends Error {
    constructor(message) {
        super(message);
        this.name = "API Search Query Error";
    }
}

class UnexpectedError extends Error {
    constructor(message) {
        super(message);
        this.name = "Unexpected Error";
    }
}

export { APILimitError, APISearchQueryError, UnexpectedError };
