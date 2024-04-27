import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleCompaniesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("companies")
            .get(urlParams.singleCompaniesId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Companies", type: "error", message: error.message || "Failed get companies" });
            });
    }, [props,urlParams.singleCompaniesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Companies</h3>
                </div>
                <p>companies/{urlParams.singleCompaniesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Company Name</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.companyName}</p></div>
                    <label className="text-sm text-primary">Company No</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.companyNo}</p></div>
                    <label className="text-sm text-primary">Brand Name</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.brandName}</p></div>
                    <label className="text-sm text-primary">Website</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.website}</p></div>
                    <label className="text-sm text-primary">Address Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.addressId}</p></div>
                    <label className="text-sm text-primary">Logourl</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.logourl}</p></div>
                    <label className="text-sm text-primary">Company Email</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.companyEmail}</p></div>
                    <label className="text-sm text-primary">Phone Type Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.phoneTypeId}</p></div>
                    <label className="text-sm text-primary">Fax Type Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.faxTypeId}</p></div>
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

export default connect(mapState, mapDispatch)(SingleCompaniesPage);
