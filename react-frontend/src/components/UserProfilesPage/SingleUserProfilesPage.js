import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleUserProfilesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("userProfiles")
            .get(urlParams.singleUserProfilesId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "UserProfiles", type: "error", message: error.message || "Failed get userProfiles" });
            });
    }, [props,urlParams.singleUserProfilesId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">UserProfiles</h3>
                </div>
                <p>userProfiles/{urlParams.singleUserProfilesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">User Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.userId}</p></div>
                    <label className="text-sm text-primary">Image Url</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.imageUrl}</p></div>
                    <label className="text-sm text-primary">Profile Status Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.profileStatusId}</p></div>
                    <label className="text-sm text-primary">Uu Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.uuId}</p></div>
                    <label className="text-sm text-primary">Oauth Provider Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.oauthProviderId}</p></div>
                    <label className="text-sm text-primary">Oauth Provider Name</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.oauthProviderName}</p></div>
                    <label className="text-sm text-primary">Login Type Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.loginTypeId}</p></div>
                    <label className="text-sm text-primary">Date Of Birth</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.dateOfBirth}</p></div>
                    <label className="text-sm text-primary">Gender</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.gender}</p></div>
                    <label className="text-sm text-primary">Account Status</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.accountStatus}</p></div>
                    <label className="text-sm text-primary">Current Mobile Number Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.currentMobileNumberId}</p></div>
                    <label className="text-sm text-primary">Current Role Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.currentRoleId}</p></div>
                    <label className="text-sm text-primary">Current Company Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.currentCompanyId}</p></div>
                    <label className="text-sm text-primary">Current Branch Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.currentBranchId}</p></div>
                    <label className="text-sm text-primary">Current Department Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.currentDepartmentId}</p></div>
                    <label className="text-sm text-primary">Current Sub Department Id</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.currentSubDepartmentId}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleUserProfilesPage);
