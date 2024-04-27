import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleSectionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("sections")
            .get(urlParams.singleSectionsId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Sections", type: "error", message: error.message || "Failed get sections" });
            });
    }, [props,urlParams.singleSectionsId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Sections</h3>
                </div>
                <p>sections/{urlParams.singleSectionsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Company Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.companyId}</p></div>
                    <label className="text-sm text-primary">Branch Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.branchId}</p></div>
                    <label className="text-sm text-primary">Department Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.departmentId}</p></div>
                    <label className="text-sm text-primary">Section</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.section}</p></div>
                    <label className="text-sm text-primary">Is Head</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.isHead}</p></div>
                    <label className="text-sm text-primary">Is Default</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.isDefault}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleSectionsPage);
