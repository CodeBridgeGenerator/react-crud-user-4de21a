import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleEmailLogPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("emailLog")
            .get(urlParams.singleEmailLogId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "EmailLog", type: "error", message: error.message || "Failed get emailLog" });
            });
    }, [props,urlParams.singleEmailLogId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">EmailLog</h3>
                </div>
                <p>emailLog/{urlParams.singleEmailLogId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">From User Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.fromUserId}</p></div>
                    <label className="text-sm text-primary">To</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.toff}</p></div>
                    <label className="text-sm text-primary">Cc</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.ccff}</p></div>
                    <label className="text-sm text-primary">Bcc</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.bcc}</p></div>
                    <label className="text-sm text-primary">Content</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.content}</p></div>
                    <label className="text-sm text-primary">Subject</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.subject}</p></div>
                    <label className="text-sm text-primary">Attachment Count</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.attachmentCount}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleEmailLogPage);
