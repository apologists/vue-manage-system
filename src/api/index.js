import request from '../utils/request';

export const createProject = query => {
    return request({
        url: 'http://localhost:8080/projectSummary/save',
        method: 'post',
        params: query
        // params: JSON.stringify(query)
    });
};

export const deleteProject = query => {
    return request({
        url: 'http://localhost:8080/projectSummary/remove',
        method: 'get',
        params: query
    });
};

export const updateProject = query => {
    return request({
        url: 'http://localhost:8080/projectSummary/update',
        method: 'post',
        params: query
    });
};


export const fetchData = query => {
    return request({
        url: 'http://localhost:8080/projectSummary/page',
        method: 'get',
        params: query
    });
};

export const fetchMatrixData = query => {
    return request({
        url: './matrixTable.json',
        method: 'get',
        params: query
    });
};

export const fetchRelationData = query => {
    return request({
        url: './relationTable.json',
        method: 'get',
        params: query
    });
};

export const fetchRiskData = query => {
    return request({
        url: './riskTable.json',
        method: 'get',
        params: query
    });
};

export const fetchRiskGradeData = query => {
    return request({
        url: './riskGradeTable.json',
        method: 'get',
        params: query
    });
};

export const fetchAdverseOutcomesData = query => {
    return request({
        url: './adverseOutcomesTable.json',
        method: 'get',
        params: query
    });
};

export const fetchAbnormalCausesData = query => {
    return request({
        url: './abnormalCausesTable.json',
        method: 'get',
        params: query
    });
};

export const fetchVariableData = query => {
    return request({
        url: './variableTable.json',
        method: 'get',
        params: query
    });
};

export const fetchFormulaData = query => {
    return request({
        url: './formulaTable.json',
        method: 'get',
        params: query
    });
};

export const fetchVariableMatrixData = query => {
    return request({
        url: './variableMatrixTable.json',
        method: 'get',
        params: query
    });
};

export const fetchHazopData = query => {
    return request({
        url: './hazopTable.json',
        method: 'get',
        params: query
    });
};

export const fetchLopaData = query => {
    return request({
        url: './lopaTable.json',
        method: 'get',
        params: query
    });
};

