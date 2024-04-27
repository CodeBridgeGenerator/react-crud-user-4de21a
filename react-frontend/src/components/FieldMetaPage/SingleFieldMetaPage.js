import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleFieldMetaPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("fieldMeta")
            .get(urlParams.singleFieldMetaId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "FieldMeta", type: "error", message: error.message || "Failed get fieldMeta" });
            });
    }, [props,urlParams.singleFieldMetaId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">FieldMeta</h3>
                </div>
                <p>fieldMeta/{urlParams.singleFieldMetaId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Field Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.fieldId}</p></div>
                    <label className="text-sm text-primary">Descriptive</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.descriptive}</p></div>
                    <label className="text-sm text-primary">Structural</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.structural}</p></div>
                    <label className="text-sm text-primary">Administrative</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.administrative}</p></div>
                    <label className="text-sm text-primary">Reference</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.reference}</p></div>
                    <label className="text-sm text-primary">Statistical</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.statistical}</p></div>
                    <label className="text-sm text-primary">Legal</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.legal}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleFieldMetaPage);
