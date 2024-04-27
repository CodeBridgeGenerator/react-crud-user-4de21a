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

const CompaniesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            companyName: _entity.companyName,
            companyNo: _entity.companyNo,
            brandName: _entity.brandName,
            website: _entity.website,
            addressId: _entity.addressId,
            logourl: _entity.logourl,
            companyEmail: _entity.companyEmail,
            phoneTypeId: _entity.phoneTypeId,
            faxTypeId: _entity.faxTypeId,
            isDefault: _entity.isDefault,
        };

        setLoading(true);
        try {
            
        const result = await client.service("companies").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info companies updated successfully" });
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
            <div role="companies-edit-dialog-component">
                <div>
                <p className="m-0">Company Name:</p>
                <InputText className="w-full mb-3" value={_entity?.companyName} onChange={(e) => setValByKey("companyName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Company No:</p>
                <InputText className="w-full mb-3" value={_entity?.companyNo} onChange={(e) => setValByKey("companyNo", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Brand Name:</p>
                <InputText className="w-full mb-3" value={_entity?.brandName} onChange={(e) => setValByKey("brandName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Website:</p>
                <InputText className="w-full mb-3" value={_entity?.website} onChange={(e) => setValByKey("website", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Address Id:</p>
                <InputText className="w-full mb-3" value={_entity?.addressId} onChange={(e) => setValByKey("addressId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Logourl:</p>
                <InputText className="w-full mb-3" value={_entity?.logourl} onChange={(e) => setValByKey("logourl", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Company Email:</p>
                <InputText className="w-full mb-3" value={_entity?.companyEmail} onChange={(e) => setValByKey("companyEmail", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Phone Type Id:</p>
                <InputText className="w-full mb-3" value={_entity?.phoneTypeId} onChange={(e) => setValByKey("phoneTypeId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Fax Type Id:</p>
                <InputText className="w-full mb-3" value={_entity?.faxTypeId} onChange={(e) => setValByKey("faxTypeId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Is Default:</p>
                <InputText className="w-full mb-3" value={_entity?.isDefault} onChange={(e) => setValByKey("isDefault", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(CompaniesCreateDialogComponent);
