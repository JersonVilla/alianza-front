export interface ClienteResponse {
    code:       number;
    httpStatus: string;
    message:    string;
    data:       Data;
}

export interface Data {
    clientes: Cliente[];
}

export interface Cliente {
    id:  string;
    sharedKey:  string;
    businessId: string;
    email:      string;
    phone:      string;
    dataAdd:    Date;
}
