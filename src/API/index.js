import {request} from "@/config/Axios";
//每一个请求都被封装为一个实例

//============================登录======================
export function loginReq(mobile,password){
    //http://localhost:8090/api/
    return request({
        url: '/employee/login',
        method: 'POST',
        data: {
            mobile: mobile,
            password: password
        }
    })
}

export function registerReq(mobile,password){
    //http://localhost:8090/api/
    return request({
        url: '/employee/register',
        method: 'POST',
        data: {
            mobile: mobile,
            password: password
        }
    })
}
// =====================employee员工账号=============
export function saveEmployee(employee){
    //http://localhost:8090/api/
    return request({
        url: "/employee/save",
        method: 'POST',
        data:{
            ...employee
        }
    })
}

// 火车座位
export function getEmployee(page,size){
    //http://localhost:8090/api/
    return request({
        url: '/employee/query_list',
        method: 'GET',
        params:{
            page,
            size,
        },
    },{transformResponse: [
            function (data){
                return data;
            }
        ]})
}

export function deleteEmployee(record){
    return request({
        url: '/employee/delete/'+record.id,
        method: 'DELETE',
    })
}

//修改密码
export function resetEmployeePassword(resetPassword){
    return request({
        url: '/employee/resetPassword',
        method: 'POST',
        data:{
            ...resetPassword
        }
    })
}

// =====================employee员工详细信息=============
export function saveEmployeeInformation(employeeInformation){
    //http://localhost:8090/api/
    return request({
        url: "/employeeInformation/save",
        method: 'POST',
        data:{
            ...employeeInformation
        }
    })
}

export function getEmployeeInformation(page,size){
    //http://localhost:8090/api/
    return request({
        url: '/employeeInformation/query_list',
        method: 'GET',
        params:{
            page,
            size,
        },
    },{transformResponse: [
            function (data){
                return data;
            }
        ]})
}

export function deleteEmployeeInformation(record){
    return request({
        url: '/employeeInformation/delete/'+record.id,
        method: 'DELETE',
    })
}

// =====================employee员工民族=============
export function saveNation(nation){
    //http://localhost:8090/api/
    return request({
        url: "/nation/save",
        method: 'POST',
        data:{
            ...nation
        }
    })
}

export function getNation(page,size){
    //http://localhost:8090/api/
    return request({
        url: '/nation/query_list',
        method: 'GET',
        params:{
            page,
            size,
        },
    },{transformResponse: [
            function (data){
                return data;
            }
        ]})
}

export function deleteNation(record){
    return request({
        url: '/nation/delete/'+record.id,
        method: 'DELETE',
    })
}

export function queryAllNation(){
    //http://localhost:8090/api/
    return request({
        url: '/nation/query_all',
        method: 'GET',

    })
}

// =====================employee员工职位=============
export function savePosition(position){
    //http://localhost:8090/api/
    return request({
        url: "/position/save",
        method: 'POST',
        data:{
            ...position
        }
    })
}

export function getPosition(page,size){
    //http://localhost:8090/api/
    return request({
        url: '/position/query_list',
        method: 'GET',
        params:{
            page,
            size,
        },
    },{transformResponse: [
            function (data){
                return data;
            }
        ]})
}

export function deletePosition(record){
    return request({
        url: '/position/delete/'+record.id,
        method: 'DELETE',
    })
}


export function queryAllPosition(){
    //http://localhost:8090/api/
    return request({
        url: '/position/query_all',
        method: 'GET',

    })
}

// =====================employee员工部门=============
export function saveDepartment(department){
    //http://localhost:8090/api/
    return request({
        url: "/department/save",
        method: 'POST',
        data:{
            ...department
        }
    })
}

export function getDepartment(page,size){
    //http://localhost:8090/api/
    return request({
        url: '/department/query_list',
        method: 'GET',
        params:{
            page,
            size,
        },
    },{transformResponse: [
            function (data){
                return data;
            }
        ]})
}

export function deleteDepartment(record){
    return request({
        url: '/department/delete/'+record.id,
        method: 'DELETE',
    })
}

export function queryAllDepartment(){
    //http://localhost:8090/api/
    return request({
        url: '/department/query_all',
        method: 'GET',

    })
}


// =====================employee员工职位级别=============
export function saveJobLevel(department){
    //http://localhost:8090/api/
    return request({
        url: "/jobLevel/save",
        method: 'POST',
        data:{
            ...department
        }
    })
}

export function getJobLevel(page,size){
    //http://localhost:8090/api/
    return request({
        url: '/jobLevel/query_list',
        method: 'GET',
        params:{
            page,
            size,
        },
    },{transformResponse: [
            function (data){
                return data;
            }
        ]})
}

export function deleteJobLevel(record){
    return request({
        url: '/jobLevel/delete/'+record.id,
        method: 'DELETE',
    })
}


export function queryAllJobLevel(){
    //http://localhost:8090/api/
    return request({
        url: '/jobLevel/query_all',
        method: 'GET',

    })
}


// =====================employee员工简历=============
export function saveResume(resume){
    //http://localhost:8090/api/
    return request({
        url: "/resume/save",
        method: 'POST',
        data:{
            ...resume
        }
    })
}

export function getResume(page,size){
    //http://localhost:8090/api/
    return request({
        url: '/resume/query_list',
        method: 'GET',
        params:{
            page,
            size,
        },
    },{transformResponse: [
            function (data){
                return data;
            }
        ]})
}

export function deleteResume(record){
    return request({
        url: '/resume/delete/'+record.id,
        method: 'DELETE',
    })
}

export function approveResume(record){
    return request({
        url: "/resume/approve",
        method: 'POST',
        data:{
            ...record
        }
    })
}
