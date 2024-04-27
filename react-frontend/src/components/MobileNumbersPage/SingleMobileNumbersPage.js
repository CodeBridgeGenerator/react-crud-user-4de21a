import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleMobileNumbersPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("mobileNumbers")
            .get(urlParams.singleMobileNumbersId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "MobileNumbers", type: "error", message: error.message || "Failed get mobileNumbers" });
            });
    }, [props,urlParams.singleMobileNumbersId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">MobileNumbers</h3>
                </div>
                <p>mobileNumbers/{urlParams.singleMobileNumbersId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">User Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.userId}</p></div>
                    <label className="text-sm text-primary">Mobileno</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.mobileno}</p></div>
                    <label className="text-sm text-primary">Country</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.country}</p></div>
                    <label className="text-sm text-primary">Operator</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.operator}</p></div>
                    <label className="text-sm text-primary">Mobile</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.mobile}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleMobileNumbersPage);
