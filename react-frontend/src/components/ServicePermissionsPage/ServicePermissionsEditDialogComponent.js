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

const ServicePermissionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            roleId: _entity.roleId,
            userId: _entity.userId,
            serviceId: _entity.serviceId,
            read: _entity.read,
            create: _entity.create,
            updateany: _entity.updateany,
            updateown: _entity.updateown,
            deleteany: _entity.deleteany,
            deleteown: _entity.deleteown,
        };

        setLoading(true);
        try {
            
        const result = await client.service("servicePermissions").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info servicePermissions updated successfully" });
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
            <div role="servicePermissions-edit-dialog-component">
                <div>
                <p className="m-0">Role Id:</p>
                <InputText className="w-full mb-3" value={_entity?.roleId} onChange={(e) => setValByKey("roleId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">User Id:</p>
                <InputText className="w-full mb-3" value={_entity?.userId} onChange={(e) => setValByKey("userId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Service Id:</p>
                <InputText className="w-full mb-3" value={_entity?.serviceId} onChange={(e) => setValByKey("serviceId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Read:</p>
                <InputText className="w-full mb-3" value={_entity?.read} onChange={(e) => setValByKey("read", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Create:</p>
                <InputText className="w-full mb-3" value={_entity?.create} onChange={(e) => setValByKey("create", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Updateany:</p>
                <InputText className="w-full mb-3" value={_entity?.updateany} onChange={(e) => setValByKey("updateany", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Updateown:</p>
                <InputText className="w-full mb-3" value={_entity?.updateown} onChange={(e) => setValByKey("updateown", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Deleteany:</p>
                <InputText className="w-full mb-3" value={_entity?.deleteany} onChange={(e) => setValByKey("deleteany", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Deleteown:</p>
                <InputText className="w-full mb-3" value={_entity?.deleteown} onChange={(e) => setValByKey("deleteown", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(ServicePermissionsCreateDialogComponent);
