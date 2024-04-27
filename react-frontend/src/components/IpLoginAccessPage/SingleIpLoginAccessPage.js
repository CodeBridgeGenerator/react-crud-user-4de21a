import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleIpLoginAccessPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("ipLoginAccess")
            .get(urlParams.singleIpLoginAccessId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "IpLoginAccess", type: "error", message: error.message || "Failed get ipLoginAccess" });
            });
    }, [props,urlParams.singleIpLoginAccessId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">IpLoginAccess</h3>
                </div>
                <p>ipLoginAccess/{urlParams.singleIpLoginAccessId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">User Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.userId}</p></div>
                    <label className="text-sm text-primary">Role Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.roleId}</p></div>
                    <label className="text-sm text-primary">Start Ip</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.startIp}</p></div>
                    <label className="text-sm text-primary">End Ip</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.endIp}</p></div>
                    <label className="text-sm text-primary">Allowed Start Time</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.allowedStartTime}</p></div>
                    <label className="text-sm text-primary">Allowed End Time</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.allowedEndTime}</p></div>
                    <label className="text-sm text-primary">Blocked Start Time</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.blockedStartTime}</p></div>
                    <label className="text-sm text-primary">Blocked End Time</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.blockedEndTime}</p></div>
            
                    <label className="text-sm text-primary">created</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">updated</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleIpLoginAccessPage);
