import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
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
