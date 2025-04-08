export const BASE_URL = "https://backend-5c3m.onrender.com";

export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth/getuser',
    },

    DASHBOARD: {
        GET_DATA: '/api/v1/dashboard',
    },

    INCOME: {
        ADD_INCOME: '/api/v1/income/add',
        GET_ALL_INCOME: '/api/v1/income/get',
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: '/api/v1/income/downloadexcel',
    },

    EXPENSE: {
        ADD_EXPENSE: '/api/v1/expense/create',
        GET_ALL_EXPENSE: '/api/v1/expense/get',
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: '/api/v1/expense/downloadexcel',
    },
    CATEGORY: {
        ADD_CATEGORY: '/api/v1/categories/create',
        GET_ALL_CATEGORY: '/api/v1/categories/get',
        DELETE_CATEGORY: (categoryId) => `/api/v1/categories/delete`,
        DOWNLOAD_CATEGORY: '/api/v1//categories/downloadexcel',
    },
   
    API: {
        ADD_BUDGET_API: '/api/v1/budget',
        GET_BUDGET_API: '/api/v1/budget',
        ADD_EXPENSE_API: '/api/v1/expenses',
        GET_EXPENSE_API: '/api/v1/expenses',
        EDIT_EXPENSE_API: (id) => `/api/v1/expenses/${id}`,
        DELETE_EXPENSE_API: (id) => `/api/v1/expenses/${id}`,
    },
    
    BUDGET: {
        ADD_BUDGET: '/api/v1/budget/create',
        GET_ALL_BUDGET: '/api/v1/budget/get',
        DELETE_BUDGET: (budgetId) => `/api/v1/budget/delete`,
        DOWNLOAD_BUDGET: '/api/v1/budget/downloadexcel',
    },

    IMAGE: {
        UPLOAD_IMAGE: '/api/v1/auth/upload-image',
    },
};
