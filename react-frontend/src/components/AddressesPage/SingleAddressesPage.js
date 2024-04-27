import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleAddressesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("addresses")
            .get(urlParams.singleAddressesId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Addresses", type: "error", message: error.message || "Failed get addresses" });
            });
    }, [props,urlParams.singleAddressesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Addresses</h3>
                </div>
                <p>addresses/{urlParams.singleAddressesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Morphid</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.morphid}</p></div>
                    <label className="text-sm text-primary">Morphname</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.morphname}</p></div>
                    <label className="text-sm text-primary">Street</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.street}</p></div>
                    <label className="text-sm text-primary">Street2</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.street2}</p></div>
                    <label className="text-sm text-primary">City</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.city}</p></div>
                    <label className="text-sm text-primary">Postcode</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.postcode}</p></div>
                    <label className="text-sm text-primary">State</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.state}</p></div>
                    <label className="text-sm text-primary">Country</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.country}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleAddressesPage);
