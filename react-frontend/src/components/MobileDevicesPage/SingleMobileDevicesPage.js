import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleMobileDevicesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("mobileDevices")
            .get(urlParams.singleMobileDevicesId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "MobileDevices", type: "error", message: error.message || "Failed get mobileDevices" });
            });
    }, [props,urlParams.singleMobileDevicesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">MobileDevices</h3>
                </div>
                <p>mobileDevices/{urlParams.singleMobileDevicesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Mobilenumberid</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.mobilenumberid}</p></div>
                    <label className="text-sm text-primary">Deviceid</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.deviceid}</p></div>
                    <label className="text-sm text-primary">Os</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.osff}</p></div>
                    <label className="text-sm text-primary">Version</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.version}</p></div>
                    <label className="text-sm text-primary">Sdk</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.sdk}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleMobileDevicesPage);
