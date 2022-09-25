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

export const createMatrix = query => {
    return request({
        url: 'http://localhost:8080/matrixSummary/save',
        method: 'post',
        params: query
    });
};

export const fetchMatrixSuammryData = query => {
    return request({
        url: 'http://localhost:8080/matrixSummary/list',
        method: 'get',
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
        url: 'http://localhost:8080/matrixSummary/matrix',
        method: 'get',
        params: query
    });
};
export const createRelation = query => {
    return request({
        url: 'http://localhost:8080/relation/save',
        method: 'post',
        params: query
    });
};

export const deleteRelation = query => {
    return request({
        url: 'http://localhost:8080/relation/remove',
        method: 'get',
        params: query
    });
};

export const fetchRelationData = query => {
    return request({
        url: 'http://localhost:8080/relation/page',
        method: 'get',
        params: query
    });
};

export const fetchRiskData = query => {
    return request({
        url: 'http://localhost:8080/risk/page',
        method: 'get',
        params: query
    });
};

export const createRisk = query => {
    return request({
        url: 'http://localhost:8080/risk/save',
        method: 'post',
        params: query
    });
};

export const deleteRisk = query => {
    return request({
        url: 'http://localhost:8080/risk/remove',
        method: 'get',
        params: query
    });
};

export const fetchRiskGradeData = query => {
    return request({
        url: 'http://localhost:8080/riskGrade/page',
        method: 'get',
        params: query
    });
};

export const updateRiskGrade = query => {
    return request({
        url: 'http://localhost:8080/riskGrade/update',
        method: 'post',
        params: query
    });
};


export const createAdverseOutcomes = query => {
    return request({
        url: 'http://localhost:8080/adverseOutComes/save',
        method: 'post',
        params: query
    });
};

export const deleteAdverseOutcomes = query => {
    return request({
        url: 'http://localhost:8080/adverseOutComes/remove',
        method: 'get',
        params: query
    });
};
export const fetchAdverseOutcomesData = query => {
    return request({
        url: 'http://localhost:8080/adverseOutComes/page',
        method: 'get',
        params: query
    });
};

export const fetchAbnormalCausesData = query => {
    return request({
        url: 'http://localhost:8080/abnormalCauses/page',
        method: 'get',
        params: query
    });
};

export const createAbnormalCauses = query => {
    return request({
        url: 'http://localhost:8080/abnormalCauses/save',
        method: 'post',
        params: query
    });
};

export const deleteAbnormalCauses = query => {
    return request({
        url: 'http://localhost:8080/abnormalCauses/remove',
        method: 'get',
        params: query
    });
};

export const fetchVariableData = query => {
    return request({
        url: 'http://localhost:8080/variable/page',
        method: 'get',
        params: query
    });
};

export const createVariable = query => {
    return request({
        url: 'http://localhost:8080/variable/save',
        method: 'post',
        params: query
    });
};

export const deleteVariable = query => {
    return request({
        url: 'http://localhost:8080/variable/remove',
        method: 'get',
        params: query
    });
};


export const createFormula = query => {
    return request({
        url: 'http://localhost:8080/formula/save',
        method: 'post',
        params: query
    });
};

export const deleteFormula = query => {
    return request({
        url: 'http://localhost:8080/formula/remove',
        method: 'get',
        params: query
    });
};

export const fetchFormulaData = query => {
    return request({
        url: 'http://localhost:8080/formula/page',
        method: 'get',
        params: query
    });
};

export const fetchVariableMatrixData = query => {
    return request({
        url: 'http://localhost:8080/variable/list',
        method: 'get',
        params: query
    });
};

export const fetchHazopData = query => {
    return request({
        url: 'http://localhost:8080/hazop/page',
        method: 'get',
        params: query
    });
};

export const updateHazop = query => {
    return request({
        url: 'http://localhost:8080/hazop/update',
        method: 'post',
        params: query
    });
};

export const deleteHazop = query => {
    return request({
        url: 'http://localhost:8080/hazop/remove',
        method: 'get',
        params: query
    });
};

export const fetchLopaData = query => {
    return request({
        url: 'http://localhost:8080/lopa/page',
        method: 'get',
        params: query
    });
};

export const updateLopa = query => {
    return request({
        url: 'http://localhost:8080/lopa/update',
        method: 'post',
        params: query
    });
};

export const deleteLopa = query => {
    return request({
        url: 'http://localhost:8080/lopa/remove',
        method: 'get',
        params: query
    });
};

export const fetchOptions1Data = query => {
    return request({
        url: 'http://localhost:8080/hazop/options1',
        method: 'get',
        params: query
    });
};

export const fetchOptions2Data = query => {
    return request({
        url: 'http://localhost:8080/hazop/options2',
        method: 'get',
        params: query
    });
};

export const fetchOptions3Data = query => {
    return request({
        url: 'http://localhost:8080/hazop/options3',
        method: 'get',
        params: query
    });
};

export const createBase = query => {
    return request({
        url: 'http://localhost:8080/baseSummary/save',
        method: 'post',
        params: query
    });
};


export const fetchBaseDate = query => {
    return request({
        url: 'http://localhost:8080/baseSummary/list',
        method: 'get',
        params: query
    });
};

export const fetchSDGData = query => {
    return request({
        url: 'http://localhost:8080/variable/sdg',
        // url: './option2.json',
        method: 'get',
        params: query
    });
};

export const fetchSDGDetailData = query => {
    return request({
        url: 'http://localhost:8080/variable/sdgDetail',
        //url: './option2.json',
        method: 'get',
        params: query
    });
};
