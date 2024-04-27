import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const UserProfilesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            userId: _entity.userId,
            imageUrl: _entity.imageUrl,
            profileStatusId: _entity.profileStatusId,
            uuId: _entity.uuId,
            oauthProviderId: _entity.oauthProviderId,
            oauthProviderName: _entity.oauthProviderName,
            loginTypeId: _entity.loginTypeId,
            dateOfBirth: _entity.dateOfBirth,
            gender: _entity.gender,
            accountStatus: _entity.accountStatus,
            currentMobileNumberId: _entity.currentMobileNumberId,
            currentRoleId: _entity.currentRoleId,
            currentCompanyId: _entity.currentCompanyId,
            currentBranchId: _entity.currentBranchId,
            currentDepartmentId: _entity.currentDepartmentId,
            currentSubDepartmentId: _entity.currentSubDepartmentId,
        };

        setLoading(true);
        try {
            
        const result = await client.service("userProfiles").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info userProfiles updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    // children dropdown options

    

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="userProfiles-edit-dialog-component">
                <div>
                <p className="m-0">User Id:</p>
                <InputText className="w-full mb-3" value={_entity?.userId} onChange={(e) => setValByKey("userId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Image Url:</p>
                <InputText className="w-full mb-3" value={_entity?.imageUrl} onChange={(e) => setValByKey("imageUrl", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Profile Status Id:</p>
                <InputText className="w-full mb-3" value={_entity?.profileStatusId} onChange={(e) => setValByKey("profileStatusId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Uu Id:</p>
                <InputText className="w-full mb-3" value={_entity?.uuId} onChange={(e) => setValByKey("uuId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Oauth Provider Id:</p>
                <InputText className="w-full mb-3" value={_entity?.oauthProviderId} onChange={(e) => setValByKey("oauthProviderId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Oauth Provider Name:</p>
                <InputText className="w-full mb-3" value={_entity?.oauthProviderName} onChange={(e) => setValByKey("oauthProviderName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Login Type Id:</p>
                <InputText className="w-full mb-3" value={_entity?.loginTypeId} onChange={(e) => setValByKey("loginTypeId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Date Of Birth:</p>
                <InputText className="w-full mb-3" value={_entity?.dateOfBirth} onChange={(e) => setValByKey("dateOfBirth", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Gender:</p>
                <InputText className="w-full mb-3" value={_entity?.gender} onChange={(e) => setValByKey("gender", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Account Status:</p>
                <InputText className="w-full mb-3" value={_entity?.accountStatus} onChange={(e) => setValByKey("accountStatus", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Current Mobile Number Id:</p>
                <InputText className="w-full mb-3" value={_entity?.currentMobileNumberId} onChange={(e) => setValByKey("currentMobileNumberId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Current Role Id:</p>
                <InputText className="w-full mb-3" value={_entity?.currentRoleId} onChange={(e) => setValByKey("currentRoleId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Current Company Id:</p>
                <InputText className="w-full mb-3" value={_entity?.currentCompanyId} onChange={(e) => setValByKey("currentCompanyId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Current Branch Id:</p>
                <InputText className="w-full mb-3" value={_entity?.currentBranchId} onChange={(e) => setValByKey("currentBranchId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Current Department Id:</p>
                <InputText className="w-full mb-3" value={_entity?.currentDepartmentId} onChange={(e) => setValByKey("currentDepartmentId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Current Sub Department Id:</p>
                <InputText className="w-full mb-3" value={_entity?.currentSubDepartmentId} onChange={(e) => setValByKey("currentSubDepartmentId", e.target.value)}  />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return{}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(UserProfilesCreateDialogComponent);
