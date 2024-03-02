import {request} from "@/config/Axios";

// =====================employee员工培训=============
export function saveMessageNotification(messageNotification){
    //http://localhost:8090/api/
    return request({
        url: "/messageNotification/save",
        method: 'POST',
        data:{
            ...messageNotification
        }
    })
}

export function getMessageNotification(page,size){
    //http://localhost:8090/api/
    return request({
        url: '/messageNotification/query_list',
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

export function deleteMessageNotification(record){
    return request({
        url: '/messageNotification/delete/'+record.id,
        method: 'DELETE',
    })
}
