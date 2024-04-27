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

const IpLoginAccessCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            userId: _entity.userId,
            roleId: _entity.roleId,
            startIp: _entity.startIp,
            endIp: _entity.endIp,
            allowedStartTime: _entity.allowedStartTime,
            allowedEndTime: _entity.allowedEndTime,
            blockedStartTime: _entity.blockedStartTime,
            blockedEndTime: _entity.blockedEndTime,
        };

        setLoading(true);

        try {
            
        const result = await client.service("ipLoginAccess").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info ipLoginAccess created successfully" });
        props.onCreateResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
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

    

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="ipLoginAccess-create-dialog-component">
            <div>
                <p className="m-0">User Id:</p>
                <InputText className="w-full mb-3" value={_entity?.userId} onChange={(e) => setValByKey("userId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Role Id:</p>
                <InputText className="w-full mb-3" value={_entity?.roleId} onChange={(e) => setValByKey("roleId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Start Ip:</p>
                <InputText className="w-full mb-3" value={_entity?.startIp} onChange={(e) => setValByKey("startIp", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">End Ip:</p>
                <InputText className="w-full mb-3" value={_entity?.endIp} onChange={(e) => setValByKey("endIp", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Allowed Start Time:</p>
                <InputText className="w-full mb-3" value={_entity?.allowedStartTime} onChange={(e) => setValByKey("allowedStartTime", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Allowed End Time:</p>
                <InputText className="w-full mb-3" value={_entity?.allowedEndTime} onChange={(e) => setValByKey("allowedEndTime", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Blocked Start Time:</p>
                <InputText className="w-full mb-3" value={_entity?.blockedStartTime} onChange={(e) => setValByKey("blockedStartTime", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Blocked End Time:</p>
                <InputText className="w-full mb-3" value={_entity?.blockedEndTime} onChange={(e) => setValByKey("blockedEndTime", e.target.value)}  />
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
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(IpLoginAccessCreateDialogComponent);
