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

const ServiceMetaCreateDialogComponent = (props) => {
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
            serviceId: _entity.serviceId,
            descriptive: _entity.descriptive,
            structural: _entity.structural,
            administrative: _entity.administrative,
            reference: _entity.reference,
            statistical: _entity.statistical,
            legal: _entity.legal,
        };

        setLoading(true);

        try {
            
        const result = await client.service("serviceMeta").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info serviceMeta created successfully" });
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
            <div role="serviceMeta-create-dialog-component">
            <div>
                <p className="m-0">Service Id:</p>
                <InputText className="w-full mb-3" value={_entity?.serviceId} onChange={(e) => setValByKey("serviceId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Descriptive:</p>
                <InputText className="w-full mb-3" value={_entity?.descriptive} onChange={(e) => setValByKey("descriptive", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Structural:</p>
                <InputText className="w-full mb-3" value={_entity?.structural} onChange={(e) => setValByKey("structural", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Administrative:</p>
                <InputText className="w-full mb-3" value={_entity?.administrative} onChange={(e) => setValByKey("administrative", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Reference:</p>
                <InputText className="w-full mb-3" value={_entity?.reference} onChange={(e) => setValByKey("reference", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Statistical:</p>
                <InputText className="w-full mb-3" value={_entity?.statistical} onChange={(e) => setValByKey("statistical", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Legal:</p>
                <InputText className="w-full mb-3" value={_entity?.legal} onChange={(e) => setValByKey("legal", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(ServiceMetaCreateDialogComponent);
