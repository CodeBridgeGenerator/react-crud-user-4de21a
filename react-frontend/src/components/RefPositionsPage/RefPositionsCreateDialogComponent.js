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

const RefPositionsCreateDialogComponent = (props) => {
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
            roleId: _entity.roleId,
            position: _entity.position,
            abbr: _entity.abbr,
            reportingtoidPositionHierarchyId: _entity.reportingtoidPositionHierarchyId,
            departmentId: _entity.departmentId,
            direct: _entity.direct,
            ishead: _entity.ishead,
        };

        setLoading(true);

        try {
            
        const result = await client.service("refPositions").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info refPositions created successfully" });
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
            <div role="refPositions-create-dialog-component">
            <div>
                <p className="m-0">Role Id:</p>
                <InputText className="w-full mb-3" value={_entity?.roleId} onChange={(e) => setValByKey("roleId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Position:</p>
                <InputText className="w-full mb-3" value={_entity?.position} onChange={(e) => setValByKey("position", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Abbr:</p>
                <InputText className="w-full mb-3" value={_entity?.abbr} onChange={(e) => setValByKey("abbr", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Reportingtoid Position Hierarchy Id :</p>
                <InputText className="w-full mb-3" value={_entity?.reportingtoidPositionHierarchyId} onChange={(e) => setValByKey("reportingtoidPositionHierarchyId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Department Id:</p>
                <InputText className="w-full mb-3" value={_entity?.departmentId} onChange={(e) => setValByKey("departmentId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Direct:</p>
                <InputText className="w-full mb-3" value={_entity?.direct} onChange={(e) => setValByKey("direct", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Ishead:</p>
                <InputText className="w-full mb-3" value={_entity?.ishead} onChange={(e) => setValByKey("ishead", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(RefPositionsCreateDialogComponent);
