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

const AddressesCreateDialogComponent = (props) => {
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
            morphid: _entity.morphid,
            morphname: _entity.morphname,
            street: _entity.street,
            street2: _entity.street2,
            city: _entity.city,
            postcode: _entity.postcode,
            state: _entity.state,
            country: _entity.country,
        };

        setLoading(true);

        try {
            
        const result = await client.service("addresses").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info addresses created successfully" });
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
            <div role="addresses-create-dialog-component">
            <div>
                <p className="m-0">Morphid:</p>
                <InputText className="w-full mb-3" value={_entity?.morphid} onChange={(e) => setValByKey("morphid", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Morphname:</p>
                <InputText className="w-full mb-3" value={_entity?.morphname} onChange={(e) => setValByKey("morphname", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Street:</p>
                <InputText className="w-full mb-3" value={_entity?.street} onChange={(e) => setValByKey("street", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Street2:</p>
                <InputText className="w-full mb-3" value={_entity?.street2} onChange={(e) => setValByKey("street2", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">City:</p>
                <InputText className="w-full mb-3" value={_entity?.city} onChange={(e) => setValByKey("city", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Postcode:</p>
                <InputText className="w-full mb-3" value={_entity?.postcode} onChange={(e) => setValByKey("postcode", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">State:</p>
                <InputText className="w-full mb-3" value={_entity?.state} onChange={(e) => setValByKey("state", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Country:</p>
                <InputText className="w-full mb-3" value={_entity?.country} onChange={(e) => setValByKey("country", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(AddressesCreateDialogComponent);
